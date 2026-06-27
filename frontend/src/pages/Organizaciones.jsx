import React, { useState, useEffect } from "react";
import { organizacionService } from "../services/organizacionService";
import { toast } from "sonner";

const Organizaciones = () => {
    const [organizaciones, setOrganizaciones] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    // Estado para el formulario de registro
    const [nuevaOrg, setNuevaOrg] = useState({
        nombre: "",
        tipo: "Refugio",
        direccion: "",
        contacto: "",
        email: ""
    });

    useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatos = async () => {
        try {
            setCargando(true);
            const data = await organizacionService.obtenerTodas();
            setOrganizaciones(data || []);
            setError(null);
        } catch (err) {
            setError("No se pudo conectar con el servicio de organizaciones.");
            toast.error("Error al cargar el directorio");
        } finally {
            setCargando(false);
        }
    };

    const handleCrearOrganizacion = async (e) => {
        e.preventDefault();
        if (!nuevaOrg.nombre || !nuevaOrg.contacto) {
            toast.warning("El nombre y el contacto son obligatorios");
            return;
        }

        try {
            const resultado = await organizacionService.registrar(nuevaOrg);
            toast.success("Organización registrada exitosamente");

            // Actualizar la lista localmente
            if (resultado) setOrganizaciones((prev) => [resultado, ...prev]);

            // Limpiar el formulario
            setNuevaOrg({ nombre: "", tipo: "Refugio", direccion: "", contacto: "", email: "" });
        } catch (err) {
            toast.error("Error al registrar la organización en el sistema");
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                    Directorio de Organizaciones
                </h1>
                <p className="mt-2 text-sm text-gray-600">
                    Gestión de fundaciones, refugios y clínicas veterinarias asociadas.
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Columna Izquierda: Formulario de Registro */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-fit">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Nueva Organización</h2>
                    <form onSubmit={handleCrearOrganizacion} className="space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-gray-500 uppercase">Nombre</label>
                            <input
                                type="text"
                                value={nuevaOrg.nombre}
                                onChange={(e) => setNuevaOrg({ ...nuevaOrg, nombre: e.target.value })}
                                className="mt-1 w-full border border-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                placeholder="Ej. Fundación Patitas"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-500 uppercase">Tipo</label>
                            <select
                                value={nuevaOrg.tipo}
                                onChange={(e) => setNuevaOrg({ ...nuevaOrg, tipo: e.target.value })}
                                className="mt-1 w-full border border-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none bg-white"
                            >
                                <option value="Refugio">Refugio de Animales</option>
                                <option value="Clinica">Clínica Veterinaria</option>
                                <option value="ONG">ONG / Fundación</option>
                                <option value="Independiente">Rescatista Independiente</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-500 uppercase">Teléfono de Contacto</label>
                            <input
                                type="text"
                                value={nuevaOrg.contacto}
                                onChange={(e) => setNuevaOrg({ ...nuevaOrg, contacto: e.target.value })}
                                className="mt-1 w-full border border-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                placeholder="+56 9 1234 5678"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-500 uppercase">Correo Electrónico</label>
                            <input
                                type="email"
                                value={nuevaOrg.email}
                                onChange={(e) => setNuevaOrg({ ...nuevaOrg, email: e.target.value })}
                                className="mt-1 w-full border border-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                placeholder="contacto@fundacion.cl"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-500 uppercase">Dirección Física</label>
                            <textarea
                                rows="2"
                                value={nuevaOrg.direccion}
                                onChange={(e) => setNuevaOrg({ ...nuevaOrg, direccion: e.target.value })}
                                className="mt-1 w-full border border-gray-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                                placeholder="Ubicación de la sede..."
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
                        >
                            Registrar Entidad
                        </button>
                    </form>
                </div>

                {/* Columna Derecha: Tarjetas del Directorio */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-800">Directorio Activo</h2>
                        <span className="text-xs bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-medium">
              {organizaciones.length} registradas
            </span>
                    </div>

                    {cargando && (
                        <div className="flex justify-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">
                            {error}
                        </div>
                    )}

                    {!cargando && !error && organizaciones.length === 0 && (
                        <div className="text-center py-12 border-2 border-dashed border-gray-100 rounded-xl">
                            <p className="text-gray-400 text-sm">Aún no hay organizaciones registradas.</p>
                        </div>
                    )}

                    {!cargando && !error && organizaciones.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {organizaciones.map((org, index) => (
                                <div key={org.id || index} className="border border-gray-200 rounded-lg p-5 hover:border-purple-300 hover:shadow-md transition-all">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-semibold text-gray-900 truncate pr-2">{org.nombre}</h3>
                                        <span className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-600 rounded">
                      {org.tipo}
                    </span>
                                    </div>

                                    <div className="space-y-2 mt-4">
                                        <div className="flex items-center text-sm text-gray-600">
                                            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                            {org.contacto || "Sin teléfono"}
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                            <span className="truncate">{org.email || "Sin correo"}</span>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <svg className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                            <span className="truncate">{org.direccion || "Dirección no especificada"}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Organizaciones;