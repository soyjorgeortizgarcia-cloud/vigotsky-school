import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Monitor, Languages, Medal, MapPin, Phone, Mail, Menu, X } from "lucide-react";

import nosotrosVideo from "@/assets/vigotsky-preescolar.mp4.asset.json";
import logo from "@/assets/vigotsky-logo.jpg.asset.json";
import { ESCUELA_SEGURA_URL } from "@/lib/links";

export const Route = createFileRoute("/escuelasegura")({
  head: () => ({
    meta: [
      { title: "Nosotros | Vigotsky English School" },
      {
        name: "description",
        content:
          "Conoce Vigotsky English School: compromiso formativo, excelencia académica, cómputo e inglés avanzado en Iztapalapa, Ciudad de México.",
      },
      { property: "og:title", content: "Nosotros | Vigotsky English School" },
      {
        property: "og:description",
        content:
          "Formamos niños bilingües, felices y seguros de sí mismos. Descubre el genio oculto en cada niño.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Nosotros,
});

const excellence = [
  {
    icon: Monitor,
    title: "Cómputo",
    text: "Permite que los alumnos adquieran nuevas habilidades mientras se divierten, practicando con un equipo por niño.",
  },
  {
    icon: Languages,
    title: "Inglés avanzado",
    text: "Contamos con diversas asignaturas interdisciplinarias para que los estudiantes dominen el lenguaje.",
  },
  {
    icon: Medal,
    title: "Calidad académica",
    text: "Educación inclusiva y equitativa de calidad, parte fundamental para fomentar el aprendizaje genuino y el desarrollo humano.",
  },
];

const values = [
  "Grupos reducidos para una atención personalizada",
  "Instalaciones sanitizadas diariamente",
  "Personal comprometido con el bienestar escolar",
  "Ambiente seguro, cálido y bicultural",
];

function Nosotros() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-navy/95 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo.url}
              alt="Escudo Vigotsky English School"
              width={64}
              height={88}
              className="h-11 w-auto rounded-sm"
            />
            <span className="font-display text-sm font-extrabold uppercase tracking-[0.22em] text-background">
              Vigotsky
            </span>
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            <Link
              to="/"
              className="text-sm font-semibold text-background/80 transition-colors hover:text-aqua"
            >
              Home
            </Link>
            <Link to="/nosotros" className="text-sm font-semibold text-aqua" aria-current="page">
              Nosotros
            </Link>
            <a
              href={ESCUELA_SEGURA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-background/80 transition-colors hover:text-aqua"
            >
              Escuela Segura
            </a>
          </nav>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Abrir menú"
            className="text-background md:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {open && (
          <div className="border-t border-background/10 bg-navy px-6 pb-6 md:hidden">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="block py-3 text-sm font-semibold text-background/85"
            >
              Home
            </Link>
            <Link
              to="/nosotros"
              onClick={() => setOpen(false)}
              className="block py-3 text-sm font-semibold text-aqua"
            >
              Nosotros
            </Link>
            <a
              href={ESCUELA_SEGURA_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="block py-3 text-sm font-semibold text-background/85"
            >
              Escuela Segura
            </a>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative flex min-h-[85vh] items-center overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={nosotrosVideo.url}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-navy/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-navy/60" />

        <div className="relative mx-auto w-full max-w-7xl px-6 pt-32 pb-24">
          <div className="max-w-3xl">
            <p className="animate-fade-in text-xs font-bold uppercase tracking-[0.35em] text-aqua">
              Nosotros
            </p>
            <h1 className="animate-fade-in mt-6 font-display text-5xl leading-[1.02] font-black text-background sm:text-7xl">
              Descubrimos el genio
              <br />
              <span className="text-aqua">oculto en cada niño</span>
            </h1>
            <p className="animate-fade-in mt-8 max-w-xl text-lg leading-relaxed text-background/80">
              Creatividad, pasión y excelencia. Nuestro compromiso es preparar niños capaces y
              bilingües, pero sobre todo, niños felices y seguros de sí mismos.
            </p>
          </div>
        </div>
      </section>

      {/* Compromiso */}
      <section className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-aqua">
              Nuestro compromiso
            </p>
            <h2 className="mt-5 font-display text-3xl font-extrabold sm:text-5xl">
              Formamos agentes de cambio.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Vigotsky English School tiene como compromiso formar a niños y jóvenes que se
              conviertan en agentes de cambio; personitas que sean responsables de su propia vida,
              conscientes de que su actuar puede apoyar la transformación de los demás.
            </p>
          </div>
          <ul className="grid gap-px overflow-hidden rounded-2xl bg-border sm:grid-cols-2">
            {values.map((v) => (
              <li key={v} className="bg-card p-8">
                <span className="block h-1.5 w-10 rounded-full bg-aqua" />
                <p className="mt-5 text-sm font-semibold leading-relaxed">{v}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Excelencia académica */}
      <section className="bg-navy py-24 text-background sm:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-aqua">
            Nuestra excelencia académica
          </p>
          <h2 className="mt-5 max-w-2xl font-display text-3xl font-extrabold sm:text-5xl">
            Pilares que nos distinguen.
          </h2>
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-background/10 md:grid-cols-3">
            {excellence.map((e) => (
              <div key={e.title} className="bg-navy p-8 transition-colors hover:bg-navy/80">
                <e.icon className="h-8 w-8 text-aqua" strokeWidth={1.5} />
                <h3 className="mt-6 font-display text-lg font-bold">{e.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-background/70">{e.text}</p>
              </div>
            ))}
          </div>
          <blockquote className="mt-14 max-w-3xl border-l-4 border-aqua pl-6 text-xl leading-relaxed text-background/90">
            “Si queremos alumnos comprometidos, necesitamos docentes así.”
            <footer className="mt-3 text-sm font-semibold uppercase tracking-widest text-aqua">
              Nosotros hacemos la diferencia en Vigotsky
            </footer>
          </blockquote>
        </div>
      </section>

      {/* Contacto / ubicación */}
      <section className="border-y border-border bg-secondary py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-aqua">Ubícanos</p>
            <h2 className="mt-5 font-display text-3xl font-extrabold sm:text-5xl">
              Visítanos en el campus
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
              Conoce nuestras instalaciones, al equipo docente y el ambiente bicultural que vive la
              comunidad Vigotsky todos los días.
            </p>
          </div>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <MapPin className="mt-1 h-6 w-6 shrink-0 text-aqua" strokeWidth={1.5} />
              <p className="text-sm leading-relaxed">
                <span className="font-bold">Dirección</span>
                <br />
                Calle Sur 67-A No. 131, Unidad Habitacional Ejército de Oriente Peñón, Iztapalapa,
                09230 Ciudad de México
              </p>
            </div>
            <div className="flex items-start gap-4">
              <Mail className="mt-1 h-6 w-6 shrink-0 text-aqua" strokeWidth={1.5} />
              <p className="text-sm leading-relaxed">
                <span className="font-bold">Correo</span>
                <br />
                <a href="mailto:vigotskyenglishschool@gmail.com" className="hover:text-aqua">
                  vigotskyenglishschool@gmail.com
                </a>
              </p>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="mt-1 h-6 w-6 shrink-0 text-aqua" strokeWidth={1.5} />
              <p className="text-sm leading-relaxed">
                <span className="font-bold">Admisiones</span>
                <br />
                Escríbenos para agendar un recorrido por el campus.
              </p>
            </div>
            <Link
              to="/"
              hash="contacto"
              className="inline-flex items-center gap-2 rounded-full bg-brandred px-7 py-4 text-sm font-bold text-background transition-transform hover:scale-105"
            >
              Agenda una visita
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-navy py-10 text-background/50">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-background/10 px-6 pt-8 text-xs sm:flex-row">
          <p className="font-display font-bold uppercase tracking-[0.25em] text-background/70">
            Vigotsky English School
          </p>
          <p>Construye tu futuro · {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}
