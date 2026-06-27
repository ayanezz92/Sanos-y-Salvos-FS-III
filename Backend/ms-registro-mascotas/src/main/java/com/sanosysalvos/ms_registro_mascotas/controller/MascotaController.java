package com.sanosysalvos.ms_registro_mascotas.controller;

import com.sanosysalvos.ms_registro_mascotas.model.Mascota;
import com.sanosysalvos.ms_registro_mascotas.repository.MascotaRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mascotas")
@CrossOrigin(origins = "*")
public class MascotaController {

    private final MascotaRepository repository;

    public MascotaController(MascotaRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/listar")
    public List<Mascota> listarTodas() {
        return repository.findAll();
    }

    @GetMapping("/estado/{estado}")
    public List<Mascota> listarPorEstado(@PathVariable String estado) {
        return repository.findByEstado(estado);
    }

    @PostMapping("/registrar")
    public Mascota registrarMascota(@RequestBody Mascota mascota) {
        return repository.save(mascota);
    }
}