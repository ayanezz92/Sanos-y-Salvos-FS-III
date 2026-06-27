package com.sanosysalvos.organizacion.controller;

import com.sanosysalvos.organizacion.model.Campania;
import com.sanosysalvos.organizacion.repository.CampaniaRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/organizacion")
@Tag(name = "Organización y Coordinación", description = "Gestión de campañas y operativos de ayuda")
public class CampaniaController {

    @Autowired
    private CampaniaRepository repository;

    @Operation(summary = "Listar todas las campañas activas")
    @GetMapping
    public List<Campania> listar() {
        return repository.findAll();
    }

    @Operation(summary = "Crear una nueva campaña de coordinación")
    @PostMapping
    public Campania crear(@RequestBody Campania campania) {
        return repository.save(campania);
    }
}