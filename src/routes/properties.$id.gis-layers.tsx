import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Crumbs, Pill } from "@/components/ui-ext/Scaffold";
import { useState } from "react";

export const Route = createFileRoute("/properties/$id/gis-layers")({
  head: () => ({ meta: [{ title: "GIS layers — TerraTrust AI" }] }),
  component: Page,
});

const layers = [
  { name: "Cadastral parcels", source: "Lagos State Bureau", on: true, color: "oklch(0.55 0.18 250)" },
  { name: "Zoning (residential)", source: "Lagos Urban Planning", on: true, color: "oklch(0.65 0.18 60)" },
  { name: "Flood risk", source: "NOAA + local", on: false, color: "oklch(0.55 0.18 30)" },
  { name: "Power grid proximity", source: "PHCN open data", on: true, color: "oklch(0.7 0.16 90)" },
  { name: "Road network", source: "OpenStreetMap", on: true, color: "oklch(0.4 0.02 250)" },
  { name: "Schools (1km)", source: "Lagos MoE", on: false, color: "oklch(0.6 0.16 200)" },
  { name: "Hospitals (3km)", source: "Lagos MoH", on: false, color: "oklch(0.6 0.18 350)" },
];

function Page() {
  const { id } = Route.useParams();
  const [state, setState] = useState(layers);
  return (
    <AppShell title="GIS layers" subtitle="Toggle data layers and inspect what surrounds this parcel.">
      <Crumbs items={[{ label: "Properties", to: "/properties" }, { label: id, to: "/properties/$id" }, { label: "GIS Layers" }]} />
      <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
        <div className="surface-card p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Layers</p>
          <div className="mt-3 space-y-2">
            {state.map((l, i) => (
              <label key={l.name} className="flex items-center gap-3 rounded-lg border border-border p-2.5 text-sm">
                <input type="checkbox" checked={l.on} onChange={() => setState(state.map((x, j) => j === i ? { ...x, on: !x.on } : x))} />
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: l.color }} />
                <div className="flex-1">
                  <p className="font-medium">{l.name}</p>
                  <p className="text-[10px] text-muted-foreground">{l.source}</p>
                </div>
              </label>
            ))}
          </div>
        </div>
        <div className="surface-card relative h-[65vh] overflow-hidden">
          <svg viewBox="0 0 800 500" className="h-full w-full">
            <pattern id="grid-gis" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M32 0H0V32" fill="none" stroke="oklch(0.9 0.01 250)" /></pattern>
            <rect width="800" height="500" fill="url(#grid-gis)" />
            {state.filter(l => l.on).map((l, i) => (
              <g key={l.name} opacity="0.55">
                <rect x={80 + i * 30} y={60 + i * 20} width={500 - i * 20} height={320 - i * 30} fill={l.color} fillOpacity="0.08" stroke={l.color} strokeWidth="1.5" />
              </g>
            ))}
            <polygon points="280,180 540,170 580,360 320,380" fill="oklch(0.55 0.18 250 / 0.15)" stroke="oklch(0.55 0.18 250)" strokeWidth="3" />
          </svg>
          <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
            {state.filter(l => l.on).map(l => <Pill key={l.name} tone="info">{l.name}</Pill>)}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
