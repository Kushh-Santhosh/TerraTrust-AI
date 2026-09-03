import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { DataTable, Pill } from "@/components/ui-ext/Scaffold";
import { Button } from "@/components/ui/button";
import { Plus, Copy } from "lucide-react";

export const Route = createFileRoute("/api-tokens")({
  head: () => ({ meta: [{ title: "API tokens — TerraTrust AI" }] }),
  component: Page,
});

const rows = [
  { name: "My desktop app", token: "tt_pk_LIVE_amara_882f…01", scopes: ["passport:read"], created: "2024-07-01", last: "2024-09-24" },
  { name: "Mobile prototype", token: "tt_pk_TEST_amara_991a…22", scopes: ["passport:read","documents:write"], created: "2024-09-12", last: "—" },
];

function Page() {
  return (
    <AppShell title="API tokens" subtitle="Personal tokens for connecting your apps to TerraTrust."
      actions={<Button className="rounded-full"><Plus className="h-4 w-4" /> New token</Button>}>
      <DataTable rows={rows} columns={[
        { key: "n", label: "Name", render: r => <span className="font-medium">{r.name}</span> },
        { key: "t", label: "Token", render: r => <span className="flex items-center gap-2 font-mono text-xs">{r.token}<Copy className="h-3 w-3 cursor-pointer text-muted-foreground" /></span> },
        { key: "s", label: "Scopes", render: r => <div className="flex flex-wrap gap-1">{r.scopes.map(s => <Pill key={s} tone="info">{s}</Pill>)}</div> },
        { key: "c", label: "Created", render: r => <span className="text-muted-foreground">{r.created}</span> },
        { key: "l", label: "Last used", render: r => <span className="text-muted-foreground">{r.last}</span> },
      ]} />
    </AppShell>
  );
}
