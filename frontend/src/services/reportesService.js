import { apiFetch } from "./api";

export const reportesService = {
    // Obtener todos los reportes activos
    obtenerTodos: async () => {
        return await apiFetch("/api/reportes");
    },

    // Obtener un reporte específico
    obtenerPorId: async (id) => {
        return await apiFetch(`/api/reportes/${id}`);
    },

    // Crear un nuevo reporte (extravío, avistamiento, encontrado)
    crear: async (datosReporte) => {
        return await apiFetch("/api/reportes", {
            method: "POST",
            body: JSON.stringify(datosReporte),
        });
    },

    // Actualizar el estado de un reporte (ej. "Resuelto", "Falsa Alarma")
    actualizarEstado: async (id, estado) => {
        return await apiFetch(`/api/reportes/${id}/estado`, {
            method: "PATCH",
            body: JSON.stringify({ estado }),
        });
    }
};