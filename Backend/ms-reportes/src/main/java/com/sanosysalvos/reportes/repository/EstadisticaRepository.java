package com.sanosysalvos.reportes.repository;

import com.sanosysalvos.reportes.model.Estadistica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EstadisticaRepository  extends JpaRepository<Estadistica, Long> {
}