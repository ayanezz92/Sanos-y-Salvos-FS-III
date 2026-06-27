import { apiFetch } from "./api";

export const coincidenciasService = {
    // Obtener todas las coincidencias desde el API Gateway
    obtenerTodas: async () => {
        return await apiFetch("/api/coincidencias"); // Asegúrate de que coincida con la ruta mapeada en el Gateway
    },

    // Obtener una coincidencia específica por ID
    obtenerPorId: async (id) => {
        return await apiFetch(`/api/coincidencias/${id}`);
    },

    // Crear o registrar una nueva coincidencia / reporte
    crear: async (datos) => {
        return await apiFetch("/api/coincidencias", {
            method: "POST",
            body: JSON.stringify(datos),
        });
    }
};