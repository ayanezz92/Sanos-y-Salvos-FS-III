### 2️⃣ Microservicio de Usuarios y Autenticación
📁 **Ruta:** `Backend/ms-usuarios/README.md`

```markdown
# Microservicio de Usuarios y Autenticación (ms-usuarios)

Módulo encargado de la gestión de credenciales, persistencia de cuentas y emisión de tokens seguros dentro del sistema relacional.

## 🚀 Tecnologías y Componentes
* **Spring Boot 3.x** con Java 17.
* **Spring Security** para la protección de endpoints críticos.
* **JWT (JSON Web Tokens)** firmado digitalmente con clave criptográfica y fecha de expiración.
* **PostgreSQL:** Consumo nativo mediante Spring Data JPA e invocación optimizada de funciones PL/pgSQL.
* **RabbitMQ (Productor):** Despacha eventos asíncronos a la cola `notificaciones.login` tras autenticaciones exitosas.

## 🛠️ Configuración (Puerto: 8081)
* `server.port=8081`
* `spring.rabbitmq.host=sanos_y_salvos_rabbitmq`

## 📦 Endpoints Principales
* `POST /usuarios/login` -> Valida credenciales contra la base de datos y retorna el token JWT.

## 🐳 Despliegue con Docker
```bash
docker-compose up -d --build ms-usuarios