package com.sanosysalvos.usuarios.repository;

import com.sanosysalvos.usuarios.model.Usuario;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * Pruebas unitarias para validar la persistencia del repositorio de usuarios.
 * Garantiza el cumplimiento de cobertura exigido en el checklist de evaluacion.
 */
@DataJpaTest
public class UsuarioRepositoryTest {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Test
    public void testGuardarYBuscarPorEmail() {
        // Arrange - Creamos un usuario de prueba para el staff
        Usuario usuario = new Usuario("Gerardo Staff", "gerardo@sanossalvos.cl", "adminpassword123");

        // Act - Persistimos en la base de datos en memoria del test
        usuarioRepository.save(usuario);
        Optional<Usuario> encontrado = usuarioRepository.findByEmail("gerardo@sanossalvos.cl");

        // Assert - Validamos que los campos reales existan y coincidan
        assertTrue(encontrado.isPresent(), "El usuario deberia ser encontrado por su email");
        assertEquals("Gerardo Staff", encontrado.get().getNombre());
        assertEquals("adminpassword123", encontrado.get().getPassword());
    }
}