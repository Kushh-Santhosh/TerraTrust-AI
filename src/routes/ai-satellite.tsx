import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { AIBadge, AIInsightCard, ConfidenceMeter } from "@/components/ai/AIPrimitives";
import { SectionTitle, Pill } from "@/components/ui-ext/Scaffold";
import { Satellite, Calendar, Layers } from "lucide-react";
import { Line, LineChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/ai-satellite")({
  head: () => ({ meta: [{ title: "AI Satellite Comparison — TerraTrust AI" }] }),
  component: SatellitePage,
});

const epochs = [
  { d: "2018-Q1", change: 2 },
  { d: "2019-Q1", change: 4 },
  { d: "2020-Q1", change: 6 },
  { d: "2021-Q1", change: 7 },
  { d: "2022-Q1", change: 8 },
  { d: "2023-Q1", change: 10 },
  { d: "2024-Q1", change: 11 },
  { d: "2025-Q1", change: 12 },
  { d: "2026-Q2", change: 13 },
];

const tile = "https://images.unsplash.com/photo-1542601906-1f3f4d1c5b2d?auto=format&fit=crop&w=720&q=70";

function SatellitePage() {
  return (
    <AppShell
      title="Satellite Comparison"
      subtitle="Multi-temporal change detection across 12 imagery epochs."
      actions={<AIBadge>12 epochs · 8 years</AIBadge>}
    >
      <div className="grid gap-4 md:grid-cols-4">
        <AIInsightCard icon={<Satellite className="h-3 w-3 text-primary" />} title="Latest epoch" value="25 Jun 2026" hint="Pleiades 0.5m" tone="primary" />
        <AIInsightCard icon={<Calendar className="h-3 w-3 text-primary" />} title="Coverage span" value="8.2 yrs" hint="2018 → 2026" tone="accent" />
        <AIInsightCard icon={<Layers className="h-3 w-3 text-primary" />} title="Built-up Δ" value="+13%" hint="vs 2018 baseline" tone="warning" />
        <AIInsightCard title="Encroachment events" value="0" hint="No unauthorized changes" tone="success" />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {[
          { label: "Then · 2018", date: "12 Mar 2018", cloud: "8%", tone: "muted" },
          { label: "Mid · 2022", date: "14 Apr 2022", cloud: "2%", tone: "muted" },
          { label: "Now · 2026", date: "25 Jun 2026", cloud: "0%", tone: "primary" },
        ].map((t, i) => (
          <div key={i} className="surface-card overflow-hidden p-0">
            <div className="relative aspect-square w-full overflow-hidden">
              <img src={tile} alt="Satellite tile" className="absolute inset-0 h-full w-full object-cover" style={{ filter: i === 0 ? "saturate(0.65) hue-rotate(-10deg) brightness(0.95)" : i === 1 ? "saturate(0.85)" : undefined }} />
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <polygon points="35,30 70,32 72,68 33,66" fill="oklch(0.55 0.1 180 / 0.18)" stroke="oklch(0.45 0.08 195)" strokeWidth="0.6" strokeDasharray="2 1.5" />
              </svg>
              <div className="absolute left-3 top-3"><Pill tone={t.tone === "primary" ? "primary" : "default"}>{t.label}</Pill></div>
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] text-white drop-shadow">
                <span className="rounded bg-black/40 px-1.5 py-0.5">{t.date}</span>
                <span className="rounded bg-black/40 px-1.5 py-0.5">cloud {t.cloud}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="surface-card p-6">
          <SectionTitle eyebrow="Change index" title="Built-up footprint change since 2018" />
          <div className="h-56">
            <ResponsiveContainer>
              <LineChart data={epochs}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0 0)" />
                <XAxis dataKey="d" tickLine={false} axisLine={false} className="text-xs" />
                <YAxis tickLine={false} axisLine={false} className="text-xs" />
                <Tooltip />
                <Line type="monotone" dataKey="change" stroke="oklch(0.45 0.08 195)" strokeWidth={2} dot={{ r: 4, fill: "oklch(0.45 0.08 195)" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">Built-up coverage rose from baseline → 13% expansion. All changes inside parcel boundary — no encroachment detected.</p>
        </div>
        <div className="surface-card p-5">
          <SectionTitle eyebrow="Per-epoch confidence" title="Imagery quality" />
          <div className="space-y-3">
            <ConfidenceMeter value={98} label="2026 Q2" hint="0% cloud · 0.5m" />
            <ConfidenceMeter value={94} label="2025 Q1" hint="2% cloud" />
            <ConfidenceMeter value={86} label="2022 Q1" hint="Sentinel-2 · 10m" />
            <ConfidenceMeter value={72} label="2018 Q1" hint="Landsat-8 · 30m" />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
