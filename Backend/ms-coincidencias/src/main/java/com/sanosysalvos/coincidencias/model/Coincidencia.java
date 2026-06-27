package com.sanosysalvos.coincidencias.model;

import jakarta.persistence.*;

@Entity
@Table(name = "coincidencias")
public class Coincidencia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String a;
    private String b;
    private Integer pct;
    private String estado;

    public Coincidencia() {}

    public Coincidencia(Long id, String a, String b, Integer pct, String estado) {
        this.id = id;
        this.a = a;
        this.b = b;
        this.pct = pct;
        this.estado = estado;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getA() { return a; }
    public void setA(String a) { this.a = a; }
    public String getB() { return b; }
    public void setB(String b) { this.b = b; }
    public Integer getPct() { return pct; }
    public void setPct(Integer pct) { this.pct = pct; }
    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }
}