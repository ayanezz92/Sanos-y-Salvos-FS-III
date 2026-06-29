#!/bin/bash
set -e

# 1. Crear las bases de datos maestras
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE DATABASE db_usuarios;
    CREATE DATABASE db_mascotas;
    CREATE DATABASE db_adopciones;
    CREATE DATABASE db_donaciones;
    CREATE DATABASE db_historial;
EOSQL

# 2. Estructura y Poblado: db_mascotas
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "db_mascotas" <<-EOSQL
    CREATE TABLE IF NOT EXISTS mascotas (
        id BIGINT PRIMARY KEY,
        nombre VARCHAR(100),
        especie VARCHAR(50),
        estado VARCHAR(50),
        zona VARCHAR(100)
    );
    CREATE TABLE IF NOT EXISTS mascota (LIKE mascotas INCLUDING ALL);

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
EOSQL

# 3. Estructura y Poblado: db_adopciones
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "db_adopciones" <<-EOSQL
    CREATE TABLE IF NOT EXISTS adopciones (
        id BIGINT PRIMARY KEY,
        mascota_id BIGINT,
        adoptante VARCHAR(150),
        estado VARCHAR(50),
        fecha VARCHAR(50)
    );
    CREATE TABLE IF NOT EXISTS adopcion (LIKE adopciones INCLUDING ALL);

    INSERT INTO adopciones (id, mascota_id, adoptante, estado, fecha) VALUES
        (12, 483, 'Familia Soto', 'Aprobada', '2026-04-19'),
        (13, 482, 'M. Reyes', 'En proceso', '2026-04-20'),
        (14, 485, 'C. Vega', 'En proceso', '2026-04-21'),
        (15, 484, 'Familia Pérez', 'Rechazada', '2026-04-18')
    ON CONFLICT (id) DO NOTHING;

    INSERT INTO adopcion SELECT * FROM adopciones ON CONFLICT (id) DO NOTHING;
EOSQL

# 4. Estructura inicial: db_usuarios
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "db_usuarios" <<-EOSQL
    CREATE TABLE IF NOT EXISTS usuarios (
        id BIGINT PRIMARY KEY,
        nombre VARCHAR(100),
        email VARCHAR(100),
        password VARCHAR(100),
        rol VARCHAR(50)
    );
EOSQL

echo "¡Todas las bases de datos de Sanos y Salvos se han inicializado y poblado de forma segura!"