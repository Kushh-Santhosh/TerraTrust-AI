import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { DataTable, Pill } from "@/components/ui-ext/Scaffold";
import { Button } from "@/components/ui/button";
import { Plus, Copy } from "lucide-react";

export const Route = createFileRoute("/admin/api-keys")({
  head: () => ({ meta: [{ title: "API keys — Admin" }] }),
  component: Page,
});

const rows = [
  { name: "Lagos Land Bureau", token: "tt_live_LG_8f9a…3c21", scopes: ["registry:read","registry:write"], created: "2024-01-12", last: "2024-09-25 12:08" },
  { name: "Access Bank Origination", token: "tt_live_BK_a112…44ee", scopes: ["passport:read"], created: "2024-05-30", last: "2024-09-25 14:01" },
  { name: "FCT Land Registry", token: "tt_live_AB_77bc…21de", scopes: ["registry:read","disputes:write"], created: "2024-02-08", last: "2024-09-24 19:44" },
  { name: "Open Data Portal", token: "tt_live_OD_e221…9911", scopes: ["public:read"], created: "2024-07-04", last: "2024-09-25 13:50" },
];

function Page() {
  return (
    <AppShell title="API keys" subtitle="Tokens that grant programmatic access to TerraTrust."
      actions={<Button className="rounded-full"><Plus className="h-4 w-4" /> Create key</Button>}>
      <DataTable rows={rows} columns={[
        { key: "n", label: "Owner", render: r => <span className="font-medium">{r.name}</span> },
        { key: "t", label: "Token", render: r => <span className="flex items-center gap-2 font-mono text-xs">{r.token} <Copy className="h-3 w-3 cursor-pointer text-muted-foreground" /></span> },
        { key: "s", label: "Scopes", render: r => <div className="flex flex-wrap gap-1">{r.scopes.map(s => <Pill key={s} tone="info">{s}</Pill>)}</div> },
        { key: "c", label: "Created", render: r => <span className="text-muted-foreground">{r.created}</span> },
        { key: "l", label: "Last used", render: r => <span className="text-muted-foreground">{r.last}</span> },
      ]} />
    </AppShell>
  );
}
