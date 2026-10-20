/**
 * Configuración del formulario de Google y de la hoja de cálculo de respuestas.
 * Cambia aquí los enlaces y todo el sitio se actualiza.
 */

// Enlace público del formulario (el que termina en /viewform).
export const GOOGLE_FORM_URL = "";

// ID de la hoja de cálculo con las respuestas.
// Es el texto entre /d/ y /edit en la URL de Google Sheets.
export const RESPONSES_SPREADSHEET_ID = "";

// Rango a leer (nombre de la pestaña + columnas).
export const RESPONSES_RANGE = "Respuestas de formulario 1!A:Z";

export const embedUrl = (url: string) =>
  url ? `${url}${url.includes("?") ? "&" : "?"}embedded=true` : "";
