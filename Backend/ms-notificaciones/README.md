
### 3️⃣ Microservicio de Notificaciones y Auditoría
📁 **Ruta:** `Backend/ms-notificaciones/README.md`

```markdown
# Microservicio de Notificaciones y Alertas (ms-notificaciones)

Componente reactivo encargado de procesar la auditoría del sistema y disparar las alertas asíncronas de la plataforma.

## 🚀 Tecnologías y Componentes
* **Spring Boot 3.x** y Java 17.
* **RabbitMQ (Consumidor):** Escucha la cola `notificaciones.login` procesando mensajes en segundo plano.
* **Springdoc OpenAPI / Swagger:** Documentación viva interactiva del microservicio.
* **Lombok:** Optimización de la capa modelo (`@Data`).
* **PostgreSQL:** Persistencia relacional de registros de auditoría.

## 🛠️ Configuración (Puerto: 8087)
* `server.port=8087`
* `spring.datasource.url=jdbc:postgresql://sanos_y_salvos_postgres:5432/db_usuarios`

## 📦 Endpoints Principales
* `GET /swagger-ui/index.html` -> Interfaz gráfica de documentación.
* `GET /v3/api-docs` -> Estructura de metadatos OpenAPI en JSON.

## 🐳 Despliegue con Docker
```bash
docker-compose up -d --build ms-notificaciones