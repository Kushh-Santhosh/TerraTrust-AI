import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { StatCard } from "@/components/ui-ext/StatCard";
import { adminKpis, trustDistribution, verificationsOverTime, regions } from "@/lib/mock-data";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, AreaChart, Area, XAxis, YAxis, CartesianGrid, BarChart, Bar, Legend } from "recharts";

export const Route = createFileRoute("/analytics")({
  head: () => ({ meta: [{ title: "Analytics — TerraTrust AI" }] }),
  component: AnalyticsPage,
});

const COLORS = ["oklch(0.45 0.08 195)", "oklch(0.55 0.1 180)", "oklch(0.78 0.13 75)", "oklch(0.6 0.22 27)"];

function AnalyticsPage() {
  return (
    <AppShell title="Analytics" subtitle="System-wide insight across registries, AI models, and user activity.">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{adminKpis.map(k => <StatCard key={k.label} kpi={k} />)}</div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="surface-card p-5 lg:col-span-2">
          <p className="font-medium">Verifications · trend</p>
          <div className="mt-3 h-72">
            <ResponsiveContainer>
              <AreaChart data={verificationsOverTime}>
                <defs>
                  <linearGradient id="aV" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="oklch(0.45 0.08 195)" stopOpacity={0.4}/><stop offset="100%" stopColor="oklch(0.45 0.08 195)" stopOpacity={0}/></linearGradient>
                  <linearGradient id="aP" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="oklch(0.78 0.13 75)" stopOpacity={0.4}/><stop offset="100%" stopColor="oklch(0.78 0.13 75)" stopOpacity={0}/></linearGradient>
                </defs>
                <CartesianGrid stroke="oklch(0.92 0.008 250)" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Area type="monotone" dataKey="verified" stroke="oklch(0.45 0.08 195)" fill="url(#aV)" />
                <Area type="monotone" dataKey="pending" stroke="oklch(0.78 0.13 75)" fill="url(#aP)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="surface-card p-5">
          <p className="font-medium">Trust score distribution</p>
          <div className="mt-3 h-72">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={trustDistribution} dataKey="value" innerRadius={60} outerRadius={100} paddingAngle={2}>
                  {trustDistribution.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
              {trustDistribution.map((d, i) => (
                <div key={d.name} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{ background: COLORS[i] }} />{d.name}: <span className="ml-auto font-medium">{d.value}%</span></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 surface-card p-5">
        <p className="font-medium">Regions performance</p>
        <div className="mt-3 h-72">
          <ResponsiveContainer>
            <BarChart data={regions}>
              <CartesianGrid stroke="oklch(0.92 0.008 250)" vertical={false} />
              <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
              <Bar dataKey="verified" fill="oklch(0.45 0.08 195)" radius={[6, 6, 0, 0]} />
              <Bar dataKey="pending" fill="oklch(0.78 0.13 75)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </AppShell>
  );
}
