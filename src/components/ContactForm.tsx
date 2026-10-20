import { useState } from "react";
import { Send } from "lucide-react";

const SCHOOL_EMAIL = "vigotskyenglishschool@gmail.com";

type Errors = Partial<Record<"nombre" | "email" | "telefono" | "mensaje", string>>;

export default function ContactForm() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const validate = (): Errors => {
    const e: Errors = {};
    const n = nombre.trim();
    const m = email.trim();
    const t = telefono.trim();
    const msg = mensaje.trim();
    if (!n) e.nombre = "Escribe tu nombre.";
    else if (n.length > 100) e.nombre = "Máximo 100 caracteres.";
    if (!m) e.email = "Escribe tu correo.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(m) || m.length > 255)
      e.email = "Correo no válido.";
    if (t && !/^[\d\s()+-]{7,20}$/.test(t)) e.telefono = "Teléfono no válido.";
    if (!msg) e.mensaje = "Cuéntanos en qué podemos ayudarte.";
    else if (msg.length > 1000) e.mensaje = "Máximo 1000 caracteres.";
    return e;
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    const subject = `Solicitud de informes — ${nombre.trim()}`;
    const body = [
      `Nombre: ${nombre.trim()}`,
      `Correo: ${email.trim()}`,
      `Teléfono: ${telefono.trim() || "No proporcionado"}`,
      "",
      "Mensaje:",
      mensaje.trim(),
    ].join("\n");

    window.location.href = `mailto:${SCHOOL_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const field =
    "w-full rounded-xl border border-background/20 bg-background/5 px-4 py-3 text-sm text-background placeholder:text-background/40 outline-none transition-colors focus:border-aqua";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4 text-left">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="nombre" className="mb-2 block text-xs font-bold uppercase tracking-widest text-background/60">
            Nombre
          </label>
          <input
            id="nombre"
            value={nombre}
            maxLength={100}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Tu nombre completo"
            className={field}
          />
          {errors.nombre && <p className="mt-1.5 text-xs text-brandred">{errors.nombre}</p>}
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-xs font-bold uppercase tracking-widest text-background/60">
            Correo
          </label>
          <input
            id="email"
            type="email"
            value={email}
            maxLength={255}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tucorreo@ejemplo.com"
            className={field}
          />
          {errors.email && <p className="mt-1.5 text-xs text-brandred">{errors.email}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="telefono" className="mb-2 block text-xs font-bold uppercase tracking-widest text-background/60">
          Teléfono (opcional)
        </label>
        <input
          id="telefono"
          value={telefono}
          maxLength={20}
          onChange={(e) => setTelefono(e.target.value)}
          placeholder="(555) 123 4567"
          className={field}
        />
        {errors.telefono && <p className="mt-1.5 text-xs text-brandred">{errors.telefono}</p>}
      </div>

      <div>
        <label htmlFor="mensaje" className="mb-2 block text-xs font-bold uppercase tracking-widest text-background/60">
          Mensaje
        </label>
        <textarea
          id="mensaje"
          rows={5}
          value={mensaje}
          maxLength={1000}
          onChange={(e) => setMensaje(e.target.value)}
          placeholder="Me interesa información sobre inscripciones para preescolar…"
          className={`${field} resize-none`}
        />
        {errors.mensaje && <p className="mt-1.5 text-xs text-brandred">{errors.mensaje}</p>}
      </div>

      <button
        type="submit"
        className="group inline-flex items-center gap-2 rounded-full bg-brandred px-8 py-4 text-sm font-bold text-background transition-transform hover:scale-105"
      >
        Enviar mensaje
        <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </button>

      {sent && (
        <p className="text-sm text-aqua">
          Abrimos tu correo con el mensaje listo. Si no se abrió, escríbenos a{" "}
          <a className="underline" href={`mailto:${SCHOOL_EMAIL}`}>
            {SCHOOL_EMAIL}
          </a>
          .
        </p>
      )}
    </form>
  );
}
