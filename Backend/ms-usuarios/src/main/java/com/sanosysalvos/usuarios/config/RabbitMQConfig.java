package com.sanosysalvos.usuarios.config;

import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    public static final String QUEUE_NOTIFICACIONES = "notificaciones.login";

    @Bean
    public Queue loginQueue() {
        // Creamos una cola duradera para que los eventos no se pierdan
        return new Queue(QUEUE_NOTIFICACIONES, true);
    }
}