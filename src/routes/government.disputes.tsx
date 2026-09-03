import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { DataTable, Pill, KpiRow } from "@/components/ui-ext/Scaffold";

export const Route = createFileRoute("/government/disputes")({
  head: () => ({ meta: [{ title: "Govt. disputes — TerraTrust AI" }] }),
  component: Page,
});

const rows = [
  { id: "D-3318", parcel: "TT-5512-AB", kind: "Ownership overlap", region: "FCT", filed: "2024-07-30", days: 61, status: "Mediation" },
  { id: "D-3301", parcel: "TT-8814-KD", kind: "Boundary marker", region: "Kaduna", filed: "2024-09-05", days: 24, status: "Open" },
  { id: "D-3289", parcel: "TT-1132-LG", kind: "Suspected fraud", region: "Lagos", filed: "2024-08-12", days: 48, status: "Resolved" },
  { id: "D-3276", parcel: "TT-2401-OY", kind: "Inheritance share", region: "Oyo", filed: "2024-06-19", days: 102, status: "Awaiting hearing" },
];

function Page() {
  return (
    <AppShell title="Active disputes" subtitle="Cross-region disputes routed to your bureau.">
      <KpiRow items={[
        { label: "Open", value: "84" },
        { label: "Avg. resolution", value: "37d" },
        { label: "Resolved YTD", value: "612" },
        { label: "Mediator backlog", value: "12" },
      ]} />
      <div className="mt-6">
        <DataTable rows={rows} columns={[
          { key: "id", label: "ID", render: r => <Link to="/disputes/$id" params={{ id: r.id }} className="font-mono text-xs hover:text-primary">{r.id}</Link> },
          { key: "parcel", label: "Parcel", render: r => <span className="font-mono text-xs">{r.parcel}</span> },
          { key: "kind", label: "Type", render: r => r.kind },
          { key: "region", label: "Region", render: r => <span className="text-muted-foreground">{r.region}</span> },
          { key: "days", label: "Days open", render: r => `${r.days}d` },
          { key: "s", label: "Status", render: r => <Pill tone={r.status === "Resolved" ? "success" : r.status === "Mediation" ? "warning" : "danger"}>{r.status}</Pill> },
        ]} />
      </div>
    </AppShell>
  );
}
