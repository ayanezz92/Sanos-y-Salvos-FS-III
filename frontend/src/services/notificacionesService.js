import { apiFetch } from "./api";

export const notificacionesService = {
    // Obtener todas las notificaciones (idealmente filtradas por usuario en el backend)
    obtenerTodas: async () => {
        return await apiFetch("/api/notificaciones");
    },

    // Marcar una notificación específica como leída
    marcarComoLeida: async (id) => {
        return await apiFetch(`/api/notificaciones/${id}/leer`, {
            method: "PUT", // o PATCH, dependiendo de cómo lo definas en Spring Boot
        });
    },

    // Crear/Enviar una nueva notificación (útil para pruebas o panel de administrador)
    enviarNotificacion: async (datos) => {
        return await apiFetch("/api/notificaciones", {
            method: "POST",
            body: JSON.stringify(datos),
        });
    }
};