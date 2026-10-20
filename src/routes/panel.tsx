import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Download, Loader2, Lock, RefreshCw, Search } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { fetchFormResponses, type ResponsesPayload } from "@/lib/sheets.functions";

export const Route = createFileRoute("/panel")({
  head: () => ({
    meta: [
      { title: "Panel de respuestas | Vigotsky English School" },
      {
        name: "description",
        content: "Panel privado de solicitudes de informes de Vigotsky English School.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Panel de respuestas | Vigotsky English School" },
      {
        property: "og:description",
        content: "Acceso privado al panel de solicitudes de informes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Panel,
});

function parseDate(value: string): Date | null {
  if (!value) return null;
  const iso = new Date(value);
  if (!Number.isNaN(iso.getTime())) return iso;
  const m = value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (m) return new Date(Number(m[3]), Number(m[2]) - 1, Number(m[1]));
  return null;
}

const weekKey = (d: Date) => {
  const start = new Date(d);
  start.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  return start.toISOString().slice(0, 10);
};

function Panel() {
  const load = useServerFn(fetchFormResponses);
  const [password, setPassword] = useState("");
  const [data, setData] = useState<ResponsesPayload | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  const submit = async (ev?: React.FormEvent) => {
    ev?.preventDefault();
    setLoading(true);
    setError("");
    try {
      const result = await load({ data: { password } });
      setData(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo cargar la información.");
    } finally {
      setLoading(false);
    }
  };

  const stats = useMemo(() => {
    if (!data) return null;
    const rows = data.rows;
    const dates = rows.map((r) => parseDate(r[0] ?? "")).filter(Boolean) as Date[];
    const now = Date.now();
    const within = (days: number) =>
      dates.filter((d) => now - d.getTime() <= days * 86_400_000).length;

    const weeks = new Map<string, number>();
    dates.forEach((d) => weeks.set(weekKey(d), (weeks.get(weekKey(d)) ?? 0) + 1));
    const chart = [...weeks.entries()]
      .sort((a, b) => a[0].localeCompare(b[0]))
      .slice(-12)
      .map(([k, v]) => ({
        semana: new Date(k).toLocaleDateString("es-MX", { day: "2-digit", month: "short" }),
        solicitudes: v,
      }));

    const idx = data.headers.findIndex((h) => /nivel|grado|inter|program/i.test(h));
    const breakdown = new Map<string, number>();
    if (idx >= 0)
      rows.forEach((r) => {
        const v = (r[idx] ?? "").trim() || "Sin especificar";
        breakdown.set(v, (breakdown.get(v) ?? 0) + 1);
      });

    return {
      total: rows.length,
      last7: within(7),
      last30: within(30),
      chart,
      breakdown: [...breakdown.entries()].sort((a, b) => b[1] - a[1]),
    };
  }, [data]);

  const filtered = useMemo(() => {
    if (!data) return [];
    const q = query.trim().toLowerCase();
    if (!q) return data.rows;
    return data.rows.filter((r) => r.some((c) => c.toLowerCase().includes(q)));
  }, [data, query]);

  const downloadCsv = () => {
    if (!data) return;
    const esc = (v: string) => `"${v.replace(/"/g, '""')}"`;
    const csv = [data.headers, ...filtered].map((r) => r.map(esc).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([`\uFEFF${csv}`], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "respuestas-vigotsky.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-navy px-6 text-background">
        <form
          onSubmit={submit}
          className="w-full max-w-sm rounded-3xl border border-background/10 bg-background/5 p-8 backdrop-blur-sm"
        >
          <Lock className="h-7 w-7 text-aqua" strokeWidth={1.5} />
          <h1 className="mt-5 font-display text-2xl font-extrabold">Panel de respuestas</h1>
          <p className="mt-2 text-sm text-background/60">
            Acceso exclusivo del equipo de la escuela.
          </p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="mt-6 w-full rounded-xl border border-background/20 bg-background/5 px-4 py-3 text-sm text-background placeholder:text-background/40 outline-none focus:border-aqua"
          />
          {error && <p className="mt-3 text-xs text-brandred">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brandred px-6 py-3 text-sm font-bold text-background disabled:opacity-60"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Entrar
          </button>
          <Link to="/" className="mt-5 block text-center text-xs text-background/50 hover:text-aqua">
            Volver al sitio
          </Link>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-navy text-background">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-aqua">Panel privado</p>
            <h1 className="mt-2 font-display text-2xl font-extrabold">Solicitudes de informes</h1>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => submit()}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-full border border-background/20 px-5 py-2.5 text-xs font-bold disabled:opacity-60"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Actualizar
            </button>
            <button
              onClick={downloadCsv}
              className="inline-flex items-center gap-2 rounded-full bg-brandred px-5 py-2.5 text-xs font-bold text-background"
            >
              <Download className="h-4 w-4" />
              Descargar CSV
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        {!data.configured && (
          <p className="mb-8 rounded-2xl border border-border bg-secondary p-5 text-sm">
            {data.notice}
          </p>
        )}

        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { label: "Total de solicitudes", value: stats?.total ?? 0 },
            { label: "Últimos 7 días", value: stats?.last7 ?? 0 },
            { label: "Últimos 30 días", value: stats?.last30 ?? 0 },
          ].map((c) => (
            <div key={c.label} className="rounded-2xl border border-border bg-card p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                {c.label}
              </p>
              <p className="mt-3 font-display text-4xl font-black">{c.value}</p>
            </div>
          ))}
        </div>

        {stats && stats.chart.length > 0 && (
          <div className="mt-8 rounded-2xl border border-border bg-card p-6">
            <p className="text-sm font-bold">Solicitudes por semana</p>
            <div className="mt-6 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.chart}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
                  <XAxis dataKey="semana" tickLine={false} axisLine={false} fontSize={12} />
                  <YAxis allowDecimals={false} tickLine={false} axisLine={false} fontSize={12} />
                  <Tooltip cursor={{ opacity: 0.1 }} />
                  <Bar dataKey="solicitudes" radius={[6, 6, 0, 0]} className="fill-accent" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {stats && stats.breakdown.length > 0 && (
          <div className="mt-8 rounded-2xl border border-border bg-card p-6">
            <p className="text-sm font-bold">Interés por nivel</p>
            <ul className="mt-5 space-y-3">
              {stats.breakdown.map(([label, count]) => (
                <li key={label} className="flex items-center gap-4">
                  <span className="w-40 shrink-0 truncate text-sm">{label}</span>
                  <span className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
                    <span
                      className="block h-full rounded-full bg-accent"
                      style={{ width: `${(count / stats.total) * 100}%` }}
                    />
                  </span>
                  <span className="w-8 text-right text-sm font-bold">{count}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-8 rounded-2xl border border-border bg-card p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm font-bold">Respuestas ({filtered.length})</p>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar por nombre o correo"
                className="w-64 rounded-full border border-border bg-background py-2.5 pl-9 pr-4 text-sm outline-none focus:border-accent"
              />
            </div>
          </div>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                  {data.headers.map((h) => (
                    <th key={h} className="px-3 py-3 font-bold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((r, i) => (
                  <tr key={i} className="border-b border-border/60">
                    {r.map((c, j) => (
                      <td key={j} className="max-w-xs truncate px-3 py-3">
                        {c}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <p className="py-10 text-center text-sm text-muted-foreground">
                Todavía no hay respuestas para mostrar.
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
