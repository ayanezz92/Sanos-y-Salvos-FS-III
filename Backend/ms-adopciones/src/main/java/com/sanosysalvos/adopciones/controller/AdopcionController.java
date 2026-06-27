package com.sanosysalvos.adopciones.controller;

import com.sanosysalvos.adopciones.model.Adopcion;
import com.sanosysalvos.adopciones.repository.AdopcionRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/adopciones")
@CrossOrigin(origins = "*")
public class AdopcionController {

    private final AdopcionRepository repository;

    public AdopcionController(AdopcionRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Adopcion> obtenerTodas() {
        return repository.findAll();
    }

    @PostMapping("/crear")
    public Adopcion registrarAdopcion(@RequestBody Adopcion adopcion) {
        if (adopcion.getEstado() == null) {
            adopcion.setEstado("PENDIENTE");
        }
        return repository.save(adopcion);
    }

    /**
     * Sincroniza la decisión del staff (Aprobar/Rechazar) desde Usuarios.jsx
     */
    @PutMapping("/{id}/estado")
    public ResponseEntity<?> modificarEstado(@PathVariable Long id, @RequestBody Map<String, String> body) {
        Optional<Adopcion> adopcionOpt = repository.findById(id);
        if (adopcionOpt.isPresent()) {
            Adopcion adopcion = adopcionOpt.get();
            String nuevoEstado = body.get("estado");
            adopcion.setEstado(nuevoEstado);
            repository.save(adopcion);
            return ResponseEntity.ok(adopcion);
        }
        return ResponseEntity.notFound().build();
    }
}