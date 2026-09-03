import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { DataTable, KpiRow, Pill } from "@/components/ui-ext/Scaffold";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/admin/users")({
  head: () => ({ meta: [{ title: "Users — Admin" }] }),
  component: Page,
});

const rows = [
  { name: "Amara Okonkwo", email: "amara@terratrust.ai", role: "Citizen", region: "Lagos", joined: "2024-03-12", status: "Active" },
  { name: "Idris Alabi", email: "idris@surveyor.ng", role: "Surveyor", region: "Lagos", joined: "2023-11-04", status: "Active" },
  { name: "Officer K. Bello", email: "kbello@lagos.gov.ng", role: "Officer", region: "Lagos", joined: "2022-08-19", status: "Active" },
  { name: "Mediator J. Adeyemi", email: "jadeyemi@fct.gov.ng", role: "Verifier", region: "FCT", joined: "2024-01-22", status: "Active" },
  { name: "Access Bank Origination", email: "ops@accessbank.com", role: "Bank", region: "National", joined: "2024-05-30", status: "Active" },
  { name: "S. Bello", email: "sbello@example.com", role: "Citizen", region: "FCT", joined: "2024-09-05", status: "Suspended" },
];

function Page() {
  return (
    <AppShell title="Users" subtitle="184,221 active users across 6 roles."
      actions={<Button className="rounded-full"><Plus className="h-4 w-4" /> Invite user</Button>}>
      <KpiRow items={[
        { label: "Active users", value: "184k", hint: "+3.1% MoM" },
        { label: "Surveyors", value: "1,402" },
        { label: "Officers", value: "284" },
        { label: "Suspended", value: "12" },
      ]} />
      <div className="mt-6">
        <DataTable rows={rows} columns={[
          { key: "u", label: "User", render: r => (
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8"><AvatarFallback className="bg-primary/10 text-primary text-xs">{r.name.split(" ").map(x => x[0]).join("").slice(0,2)}</AvatarFallback></Avatar>
              <div><p className="font-medium">{r.name}</p><p className="text-xs text-muted-foreground">{r.email}</p></div>
            </div>
          )},
          { key: "role", label: "Role", render: r => <Pill tone="info">{r.role}</Pill> },
          { key: "region", label: "Region", render: r => <span className="text-muted-foreground">{r.region}</span> },
          { key: "joined", label: "Joined", render: r => <span className="text-muted-foreground">{r.joined}</span> },
          { key: "s", label: "Status", render: r => <Pill tone={r.status === "Active" ? "success" : "danger"}>{r.status}</Pill> },
        ]} />
      </div>
    </AppShell>
  );
}
