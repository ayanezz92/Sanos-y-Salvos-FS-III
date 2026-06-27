package com.sanosysalvos.notificaciones.clients;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

// El nombre debe ser igual al que aparece en tu Eureka para el servicio de mascotas
@FeignClient(name = "ms-registro-mascotas")
public interface MascotaClient {

    // Esta ruta debe coincidir con el GetMapping que tienes en MascotaController
    @GetMapping("/api/mascotas/{id}")
    Object obtenerDatosMascota(@PathVariable("id") Long id);
}