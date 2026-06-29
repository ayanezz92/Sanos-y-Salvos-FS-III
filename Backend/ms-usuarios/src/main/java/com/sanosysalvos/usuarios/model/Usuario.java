package com.sanosysalvos.usuarios.model;

import jakarta.persistence.*;

@Entity
@Table(name = "usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    @Column(unique = true, nullable = false)
    private String email;

    // 🚨 CORREGIDO: Mapea la variable 'contrasena' con la columna real 'password' de DBeaver
    @Column(name = "password", nullable = false)
    private String contrasena;

    private String rol; // "ADMIN", "VETERINARIO", "OPERADOR"

    // 🚨 CORREGIDO: @Transient le dice a Hibernate que ignore este campo al guardar en la BD,
    // ya que la columna 'sucursal' no existe en tu tabla de DBeaver actualmente.
    @Transient
    private String sucursal;

    // Constructor Vacío
    public Usuario() {}

    public Usuario(Long id, String nombre, String email, String contrasena, String rol, String sucursal) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.contrasena = contrasena;
        this.rol = rol;
        this.sucursal = sucursal;
    }

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getContrasena() { return contrasena; }
    public void setContrasena(String contrasena) { this.contrasena = contrasena; }
    public String getRol() { return rol; }
    public void setRol(String rol) { this.rol = rol; }
    public String getSucursal() { return sucursal; }
    public void setSucursal(String sucursal) { this.sucursal = sucursal; }
}