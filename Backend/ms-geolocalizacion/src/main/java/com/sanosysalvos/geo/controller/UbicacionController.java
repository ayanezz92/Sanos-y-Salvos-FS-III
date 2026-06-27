package com.sanosysalvos.geo.controller;

import com.sanosysalvos.geo.model.Ubicacion;
import com.sanosysalvos.geo.repository.UbicacionRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/geolocalizacion")
@CrossOrigin(origins = "*")
public class UbicacionController {

    private final UbicacionRepository repository;

    public UbicacionController(UbicacionRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/puntos")
    public List<Ubicacion> obtenerPuntos() {
        return repository.findAll();
    }

    @PostMapping("/guardar")
    public Ubicacion guardarPunto(@RequestBody Ubicacion punto) {
        return repository.save(punto);
    }
}