import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { DataTable, Pill } from "@/components/ui-ext/Scaffold";
import { FileText, Plus, Download } from "lucide-react";

export const Route = createFileRoute("/reports")({
  head: () => ({ meta: [{ title: "Reports — TerraTrust AI" }] }),
  component: Page,
});

const reports = [
  { id: "R-2241", title: "Lagos regional valuation Q3 2024", kind: "Valuation", scope: "Lagos", generated: "2024-09-22", size: "2.4 MB", status: "Ready" },
  { id: "R-2240", title: "Boundary integrity audit — Bodija Estate", kind: "GIS", scope: "Oyo", generated: "2024-09-20", size: "1.1 MB", status: "Ready" },
  { id: "R-2239", title: "Fraud watch — September 2024", kind: "Fraud", scope: "National", generated: "2024-09-18", size: "3.8 MB", status: "Ready" },
  { id: "R-2237", title: "Citizen portfolio statement", kind: "Portfolio", scope: "Personal", generated: "2024-09-15", size: "640 KB", status: "Ready" },
  { id: "R-2233", title: "Mortgage eligibility — TT-8421-LG", kind: "Bank", scope: "Lekki Phase 1", generated: "2024-09-10", size: "880 KB", status: "Ready" },
  { id: "R-2231", title: "Dispute resolution log", kind: "Disputes", scope: "FCT Abuja", generated: "2024-09-08", size: "1.6 MB", status: "Archived" },
];

function Page() {
  return (
    <AppShell title="Reports" subtitle="Auto-generated and on-demand reports across your portfolio."
      actions={<Link to="/reports/new"><Button className="rounded-full"><Plus className="h-4 w-4" /> New report</Button></Link>}>
      <DataTable rows={reports} columns={[
        { key: "id", label: "ID", render: r => <span className="font-mono text-xs">{r.id}</span> },
        { key: "title", label: "Report", render: r => <Link to="/reports/$id" params={{ id: r.id }} className="flex items-center gap-2 font-medium hover:text-primary"><FileText className="h-4 w-4 text-muted-foreground" />{r.title}</Link> },
        { key: "kind", label: "Type", render: r => <Pill tone="info">{r.kind}</Pill> },
        { key: "scope", label: "Scope", render: r => <span className="text-muted-foreground">{r.scope}</span> },
        { key: "generated", label: "Generated", render: r => <span className="text-muted-foreground">{r.generated}</span> },
        { key: "size", label: "Size", render: r => <span className="text-muted-foreground">{r.size}</span> },
        { key: "status", label: "Status", render: r => <Pill tone={r.status === "Ready" ? "success" : "default"}>{r.status}</Pill> },
        { key: "dl", label: "", render: () => <Button size="sm" variant="ghost"><Download className="h-4 w-4" /></Button>, className: "text-right" },
      ]} />
    </AppShell>
  );
}
