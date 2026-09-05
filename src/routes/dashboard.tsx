import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, StatusBadge } from "@/components/layout/AppShell";
import { StatCard } from "@/components/ui-ext/StatCard";
import { TrustScore } from "@/components/ui-ext/TrustScore";
import { Button } from "@/components/ui/button";
import { citizenKpis, notifications, properties, verificationsOverTime } from "@/lib/mock-data";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { ArrowRight, Plus, Sparkles, Bell } from "lucide-react";
import { MapMock } from "@/components/ui-ext/MapMock";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — TerraTrust AI" }] }),
  component: Dashboard,
});

function Dashboard() {
  const { profile, user } = useAuth();
  const userName = profile?.full_name ?? user?.user_metadata.full_name ?? "TerraTrust user";
  return (
    <AppShell
      title={`Good morning, ${userName}`}
      subtitle="Your digital property passports for verified ownership, boundaries, and trust."
      actions={
        <>
          <Button asChild className="rounded-full">
            <Link to="/properties">
              <Plus className="h-4 w-4" /> View my properties
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {citizenKpis.map((k) => (
          <StatCard key={k.label} kpi={k} />
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="surface-card min-w-0 p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Verifications over time</p>
              <p className="text-xs text-muted-foreground">Across all your registered properties</p>
            </div>
            <select className="h-8 rounded-md border border-border bg-surface px-2 text-xs">
              <option>Last 8 months</option>
              <option>Last 12 months</option>
            </select>
          </div>
          <div className="mt-4 h-64">
            <ResponsiveContainer>
              <AreaChart data={verificationsOverTime}>
                <defs>
                  <linearGradient id="v" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.45 0.08 195)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="oklch(0.45 0.08 195)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="oklch(0.92 0.008 250)" vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: "oklch(0.5 0.018 255)" }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: "oklch(0.5 0.018 255)" }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid oklch(0.92 0.008 250)",
                    fontSize: 12,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="verified"
                  stroke="oklch(0.45 0.08 195)"
                  fill="url(#v)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="surface-card flex flex-col p-5">
          <p className="font-medium">Portfolio trust</p>
          <p className="text-xs text-muted-foreground">Avg score across 4 properties</p>
          <div className="my-6 flex justify-center">
            <TrustScore value={74} size={150} />
          </div>
          <div className="space-y-2 text-sm">
            <Row label="Verified" value="2" color="bg-success" />
            <Row label="Pending" value="1" color="bg-warning" />
            <Row label="Disputed" value="1" color="bg-destructive" />
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="surface-card min-w-0 p-5 lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <p className="font-medium">My properties</p>
            <Link to="/properties" className="text-xs text-primary inline-flex items-center gap-1">
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="-mx-2 overflow-x-auto">
            <table className="w-full min-w-[600px] text-sm">
              <thead className="text-xs text-muted-foreground">
                <tr className="text-left">
                  <th className="px-2 py-2 font-medium">Property</th>
                  <th className="px-2 py-2 font-medium">Passport</th>
                  <th className="px-2 py-2 font-medium">Status</th>
                  <th className="px-2 py-2 font-medium">Trust</th>
                  <th className="px-2 py-2 font-medium text-right">Valuation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {properties.map((p) => (
                  <tr key={p.id} className="hover:bg-muted/40">
                    <td className="px-2 py-3">
                      <Link
                        to="/properties/$id"
                        params={{ id: p.id }}
                        className="font-medium text-foreground hover:text-primary"
                      >
                        {p.title}
                      </Link>
                      <p className="text-xs text-muted-foreground">{p.address}</p>
                    </td>
                    <td className="px-2 py-3 font-mono text-xs">{p.passportId}</td>
                    <td className="px-2 py-3">
                      <StatusBadge status={p.status} />
                    </td>
                    <td className="px-2 py-3">
                      <TrustPill v={p.trustScore} />
                    </td>
                    <td className="px-2 py-3 text-right font-medium">
                      ${(p.valuation / 1000).toFixed(0)}k
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="surface-card min-w-0 p-5">
          <div className="mb-3 flex items-center justify-between">
            <p className="font-medium">Notifications</p>
            <Link to="/notifications" className="text-xs text-primary">
              All
            </Link>
          </div>
          <ul className="space-y-3">
            {notifications.slice(0, 4).map((n) => (
              <li key={n.id} className="flex items-start gap-3">
                <span
                  className={`mt-1.5 h-2 w-2 rounded-full ${n.kind === "success" ? "bg-success" : n.kind === "warning" ? "bg-warning" : n.kind === "alert" ? "bg-destructive" : "bg-primary"}`}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{n.title}</p>
                  <p className="text-xs text-muted-foreground">{n.body}</p>
                  <p className="mt-0.5 text-[10px] text-muted-foreground">{n.at}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <p className="mb-3 text-sm font-medium">Properties on the map</p>
          <MapMock properties={properties} highlightId="p_001" height={360} />
        </div>
        <div className="surface-card flex flex-col gap-4 p-5">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-primary" />
            <p className="font-medium">Actions for you</p>
          </div>
          {[
            [
              "Upload tax clearance",
              "Mysuru Farm · raises trust by +12",
              "/properties/p_002/documents",
            ],
            [
              "Confirm boundary walk",
              "Ramamurthy Nagar · surveyor visit Sat",
              "/properties/p_001/boundary",
            ],
            [
              "Respond to dispute",
              "Gurugram Commercial Plot · 3 days left",
              "/properties/p_003/verify",
            ],
          ].map(([t, d, to]) => (
            <Link
              key={t}
              to={to as "/properties/p_002/documents"}
              className="flex items-start justify-between rounded-lg border border-border p-3 text-left hover:bg-muted"
            >
              <div>
                <p className="text-sm font-medium">{t}</p>
                <p className="text-xs text-muted-foreground">{d}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </Link>
          ))}
        </div>
      </div>
    </AppShell>
  );
}

function Row({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="inline-flex items-center gap-2 text-muted-foreground">
        <span className={`h-2 w-2 rounded-full ${color}`} />
        {label}
      </span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function TrustPill({ v }: { v: number }) {
  const tone =
    v >= 85
      ? "text-success bg-success/10"
      : v >= 65
        ? "text-primary bg-primary/10"
        : v >= 45
          ? "text-warning bg-warning/15"
          : "text-destructive bg-destructive/10";
  return (
    <span
      className={`inline-flex w-12 justify-center rounded-md px-2 py-0.5 text-xs font-medium ${tone}`}
    >
      {v}
    </span>
  );
}
