-- =====================================================================
-- SCRIPT CENTRAL DE INICIALIZACIÓN MULTI-BASE DE DATOS
-- =====================================================================

-- 1. Creación de bases de datos independientes (Tu estructura original)
CREATE DATABASE db_usuarios;
CREATE DATABASE db_mascotas;
CREATE DATABASE db_adopciones;
CREATE DATABASE db_donaciones;
CREATE DATABASE db_historial;

-- =====================================================================
-- 2. POBLADO INDEPENDIENTE POR ENTORNO AISLADO
-- =====================================================================

-- ---------------------------------------------------------------------
-- 💾 BASE DE DATOS: db_mascotas
-- ---------------------------------------------------------------------
\c db_mascotas

CREATE TABLE IF NOT EXISTS mascotas (
                                        id BIGINT PRIMARY KEY,
                                        nombre VARCHAR(100),
    especie VARCHAR(50),
    estado VARCHAR(50),
    zona VARCHAR(100)
    );
-- Clon preventivo en singular para blindar el mapeo automático de Hibernate
CREATE TABLE IF NOT EXISTS mascota (LIKE mascotas INCLUDING ALL);

-- Inserción de catálogo + datos del dashboard admin
INSERT INTO mascotas (id, nombre, especie, estado, zona) VALUES
                                                             (1, 'Luka', 'Perro', 'Disponible', 'Puerto Montt'),
                                                             (2, 'Lia', 'Gato', 'En refugio', 'Pta Sur'),
                                                             (3, 'Kitty', 'Gato', 'Disponible', 'Alerce'),
                                                             (4, 'Kira', 'Perro', 'Disponible', 'Pelluco'),
                                                             (5, 'Bobby', 'Perro', 'En refugio', 'Mirasol'),
                                                             (6, 'Dominique', 'Gato', 'Disponible', 'Mirasol'),
                                                             (7, 'Bob', 'Perro', 'Urgente', 'Mirasol'),
                                                             (8, 'Kira_A', 'Perro', 'En refugio', 'Mirasol'),
                                                             (9, 'Dominga', 'Perro', 'Urgente', 'Mirasol'),
                                                             (482, 'Toby', 'Perro', 'En refugio', 'Pelluco'),
                                                             (483, 'Luna', 'Gato', 'Adoptada', 'Centro'),
                                                             (484, 'Copito', 'Perro', 'Disponible', 'Alerce'),
                                                             (485, 'Mango', 'Gato', 'En refugio', 'Mirasol'),
                                                             (486, 'Rocco', 'Perro', 'Urgente', 'Costanera')
    ON CONFLICT (id) DO NOTHING;

INSERT INTO mascota SELECT * FROM mascotas ON CONFLICT (id) DO NOTHING;

-- ---------------------------------------------------------------------
-- 💾 BASE DE DATOS: db_adopciones
-- ---------------------------------------------------------------------
\c db_adopciones

CREATE TABLE IF NOT EXISTS adopciones (
                                          id BIGINT PRIMARY KEY,
                                          mascota_id BIGINT,
                                          adoptante VARCHAR(150),
    estado VARCHAR(50),
    fecha VARCHAR(50)
    );
CREATE TABLE IF NOT EXISTS adopcion (LIKE adopciones INCLUDING ALL);

-- Inserción de tickets de solicitudes del panel staff
INSERT INTO adopciones (id, mascota_id, adoptante, estado, fecha) VALUES
                                                                      (12, 483, 'Familia Soto', 'Aprobada', '2026-04-19'),
                                                                      (13, 482, 'M. Reyes', 'En proceso', '2026-04-20'),
                                                                      (14, 485, 'C. Vega', 'En proceso', '2026-04-21'),
                                                                      (15, 484, 'Familia Pérez', 'Rechazada', '2026-04-18')
    ON CONFLICT (id) DO NOTHING;

INSERT INTO adopcion SELECT * FROM adopciones ON CONFLICT (id) DO NOTHING;

-- ---------------------------------------------------------------------
-- 💾 BASE DE DATOS: db_usuarios
-- ---------------------------------------------------------------------
\c db_usuarios

CREATE TABLE IF NOT EXISTS usuarios (
                                        id BIGINT PRIMARY KEY,
                                        nombre VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(100),
    rol VARCHAR(50)
    );

-- Mensaje final de verificación en los logs del contenedor
\echo '¡Todas las bases de datos y tablas de Sanos y Salvos se han inicializado y poblado correctamente!';