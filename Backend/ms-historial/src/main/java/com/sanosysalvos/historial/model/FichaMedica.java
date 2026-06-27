package com.sanosysalvos.historial.model;

import jakarta.persistence.*;

@Entity
@Table(name = "fichas_medicas")
public class FichaMedica {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String mascota;
    private String diag;
    private String tto;
    private boolean chip;

    public FichaMedica() {}

    public FichaMedica(Long id, String mascota, String diag, String tto, boolean chip) {
        this.id = id;
        this.mascota = mascota;
        this.diag = diag;
        this.tto = tto;
        this.chip = chip;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getMascota() { return mascota; }
    public void setMascota(String mascota) { this.mascota = mascota; }
    public String getDiag() { return diag; }
    public void setDiag(String diag) { this.diag = diag; }
    public String getTto() { return tto; }
    public void setTto(String tto) { this.tto = tto; }
    public boolean isChip() { return chip; }
    public void setChip(boolean chip) { this.chip = chip; }
}