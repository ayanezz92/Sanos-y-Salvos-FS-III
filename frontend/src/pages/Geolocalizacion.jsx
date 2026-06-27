import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, AlertCircle, CheckCircle, Clock, Filter, Loader2, RefreshCw, Map as MapIcon } from "lucide-react";
import { toast } from "sonner";

// Cambiado al proxy dinámico por descubrimiento de tu Gateway WebMVC
const GATEWAY_URL = "http://localhost:8080";

// Diccionario estricto de cuadrantes para traducir zonas de Puerto Montt a coordenadas relativas en el mapa
const COORDENADAS_ANCLA = {
    "PUERTO MONTT": { top: "50%", left: "50%" },
    "CENTRO": { top: "45%", left: "48%" },
    "PELLUCO": { top: "55%", left: "65%" },
    "ALERCE": { top: "25%", left: "52%" },
    "MIRASOL": { top: "48%", left: "32%" },
    "PTA SUR": { top: "68%", left: "42%" },
    "COSTANERA": { top: "58%", left: "55%" }
};

export default function Geolocalizacion() {
    // ====== ESTADOS DE INTERFAZ Y BÚSQUEDA ======
    const [filtroEstado, setFiltroEstado] = useState("Todos");
    const [busqueda, setBusqueda] = useState("");

    // ====== ESTADOS DE CONTROL DE FLUJO ASÍNCRONO ======
    const [reportes, setReportes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorConexion, setErrorConexion] = useState(false);

    // 📡 CONSUMO ASÍNCRONO AUTOMÁTICO RECTIFICADO
    const obtenerPuntosGeográficos = useCallback(async () => {
        setLoading(true);
        setErrorConexion(false);
        try {
            // Se duplica el segmento del Service ID para absorber el recorte del Locator
            const response = await fetch(`${GATEWAY_URL}/ms-geolocalizacion/api/geolocalizacion/puntos`, {
                method: "GET",
                headers: { "Accept": "application/json" }
            });

            if (!response.ok) throw new Error("Respuesta inválida del Gateway");

            const datosContrato = await response.json();
            setReportes(datosContrato);
        } catch (error) {
            console.error("Falla en la resolución de coordenadas:", error);
            setErrorConexion(true);
            toast.error("Error de sincronización: ms-geolocalizacion inaccesible.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        obtenerPuntosGeográficos();
    }, [obtenerPuntosGeográficos]);

    // ====== PIPELINE DE FILTRADO EN TIEMPO REAL ======
    const reportesProcesados = reportes.filter((r) => {
        const matchesEstado = filtroEstado === "Todos" || r.estado?.toLowerCase() === filtroEstado.toLowerCase();
        const matchesQuery =
            r.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
            r.zona?.toLowerCase().includes(busqueda.toLowerCase()) ||
            r.id?.toString().includes(busqueda);
        return matchesEstado && matchesQuery;
    });

    // Renderizado condicional de carga estructural
    if (loading) {
        return (
            <div className="min-h-screen bg-[#FFFDF9] flex flex-col items-center justify-center gap-3">
                <Loader2 className="h-10 w-10 text-[#1A365D] animate-spin" />
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Consultando coordenadas en Redis Cache...</p>
            </div>
        );
    }

    // Renderizado condicional ante caída del clúster de base de datos
    if (errorConexion) {
        return (
            <div className="min-h-screen bg-[#FFFDF9] flex flex-col items-center justify-center gap-4 p-6 text-center">
                <div className="h-12 w-12 rounded-2xl bg-rose-50 text-rose-600 grid place-items-center"><AlertCircle className="w-6 h-6"/></div>
                <h3 className="font-serif text-xl font-bold text-slate-800">Capa de Mapas Fuera de Línea</h3>
                <p className="text-xs text-slate-400 max-w-sm leading-relaxed">No se pudieron recuperar las coordenadas del clúster espacial. Verifica que el contenedor Redis y ms-geolocalizacion estén inicializados.</p>
                <button onClick={obtenerPuntosGeográficos} className="bg-[#1A365D] hover:bg-[#102444] text-white font-bold text-xs px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-sm">
                    <RefreshCw className="w-3.5 h-3.5" /> Reintentar Enrutamiento
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FFFDF9] font-sans antialiased text-slate-800 p-8 md:p-12">

            {/* ENCABEZADO DE CONTROL DE CUADRANTE */}
            <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <p className="text-[10px] font-black tracking-wider text-[#256944] uppercase bg-[#EAF5ED] px-3 py-1 rounded-full w-fit">
                        Resultados en el cuadrante
                    </p>
                    <h1 className="font-serif text-3xl font-bold tracking-tight text-slate-900 mt-2">
                        {reportesProcesados.length} {reportesProcesados.length === 1 ? "reporte activo" : "reportes activos"}
                    </h1>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#256944] bg-[#EAF5ED] px-4 py-2 rounded-full shadow-2xs">
                    <span className="h-2 w-2 rounded-full bg-[#22C55E] animate-pulse" /> Sincronizado en vivo
                </div>
            </header>

            {/* SECCIÓN INTERACTIVA DE DISTRIBUCIÓN */}
            <div className="grid lg:grid-cols-4 gap-8 items-start">

                {/* 1. MÓDULO LATERAL DE CONFIGURACIÓN DE FILTROS */}
                <div className="space-y-4">
                    <div className="bg-white border border-slate-100 p-6 rounded-[2rem] shadow-sm space-y-4">
                        <div className="flex items-center gap-2 border-b border-slate-50 pb-3">
                            <Filter className="w-4 h-4 text-slate-400" />
                            <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">Filtrar reportes</h3>
                        </div>

                        {/* Barra de búsqueda por texto indexada */}
                        <div className="relative">
                            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Buscar por zona, ID..."
                                value={busqueda}
                                onChange={(e) => setBusqueda(e.target.value)}
                                className="w-full pl-9 pr-4 py-2.5 bg-[#FFFDF9] border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#1A365D]"
                            />
                        </div>

                        {/* selectores dinámicos por estado relacional */}
                        <div className="flex flex-col gap-1.5 pt-2">
                            {[
                                { id: "Todos", label: "Todos los reportes", color: "bg-slate-300" },
                                { id: "Urgente", label: "Urgente", color: "bg-rose-500" },
                                { id: "Perdida", label: "Perdida", color: "bg-amber-500" },
                                { id: "Encontrada", label: "Encontrada", color: "bg-emerald-500" }
                            ].map((btn) => (
                                <button
                                    key={btn.id}
                                    type="button"
                                    onClick={() => setFiltroEstado(btn.id)}
                                    className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold transition-all ${
                                        filtroEstado === btn.id
                                            ? "bg-[#1A365D] text-white shadow-md shadow-blue-900/10"
                                            : "bg-[#FFFDF9] hover:bg-slate-50 border border-slate-100"
                                    }`}
                                >
                                    <div className="flex items-center gap-2.5">
                                        {btn.id !== "Todos" && <span className={`h-2 w-2 rounded-full ${btn.color}`} />}
                                        <span>{btn.label}</span>
                                    </div>
                                    <span className="opacity-60 text-[10px]">
                                        {btn.id === "Todos" ? reportes.length : reportes.filter(r => r.estado?.toLowerCase() === btn.id.toLowerCase()).length}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Banner de redirección a inserciones */}
                    <div className="bg-gradient-to-br from-[#1A365D] to-[#102444] p-6 rounded-[2rem] shadow-xl text-white space-y-3">
                        <p className="text-sm font-serif font-bold leading-snug">¿Viste o perdiste una mascota?</p>
                        <p className="text-[10px] text-slate-300 leading-relaxed font-medium">Crea un reporte desde el módulo principal y aparecerá geolocalizado en el mapa para el rastreo comunitario.</p>
                        <Link to="/reportar" className="block w-full text-center bg-[#F5A524] hover:bg-[#E69512] text-slate-900 font-bold text-xs py-2.5 rounded-xl transition-all shadow-sm">
                            Crear reporte
                        </Link>
                    </div>
                </div>

                {/* 2. RENDERIZADOR CARTOGRÁFICO URBANO (LEAFLET CSS CONTEXT) */}
                <div className="lg:col-span-3 bg-white border border-slate-100 rounded-[2.5rem] p-4 shadow-sm h-[420px] relative overflow-hidden flex flex-col justify-between">
                    <div className="absolute inset-0 bg-[#EAF5ED] opacity-40 pattern-grid-lg" />

                    {/* Controles cartográficos embebidos */}
                    <div className="absolute top-4 left-4 z-10 flex flex-col border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm text-sm font-bold text-slate-600">
                        <button type="button" className="h-8 w-8 hover:bg-slate-50 border-b border-slate-100 flex items-center justify-center">+</button>
                        <button type="button" className="h-8 w-8 hover:bg-slate-50 flex items-center justify-center">-</button>
                    </div>

                    <div className="w-full h-full flex items-center justify-center relative">
                        {/* Líneas de red asistencial vial */}
                        <div className="absolute w-4/5 h-0.5 bg-slate-300/30 transform rotate-12" />
                        <div className="absolute h-4/5 w-0.5 bg-slate-300/30 transform -rotate-45" />

                        <div className="text-center z-10 space-y-1 pointer-events-none">
                            <span className="text-3xl">🗺️</span>
                            <p className="text-sm font-serif font-black text-slate-800 tracking-tight">Núcleo Urbano Puerto Montt</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Leaflet · OpenStreetMap Layer</p>
                        </div>

                        {/* PROCESAMIENTO DINÁMICO DE MARCADORES (PIPELINE POSTGRESQL) */}
                        {reportesProcesados.map((pin) => {
                            const zonaNormalizada = pin.zona?.toUpperCase().trim() || "PUERTO MONTT";
                            // Rescate de coordenadas relativas o anclaje seguro en el centro ante zonas no listadas
                            const posicion = COORDENADAS_ANCLA[zonaNormalizada] || COORDENADAS_ANCLA["PUERTO MONTT"];

                            const esUrgente = pin.estado?.toLowerCase() === "urgente";
                            const esPerdido = pin.estado?.toLowerCase() === "perdida";
                            const marcadorColor = esUrgente ? "bg-rose-500" : esPerdido ? "bg-amber-500" : "bg-emerald-500";

                            return (
                                <div
                                    key={pin.id}
                                    className="absolute transition-all duration-500 animate-in fade-in zoom-in-50"
                                    style={{ top: posicion.top, left: posicion.left }}
                                >
                                    <div className={`h-8 w-8 rounded-full ${marcadorColor} text-white flex items-center justify-center shadow-lg border-2 border-white font-bold text-xs relative group cursor-pointer`}>
                                        📍
                                        <div className="absolute bottom-9 left-1/2 -translate-x-1/2 bg-[#1A365D] text-white text-[9px] font-bold px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md z-30">
                                            {pin.nombre} ({pin.zona})
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* 3. GRÍLLA INFERIOR DINÁMICA: DETALLE DE REPORTES RECIENTES */}
            <section className="mt-12 space-y-6">
                <h2 className="font-serif text-xl font-bold text-slate-800 tracking-tight">Reportes recientes en la zona</h2>

                {reportesProcesados.length === 0 ? (
                    <div className="w-full text-center py-12 bg-white border border-dashed rounded-3xl text-slate-400 text-xs font-bold uppercase tracking-wider">
                        No se registran incidentes espaciales con los filtros seleccionados.
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {reportesProcesados.map((item) => {
                            const esUrgente = item.estado?.toLowerCase() === "urgente";
                            const esPerdido = item.estado?.toLowerCase() === "perdida";
                            const badgeEstilo = esUrgente ? "bg-rose-50 text-rose-600" : esPerdido ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600";
                            const IconoAlerta = esUrgente ? AlertCircle : esPerdido ? Clock : CheckCircle;

                            return (
                                <article key={item.id} className="bg-white border border-slate-100 rounded-3xl p-6 shadow-2xs hover:shadow-sm hover:-translate-y-0.5 transition-all space-y-3">
                                    <div className="flex justify-between items-start">
                                        <div className="space-y-0.5">
                                            <span className="text-[9px] font-mono font-bold text-slate-400">ID: #R-{item.id}</span>
                                            <h3 className="font-serif text-lg font-bold text-slate-800 tracking-tight">{item.nombre}</h3>
                                        </div>
                                        <div className={`h-8 w-8 rounded-xl ${badgeEstilo} grid place-items-center shrink-0`}>
                                            <IconoAlerta className="w-4 h-4" />
                                        </div>
                                    </div>

                                    <p className="text-[10px] font-bold text-[#256944] uppercase tracking-wider">
                                        {item.especie || "ANIMAL"} — {item.zona || "Ubicación general"}
                                    </p>
                                    <p className="text-xs text-slate-500 leading-relaxed font-medium">
                                        {item.descripcion || `Alerta activa de categoría ${item.estado} en el cuadrante urbano de ${item.zona}. Pronta asistencia solicitada.`}
                                    </p>

                                    <div className="border-t border-slate-50 pt-3 flex items-center gap-1.5 text-[10px] text-slate-400 font-semibold">
                                        <Clock className="w-3 h-3 text-slate-300" /> {item.fecha || "Sincronizado recientemente"}
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}
            </section>
        </div>
    );
}