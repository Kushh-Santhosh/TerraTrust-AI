import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { DataTable, KpiRow } from "@/components/ui-ext/Scaffold";

export const Route = createFileRoute("/government/audit")({
  head: () => ({ meta: [{ title: "Audit — TerraTrust AI" }] }),
  component: Page,
});

const rows = [
  { at: "2024-09-25 14:21", actor: "Officer K. Bello", action: "Approved permit PMT-44021", target: "TT-8421-LG", ip: "102.89.x.x" },
  { at: "2024-09-25 13:08", actor: "TerraTrust AI", action: "Flagged duplicate deed", target: "TT-5512-AB", ip: "system" },
  { at: "2024-09-25 11:42", actor: "Officer T. Owolabi", action: "Reassigned dispute D-3318 to mediator", target: "D-3318", ip: "102.89.x.x" },
  { at: "2024-09-24 16:30", actor: "Officer A. Nwosu", action: "Bulk import 1,402 parcels", target: "Rivers State", ip: "102.89.x.x" },
  { at: "2024-09-24 09:15", actor: "Admin", action: "Granted verifier role", target: "u_8821", ip: "102.89.x.x" },
];

function Page() {
  return (
    <AppShell title="Audit log" subtitle="Immutable record of every officer and AI action on the registry.">
      <KpiRow items={[
        { label: "Actions today", value: "1,284" },
        { label: "Officers active", value: "62" },
        { label: "AI actions", value: "9,184" },
        { label: "Anomalies", value: "0" },
      ]} />
      <div className="mt-6">
        <DataTable rows={rows} columns={[
          { key: "at", label: "Timestamp", render: r => <span className="font-mono text-xs">{r.at}</span> },
          { key: "actor", label: "Actor", render: r => <span className="font-medium">{r.actor}</span> },
          { key: "action", label: "Action", render: r => r.action },
          { key: "target", label: "Target", render: r => <span className="font-mono text-xs">{r.target}</span> },
          { key: "ip", label: "IP", render: r => <span className="text-muted-foreground">{r.ip}</span> },
        ]} />
      </div>
    </AppShell>
  );
}
