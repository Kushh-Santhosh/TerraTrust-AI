import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { StatCard } from "@/components/ui-ext/StatCard";
import { Button } from "@/components/ui/button";
import { govKpis, regions, properties } from "@/lib/mock-data";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { MapMock } from "@/components/ui-ext/MapMock";
import { Building2, AlertTriangle } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/government")({
  head: () => ({ meta: [{ title: "Government — TerraTrust AI" }] }),
  component: () => <GovernmentPage />,
});

function GovernmentPage() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [resolved, setResolved] = useState<string[]>([]);
  if (pathname !== "/government") return <Outlet />;
  return (
    <AppShell
      title="Government workbench"
      subtitle="Live registry health, dispute queue, and policy analytics."
      actions={
        <>
          <Button variant="outline" className="rounded-full">
            Export report
          </Button>
          <Button className="rounded-full">
            <Building2 className="h-4 w-4" /> Bulk ingest
          </Button>
        </>
      }
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {govKpis.map((k) => (
          <StatCard key={k.label} kpi={k} />
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_400px]">
        <div className="surface-card p-5">
          <p className="font-medium">Verifications by region</p>
          <div className="mt-3 h-72">
            <ResponsiveContainer>
              <BarChart data={regions}>
                <CartesianGrid stroke="oklch(0.92 0.008 250)" vertical={false} />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: "oklch(0.5 0.018 255)" }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: "oklch(0.5 0.018 255)" }}
                />
                <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
                <Bar
                  dataKey="verified"
                  stackId="a"
                  fill="oklch(0.45 0.08 195)"
                  radius={[6, 6, 0, 0]}
                />
                <Bar
                  dataKey="pending"
                  stackId="a"
                  fill="oklch(0.78 0.13 75)"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="surface-card flex flex-col p-5">
          <p className="font-medium flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-destructive" /> Dispute queue
          </p>
          <ul className="mt-3 divide-y divide-border">
            {properties
              .filter((p) => p.status === "disputed")
              .concat(properties.slice(1, 2))
              .filter((p) => !resolved.includes(p.id))
              .map((p) => (
                <li key={p.id} className="py-3">
                  <p className="text-sm font-medium">{p.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {p.passportId} · {p.region}
                  </p>
                  <div className="mt-2 flex gap-2">
                    <Link to="/properties/$id/verify" params={{ id: p.id }}>
                      <Button size="sm" variant="outline">
                        Investigate
                      </Button>
                    </Link>
                    <Button size="sm" onClick={() => setResolved((items) => [...items, p.id])}>
                      Resolve
                    </Button>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>

      <div className="mt-6">
        <p className="mb-3 text-sm font-medium">National parcel map</p>
        <MapMock properties={properties} height={420} />
      </div>
    </AppShell>
  );
}
