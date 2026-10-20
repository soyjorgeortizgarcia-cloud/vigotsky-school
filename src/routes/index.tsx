import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Waves,
  Globe2,
  Sparkles,
  GraduationCap,
  ArrowRight,
  Menu,
  X,
  MapPin,
  Phone,
  Mail,
  Facebook,
} from "lucide-react";

import heroVideo from "@/assets/school-promo-montage.mp4.asset.json";
import logo from "@/assets/vigotsky-logo.jpg.asset.json";
import g1 from "@/assets/gallery1.jpg.asset.json";
import g2 from "@/assets/gallery2.jpg.asset.json";
import g3 from "@/assets/gallery3.jpg.asset.json";
import g4 from "@/assets/gallery4.jpg.asset.json";
import g5 from "@/assets/gallery5.jpg.asset.json";
import g6 from "@/assets/gallery6.jpg.asset.json";
import AccordionGallery from "@/components/AccordionGallery";
import ContactForm from "@/components/ContactForm";
import { ESCUELA_SEGURA_URL } from "@/lib/links";

const teachers = [
  { src: "/diferencia/teach_enannos.jpg", alt: "Docentes de Vigotsky en una celebración escolar" },
  {
    src: "/diferencia/teach_graduacion.jpg",
    alt: "Equipo docente en la graduación de los alumnos",
  },
  { src: "/diferencia/teach_muertos.jpg", alt: "Maestras en la celebración de Día de Muertos" },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vigotsky English School | Construye tu futuro" },
      {
        name: "description",
        content:
          "Escuela bilingüe bicultural de preescolar y primaria: inmersión cultural americana, socio-constructivismo y natación en campus propio.",
      },
      { property: "og:title", content: "Vigotsky English School | Construye tu futuro" },
      {
        property: "og:description",
        content:
          "Inmersión cultural integral desde la infancia: no solo aprenden inglés, viven la cultura global mientras cuidan su salud física.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const nav = [
  { to: "/", label: "Home" },
  { to: "/nosotros", label: "Nosotros" },
] as const;

const pillars = [
  {
    icon: Waves,
    title: "Natación en campus",
    text: "Alberca propia: salud, disciplina y psicomotricidad desde preescolar.",
  },
  {
    icon: Globe2,
    title: "Inmersión bicultural",
    text: "Costumbres, tradiciones y contexto social americano vividos a diario.",
  },
  {
    icon: Sparkles,
    title: "Socio-constructivismo",
    text: "Aprendizaje social mediante proyectos interactivos, no memorización.",
  },
  {
    icon: GraduationCap,
    title: "Perfil global",
    text: "Alumnos seguros, biculturales y preparados para cualquier entorno.",
  },
];

const differentiators = [
  {
    dim: "Idioma",
    traditional: "Aprendizaje gramatical y conceptual del inglés.",
    vigotsky: "Inmersión bicultural viva: costumbres, modismos y contexto social americano.",
  },
  {
    dim: "Deporte",
    traditional: "Educación física convencional.",
    vigotsky: "Alberca en campus: natación integrativa para salud y disciplina.",
  },
  {
    dim: "Pedagogía",
    traditional: "Métodos memorísticos tradicionales.",
    vigotsky: "Socio-constructivismo aplicado con proyectos interactivos.",
  },
];

const galleryItems = [
  { image: g1.url, label: "Alberca techada", text: "Natación integrativa desde preescolar." },
  { image: g2.url, label: "Aula bicultural", text: "Science Fair estilo americano." },
  { image: g3.url, label: "Vida escolar", text: "Tradiciones y celebraciones anglosajonas." },
  { image: g4.url, label: "Campus", text: "Áreas verdes, seguridad e instalaciones propias." },
  { image: g5.url, label: "Nuestros alumnos", text: "Seguros, biculturales y felices." },
  { image: g6.url, label: "Lectura bilingüe", text: "Aprendizaje social y vivencial." },
];

function Index() {
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
          <a href="#top" className="flex items-center gap-3">
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
          </a>
          <nav className="hidden items-center gap-8 md:flex">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="text-sm font-semibold text-background/80 transition-colors hover:text-aqua"
                activeProps={{ className: "text-aqua" }}
                activeOptions={{ exact: true }}
              >
                {n.label}
              </Link>
            ))}
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
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="block py-3 text-sm font-semibold text-background/85"
                activeProps={{ className: "text-aqua" }}
                activeOptions={{ exact: true }}
              >
                {n.label}
              </Link>
            ))}
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
      <section id="top" className="relative flex min-h-screen items-center overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={heroVideo.url}
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
              Preescolar &amp; Primaria Bilingüe
            </p>
            <h1 className="animate-fade-in mt-6 font-display text-5xl leading-[1.02] font-black text-background sm:text-7xl lg:text-8xl">
              Construye
              <br />
              <span className="text-aqua">tu futuro</span>
            </h1>
            <p className="animate-fade-in mt-8 max-w-xl text-lg leading-relaxed text-background/80">
              Inmersión cultural integral desde la infancia: aquí los niños no solo aprenden inglés,
              viven la cultura global mientras cuidan su salud física.
            </p>
            <div className="animate-fade-in mt-10 flex flex-wrap gap-4">
              <a
                href="#contacto"
                className="group inline-flex items-center gap-2 rounded-full bg-brandred px-7 py-4 text-sm font-bold text-background transition-transform hover:scale-105"
              >
                Agenda una visita
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#modelo"
                className="inline-flex items-center gap-2 rounded-full border border-background/30 px-7 py-4 text-sm font-bold text-background transition-colors hover:bg-background/10"
              >
                Conoce el modelo
              </a>
            </div>
          </div>

          <dl className="mt-20 grid max-w-3xl grid-cols-2 gap-8 border-t border-background/15 pt-8 sm:grid-cols-4">
            {[
              ["100%", "Inmersión bilingüe"],
              ["Alberca", "En el campus"],
              ["Socio-", "constructivismo"],
              ["K–6", "Preescolar y primaria"],
            ].map(([k, v]) => (
              <div key={v}>
                <dt className="font-display text-2xl font-extrabold text-aqua">{k}</dt>
                <dd className="mt-1 text-xs uppercase tracking-widest text-background/60">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Propuesta / pilares */}
      <section id="modelo" className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-aqua">
            Propuesta de valor
          </p>
          <h2 className="mt-5 font-display text-3xl font-extrabold sm:text-5xl">
            Trascendemos la enseñanza tradicional del idioma.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Transformamos el aprendizaje en una experiencia viva de inmersión socio-cultural, donde
            el desarrollo cognitivo, la disciplina deportiva y el entendimiento global preparan a
            niños capaces de destacar en cualquier entorno internacional.
          </p>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl bg-border sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => (
            <div key={p.title} className="group bg-card p-8 transition-colors hover:bg-navy">
              <p.icon className="h-8 w-8 text-aqua" strokeWidth={1.5} />
              <h3 className="mt-6 font-display text-lg font-bold transition-colors group-hover:text-background">
                {p.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-background/70">
                {p.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Diferenciadores */}
      <section id="diferencia" className="bg-navy py-24 text-background sm:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-aqua">Diferenciadores</p>
          <h2 className="mt-5 max-w-2xl font-display text-3xl font-extrabold sm:text-5xl">
            Lo que nos separa de una escuela bilingüe tradicional.
          </h2>

          <div className="mt-14 space-y-px overflow-hidden rounded-2xl bg-background/10">
            <div className="hidden grid-cols-3 gap-8 bg-navy px-8 py-5 text-xs font-bold uppercase tracking-widest text-background/50 md:grid">
              <span>Dimensión</span>
              <span>Escuelas tradicionales</span>
              <span className="text-aqua">Vigotsky English School</span>
            </div>
            {differentiators.map((d) => (
              <div key={d.dim} className="grid gap-4 bg-navy px-8 py-8 md:grid-cols-3 md:gap-8">
                <p className="font-display text-lg font-bold text-aqua">{d.dim}</p>
                <p className="text-sm leading-relaxed text-background/50 line-through decoration-background/25">
                  {d.traditional}
                </p>
                <p className="text-sm leading-relaxed text-background">{d.vigotsky}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Carrusel */}
      <section id="campus" className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-aqua">Nuestro campus</p>
            <h2 className="mt-5 font-display text-3xl font-extrabold sm:text-5xl">
              Personas reales, instalaciones reales.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            Alberca techada, aulas biculturales, áreas verdes y una comunidad escolar que vive el
            inglés todos los días.
          </p>
        </div>
        <div className="mt-14">
          <AccordionGallery
            items={galleryItems}
            defaultIndex={0}
            expandRatio={0.52}
            trigger="hover"
            grayscale
            showLabels
            duration={0.6}
            height={460}
            gap={10}
            radius={16}
            orientation="horizontal"
          />
        </div>
      </section>

      {/* Misión / Visión */}
      <section id="institucion" className="border-y border-border bg-secondary py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-aqua">Misión</p>
            <p className="mt-6 text-lg leading-relaxed">
              Brindar una educación integral bilingüe de nivel preescolar y primaria que combina la
              excelencia académica bajo el enfoque socio-constructivista con la inmersión activa en
              la cultura y costumbres anglosajonas, formando estudiantes seguros, biculturales y
              preparados para el futuro.
            </p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-aqua">Visión</p>
            <p className="mt-6 text-lg leading-relaxed">
              Ser la institución educativa de referencia en la región por su modelo innovador de
              inmersión cultural y desarrollo integral, reconocida por graduar alumnos
              verdaderamente biculturales, con alto nivel académico, salud integral y un perfil
              global competitivo.
            </p>
          </div>
        </div>
      </section>

      {/* Nosotros hacemos la diferencia */}
      <section id="diferencia-docentes" className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-aqua">
            Nosotros hacemos la diferencia
          </p>
          <h2 className="mt-5 font-display text-3xl font-extrabold sm:text-5xl">En Vigotsky</h2>
          <blockquote className="mt-6 border-l-4 border-aqua pl-6 text-xl leading-relaxed text-muted-foreground">
            “Si queremos alumnos comprometidos, necesitamos docentes así.”
          </blockquote>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {teachers.map((t) => (
            <figure
              key={t.src}
              className="group overflow-hidden rounded-2xl border border-border bg-card"
            >
              <img
                src={t.src}
                alt={t.alt}
                loading="lazy"
                className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </figure>
          ))}
        </div>
      </section>

      {/* Contacto */}
      <section
        id="contacto"
        className="relative overflow-hidden bg-navy py-24 text-background sm:py-32"
      >
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-aqua/20 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <img
              src={logo.url}
              alt="Escudo Vigotsky English School"
              loading="lazy"
              width={320}
              height={440}
              className="h-32 w-auto rounded-lg shadow-2xl"
            />
            <p className="mt-8 text-xs font-bold uppercase tracking-[0.3em] text-aqua">Contacto</p>
            <h2 className="mt-5 font-display text-3xl font-extrabold sm:text-5xl">
              Agenda tu visita al campus
            </h2>
            <p className="mt-5 max-w-md text-background/70">
              Déjanos tus datos y el equipo de admisiones te contactará para resolver tus dudas y
              coordinar un recorrido.
            </p>
            <a
              href="mailto:vigotskyenglishschool@gmail.com"
              className="group mt-8 inline-flex items-center gap-2 text-sm font-bold text-aqua"
            >
              vigotskyenglishschool@gmail.com
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
          <div className="rounded-3xl border border-background/10 bg-background/5 p-6 backdrop-blur-sm sm:p-9">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Pie de página */}
      <footer className="bg-navy text-background">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <img
              src={logo.url}
              alt="Escudo Vigotsky English School"
              loading="lazy"
              width={200}
              height={275}
              className="h-20 w-auto rounded-md"
            />
            <p className="mt-6 font-display text-sm font-extrabold uppercase tracking-[0.22em] text-aqua">
              Vigotsky English School
            </p>
            <p className="mt-3 text-sm leading-relaxed text-background/60">
              Construye tu futuro: preescolar y primaria bilingüe bicultural.
            </p>
            <a
              href="https://www.facebook.com/Vigotsky-English-School-105213551072139"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-background/20 px-5 py-3 text-sm font-bold text-background transition-colors hover:border-aqua hover:text-aqua"
            >
              <Facebook className="h-4 w-4" />
              Facebook
            </a>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.25em] text-aqua">
              Dirección
            </h3>
            <p className="mt-5 flex gap-3 text-sm leading-relaxed text-background/70">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-aqua" strokeWidth={1.5} />
              <span>
                Sur 25 Mz. 48 Lt. 499
                <br />
                Col. Leyes de Reforma, 2a. Secc.
                <br />
                Iztapalapa, C.P. 09310
                <br />
                Ciudad de México
              </span>
            </p>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.25em] text-aqua">
              Contacto
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-background/70">
              {["55 5694 6705", "55 5694 3249", "55 8046 2518"].map((tel) => (
                <li key={tel}>
                  <a
                    href={`tel:+52${tel.replace(/\s/g, "")}`}
                    className="flex items-center gap-3 transition-colors hover:text-aqua"
                  >
                    <Phone className="h-4 w-4 shrink-0 text-aqua" strokeWidth={1.5} />
                    {tel}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="mailto:vigotskyenglishschool@gmail.com"
                  className="flex items-start gap-3 break-all transition-colors hover:text-aqua"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-aqua" strokeWidth={1.5} />
                  vigotskyenglishschool@gmail.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.25em] text-aqua">
              Ubícanos
            </h3>
            <p className="mt-5 text-sm leading-relaxed text-background/70">
              Sur 25 Mz49 Lt514, Leyes de Reforma 2da Secc, Iztapalapa, 09310 Ciudad de México,
              CDMX.
            </p>
            <div className="mt-5 overflow-hidden rounded-2xl border border-background/15">
              <iframe
                title="Ubicación de Vigotsky English School en Google Maps"
                src="https://www.google.com/maps?q=Vigotsky%20English%20School%2C%20Sur%2025%20MZ49%20LT514%2C%20Leyes%20de%20Reforma%202da%20Secc%2C%20Iztapalapa%2C%2009310%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-48 w-full border-0"
              />
            </div>
          </div>
        </div>

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-background/10 px-6 py-8 text-xs text-background/50 sm:flex-row">
          <p className="font-display font-bold uppercase tracking-[0.25em] text-background/70">
            Vigotsky English School
          </p>
          <p>Construye tu futuro · {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}
