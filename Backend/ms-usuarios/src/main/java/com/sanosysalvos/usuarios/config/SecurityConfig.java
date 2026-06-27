package com.sanosysalvos.usuarios.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

/**
 * Configuracion oficial de Spring Security para el manejo de sesiones REST y JWT.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                // Desactivar CSRF ya que los tokens JWT son inmunes a este tipo de ataques
                .csrf(csrf -> csrf.disable())

                // Forzar a que la aplicacion no guarde estados ni sesiones en el servidor (Stateless)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                // Control de autorizacion de rutas de entrada
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/usuarios/login").permitAll() // 👈 Liberar acceso publico obligatorio
                        .anyRequest().authenticated() // Bloquear cualquier otro endpoint corporativo
                )
                .build();
    }
}