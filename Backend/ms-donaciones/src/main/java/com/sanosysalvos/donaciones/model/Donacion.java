package com.sanosysalvos.donaciones.model;

import jakarta.persistence.*;

@Entity
@Table(name = "donaciones")
public class Donacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String donante;
    private String monto;  // Guardado como texto formateado (ej: "$50,000") para calzar directo con tu reduce de JS
    private String destino;
    private String metodo;  // "Transbank Webpay", "Transferencia Khipu", etc.

    // Constructor Vacío
    public Donacion() {}

    public Donacion(Long id, String donante, String monto, String destino, String metodo) {
        this.id = id;
        this.donante = donante;
        this.monto = monto;
        this.destino = destino;
        this.metodo = metodo;
    }

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getDonante() { return donante; }
    public void setDonante(String donante) { this.donante = donante; }
    public String getMonto() { return monto; }
    public void setMonto(String monto) { this.monto = monto; }
    public String getDestino() { return destino; }
    public void setDestino(String destino) { this.destino = destino; }
    public String getMetodo() { return metodo; }
    public void setMetodo(String metodo) { this.metodo = metodo; }
}