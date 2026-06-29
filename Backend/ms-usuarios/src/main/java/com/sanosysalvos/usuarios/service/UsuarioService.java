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
     * 📥 Guarda de forma persistente y transaccional un nuevo usuario en la base de datos.
     */
    @Transactional // 👈 IMPORTANTE: Asegura que los cambios se escriban físicamente en el disco
    public Usuario registrarUsuario(Usuario usuario) {
        // Opcional: limpiar el correo antes de guardar para evitar errores de mayúsculas
        if (usuario.getEmail() != null) {
            usuario.setEmail(usuario.getEmail().trim().toLowerCase());
        }
        return usuarioRepository.save(usuario);
    }

    /**
     * Valida las credenciales utilizando consultas JPA y logica pesada de Stored Procedures.
     */
    @Transactional(readOnly = true)
    public Usuario autenticarUsuario(String email, String password) {
        String correoLimpio = email.trim().toLowerCase();

        // 🛠️ Invocacion del procedimiento almacenado para auditar/buscar el ID
        Long usuarioId = usuarioRepository.sp_buscar_usuario_por_email(correoLimpio);

        if (usuarioId == null) {
            throw new RuntimeException("Acceso denegado: El correo no se encuentra registrado en el sistema.");
        }

        // Si el procedimiento lo encuentra, recuperamos la entidad completa con JPA
        return usuarioRepository.findById(usuarioId)
                .filter(u -> u.getContrasena().equals(password))
                .orElseThrow(() -> new RuntimeException("Acceso denegado: Contraseña incorrecta."));
    }
}