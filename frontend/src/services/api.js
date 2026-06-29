// 🚨 CORREGIDO: Apuntar directo al puerto real de tu microservicio de usuarios
const BASE_URL = "http://localhost:8081";

export const apiFetch = async (endpoint, options = {}) => {
    const url = `${BASE_URL}${endpoint}`;
    const defaultHeaders = { "Content-Type": "application/json" };

    const config = {
        ...options,
        headers: { ...defaultHeaders, ...options.headers },
    };

    const response = await fetch(url, config);

    if (!response.ok) {
        throw new Error(`Error en la petición: ${response.status} ${response.statusText}`);
    }

    // Aceptamos cualquier respuesta exitosa en el rango 200-299
    if (response.status >= 200 && response.status < 300) {
        // Por si acaso el backend responde texto plano o un JSON estructurado
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return await response.json();
        }
        return response;
    }

    return response;
};