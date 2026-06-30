import 'leaflet/dist/leaflet.css';
import { Link } from "react-router-dom";
import { ArrowRight, Heart, MapPin, Search, Shield, Sparkles, PawPrint, HandHeart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroPets from "@/assets/logo.png";
import pet1 from "@/assets/Luka.jpeg";
import pet2 from "@/assets/Lia.jpeg";
import pet3 from "@/assets/Kitty.jpeg";
import pet4 from "@/assets/Kira.jpeg";

const stats = [
  { n: "1.240", l: "Mascotas reunidas" },
  { n: "486", l: "Adopciones felices" },
  { n: "$32M", l: "Donaciones recibidas" },
  { n: "97%", l: "Casos resueltos" },
];

const services = [
  { icon: Search, title: "Reportar mascota", desc: "Sube una foto y ubicación. Activamos coincidencias automáticas en segundos.", href: "/reportar", color: "from-primary to-primary-glow" },
  { icon: Heart, title: "Adoptar con amor", desc: "Encuentra a tu nuevo mejor amigo entre cientos de mascotas listas para un hogar.", href: "/adopciones", color: "from-secondary to-secondary" },
  { icon: HandHeart, title: "Donar a la causa", desc: "Cada aporte se convierte en alimento, atención veterinaria y refugio.", href: "/donaciones", color: "from-accent to-accent" },
  { icon: Shield, title: "Ficha médica", desc: "Historial veterinario unificado para cada mascota rescatada o adoptada.", href: "/panel", color: "from-primary-glow to-secondary" },
];

const adoptables = [
  { img: pet1, name: "Luka", age: "4 meses", tag: "Juguetón" },
  { img: pet2, name: "Lia", age: "4 meses", tag: "Enojona" },
  { img: pet3, name: "Kitty", age: "1 año", tag: "Dócil" },
  { img: pet4, name: "Kira", age: "4 meses", tag: "Tímida" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-warm pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-accent/15 blur-3xl" />

        <div className="container mx-auto relative grid lg:grid-cols-2 gap-12 items-center py-16 lg:py-24">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary-soft text-secondary-foreground border border-secondary/30 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5 text-secondary" /> Plataforma de bienestar animal
            </span>
            <h1 className="mt-6 text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.05] text-foreground">
              Cada huella <br />
              merece volver <br />
              <span className="text-gradient-brand italic">a casa.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
              Sanos y Salvos conecta familias, refugios y veterinarios para reunir mascotas perdidas, encontrar nuevos hogares y cuidar la salud de cada animal.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="lg">
                <Link to="/reportar"><PawPrint /> Reportar una mascota</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/adopciones">Ver adopciones <ArrowRight /></Link>
              </Button>
            </div>

            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6">
              {stats.map((s) => (
                <div key={s.l}>
                  <p className="font-display text-3xl font-bold text-primary">{s.n}</p>
                  <p className="text-xs text-muted-foreground mt-1 font-medium">{s.l}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-scale-in">
            <div className="absolute -inset-4 bg-gradient-hero rounded-[3rem] blur-2xl opacity-20" />
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-glow border-8 border-background">
              <img src={heroPets} alt="Perro y gato felices" width={1600} height={1100} className="w-full h-[520px] object-cover" />
            </div>
            {/* Floating cards */}
            <div className="absolute -left-6 top-12 bg-card rounded-2xl shadow-card px-4 py-3 flex items-center gap-3 animate-float-slow border border-border">
              <div className="h-10 w-10 rounded-full bg-secondary-soft grid place-items-center">
                <Heart className="h-5 w-5 text-secondary fill-secondary/30" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Hoy</p>
                <p className="font-semibold text-sm">3 reuniones</p>
              </div>
            </div>
            <div className="absolute -right-4 bottom-10 bg-card rounded-2xl shadow-card px-4 py-3 flex items-center gap-3 animate-float-slow border border-border" style={{ animationDelay: "1.5s" }}>
              <div className="h-10 w-10 rounded-full bg-accent-soft grid place-items-center">
                <MapPin className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Cerca de ti</p>
                <p className="font-semibold text-sm">12 reportes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="container mx-auto py-20">
        <div className="max-w-2xl">
          <p className="text-secondary font-semibold text-sm uppercase tracking-wider mb-3">Nuestros servicios</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">Todo lo que tu mascota necesita, en un solo lugar.</h2>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s, i) => (
            <Link
              key={s.title}
              to={s.href}
              className="group relative bg-gradient-card border border-border rounded-3xl p-7 shadow-soft hover:shadow-card hover:-translate-y-1 transition-smooth overflow-hidden"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${s.color} grid place-items-center text-primary-foreground shadow-soft mb-5`}>
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl font-bold mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              <div className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-smooth">
                Saber más <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ADOPTABLES */}
      <section className="bg-gradient-warm py-20">
        <div className="container mx-auto">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
            <div className="max-w-xl">
              <p className="text-secondary font-semibold text-sm uppercase tracking-wider mb-3">En adopción</p>
              <h2 className="text-4xl md:text-5xl font-display font-bold">Buscan una familia <span className="italic text-secondary">como la tuya</span></h2>
            </div>
            <Button asChild variant="outline">
              <Link to="/adopciones">Ver todas <ArrowRight /></Link>
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {adoptables.map((p) => (
              <article key={p.name} className="group bg-card rounded-3xl overflow-hidden shadow-card hover:shadow-glow hover:-translate-y-2 transition-smooth border border-border">
                <div className="aspect-square overflow-hidden bg-muted">
                  <img src={p.img} alt={p.name} loading="lazy" width={800} height={800} className="w-full h-full object-cover group-hover:scale-110 transition-smooth duration-700" />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-2xl font-bold">{p.name}</h3>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-secondary-soft text-secondary font-semibold">{p.tag}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{p.age}</p>
                  <Button asChild variant="green" size="sm" className="w-full mt-4">
                    <Link to="/adopciones">Adoptar a {p.name}</Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Donate */}
      <section className="container mx-auto py-20">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-hero p-10 md:p-16 text-primary-foreground shadow-glow">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-accent/30 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-secondary/30 blur-3xl" />
          <div className="relative grid md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-foreground/10 text-xs font-semibold uppercase tracking-wider">
                <HandHeart className="h-4 w-4 text-accent" /> Tu aporte transforma vidas
              </span>
              <h2 className="mt-5 text-4xl md:text-5xl font-display font-bold">Una donación, miles de colas felices.</h2>
              <p className="mt-4 text-primary-foreground/80 leading-relaxed max-w-lg">
                Con tan solo $5.000 ayudas a financiar una atención veterinaria de urgencia. Total transparencia: cada peso queda registrado.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild variant="warm" size="lg">
                  <Link to="/donaciones"><HandHeart /> Donar ahora</Link>
                </Button>
                <Button asChild variant="ghost" size="lg" className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                  <Link to="/donaciones">Ver historial</Link>
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { n: "$5.000", l: "Vacuna preventiva" },
                { n: "$15.000", l: "Esterilización" },
                { n: "$25.000", l: "Atención de urgencia" },
                { n: "$50.000", l: "Refugio mensual" },
              ].map((d) => (
                <div key={d.l} className="bg-primary-foreground/10 backdrop-blur rounded-2xl p-5 border border-primary-foreground/10">
                  <p className="font-display text-2xl font-bold text-accent">{d.n}</p>
                  <p className="text-xs text-primary-foreground/80 mt-1">{d.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
