import React, { useState, useEffect } from "react";
import { coincidenciasService } from "../services/coincidenciasService";
import { toast } from "sonner";

const Coincidencias = () => {
    const [coincidencias, setCoincidencias] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                setCargando(true);
                const data = await coincidenciasService.obtenerTodas();
                setCoincidencias(data || []);
                setError(null);
            } catch (err) {
                setError("No se pudo conectar con el servicio de coincidencias.");
                toast.error("Error al cargar datos del microservicio");
            } finally {
                setCargando(false);
            }
        };

        cargarDatos();
    }, []);

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                    Panel de Coincidencias
                </h1>
                <p className="mt-2 text-sm text-gray-600">
                    Validación y cruce de datos en tiempo real desde el tercer microservicio.
                </p>
            </header>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                {cargando && (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        <span className="ml-3 text-gray-600 font-medium">Conectando al backend...</span>
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg" role="alert">
                        <strong className="font-bold">Error del Sistema: </strong>
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                {!cargando && !error && coincidencias.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No hay coincidencias registradas en este momento.</p>
                    </div>
                )}

                {!cargando && !error && coincidencias.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {coincidencias.map((item) => (
                            <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
                                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-semibold uppercase px-2 py-1 bg-blue-50 text-blue-700 rounded">
                    ID: #{item.id}
                  </span>
                                    <span className="text-xs text-gray-400">{item.fecha || "Reciente"}</span>
                                </div>
                                <h3 className="text-gray-800 font-semibold mb-1">{item.titulo || "Registro de Coincidencia"}</h3>
                                <p className="text-gray-600 text-sm mb-4">{item.descripcion || "Sin detalles adicionales proporcionados por el microservicio."}</p>
                                <div className="border-t border-gray-100 pt-3 flex justify-end">
                                    <button className="text-xs font-semibold text-blue-600 hover:text-blue-800">
                                        Analizar compatibilidad &rarr;
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Coincidencias;