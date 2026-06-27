import { apiFetch } from "./api";

export const geolocalizacionService = {
    // Obtener todos los puntos de ubicación registrados (ej. mascotas perdidas/encontradas)
    obtenerUbicaciones: async () => {
        return await apiFetch("/api/geo"); // Ruta alineada con el API Gateway
    },

    // Guardar una nueva ubicación con coordenadas específicas
    guardarUbicacion: async (datosUbicacion) => {
        return await apiFetch("/api/geo", {
            method: "POST",
            body: JSON.stringify(datosUbicacion),
        });
    },

    // Obtener el historial de rutas o ubicaciones de un ID específico
    obtenerPorId: async (id) => {
        return await apiFetch(`/api/geo/${id}`);
    }
};