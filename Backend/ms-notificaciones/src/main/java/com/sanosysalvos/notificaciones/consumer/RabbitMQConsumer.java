package com.sanosysalvos.notificaciones.consumer;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class RabbitMQConsumer {

    /**
     * Escucha activamente la cola de RabbitMQ en tiempo real.
     */
    @RabbitListener(queues = "notificaciones.login")
    public void recibirMensaje(String mensaje) {
        System.out.println("=================================================");
        System.out.println("[RABBITMQ - RECEPTOR] Mensaje asíncrono recibido:");
        System.out.println("📩 " + mensaje);
        System.out.println("=================================================");
    }
}