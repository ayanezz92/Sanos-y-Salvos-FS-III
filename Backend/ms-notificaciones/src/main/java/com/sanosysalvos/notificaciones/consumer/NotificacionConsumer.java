package com.sanosysalvos.notificaciones.consumer;

import com.sanosysalvos.notificaciones.config.RabbitMQConfig;
import com.sanosysalvos.notificaciones.model.Notificacion;
import com.sanosysalvos.notificaciones.repository.NotificacionRepository;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class NotificacionConsumer {

    @Autowired
    private NotificacionRepository repository;

    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");

    @RabbitListener(queues = RabbitMQConfig.QUEUE_NOTIFICACIONES)
    public void consumirMensajeAsincrono(String textoMensaje) {
        System.out.println(" Payload capturado desde el bus de RabbitMQ: " + textoMensaje);

        // Formatear hora actual de la transacción
        String horaActual = "A las " + LocalDateTime.now().format(formatter);

        // Mapear y persistir el evento en la base de datos de auditoría
        Notificacion notificacion = new Notificacion();
        notificacion.setOrigen("RabbitMQ Broker");
        notificacion.setMensaje(textoMensaje);
        notificacion.setTime(horaActual);

        repository.save(notificacion);
    }
}