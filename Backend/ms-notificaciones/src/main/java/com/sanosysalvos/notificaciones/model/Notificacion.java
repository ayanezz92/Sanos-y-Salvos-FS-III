package com.sanosysalvos.notificaciones.model;

import java.io.Serializable;

public class Notificacion implements Serializable {
    private static final long serialVersionUID = 1L;

    // CRÍTICO: El ID debe ser String para soportar los UUID generados
    private String id;
    private String origen;
    private String mensaje;
    private String fecha;

    public Notificacion() {}

    public Notificacion(String id, String origen, String mensaje, String fecha) {
        this.id = id;
        this.origen = origen;
        this.mensaje = mensaje;
        this.fecha = fecha;
    }

    // Getters y Setters necesarios para que el Controlador no arroje error
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getOrigen() { return origen; }
    public void setOrigen(String origen) { this.origen = origen; }

    public String getMensaje() { return mensaje; }
    public void setMensaje(String mensaje) { this.mensaje = mensaje; }

    public String getFecha() { return fecha; }
    public void setFecha(String fecha) { this.fecha = fecha; }
}