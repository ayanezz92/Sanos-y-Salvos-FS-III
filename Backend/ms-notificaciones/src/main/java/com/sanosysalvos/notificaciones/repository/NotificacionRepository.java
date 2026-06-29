package com.sanosysalvos.notificaciones.repository;

import com.sanosysalvos.notificaciones.model.Notificacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificacionRepository extends JpaRepository<Notificacion, String> {
}