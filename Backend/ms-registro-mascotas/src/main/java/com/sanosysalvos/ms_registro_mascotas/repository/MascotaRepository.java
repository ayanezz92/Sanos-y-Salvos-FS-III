package com.sanosysalvos.ms_registro_mascotas.repository;

import com.sanosysalvos.ms_registro_mascotas.model.Mascota;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MascotaRepository extends JpaRepository<Mascota, Long> {
    // Permite al frontend filtrar fácilmente por el estado del animal
    List<Mascota> findByEstado(String estado);
}