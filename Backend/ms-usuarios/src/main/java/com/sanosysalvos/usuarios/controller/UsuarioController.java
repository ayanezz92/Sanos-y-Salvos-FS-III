package com.sanosysalvos.usuarios.controller;

import com.sanosysalvos.usuarios.model.Usuario;
import com.sanosysalvos.usuarios.repository.UsuarioRepository;
import com.sanosysalvos.usuarios.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    private final UsuarioRepository repository;
    private final UsuarioService usuarioService; // 👈 Inyectamos el servicio transaccional

    // Constructor actualizado con ambas dependencias
    public UsuarioController(UsuarioRepository repository, UsuarioService usuarioService) {
        this.repository = repository;
        this.usuarioService = usuarioService;
    }

    @GetMapping("/listar")
    public List<Usuario> obtenerTodos() {
        return repository.findAll();
    }

    @PostMapping("/registrar")
    public Usuario crearUsuario(@RequestBody Usuario usuario) {
        // 🚨 CAMBIO CLAVE: Ahora pasa por el servicio para asegurar el guardado físico en la BD
        return usuarioService.registrarUsuario(usuario);
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