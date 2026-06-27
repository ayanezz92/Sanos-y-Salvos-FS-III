package com.sanosysalvos.geo.model;

import java.io.Serializable;

public class Ubicacion implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long id;
    private String nombre;
    private String especie;
    private String estado;
    private String zona;

    // Constructor Vacío Obligatorio para Jackson
    public Ubicacion() {}

    public Ubicacion(Long id, String nombre, String especie, String estado, String zona) {
        this.id = id;
        this.nombre = nombre;
        this.especie = especie;
        this.estado = estado;
        this.zona = zona;
    }

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getEspecie() { return especie; }
    public void setEspecie(String especie) { this.especie = especie; }
    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }
    public String getZona() { return zona; }
    public void setZona(String zona) { this.zona = zona; }
}