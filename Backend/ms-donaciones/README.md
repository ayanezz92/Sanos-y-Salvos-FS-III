### 8️⃣ Microservicio de Donaciones
📁 **Ruta:** `Backend/ms-donaciones/README.md`

```markdown
# Microservicio de Donaciones (ms-donaciones)

Módulo encargado del registro de aportes monetarios, campañas de financiamiento para rescates y trazabilidad de recursos.

## 🚀 Tecnologías y Componentes
* **Spring Boot 3.x** y Java 17.
* **Exception Handling:** Captura personalizada de errores transaccionales bancarios o de pasarelas.
* **JPA Auditing:** Registro inmutable de marcas de tiempo de transferencias aceptadas.

## 🛠️ Configuración (Puerto: 8085)
* `server.port=8085`
* `spring.datasource.url=jdbc:postgresql://sanos_y_salvos_postgres:5432/db_usuarios`

## 📦 Endpoints Principales
* `POST /api/donaciones/registrar` -> Registra un aporte financiero de un colaborador.

## 🐳 Despliegue con Docker
```bash
docker-compose up -d --build ms-donaciones