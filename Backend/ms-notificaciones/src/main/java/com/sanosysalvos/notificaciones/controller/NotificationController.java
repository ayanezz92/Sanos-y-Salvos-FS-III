package com.sanosysalvos.notificaciones.controller;

import com.sanosysalvos.notificaciones.config.RabbitConfig;
import com.sanosysalvos.notificaciones.model.Notificacion;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/notificaciones")
@CrossOrigin(origins = "*")
public class NotificationController {

    // Lista concurrente en memoria para almacenar las alertas recibidas del broker
    private final List<Notificacion> bufferAlertas = Collections.synchronizedList(new ArrayList<>());

    /**
     * Endpoint que consume React para poblar el Centro de Notificaciones.
     */
    @GetMapping
    public List<Notificacion> listarAlertas() {
        return new ArrayList<>(bufferAlertas);
    }

    /**
     * Escucha asíncrona conectada directo a RabbitMQ.
     */
    @RabbitListener(queues = RabbitConfig.QUEUE_NAME)
    public void recibirAlertaDelBroker(Notificacion alerta) {
        if (alerta.getId() == null) {
            alerta.setId(UUID.randomUUID().toString());
        }
        // Inyectamos al inicio para que las alertas más nuevas figuren arriba en React
        bufferAlertas.add(0, alerta);
    }
}