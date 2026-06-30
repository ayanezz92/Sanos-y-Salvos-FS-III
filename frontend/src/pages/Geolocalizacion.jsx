import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard, PawPrint, Heart, MapPin, HandHeart, Bell, Stethoscope,
  Users, Search, ArrowUpRight, CheckCircle2, Clock, AlertCircle, LogOut,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import logo from "@/assets/logo.png";

// IMPORTACIÓN DEL MAPA INTERACTIVO Y SUS TIPOS
import InteractiveReportMap, { type ReportType, type Reporte } from "@/components/reports/InteractiveReportMap";

type Section = "dashboard" | "mascotas" | "adopciones" | "coincidencias" | "geo" | "donaciones" | "historial" | "notif";

const navGroups: { label: string; items: { id: Section; label: string; icon: typeof Heart }[] }[] = [
  {
    label: "General",
    items: [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    ],
  },
  {
    label: "Gestión",
    items: [
      { id: "mascotas", label: "Mascotas", icon: PawPrint },
      { id: "adopciones", label: "Adopciones", icon: Heart },
      { id: "coincidencias", label: "Coincidencias", icon: Search },
    ],
  },
  {
    label: "Operaciones",
    items: [
      { id: "geo", label: "Geolocalización", icon: MapPin },
      { id: "donaciones", label: "Donaciones", icon: HandHeart },
      { id: "historial", label: "Historial médico", icon: Stethoscope },
    ],
  },
  {
    label: "Comunicación",
    items: [
      { id: "notif", label: "Notificaciones", icon: Bell },
    ],
  },
];

const allItems = navGroups.flatMap((g) => g.items);

