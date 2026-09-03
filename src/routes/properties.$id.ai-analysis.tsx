import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Crumbs, KpiRow, Pill } from "@/components/ui-ext/Scaffold";
import { Sparkles, TrendingUp, ShieldCheck, AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/properties/$id/ai-analysis")({
  head: () => ({ meta: [{ title: "AI Analysis — TerraTrust AI" }] }),
  component: Page,
});

const factors = [
  { label: "Location score", value: 94, note: "Premium corridor — Lekki Phase 1" },
  { label: "Document completeness", value: 100, note: "Deed, survey, tax, ID all on file" },
  { label: "Boundary integrity", value: 97, note: "GIS match within 0.4m of registry" },
  { label: "Ownership clarity", value: 99, note: "Single owner since 2019" },
  { label: "Market liquidity", value: 88, note: "Comparable sales every 14 days" },
  { label: "Risk indicators", value: 96, note: "No flags, no disputes" },
];

function Page() {
  const { id } = Route.useParams();
  return (
    <AppShell title="AI analysis" subtitle="How TerraTrust AI arrived at this property's trust score and valuation.">
      <Crumbs items={[{ label: "Properties", to: "/properties" }, { label: id, to: "/properties/$id" }, { label: "AI Analysis" }]} />
      <KpiRow items={[
        { label: "Trust score", value: "96", hint: "+4 since last analysis" },
        { label: "AI confidence", value: "92%", hint: "high" },
        { label: "AI valuation", value: "$285k", hint: "± $14k" },
        { label: "Model", value: "Geo-LLM v2.1" },
      ]} />
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="surface-card p-5 lg:col-span-2">
          <h3 className="flex items-center gap-2 font-display text-xl"><Sparkles className="h-5 w-5 text-primary" /> Score factors</h3>
          <div className="mt-4 space-y-3">
            {factors.map(f => (
              <div key={f.label}>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{f.label}</p>
                  <p className="text-sm text-muted-foreground">{f.value}/100</p>
                </div>
                <div className="mt-1 h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-gradient-to-r from-primary to-accent" style={{ width: `${f.value}%` }} />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{f.note}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <div className="surface-card p-5">
            <p className="flex items-center gap-2 text-sm font-medium"><ShieldCheck className="h-4 w-4 text-success" /> Strengths</p>
            <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
              <li>• Continuous ownership since 2019</li>
              <li>• All documents pass forensic OCR</li>
              <li>• Boundary matches registry &amp; satellite</li>
            </ul>
          </div>
          <div className="surface-card p-5">
            <p className="flex items-center gap-2 text-sm font-medium"><AlertTriangle className="h-4 w-4 text-warning-foreground" /> Watchouts</p>
            <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
              <li>• Tax clearance expires Q4 2025</li>
              <li>• 1 neighbour attestation pending</li>
            </ul>
          </div>
          <div className="surface-card p-5">
            <p className="flex items-center gap-2 text-sm font-medium"><TrendingUp className="h-4 w-4 text-primary" /> Outlook</p>
            <p className="mt-2 text-xs text-muted-foreground">+6.4% projected appreciation in 12 months based on regional comparables.</p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
