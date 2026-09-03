import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Crumbs, KpiRow } from "@/components/ui-ext/Scaffold";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/properties/$id/boundary")({
  head: () => ({ meta: [{ title: "Boundary comparison — TerraTrust AI" }] }),
  component: Page,
});

function Page() {
  const { id } = Route.useParams();
  return (
    <AppShell title="Boundary comparison" subtitle="Compare claimed boundary, registry boundary, and live satellite imagery."
      actions={<Button variant="outline">Download GeoJSON</Button>}>
      <Crumbs items={[{ label: "Properties", to: "/properties" }, { label: id, to: "/properties/$id" }, { label: "Boundary" }]} />
      <KpiRow items={[
        { label: "Registry match", value: "99.6%" },
        { label: "Satellite match", value: "98.1%" },
        { label: "Max deviation", value: "0.4m" },
        { label: "Confidence", value: "High" },
      ]} />
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {[
          { label: "Claimed boundary", color: "oklch(0.55 0.18 250)" },
          { label: "Registry boundary", color: "oklch(0.55 0.18 150)" },
          { label: "Satellite-derived", color: "oklch(0.65 0.18 60)" },
        ].map(b => (
          <div key={b.label} className="surface-card p-4">
            <p className="text-xs font-medium text-muted-foreground">{b.label}</p>
            <svg viewBox="0 0 200 160" className="mt-2 h-44 w-full rounded-lg bg-muted/40">
              <pattern id={`p-${b.label}`} width="16" height="16" patternUnits="userSpaceOnUse"><path d="M16 0H0V16" fill="none" stroke="oklch(0.9 0.01 250)" /></pattern>
              <rect width="200" height="160" fill={`url(#p-${b.label})`} />
              <polygon points="55,40 150,38 165,110 70,118" fill={`${b.color}33`} stroke={b.color} strokeWidth="2" />
            </svg>
          </div>
        ))}
      </div>
      <div className="surface-card mt-6 p-5">
        <h3 className="font-display text-xl">Overlay comparison</h3>
        <svg viewBox="0 0 400 240" className="mt-3 h-64 w-full rounded-lg bg-muted/40">
          <pattern id="op" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="oklch(0.9 0.01 250)" /></pattern>
          <rect width="400" height="240" fill="url(#op)" />
          <polygon points="120,60 290,58 310,180 140,188" fill="oklch(0.55 0.18 250 / 0.18)" stroke="oklch(0.55 0.18 250)" strokeWidth="2" />
          <polygon points="122,62 292,58 308,178 142,186" fill="none" stroke="oklch(0.55 0.18 150)" strokeWidth="2" strokeDasharray="6 4" />
          <polygon points="121,61 291,59 309,179 141,187" fill="none" stroke="oklch(0.65 0.18 60)" strokeWidth="2" strokeDasharray="2 3" />
        </svg>
        <p className="mt-3 text-xs text-muted-foreground">All three boundaries align within tolerance. No anomalies detected.</p>
      </div>
    </AppShell>
  );
}
