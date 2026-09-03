import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { KpiRow, DataTable, Pill } from "@/components/ui-ext/Scaffold";
import { Button } from "@/components/ui/button";
import { ShieldAlert, ExternalLink, Download } from "lucide-react";

export const Route = createFileRoute("/fraud")({
  head: () => ({ meta: [{ title: "Fraud Detection — TerraTrust AI" }] }),
  component: FraudPage,
});

const cases = [
  { id: "F-9821", parcel: "TT-5512-AB", region: "FCT Abuja", risk: 92, kind: "Duplicate deed", flagged: "2024-09-21", status: "Open" },
  { id: "F-9784", parcel: "TT-7710-KN", region: "Kano", risk: 78, kind: "Boundary overlap", flagged: "2024-09-18", status: "Investigating" },
  { id: "F-9740", parcel: "TT-4421-RV", region: "Rivers", risk: 64, kind: "Forged signature (OCR)", flagged: "2024-09-15", status: "Open" },
  { id: "F-9712", parcel: "TT-2200-LG", region: "Lagos", risk: 55, kind: "Owner identity mismatch", flagged: "2024-09-12", status: "Under review" },
  { id: "F-9698", parcel: "TT-1188-OY", region: "Oyo", risk: 33, kind: "Stale survey plan", flagged: "2024-09-10", status: "Closed" },
];

function FraudPage() {
  return (
    <AppShell title="Fraud Detection" subtitle="AI-flagged anomalies across ownership, boundaries, and documents."
      actions={<Button variant="outline" className="rounded-full"><Download className="h-4 w-4" /> Export CSV</Button>}>
      <KpiRow items={[
        { label: "Open cases", value: "27", hint: "↓ 9 vs last week" },
        { label: "Avg. risk score", value: "61", hint: "across open cases" },
        { label: "Resolved YTD", value: "412", hint: "94% closed within 14d" },
        { label: "AI precision", value: "97.2%", hint: "true-positive rate" },
      ]} />
      <div className="mt-6">
        <DataTable rows={cases} columns={[
          { key: "id", label: "Case", render: r => <span className="font-mono text-xs">{r.id}</span> },
          { key: "parcel", label: "Parcel", render: r => <Link to="/properties/$id" params={{ id: "p_001" }} className="font-medium hover:text-primary">{r.parcel}</Link> },
          { key: "region", label: "Region", render: r => <span className="text-muted-foreground">{r.region}</span> },
          { key: "kind", label: "Anomaly", render: r => <span className="flex items-center gap-1.5"><ShieldAlert className="h-3.5 w-3.5 text-destructive" />{r.kind}</span> },
          { key: "risk", label: "Risk", render: r => <Pill tone={r.risk > 80 ? "danger" : r.risk > 60 ? "warning" : "info"}>{r.risk}</Pill> },
          { key: "flagged", label: "Flagged", render: r => <span className="text-muted-foreground">{r.flagged}</span> },
          { key: "status", label: "Status", render: r => <Pill tone={r.status === "Closed" ? "success" : r.status === "Investigating" ? "warning" : "danger"}>{r.status}</Pill> },
          { key: "action", label: "", render: r => <Link to="/fraud/$id" params={{ id: r.id }} className="inline-flex items-center gap-1 text-xs text-primary">Open<ExternalLink className="h-3 w-3" /></Link>, className: "text-right" },
        ]} />
      </div>
    </AppShell>
  );
}
