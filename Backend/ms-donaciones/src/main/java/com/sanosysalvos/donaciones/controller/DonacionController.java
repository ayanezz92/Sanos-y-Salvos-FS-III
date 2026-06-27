package com.sanosysalvos.donaciones.controller;

import com.sanosysalvos.donaciones.model.Donacion;
import com.sanosysalvos.donaciones.repository.DonacionRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/donaciones")
@CrossOrigin(origins = "*")
public class DonacionController {

    private final DonacionRepository repository;

    public DonacionController(DonacionRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Donacion> obtenerDonaciones() {
        return repository.findAll();
    }

    @PostMapping("/registrar")
    public Donacion registrarDonacion(@RequestBody Donacion donacion) {
        return repository.save(donacion);
    }
}