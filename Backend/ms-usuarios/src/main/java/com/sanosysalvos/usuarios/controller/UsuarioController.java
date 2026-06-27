package com.sanosysalvos.usuarios.controller;

import com.sanosysalvos.usuarios.model.Usuario;
import com.sanosysalvos.usuarios.repository.UsuarioRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    private final UsuarioRepository repository;

    public UsuarioController(UsuarioRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/listar")
    public List<Usuario> obtenerTodos() {
        return repository.findAll();
    }

    @PostMapping("/registrar")
    public Usuario crearUsuario(@RequestBody Usuario usuario) {
        return repository.save(usuario);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario loginForm) {
        Optional<Usuario> userOpt = repository.findByEmail(loginForm.getEmail());
        if (userOpt.isPresent() && userOpt.get().getContrasena().equals(loginForm.getContrasena())) {
            return ResponseEntity.ok(userOpt.get());
        }
        return ResponseEntity.status(401).body("Credenciales incorrectas o usuario inexistente.");
    }
}