package com.sanosysalvos.coincidencias.controller;

import com.sanosysalvos.coincidencias.model.Coincidencia;
import com.sanosysalvos.coincidencias.repository.CoincidenciaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/coincidencias")
@CrossOrigin(origins = "*")
public class CoincidenciaController {

    private final CoincidenciaRepository repository;

    public CoincidenciaController(CoincidenciaRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Coincidencia> listarCoincidencias() {
        return repository.findAll();
    }

    @PostMapping("/crear")
    public Coincidencia crearCoincidencia(@RequestBody Coincidencia coincidencia) {
        if(coincidencia.getEstado() == null) coincidencia.setEstado("Pendiente");
        return repository.save(coincidencia);
    }

    @PostMapping("/{id}/validar")
    public ResponseEntity<?> validarCruceBiometrico(@PathVariable Long id) {
        Optional<Coincidencia> coincidenciaOpt = repository.findById(id);
        if (coincidenciaOpt.isPresent()) {
            Coincidencia coincidencia = coincidenciaOpt.get();
            coincidencia.setEstado("Confirmado");
            repository.save(coincidencia);
            return ResponseEntity.ok(coincidencia);
        }
        return ResponseEntity.notFound().build();
    }
}