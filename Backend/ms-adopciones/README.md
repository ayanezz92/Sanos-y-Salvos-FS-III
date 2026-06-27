### 7️⃣ Microservicio de Adopciones
📁 **Ruta:** `Backend/ms-adopciones/README.md`

```markdown
# Microservicio de Adopciones (ms-adopciones)

Gestiona de manera integral el catálogo de mascotas disponibles, postulaciones de adoptantes y flujos de evaluación de hogares temporales.

## 🚀 Tecnologías y Componentes
* **Spring Boot 3.x** con Java 17.
* **Hibernate Validator:** Reglas de validación en las solicitudes de adopción.
* **PostgreSQL:** Persistencia del estado y transiciones del flujo de adopción.

## 🛠️ Configuración (Puerto: 8082)
* `server.port=8082`
* `spring.datasource.url=jdbc:postgresql://sanos_y_salvos_postgres:5432/db_usuarios`

## 📦 Endpoints Principales
* `GET /api/adopciones` -> Obtiene las mascotas aptas para procesos de adopción.

## 🐳 Despliegue con Docker
```bash
docker-compose up -d --build ms-adopciones