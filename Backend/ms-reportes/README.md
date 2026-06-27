### 4️⃣ Microservicio de Reportes de Mascotas
📁 **Ruta:** `Backend/ms-reportes/README.md`

```markdown
# Microservicio de Reportes de Emergencias (ms-reportes)

Este servicio gestiona el formulario interactivo de reportes, permitiendo procesar información en texto y archivos binarios cargados por los usuarios.

## 🚀 Tecnologías y Componentes
* **Spring Boot 3.x** y Java 17.
* **Manejo Multipart (FormData):** Soporte nativo para recibir flujos binarios de imágenes (`MultipartFile`) desde el explorador del cliente.
* **Spring Data JPA:** Almacenamiento estructural de casos clínicos de avistamiento, pérdidas y hallazgos.
* **Manejo Global de Excepciones:** Respuestas estandarizadas ante fallas de desbordamiento de archivos o formatos incorrectos.

## 🛠️ Configuración (Puerto: 8085 / Ruteado)
* `spring.servlet.multipart.max-file-size=5MB`
* `spring.servlet.multipart.max-request-size=5MB`

## 📦 Endpoints Principales
* `POST /api/reportes` -> Consume payloads `multipart/form-data` para registrar reportes con imágenes físicas.

## 🐳 Despliegue con Docker
```bash
docker-compose up -d --build ms-reportes