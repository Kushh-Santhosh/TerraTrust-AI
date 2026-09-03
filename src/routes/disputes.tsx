import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { DataTable, Pill, KpiRow } from "@/components/ui-ext/Scaffold";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/disputes")({
  head: () => ({ meta: [{ title: "Disputes — TerraTrust AI" }] }),
  component: Page,
});

const disputes = [
  { id: "D-3318", parcel: "TT-5512-AB", title: "Overlapping ownership claim", filed: "2024-07-30", status: "Mediation", days: 61 },
  { id: "D-3301", parcel: "TT-8814-KD", title: "Disputed boundary marker", filed: "2024-09-05", status: "Open", days: 24 },
  { id: "D-3289", parcel: "TT-1132-LG", title: "Fraudulent CofO suspected", filed: "2024-08-12", status: "Resolved", days: 48 },
  { id: "D-3276", parcel: "TT-2401-OY", title: "Inheritance share dispute", filed: "2024-06-19", status: "Awaiting hearing", days: 102 },
];

function Page() {
  return (
    <AppShell title="Disputes" subtitle="Track and resolve property disputes with full audit history."
      actions={<Link to="/disputes/new"><Button className="rounded-full"><Plus className="h-4 w-4" /> File dispute</Button></Link>}>
      <KpiRow items={[
        { label: "Open", value: "1" },
        { label: "In mediation", value: "1" },
        { label: "Resolved YTD", value: "612" },
        { label: "Avg. resolution", value: "37d" },
      ]} />
      <div className="mt-6">
        <DataTable rows={disputes} columns={[
          { key: "id", label: "ID", render: r => <span className="font-mono text-xs">{r.id}</span> },
          { key: "title", label: "Dispute", render: r => <Link to="/disputes/$id" params={{ id: r.id }} className="font-medium hover:text-primary">{r.title}</Link> },
          { key: "parcel", label: "Parcel", render: r => <span className="font-mono text-xs">{r.parcel}</span> },
          { key: "filed", label: "Filed", render: r => <span className="text-muted-foreground">{r.filed}</span> },
          { key: "days", label: "Days open", render: r => <span className="text-muted-foreground">{r.days}d</span> },
          { key: "status", label: "Status", render: r => <Pill tone={r.status === "Resolved" ? "success" : r.status === "Mediation" ? "warning" : "danger"}>{r.status}</Pill> },
        ]} />
      </div>
    </AppShell>
  );
}
