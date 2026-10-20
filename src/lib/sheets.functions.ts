import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { RESPONSES_RANGE, RESPONSES_SPREADSHEET_ID } from "./forms-config";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_sheets/v4";
const CACHE_MS = 3 * 60 * 1000;

export type ResponsesPayload = {
  headers: string[];
  rows: string[][];
  configured: boolean;
  notice?: string;
};

let cache: { at: number; data: ResponsesPayload } | null = null;

export const fetchFormResponses = createServerFn({ method: "POST" })
  .inputValidator((data) => z.object({ password: z.string().max(200) }).parse(data))
  .handler(async ({ data }): Promise<ResponsesPayload> => {
    const expected = process.env["PANEL_PASSWORD"];
    if (!expected) throw new Error("El panel aún no tiene contraseña configurada.");
    if (data.password !== expected) throw new Error("Contraseña incorrecta.");

    if (!RESPONSES_SPREADSHEET_ID) {
      return {
        headers: [],
        rows: [],
        configured: false,
        notice: "Falta el enlace de la hoja de cálculo con las respuestas.",
      };
    }

    if (cache && Date.now() - cache.at < CACHE_MS) return cache.data;

    const lovableKey = process.env["LOVABLE_API_KEY"];
    const connectionKey = process.env["GOOGLE_SHEETS_API_KEY"];
    if (!lovableKey || !connectionKey) {
      return {
        headers: [],
        rows: [],
        configured: false,
        notice: "Falta conectar la cuenta de Google Sheets.",
      };
    }

    const res = await fetch(
      `${GATEWAY_URL}/spreadsheets/${RESPONSES_SPREADSHEET_ID}/values/${RESPONSES_RANGE}`,
      {
        headers: {
          Authorization: `Bearer ${lovableKey}`,
          "X-Connection-Api-Key": connectionKey,
        },
      },
    );

    if (!res.ok) {
      const body = await res.text();
      console.error(`Google Sheets request failed [${res.status}]: ${body}`);
      throw new Error(`No se pudo leer la hoja de cálculo [${res.status}].`);
    }

    const json = (await res.json()) as { values?: string[][] };
    const values = json.values ?? [];
    const [headerRow = [], ...rest] = values;
    const width = headerRow.length;
    const payload: ResponsesPayload = {
      headers: headerRow,
      rows: rest.map((r) => Array.from({ length: width }, (_, i) => r[i] ?? "")),
      configured: true,
    };

    cache = { at: Date.now(), data: payload };
    return payload;
  });
