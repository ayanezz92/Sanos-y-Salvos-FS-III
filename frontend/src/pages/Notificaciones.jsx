import React, { useState, useEffect } from "react";
import { notificacionesService } from "../services/notificacionesService";
import { toast } from "sonner";

const Notificaciones = () => {
    const [notificaciones, setNotificaciones] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    // Cargar notificaciones al montar el componente
    useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatos = async () => {
        try {
            setCargando(true);
            const data = await notificacionesService.obtenerTodas();
            setNotificaciones(data || []);
            setError(null);
        } catch (err) {
            setError("No se pudo conectar con el servicio de notificaciones.");
            toast.error("Error al cargar las alertas");
        } finally {
            setCargando(false);
        }
    };

    const handleMarcarLeida = async (id) => {
        try {
            await notificacionesService.marcarComoLeida(id);

            // Actualizar el estado local para que desaparezca el indicador visual
            setNotificaciones((prev) =>
                prev.map((notif) =>
                    notif.id === id ? { ...notif, leida: true } : notif
                )
            );
            toast.success("Notificación marcada como leída");
        } catch (err) {
            toast.error("No se pudo actualizar el estado de la notificación");
        }
    };

    // Calcular conteo de no leídas
    const noLeidas = notificaciones.filter(n => !n.leida).length;

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <header className="mb-8 flex justify-between items-end border-b border-gray-200 pb-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight flex items-center gap-3">
                        Centro de Notificaciones
                        {noLeidas > 0 && (
                            <span className="bg-red-100 text-red-700 text-sm font-bold px-3 py-1 rounded-full">
                {noLeidas} nuevas
              </span>
                        )}
                    </h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Alertas del sistema, mensajes y actualizaciones importantes.
                    </p>
                </div>

                <button
                    onClick={cargarDatos}
                    className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                    Actualizar
                </button>
            </header>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {cargando && (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                )}

                {error && (
                    <div className="m-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                {!cargando && !error && notificaciones.length === 0 && (
                    <div className="text-center py-16">
                        <svg className="mx-auto h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        <p className="mt-4 text-gray-500 font-medium">No tienes notificaciones en este momento.</p>
                    </div>
                )}

                {!cargando && !error && notificaciones.length > 0 && (
                    <div className="divide-y divide-gray-100">
                        {notificaciones.map((notif) => (
                            <div
                                key={notif.id}
                                className={`p-5 flex gap-4 transition-colors ${notif.leida ? 'bg-white' : 'bg-blue-50/50 hover:bg-blue-50'}`}
                            >
                                {/* Icono indicador */}
                                <div className="flex-shrink-0 mt-1">
                                    {notif.leida ? (
                                        <div className="w-2 h-2 rounded-full bg-gray-300 mt-2"></div>
                                    ) : (
                                        <div className="w-3 h-3 rounded-full bg-blue-600 mt-1.5 animate-pulse"></div>
                                    )}
                                </div>

                                {/* Contenido de la notificación */}
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className={`text-sm font-semibold ${notif.leida ? 'text-gray-700' : 'text-gray-900'}`}>
                                            {notif.titulo || "Nueva Alerta del Sistema"}
                                        </h3>
                                        <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                      {notif.fecha || "Hace un momento"}
                    </span>
                                    </div>
                                    <p className={`text-sm ${notif.leida ? 'text-gray-500' : 'text-gray-700'}`}>
                                        {notif.mensaje || "Contenido de la notificación no disponible."}
                                    </p>
                                </div>

                                {/* Botón de acción */}
                                {!notif.leida && (
                                    <div className="flex-shrink-0 flex items-center">
                                        <button
                                            onClick={() => handleMarcarLeida(notif.id)}
                                            className="text-xs font-medium text-blue-600 hover:text-blue-800 bg-white border border-blue-200 px-3 py-1.5 rounded-lg shadow-sm hover:shadow transition-all"
                                        >
                                            Marcar leída
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Notificaciones;