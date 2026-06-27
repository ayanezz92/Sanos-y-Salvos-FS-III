package com.sanosysalvos.usuarios.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtTokenProvider {

    // Clave secreta segura generada dinamicamente para la firma del token
    private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    // Tiempo de validez del token: 1 hora (en milisegundos)
    private final long jwtExpirationInMs = 3600000;

    /**
     * Genera un token JWT firmado conteniendo el correo del usuario del staff.
     */
    public String generarToken(String email) {
        Date ahora = new Date();
        Date fechaExpiracion = new Date(ahora.getTime() + jwtExpirationInMs);

        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(ahora)
                .setExpiration(fechaExpiracion)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }
}