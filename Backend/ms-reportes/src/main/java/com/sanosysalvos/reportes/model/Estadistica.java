package com.sanosysalvos.reportes.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Estadistica {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String zona; // Ej: "Sector Alerce"
    private Integer cantidadPerdidos;
    private Integer cantidadEncontrados;
    private Double tasaExitoRecuperacion;
}