import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Crumbs, Pill } from "@/components/ui-ext/Scaffold";
import { Button } from "@/components/ui/button";
import { Layers, Calendar, Maximize2 } from "lucide-react";

export const Route = createFileRoute("/properties/$id/satellite")({
  head: () => ({ meta: [{ title: "Satellite — TerraTrust AI" }] }),
  component: Page,
});

const snapshots = [
  { date: "2024-09-01", source: "Sentinel-2", cloud: "3%" },
  { date: "2024-03-04", source: "Planet Labs", cloud: "0%" },
  { date: "2023-08-22", source: "Sentinel-2", cloud: "8%" },
  { date: "2022-12-15", source: "Maxar", cloud: "1%" },
];

function Page() {
  const { id } = Route.useParams();
  return (
    <AppShell title="Satellite view" subtitle="High-resolution imagery & change detection across years."
      actions={<><Button variant="outline"><Calendar className="h-4 w-4" /> Compare dates</Button><Button><Maximize2 className="h-4 w-4" /> Full screen</Button></>}>
      <Crumbs items={[{ label: "Properties", to: "/properties" }, { label: id, to: "/properties/$id" }, { label: "Satellite" }]} />
      <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
        <div className="surface-card relative overflow-hidden p-0">
          <svg viewBox="0 0 800 500" className="h-[60vh] w-full">
            <defs>
              <radialGradient id="terrain" cx="50%" cy="50%"><stop offset="0%" stopColor="oklch(0.45 0.06 140)" /><stop offset="100%" stopColor="oklch(0.32 0.05 140)" /></radialGradient>
            </defs>
            <rect width="800" height="500" fill="url(#terrain)" />
            {Array.from({ length: 40 }).map((_, i) => (
              <circle key={i} cx={Math.random() * 800} cy={Math.random() * 500} r={2 + Math.random() * 4} fill="oklch(0.55 0.06 140 / 0.6)" />
            ))}
            <polygon points="280,180 540,170 580,360 320,380" fill="oklch(0.7 0.18 60 / 0.2)" stroke="oklch(0.75 0.18 60)" strokeWidth="3" />
            <circle cx="430" cy="270" r="6" fill="oklch(0.95 0.05 60)" />
            <text x="450" y="270" fill="white" fontSize="14" fontFamily="ui-monospace">TT-8421-LG</text>
          </svg>
          <div className="absolute right-4 top-4 flex gap-2">
            <Pill tone="info"><Layers className="h-3 w-3" /> Sentinel-2 · 2024-09-01</Pill>
          </div>
        </div>
        <div className="space-y-3">
          <p className="text-xs font-medium text-muted-foreground">Available snapshots</p>
          {snapshots.map(s => (
            <button key={s.date} className="surface-card w-full p-3 text-left transition hover:shadow-[var(--shadow-elev)]">
              <p className="text-sm font-medium">{s.date}</p>
              <p className="text-xs text-muted-foreground">{s.source} · cloud {s.cloud}</p>
            </button>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
