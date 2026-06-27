package com.sanosysalvos.organizacion.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Data
public class Campania {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre; // Ej: "Chipeo Masivo Puerto Montt"
    private String descripcion;
    private String tipo; // "VACUNACION", "CHIPEO", "ADOPCION"
    private LocalDate fecha;
    private String idOrganizacion; // Referencia al ID del usuario (Clínica/Muni)
}