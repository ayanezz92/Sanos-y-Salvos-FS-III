### 5️⃣ Microservicio de Historial Clínico
📁 **Ruta:** `Backend/ms-historial/README.md`

```markdown
# Microservicio de Historial Clínico (ms-historial)

Componente crítico encargado del ciclo de vida médico, fichas de atenciones y consultas de salud veterinaria de la plataforma.

## 🚀 Tecnologías y Componentes
* **Spring Boot 3.x** con Java 17.
* **Spring Data JPA:** Operaciones CRUD automatizadas sobre el esquema relacional.
* **PostgreSQL Dialect:** Consultas optimizadas con indexación física.
* **JavaDoc:** Documentación semántica completa en controladores y servicios de negocio.

## 🛠️ Configuración (Puerto: 8086)
* `server.port=8086`
* `spring.datasource.url=jdbc:postgresql://sanos_y_salvos_postgres:5432/db_usuarios`

## 📦 Endpoints Principales
* `GET /api/historial` -> Recupera el listado completo de fichas médicas asociadas.

## 🐳 Despliegue con Docker
```bash
docker-compose up -d --build ms-historial