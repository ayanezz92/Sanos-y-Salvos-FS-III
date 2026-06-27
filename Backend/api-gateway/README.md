# API Gateway / Backend For Frontend (api-gateway)

Este componente actúa como el punto único de entrada (BFF) para el cliente web en React, encargándose del enrutamiento dinámico, la seguridad perimetral y la unificación del ecosistema distribudo de **Sanos y Salvos**.

## 🚀 Tecnologías y Componentes
* **Spring Boot 3.x** y Java 17.
* **Spring Cloud Gateway** para el enrutamiento inverso y balanceo de carga interno.
* **Filtros globales** para la validación preliminar de cabeceras HTTP.
* Gestión de políticas de **CORS** centralizadas para permitir la comunicación fluida con el Frontend en React.

## 🛠️ Configuración (Puerto: 8080)
El Gateway unifica el acceso y redirige las peticiones internas hacia la red privada de Docker:
* `/usuarios/**` -> Redirige al puerto `8081`
* `/api/reportes/**` -> Redirige al puerto de reportes multimedia.
* `/api/notificaciones/**` -> Redirige al puerto `8087`

## 📦 Endpoints de Acceso Centralizado
* `POST http://localhost:8080/usuarios/login` (Tráfico enrutado)
* `POST http://localhost:8080/api/reportes` (Carga multipart)

## 🐳 Despliegue con Docker
```bash
docker-compose up -d --build api-gateway