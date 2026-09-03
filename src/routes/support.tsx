import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { DataTable, KpiRow, Pill } from "@/components/ui-ext/Scaffold";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/support")({
  head: () => ({ meta: [{ title: "Support — TerraTrust AI" }] }),
  component: Page,
});

const rows = [
  { id: "TKT-8821", subject: "Cannot upload Survey Plan PDF over 12MB", category: "Documents", at: "2024-09-23", status: "Open", priority: "Medium" },
  { id: "TKT-8814", subject: "Trust score didn't update after attestations", category: "Trust score", at: "2024-09-20", status: "Resolved", priority: "Low" },
  { id: "TKT-8802", subject: "How do I transfer to a verified buyer?", category: "Transfer", at: "2024-09-18", status: "Closed", priority: "Low" },
  { id: "TKT-8791", subject: "Boundary on Kaduna farm differs from registry", category: "GIS", at: "2024-09-15", status: "Awaiting you", priority: "High" },
];

function Page() {
  return (
    <AppShell title="Support" subtitle="Reach the TerraTrust team and track your tickets."
      actions={<Link to="/support/new"><Button className="rounded-full"><Plus className="h-4 w-4" /> New ticket</Button></Link>}>
      <KpiRow items={[
        { label: "Open", value: "2" },
        { label: "Avg. response", value: "1.2h" },
        { label: "Resolved", value: "18" },
        { label: "Satisfaction", value: "4.8 / 5" },
      ]} />
      <div className="mt-6">
        <DataTable rows={rows} columns={[
          { key: "id", label: "ID", render: r => <Link to="/support/$id" params={{ id: r.id }} className="font-mono text-xs hover:text-primary">{r.id}</Link> },
          { key: "subj", label: "Subject", render: r => <Link to="/support/$id" params={{ id: r.id }} className="font-medium hover:text-primary">{r.subject}</Link> },
          { key: "cat", label: "Category", render: r => <Pill tone="info">{r.category}</Pill> },
          { key: "at", label: "Filed", render: r => <span className="text-muted-foreground">{r.at}</span> },
          { key: "p", label: "Priority", render: r => <Pill tone={r.priority === "High" ? "danger" : r.priority === "Medium" ? "warning" : "default"}>{r.priority}</Pill> },
          { key: "s", label: "Status", render: r => <Pill tone={r.status === "Resolved" || r.status === "Closed" ? "success" : "warning"}>{r.status}</Pill> },
        ]} />
      </div>
    </AppShell>
  );
}
