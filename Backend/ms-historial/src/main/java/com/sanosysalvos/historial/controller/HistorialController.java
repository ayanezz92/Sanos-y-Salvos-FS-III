package com.sanosysalvos.historial.controller;

import com.sanosysalvos.historial.model.FichaMedica;
import com.sanosysalvos.historial.repository.HistorialRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/historial")
@CrossOrigin(origins = "*")
public class HistorialController {

    private final HistorialRepository repository;

    public HistorialController(HistorialRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<FichaMedica> obtenerHistorial() {
        return repository.findAll();
    }

    @PostMapping
    public FichaMedica registrarFicha(@RequestBody FichaMedica ficha) {
        return repository.save(ficha);
    }
}