package com.sanosysalvos.organizacion.repository;

import com.sanosysalvos.organizacion.model.Campania;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@DataJpaTest
class CampaniaRepositoryTest {
    @Autowired
    private CampaniaRepository repository;

    @Test
    void debeGuardarCampania() {
        Campania camp = new Campania();
        camp.setNombre("Operativo Chipeo Invierno");
        camp.setTipo("CHIPEO");

        Campania guardada = repository.save(camp);

        assertNotNull(guardada.getId());
        assertEquals("Operativo Chipeo Invierno", guardada.getNombre());
    }
}