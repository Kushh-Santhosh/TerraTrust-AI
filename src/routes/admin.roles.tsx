import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Pill } from "@/components/ui-ext/Scaffold";
import { ShieldCheck, Users2, Briefcase, Building2, Banknote, User } from "lucide-react";

export const Route = createFileRoute("/admin/roles")({
  head: () => ({ meta: [{ title: "Roles — Admin" }] }),
  component: Page,
});

const roles = [
  {
    icon: User,
    name: "Citizen",
    count: 178421,
    perms: ["Register property", "Upload documents", "File disputes", "Share passport"],
  },
  {
    icon: Briefcase,
    name: "Surveyor",
    count: 1402,
    perms: ["Submit GIS surveys", "Upload boundary", "Sign field reports"],
  },
  {
    icon: Building2,
    name: "Officer",
    count: 284,
    perms: ["Approve permits", "Resolve disputes", "Update registry", "Audit log access"],
  },
  { icon: Users2, name: "Verifier", count: 3812, perms: ["Community attest", "Mediate disputes"] },
  {
    icon: Banknote,
    name: "Bank",
    count: 24,
    perms: ["Read passport (consent)", "Run mortgage eligibility"],
  },
  {
    icon: ShieldCheck,
    name: "Admin",
    count: 6,
    perms: ["All permissions", "Manage roles", "System config"],
  },
];

function Page() {
  return (
    <AppShell
      title="Role management"
      subtitle="Permissions and audit boundaries for every role in TerraTrust."
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {roles.map((r) => (
          <div key={r.name} className="surface-card p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <r.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-display text-xl">{r.name}</p>
                <p className="text-xs text-muted-foreground">{r.count.toLocaleString()} accounts</p>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              {r.perms.map((p) => (
                <div key={p} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Pill tone="success">✓</Pill> {p}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
