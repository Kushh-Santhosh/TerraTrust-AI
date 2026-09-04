import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { StatCard } from "@/components/ui-ext/StatCard";
import { adminKpis } from "@/lib/mock-data";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — TerraTrust AI" }] }),
  component: AdminPage,
});

const users = [
  { n: "Amara Okonkwo", e: "amara@terratrust.ai", r: "Citizen", s: "active" },
  { n: "Idris Adekunle", e: "idris@surveyors.ng", r: "Surveyor", s: "active" },
  { n: "Hauwa Bello", e: "hauwa@lagosbureau.gov", r: "Officer", s: "active" },
  { n: "Tunde Akin", e: "tunde@verify.community", r: "Verifier", s: "suspended" },
  { n: "Operator Ada", e: "ada@terratrust.ai", r: "Admin", s: "active" },
];

function AdminPage() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (pathname !== "/admin") return <Outlet />;
  return (
    <AppShell
      title="Administrator"
      subtitle="Platform operations, user management, and policy controls."
      actions={
        <Link to="/admin/audit">
          <Button className="rounded-full">
            <ShieldCheck className="h-4 w-4" /> Audit log
          </Button>
        </Link>
      }
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {adminKpis.map((k) => (
          <StatCard key={k.label} kpi={k} />
        ))}
      </div>

      <div className="mt-6 surface-card overflow-hidden">
        <div className="border-b border-border p-4">
          <p className="font-medium">Users & roles</p>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-xs text-muted-foreground">
            <tr className="text-left">
              <th className="px-4 py-3 font-medium">User</th>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {users.map((u) => (
              <tr key={u.e}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {u.n
                          .split(" ")
                          .map((s) => s[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{u.n}</p>
                      <p className="text-xs text-muted-foreground">{u.e}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <Badge variant="outline">{u.r}</Badge>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center gap-1 text-xs ${u.s === "active" ? "text-success" : "text-warning"}`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${u.s === "active" ? "bg-success" : "bg-warning"}`}
                    />
                    {u.s}
                  </span>
                </td>
                <td />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
