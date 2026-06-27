const BASE_URL = "http://localhost:8080";

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

    if (response.status === 200 || response.status === 201) {
        return await response.json();
    }

    if (response.status === 204) return null;
    return response;
};