### 9️⃣ Microservicio de Coincidencias
📁 **Ruta:** `Backend/ms-coincidencias/README.md`

```markdown
# Microservicio de Coincidencias (ms-coincidencias)

Motor algorítmico distribuido que compara cruces de datos entre mascotas perdidas y avistadas para alertar automáticamente emparejamientos exitosos.

## 🚀 Tecnologías y Componentes
* **Spring Boot 3.x** con Java 17.
* **Lógica Algorítmica en Capa Service:** Comparación cruzada de variables relacionales (color, especie, tamaño y cercanía geográfica).
* **Feign Clients:** Comunicación síncrona ágil con otros microservicios para consolidar datos.

## 🛠️ Configuración (Puerto: 8083)
* `server.port=8083`
* `spring.datasource.url=jdbc:postgresql://sanos_y_salvos_postgres:5432/db_usuarios`

## 📦 Endpoints Principales
* `GET /api/coincidencias/procesar` -> Dispara de forma interna la evaluación de emparejamientos de mascotas.

## 🐳 Despliegue con Docker
```bash
docker-compose up -d --build ms-coincidencias