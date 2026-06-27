package com.sanosysalvos.usuarios.service;

import com.sanosysalvos.usuarios.model.Usuario;
import com.sanosysalvos.usuarios.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Servicio de negocio con auditoria integrada por procedimientos almacenados.
 */
@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    /**
     * Valida las credenciales utilizando consultas JPA y logica pesada de Stored Procedures.
     */
    @Transactional
    public Usuario autenticarUsuario(String email, String password) {
        String correoLimpio = email.trim().toLowerCase();

        // 🛠️ Invocacion del procedimiento almacenado para auditar/buscar el ID
        Long usuarioId = usuarioRepository.sp_buscar_usuario_por_email(correoLimpio);

        if (usuarioId == null) {
            throw new RuntimeException("Acceso denegado: El correo no se encuentra registrado en el sistema.");
        }

        // Si el procedimiento lo encuentra, recuperamos la entidad completa con JPA
        return usuarioRepository.findById(usuarioId)
                .filter(u -> u.getPassword().equals(password))
                .orElseThrow(() -> new RuntimeException("Acceso denegado: Contraseña incorrecta."));
    }
}