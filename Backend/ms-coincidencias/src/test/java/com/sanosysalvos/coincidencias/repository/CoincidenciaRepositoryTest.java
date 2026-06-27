package com.sanosysalvos.coincidencias.repository;

import com.sanosysalvos.coincidencias.model.Mascota;
import org.junit.jupiter.api.Test;
import com.sanosysalvos.coincidencias.repository.MascotaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

/**
 * Pruebas unitarias para validar la persistencia del repositorio de mascotas.
 * Contribuye al cumplimiento de cobertura exigido en la evaluacion.
 */
@DataJpaTest
public class CoincidenciaRepositoryTest {

    @Autowired
    private MascotaRepository mascotaRepository; // 👈 Conectado al nuevo repositorio corregido

    @Test
    public void testRegistrarMascota() {
        // Arrange
        Mascota mascota = new Mascota("Firulais", "Perro", "En refugio", "Alerce");

        // Act
        Mascota mascotaGuardada = mascotaRepository.save(mascota);

        // Assert
        assertNotNull(mascotaGuardada.getId(), "El ID no deberia ser nulo tras persistir");
        assertEquals("Firulais", mascotaGuardada.getNombre());
        assertEquals("Alerce", mascotaGuardada.getZona());
    }
}