// src/services/finanzasService.js
import { apiFetch } from "./api";

export const finanzasService = {
    registrarDonacion: async (donacion) => {
        return apiFetch("/finanzas/donar", {
            method: "POST",
            body: JSON.stringify(donacion),
        });
    },
    obtenerHistorial: async () => {
        return apiFetch("/finanzas/historial", {
            method: "GET",
        });
    },
};