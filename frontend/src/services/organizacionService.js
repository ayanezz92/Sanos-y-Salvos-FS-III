import { apiFetch } from "./api";

export const organizacionService = {
    // Obtener el listado de todas las organizaciones registradas
    obtenerTodas: async () => {
        return await apiFetch("/api/organizacion"); // Ruta alineada con el API Gateway
    },

    // Obtener detalles de una organización específica
    obtenerPorId: async (id) => {
        return await apiFetch(`/api/organizacion/${id}`);
    },

    // Registrar una nueva organización o fundación
    registrar: async (datos) => {
        return await apiFetch("/api/organizacion", {
            method: "POST",
            body: JSON.stringify(datos),
        });
    }
};