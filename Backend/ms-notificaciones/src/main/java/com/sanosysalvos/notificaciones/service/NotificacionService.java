package com.sanosysalvos.notificaciones.service;

// IMPORTANTE: Esta es la ruta que te faltaba
import com.sanosysalvos.notificaciones.clients.MascotaClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NotificacionService {

    @Autowired
    private MascotaClient mascotaClient;

    public void enviarAlerta(Long idMascota) {
        // Ahora sí puedes usarlo sin errores
        Object mascota = mascotaClient.obtenerDatosMascota(idMascota);
        System.out.println("Notificando sobre: " + mascota);
    }
}