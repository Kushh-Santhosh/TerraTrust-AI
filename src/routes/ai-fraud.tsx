import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { AIBadge, RiskGauge, ExplainabilityPanel, AIInsightCard, VerdictBanner } from "@/components/ai/AIPrimitives";
import { SectionTitle, Pill, DataTable } from "@/components/ui-ext/Scaffold";
import { Button } from "@/components/ui/button";
import { ShieldAlert, AlertTriangle, FileWarning, Fingerprint, MapPin, ArrowUpRight } from "lucide-react";
import { fraudSignals } from "@/lib/ai-mock";

export const Route = createFileRoute("/ai-fraud")({
  head: () => ({ meta: [{ title: "AI Fraud Detection — TerraTrust AI" }] }),
  component: FraudPage,
});

const cases = [
  { id: "FC-204", parcel: "TT-7710-LG", type: "Duplicate boundary", score: 78, status: "open" as const, opened: "2026-06-22" },
  { id: "FC-198", parcel: "TT-3120-AB", type: "Forged stamp", score: 62, status: "review" as const, opened: "2026-06-19" },
  { id: "FC-192", parcel: "TT-5512-KD", type: "Signature anomaly", score: 41, status: "review" as const, opened: "2026-06-14" },
  { id: "FC-187", parcel: "TT-2210-KD", type: "Owner ID mismatch", score: 28, status: "closed" as const, opened: "2026-06-08" },
];

function FraudPage() {
  return (
    <AppShell
      title="AI Fraud Detection"
      subtitle="Continuous monitoring for forged documents, ghost parcels, and identity laundering."
      actions={<AIBadge tone="warning">3 open signals</AIBadge>}
    >
      <div className="grid gap-4 md:grid-cols-4">
        <AIInsightCard icon={<ShieldAlert className="h-3 w-3 text-warning-foreground" />} title="Open signals" value="3" hint="2 medium · 1 low" tone="warning" />
        <AIInsightCard icon={<FileWarning className="h-3 w-3 text-destructive" />} title="High-severity" value="1" hint="Duplicate polygon — TT-7710-LG" tone="danger" />
        <AIInsightCard icon={<Fingerprint className="h-3 w-3 text-primary" />} title="Models running" value="6" hint="Doc · stamp · sig · boundary · ID · network" tone="primary" />
        <AIInsightCard icon={<MapPin className="h-3 w-3 text-success" />} title="Coverage" value="100%" hint="All parcels scanned hourly" tone="success" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <VerdictBanner verdict="review" headline="One parcel requires manual review." detail="TT-7710-LG shares 12% of its polygon with TT-8421-LG. Recommend dispatching a surveyor for re-measurement." />
          <ExplainabilityPanel title="Why FC-204 was flagged" factors={fraudSignals} />

          <div>
            <SectionTitle eyebrow="Cases" title="Open & recent fraud alerts" action={<Pill tone="primary">{cases.length} cases</Pill>} />
            <DataTable
              rows={cases}
              columns={[
                { key: "id", label: "Case", render: r => <Link to="/fraud/$id" params={{ id: r.id }} className="font-medium text-foreground hover:text-primary inline-flex items-center gap-1">{r.id} <ArrowUpRight className="h-3 w-3" /></Link> },
                { key: "parcel", label: "Parcel", render: r => <span className="text-muted-foreground">{r.parcel}</span> },
                { key: "type", label: "Type", render: r => r.type },
                { key: "score", label: "AI score", render: r => <Pill tone={r.score >= 70 ? "danger" : r.score >= 40 ? "warning" : "success"}>{r.score}</Pill> },
                { key: "status", label: "Status", render: r => <Pill tone={r.status === "open" ? "danger" : r.status === "review" ? "warning" : "success"}>{r.status}</Pill> },
                { key: "opened", label: "Opened", render: r => <span className="text-muted-foreground">{r.opened}</span> },
              ]}
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="surface-card flex flex-col items-center p-6">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Portfolio fraud risk</p>
            <RiskGauge value={34} />
            <p className="mt-3 text-center text-xs text-muted-foreground">Driven primarily by FC-204 boundary overlap.</p>
          </div>
          <div className="surface-card p-5">
            <SectionTitle eyebrow="Detector mix" title="Running models" />
            <ul className="space-y-2 text-sm">
              {[
                { name: "Boundary overlap (geo-IOU)", v: "v4.2" },
                { name: "Stamp / watermark CNN", v: "v3.1" },
                { name: "Signature anomaly (siamese)", v: "v2.7" },
                { name: "Doc template integrity", v: "v3.0" },
                { name: "Identity graph clustering", v: "v1.8" },
                { name: "Owner-network anomaly", v: "v1.4" },
              ].map(m => (
                <li key={m.name} className="flex items-center justify-between rounded-lg bg-surface p-2.5 ring-1 ring-border">
                  <span className="text-foreground">{m.name}</span>
                  <Pill tone="primary">{m.v}</Pill>
                </li>
              ))}
            </ul>
            <Button variant="outline" className="mt-4 w-full"><AlertTriangle className="h-4 w-4" /> Run full re-scan</Button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
