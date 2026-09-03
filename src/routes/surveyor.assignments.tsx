import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { DataTable, Pill, KpiRow } from "@/components/ui-ext/Scaffold";

export const Route = createFileRoute("/surveyor/assignments")({
  head: () => ({ meta: [{ title: "Assignments — TerraTrust AI" }] }),
  component: Page,
});

const rows = [
  { id: "S-2241", parcel: "TT-7188-LG", region: "Lagos", due: "2024-10-02", priority: "High", status: "In progress" },
  { id: "S-2240", parcel: "TT-9930-OY", region: "Oyo", due: "2024-10-05", priority: "Medium", status: "Scheduled" },
  { id: "S-2238", parcel: "TT-2210-KD", region: "Kaduna", due: "2024-10-09", priority: "Low", status: "Scheduled" },
  { id: "S-2236", parcel: "TT-8421-LG", region: "Lagos", due: "2024-09-28", priority: "High", status: "Awaiting review" },
  { id: "S-2230", parcel: "TT-5512-AB", region: "FCT", due: "2024-09-22", priority: "High", status: "Completed" },
];

function Page() {
  const pathname = useRouterState({ select: s => s.location.pathname });
  if (pathname !== "/surveyor/assignments") return <Outlet />;
  return (
    <AppShell title="Field assignments" subtitle="GIS verification jobs assigned to you this cycle.">
      <KpiRow items={[
        { label: "Active", value: "12" },
        { label: "Due this week", value: "4" },
        { label: "Avg. turnaround", value: "2.4d" },
        { label: "Quality score", value: "4.92 / 5" },
      ]} />
      <div className="mt-6">
        <DataTable rows={rows} columns={[
          { key: "id", label: "ID", render: r => <span className="font-mono text-xs">{r.id}</span> },
          { key: "parcel", label: "Parcel", render: r => <Link to="/surveyor/assignments/$id" params={{ id: r.id }} className="font-medium hover:text-primary">{r.parcel}</Link> },
          { key: "region", label: "Region", render: r => <span className="text-muted-foreground">{r.region}</span> },
          { key: "due", label: "Due", render: r => r.due },
          { key: "p", label: "Priority", render: r => <Pill tone={r.priority === "High" ? "danger" : r.priority === "Medium" ? "warning" : "info"}>{r.priority}</Pill> },
          { key: "s", label: "Status", render: r => <Pill tone={r.status === "Completed" ? "success" : r.status === "Awaiting review" ? "warning" : "info"}>{r.status}</Pill> },
        ]} />
      </div>
    </AppShell>
  );
}
