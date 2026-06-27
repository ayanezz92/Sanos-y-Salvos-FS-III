package com.sanosysalvos.usuarios.repository;

import com.sanosysalvos.usuarios.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    // Permite buscar por email para procesar flujos de login y login persistente
    Optional<Usuario> findByEmail(String email);
}