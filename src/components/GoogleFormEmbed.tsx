import { ExternalLink } from "lucide-react";

import { GOOGLE_FORM_URL, embedUrl } from "@/lib/forms-config";

export default function GoogleFormEmbed() {
  if (!GOOGLE_FORM_URL) {
    return (
      <div className="rounded-2xl border border-dashed border-background/25 bg-background/5 p-8 text-center">
        <p className="text-sm font-semibold text-background">
          Formulario de inscripción en línea
        </p>
        <p className="mt-3 text-sm leading-relaxed text-background/65">
          Aquí aparecerá el formulario de Google en cuanto compartas su enlace. Mientras tanto,
          puedes escribirnos con el formulario de abajo.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="overflow-hidden rounded-2xl border border-background/15 bg-background">
        <iframe
          src={embedUrl(GOOGLE_FORM_URL)}
          title="Formulario de contacto Vigotsky English School"
          loading="lazy"
          className="h-[70vh] min-h-[520px] w-full"
        />
      </div>
      <a
        href={GOOGLE_FORM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-aqua"
      >
        Abrir el formulario en una pestaña nueva
        <ExternalLink className="h-4 w-4" />
      </a>
    </div>
  );
}