const AdminSidebar = ({ active, setActive }: { active: Section; setActive: (s: Section) => void }) => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-3 px-2 py-2">
          <img src={logo} alt="" className="h-9 w-9 bg-background rounded-lg p-1 shrink-0" />
          {!collapsed && (
            <div className="min-w-0">
              <p className="font-display font-bold truncate">Sanos y Salvos</p>
              <p className="text-[10px] uppercase tracking-widest text-sidebar-foreground/60">Panel staff</p>
            </div>
          )}
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {navGroups.map((group) => (
          <SidebarGroup key={group.label}>
            {!collapsed && <SidebarGroupLabel>{group.label}</SidebarGroupLabel>}
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      isActive={active === item.id}
                      onClick={() => setActive(item.id)}
                      tooltip={item.label}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="h-9 w-9 rounded-full bg-accent text-accent-foreground grid place-items-center font-bold text-xs shrink-0">VL</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">Vet. Laura</p>
              <p className="text-xs text-sidebar-foreground/60 truncate">Refugio Centro</p>
            </div>
          </div>
        )}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Salir">
              <Link to="/">
                <LogOut className="h-4 w-4" />
                <span>Salir</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

const Panel = () => {
  const [active, setActive] = useState<Section>("dashboard");
  const activeLabel = allItems.find((n) => n.id === active)?.label;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-muted/30">
        <AdminSidebar active={active} setActive={setActive} />

        {/* Main */}
        <main className="flex-1 min-w-0">
          <header className="bg-background border-b border-border sticky top-0 z-10">
            <div className="px-6 py-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <SidebarTrigger />
                <div>
                  <p className="text-xs text-muted-foreground">Bienvenida de vuelta</p>
                  <h1 className="font-display text-2xl font-bold capitalize">{activeLabel}</h1>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative hidden md:block">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Buscar..." className="pl-9 w-72 bg-muted/50 border-0" />
                </div>
                <button className="relative h-10 w-10 grid place-items-center rounded-full hover:bg-muted transition-smooth">
                  <Bell className="h-4 w-4" />
                  <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive" />
                </button>
              </div>
            </div>
          </header>

          <div className="p-8">
            {active === "dashboard" && <Dashboard />}
            {active === "mascotas" && <Mascotas />}
            {active === "adopciones" && <Adopciones />}
            {active === "coincidencias" && <Coincidencias />}
            {active === "geo" && <Geo />}
            {active === "donaciones" && <Donaciones />}
            {active === "historial" && <Historial />}
            {active === "notif" && <Notificaciones />}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

/* ============ Sections ============ */

type StatAccent = "primary" | "secondary" | "accent";
interface StatProps {
  icon: LucideIcon;
  label: string;
  value: string;
  delta: string;
  accent?: StatAccent;
}
const Stat = ({ icon: Icon, label, value, delta, accent = "primary" }: StatProps) => (
  <div className="bg-card border border-border rounded-2xl p-6 shadow-soft hover:shadow-card transition-smooth">
    <div className="flex items-start justify-between">
      <div className={`h-11 w-11 rounded-xl grid place-items-center ${accent === "primary" ? "bg-primary/10 text-primary" : accent === "secondary" ? "bg-secondary-soft text-secondary" : "bg-accent-soft text-accent"}`}>
        <Icon className="h-5 w-5" />
      </div>
      <span className="text-xs font-semibold text-secondary inline-flex items-center gap-1"><ArrowUpRight className="h-3 w-3" />{delta}</span>
    </div>
    <p className="font-display text-3xl font-bold mt-4">{value}</p>
    <p className="text-sm text-muted-foreground mt-1">{label}</p>
  </div>
);

const Dashboard = () => (
  <div className="space-y-6">
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <Stat icon={PawPrint} label="Mascotas registradas" value="1.842" delta="+12%" accent="primary" />
      <Stat icon={Heart} label="Adopciones activas" value="34" delta="+5" accent="secondary" />
      <Stat icon={Search} label="Coincidencias hoy" value="8" delta="+3" accent="accent" />
      <Stat icon={HandHeart} label="Donaciones mes" value="$2.4M" delta="+18%" accent="primary" />
    </div>

    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6 shadow-soft">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display text-xl font-bold">Actividad reciente</h3>
          <Button variant="ghost" size="sm">Ver todo</Button>
        </div>
        <div className="space-y-3">
          {[
            { icon: CheckCircle2, color: "text-secondary bg-secondary-soft", t: "Toby fue adoptado por la familia Soto", time: "Hace 12 min" },
            { icon: Search, color: "text-primary bg-primary/10", t: "Coincidencia 92% entre reportes #482 y #501", time: "Hace 35 min" },
            { icon: AlertCircle, color: "text-destructive bg-destructive/10", t: "Reporte urgente: perro herido en Av. Costanera", time: "Hace 1 h" },
            { icon: HandHeart, color: "text-accent bg-accent-soft", t: "Donación anónima de $100.000", time: "Hace 2 h" },
            { icon: Stethoscope, color: "text-secondary bg-secondary-soft", t: "Ficha médica creada para Luna", time: "Hace 3 h" },
          ].map((a, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-smooth">
              <div className={`h-10 w-10 rounded-xl grid place-items-center ${a.color}`}>
                <a.icon className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{a.t}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5"><Clock className="h-3 w-3" /> {a.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-hero text-primary-foreground rounded-2xl p-6 shadow-card relative overflow-hidden">
        <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-accent/30 blur-2xl" />
        <Users className="h-8 w-8 text-accent mb-3" />
        <h3 className="font-display text-xl font-bold">Equipo activo</h3>
        <p className="text-primary-foreground/80 text-sm mt-1">7 voluntarios conectados ahora</p>
        <div className="mt-5 flex -space-x-2">
          {["VL", "JR", "AM", "PC", "MS"].map((i) => (
            <div key={i} className="h-9 w-9 rounded-full bg-accent text-accent-foreground grid place-items-center font-bold text-xs border-2 border-primary">{i}</div>
          ))}
          <div className="h-9 w-9 rounded-full bg-primary-foreground/10 grid place-items-center text-xs font-semibold border-2 border-primary">+2</div>
        </div>
        <Button variant="warm" size="sm" className="mt-6 w-full">Asignar tarea</Button>
      </div>
    </div>

    <div className="bg-card border border-border rounded-2xl p-6 shadow-soft">
      <h3 className="font-display text-xl font-bold mb-5">Microservicios — estado del sistema</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          "ms-mascotas", "ms-adopciones", "ms-coincidencias", "ms-geolocalización",
          "ms-donaciones", "ms-historial", "ms-notificaciones", "api-gateway"
        ].map((s) => (
          <div key={s} className="flex items-center justify-between p-4 rounded-xl bg-muted/40 border border-border">
            <span className="text-sm font-mono">{s}</span>
            <span className="flex items-center gap-1.5 text-xs font-semibold text-secondary">
              <span className="h-2 w-2 rounded-full bg-secondary animate-pulse" /> activo
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Table = ({ headers, rows }: { headers: string[]; rows: (string | JSX.Element)[][] }) => (
  <div className="bg-card border border-border rounded-2xl shadow-soft overflow-hidden">
    <table className="w-full text-sm">
      <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
        <tr>{headers.map((h) => <th key={h} className="text-left px-6 py-4 font-semibold">{h}</th>)}</tr>
      </thead>
      <tbody className="divide-y divide-border">
        {rows.map((r, i) => (
          <tr key={i} className="hover:bg-muted/30 transition-smooth">
            {r.map((c, j) => <td key={j} className="px-6 py-4">{c}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

type BadgeTone = "secondary" | "primary" | "accent" | "destructive";
const Badge = ({ children, tone = "secondary" }: { children: ReactNode; tone?: BadgeTone }) => {
  const tones: Record<BadgeTone, string> = {
    secondary: "bg-secondary-soft text-secondary",
    primary: "bg-primary/10 text-primary",
    accent: "bg-accent-soft text-accent",
    destructive: "bg-destructive/10 text-destructive",
  };
  return <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${tones[tone]}`}>{children}</span>;
};

const Mascotas = () => (
  <Table
    headers={["ID", "Nombre", "Especie", "Estado", "Zona", "Acciones"]}
    rows={[
      ["#482", "Toby", "Perro", <Badge tone="secondary">En refugio</Badge>, "Pelluco", <Button size="sm" variant="ghost">Ver ficha</Button>],
      ["#483", "Luna", "Gato", <Badge tone="primary">Adoptada</Badge>, "Centro", <Button size="sm" variant="ghost">Ver ficha</Button>],
      ["#484", "Copito", "Perro", <Badge tone="accent">Disponible</Badge>, "Alerce", <Button size="sm" variant="ghost">Ver ficha</Button>],
      ["#485", "Mango", "Gato", <Badge tone="secondary">En refugio</Badge>, "Mirasol", <Button size="sm" variant="ghost">Ver ficha</Button>],
      ["#486", "Rocco", "Perro", <Badge tone="destructive">Urgente</Badge>, "Costanera", <Button size="sm" variant="ghost">Ver ficha</Button>],
    ]}
  />
);

const Adopciones = () => (
  <Table
    headers={["ID", "Mascota", "Adoptante", "Estado", "Fecha", "Acción"]}
    rows={[
      ["#A12", "Luna", "Familia Soto", <Badge tone="secondary">Aprobada</Badge>, "2025-04-19", <Button size="sm" variant="green">Confirmar</Button>],
      ["#A13", "Toby", "M. Reyes", <Badge tone="accent">En proceso</Badge>, "2025-04-20", <Button size="sm" variant="hero">Revisar</Button>],
      ["#A14", "Mango", "C. Vega", <Badge tone="accent">En proceso</Badge>, "2025-04-21", <Button size="sm" variant="hero">Revisar</Button>],
      ["#A15", "Copito", "Familia Pérez", <Badge tone="destructive">Rechazada</Badge>, "2025-04-18", <Button size="sm" variant="ghost">Ver</Button>],
    ]}
  />
);

const Coincidencias = () => (
  <div className="space-y-4">
    {[
      { id: "C-1024", a: "Reporte #482 — Perro café", b: "Reporte #501 — Perro encontrado Pelluco", pct: 92 },
      { id: "C-1025", a: "Reporte #470 — Gato negro y blanco", b: "Reporte #495 — Gatito Centro", pct: 78 },
      { id: "C-1026", a: "Reporte #455 — Perro blanco", b: "Reporte #489 — Cachorro Alerce", pct: 65 },
    ].map((c) => (
      <div key={c.id} className="bg-card border border-border rounded-2xl p-6 shadow-soft flex flex-wrap items-center gap-6">
        <div className="flex-1 min-w-[260px]">
          <p className="text-xs text-muted-foreground">{c.id}</p>
          <p className="font-semibold mt-1">{c.a}</p>
          <p className="text-sm text-muted-foreground">↔ {c.b}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="font-display text-3xl font-bold text-primary">{c.pct}%</p>
            <p className="text-xs text-muted-foreground">similitud</p>
          </div>
          <div className="flex flex-col gap-2">
            <Button size="sm" variant="green">Confirmar</Button>
            <Button size="sm" variant="outline">Descartar</Button>
          </div>
        </div>
      </div>
    ))}
  </div>
);

// MAPA CONFIGURADO EN EL PANEL CON EL MAPA INTERACTIVO REAL
const TYPE_META_PANEL: Record<ReportType, { label: string; color: string; icon: LucideIcon }> = {
  urgente:    { label: "Urgente",    color: "hsl(var(--destructive))", icon: AlertCircle },
  perdida:    { label: "Perdida",    color: "hsl(var(--primary))",     icon: Search },
  encontrada: { label: "Encontrada", color: "hsl(var(--secondary))",   icon: PawPrint },
};

const Geo = () => {
  const reportesPanel: Reporte[] = [
    { id: "R-482", type: "urgente",    nombre: "Perro herido",  especie: "Perro", zona: "Av. Costanera",   fecha: "Hoy 10:24",   descripcion: "Mestizo café, herido en pata trasera. Necesita atención veterinaria urgente.", lat: -41.4689, lng: -72.9411 },
    { id: "R-483", type: "perdida",    nombre: "Toby",          especie: "Perro", zona: "Pelluco",         fecha: "Hoy 09:10",   descripcion: "Labrador dorado con collar rojo. Responde a su nombre.",                       lat: -41.4612, lng: -72.9203 },
    { id: "R-484", type: "encontrada", nombre: "Gatito blanco", especie: "Gato",  zona: "Centro",          fecha: "Ayer",        descripcion: "Encontrado cerca de la plaza, muy cariñoso, sin chip.",                        lat: -41.4717, lng: -72.9360 },
    { id: "R-486", type: "perdida",    nombre: "Copito",        especie: "Perro", zona: "Mirasol",         fecha: "Hoy 07:45",   descripcion: "Poodle blanco pequeño, salió por portón abierto.",                             lat: -41.4901, lng: -72.9580 },
    { id: "R-487", type: "encontrada", nombre: "Perrito negro", especie: "Perro", zona: "Puerto Varas",    fecha: "Hoy 11:30",   descripcion: "Encontrado en la costanera, dócil, parece haber estado perdido varios días.",  lat: -41.3197, lng: -72.9853 },
    { id: "R-488", type: "urgente",    nombre: "Camada gatos",  especie: "Gato",  zona: "Chinquihue",      fecha: "Hoy 08:00",   descripcion: "4 gatitos abandonados, necesitan refugio inmediato.",                          lat: -41.5102, lng: -73.0210 },
  ];

  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-soft">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-display text-xl font-bold">Mapa de operaciones en vivo</h3>
          <p className="text-sm text-muted-foreground">{reportesPanel.length} reportes activos en la zona</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-secondary animate-pulse" /> Actualizando en vivo
        </div>
      </div>

      <div className="h-[560px] w-full rounded-xl overflow-hidden border border-border">
        <InteractiveReportMap reportes={reportesPanel} typeMeta={TYPE_META_PANEL} />
      </div>
    </div>
  );
};

const Donaciones = () => (
  <Table
    headers={["Donante", "Monto", "Destino", "Método", "Fecha"]}
    rows={[
      ["Anónimo", <span className="font-bold text-primary">$100.000</span>, "Refugio Sur", "Transferencia", "Hoy 14:32"],
      ["María C.", <span className="font-bold text-primary">$25.000</span>, "Atención urgencia", "Tarjeta", "Hoy 11:08"],
      ["Pedro V.", <span className="font-bold text-primary">$15.000</span>, "Esterilización", "WebPay", "Ayer"],
      ["Familia Soto", <span className="font-bold text-primary">$30.000</span>, "Vacunación", "Tarjeta", "Hace 2 días"],
    ]}
  />
);

const Historial = () => (
  <div className="space-y-4">
    {[
      { mascota: "Luna #483", diag: "Desnutrición leve", tto: "Dieta especial 30 días", chip: true },
      { mascota: "Toby #482", diag: "Herida en pata", tto: "Antibiótico + curaciones", chip: false },
      { mascota: "Mango #485", diag: "Control rutinario", tto: "Vacunas al día", chip: true },
    ].map((f, i) => (
      <div key={i} className="bg-card border border-border rounded-2xl p-6 shadow-soft">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs text-muted-foreground">Ficha médica</p>
            <p className="font-display text-xl font-bold">{f.mascota}</p>
          </div>
          {f.chip ? <Badge tone="secondary">✓ Con chip</Badge> : <Badge tone="destructive">Sin chip</Badge>}
        </div>
        <div className="mt-4 grid sm:grid-cols-2 gap-4 text-sm">
          <div><p className="text-xs uppercase text-muted-foreground tracking-wider mb-1">Diagnóstico</p><p>{f.diag}</p></div>
          <div><p className="text-xs uppercase text-muted-foreground tracking-wider mb-1">Tratamiento</p><p>{f.tto}</p></div>
        </div>
      </div>
    ))}
  </div>
);

const Notificaciones = () => (
  <div className="space-y-3">
    {[
      { tipo: "EMAIL", dest: "soto@email.cl", msg: "Tu solicitud de adopción de Luna fue aprobada.", time: "Hace 12 min" },
      { tipo: "SMS", dest: "+56 9 1234 5678", msg: "Posible coincidencia con tu reporte #482 — 92%", time: "Hace 35 min" },
      { tipo: "PUSH", dest: "App móvil", msg: "Donación recibida ¡Gracias!", time: "Hace 1 h" },
    ].map((n, i) => (
      <div key={i} className="bg-card border border-border rounded-2xl p-5 shadow-soft flex items-start gap-4">
        <Badge tone="primary">{n.tipo}</Badge>
        <div className="flex-1">
          <p className="text-sm font-semibold">{n.dest}</p>
          <p className="text-sm text-muted-foreground mt-0.5">{n.msg}</p>
        </div>
        <span className="text-xs text-muted-foreground whitespace-nowrap">{n.time}</span>
      </div>
    ))}
  </div>
);

export default Panel;
