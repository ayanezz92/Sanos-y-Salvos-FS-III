### 6️⃣ Microservicio de Geolocalización
📁 **Ruta:** `Backend/ms-geolocalizacion/README.md`

```markdown
# Microservicio de Geolocalización (ms-geolocalizacion)

Módulo encargado de procesar las coordenadas geográficas, mapas de calor de alertas y rastreo de ubicaciones de mascotas reportadas.

## 🚀 Tecnologías y Componentes
* **Spring Boot 3.x** y Java 17.
* **Redis Cache Integration:** Optimización de lecturas geográficas recurrentes mediante el contenedor de caché para disminuir la carga del motor principal.
* **Anotaciones `@Cacheable`:** Almacenamiento temporal de puntos de interés con TTL configurado.

## 🛠️ Configuración (Puerto: 8084)
* `server.port=8084`
* `spring.data.redis.host=sanos_y_salvos_redis`

## 📦 Endpoints Principales
* `GET /api/geolocalizacion/puntos` -> Retorna coordenadas cacheadas de reportes activos en el mapa.

## 🐳 Despliegue con Docker
```bash
docker-compose up -d --build ms-geolocalizacion