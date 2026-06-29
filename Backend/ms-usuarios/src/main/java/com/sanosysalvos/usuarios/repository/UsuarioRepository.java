package com.sanosysalvos.usuarios.repository;

import com.sanosysalvos.usuarios.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    // Permite buscar por email para procesar flujos de login y login persistente
    Optional<Usuario> findByEmail(String email);

    /**
     * 🛠️ LLAMADA AL PROCEDIMIENTO ALMACENADO
     * Conecta el método del servicio con el Stored Procedure de tu base de datos postgres
     */
    @Procedure(procedureName = "sp_buscar_usuario_por_email")
    Long sp_buscar_usuario_por_email(@Param("correo") String correo);
}