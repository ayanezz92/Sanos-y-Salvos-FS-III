package com.sanosysalvos.reportes.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/reportes")
@CrossOrigin(origins = "*")
public class ReporteController {

    // Directorio de almacenamiento interno dentro del contenedor o sistema de archivos compartido
    private static final String DIRECTORIO_UPLOADS = "uploads/";

    @PostMapping
    public ResponseEntity<?> crearReporteMultimedia(
            @RequestParam("tipo") String tipo,
            @RequestParam("nombre") String nombre,
            @RequestParam("especie") String especie,
            @RequestParam("color") String color,
            @RequestParam("tamano") String tamano,
            @RequestParam("ubicacion") String ubicacion,
            @RequestParam("foto") MultipartFile foto) {

        // Validar que el archivo binario contenga datos atómicos
        if (foto.isEmpty()) {
            Map<String, String> respuestaError = new HashMap<>();
            respuestaError.put("mensaje", "La foto física es obligatoria para el motor de coincidencias.");
            return ResponseEntity.badRequest().body(respuestaError);
        }

        try {
            // 1. Asegurar la existencia física del directorio de almacenamiento
            Path rutaDirectorio = Paths.get(DIRECTORIO_UPLOADS);
            if (!Files.exists(rutaDirectorio)) {
                Files.createDirectories(rutaDirectorio);
            }

            // 2. Sanitizar el nombre del archivo adjunto para evitar sobreescrituras (Uso de UUID)
            String nombreArchivoUnico = UUID.randomUUID().toString() + "_" + foto.getOriginalFilename();
            Path rutaDestinoArchivo = rutaDirectorio.resolve(nombreArchivoUnico);

            // 3. Escribir el flujo binario (InputStream) de la imagen directamente en el disco duro/volumen
            Files.copy(foto.getInputStream(), rutaDestinoArchivo);

            // 4. ESTRUCTURA DE ÉXITO DE PRODUCCIÓN:
            // En un flujo extendido, aquí instanciarías tu entidad JPA 'Reporte' y guardarías 'nombreArchivoUnico' en PostgreSQL.
            Map<String, Object> respuestaExito = new HashMap<>();
            respuestaExito.put("status", "PROCESSED");
            respuestaExito.put("idReporte", UUID.randomUUID().getMostSignificantBits() & Long.MAX_VALUE);
            respuestaExito.put("nombreAsignado", nombre);
            respuestaExito.put("rutaImagenAlmacenada", "/uploads/" + nombreArchivoUnico);

            return new ResponseEntity<>(respuestaExito, HttpStatus.CREATED);

        } catch (IOException e) {
            System.err.println("Excepción crítica de Entrada/Salida al guardar archivo multipart: " + e.getMessage());
            Map<String, String> errorInterno = new HashMap<>();
            errorInterno.put("mensaje", "Error crítico del servidor al guardar la persistencia multimedia.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorInterno);
        }
    }
}