import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { AIBadge, RiskGauge, AIInsightCard, ExplainabilityPanel, ConfidenceMeter } from "@/components/ai/AIPrimitives";
import { SectionTitle, Pill } from "@/components/ui-ext/Scaffold";
import { Activity, ShieldAlert } from "lucide-react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer, Tooltip } from "recharts";
import { riskBreakdown } from "@/lib/ai-mock";

export const Route = createFileRoute("/ai-risk")({
  head: () => ({ meta: [{ title: "AI Risk Analysis — TerraTrust AI" }] }),
  component: RiskPage,
});

const radarData = riskBreakdown.map(r => ({ axis: r.label.split(" ")[0], value: r.value }));
const factors = riskBreakdown.map(r => ({
  label: r.label,
  weight: r.value > 30 ? -Math.round(r.value / 3) : Math.round((50 - r.value) / 3),
  direction: r.value > 30 ? ("down" as const) : ("up" as const),
  note: r.value > 30 ? "Elevated — model recommends mitigating action." : "Within acceptable tolerance.",
}));

function RiskPage() {
  return (
    <AppShell
      title="AI Risk Analysis"
      subtitle="Composite risk surface across title, boundary, environment, market, and fraud."
      actions={<AIBadge tone="primary">5 dimensions</AIBadge>}
    >
      <div className="grid gap-4 md:grid-cols-4">
        <AIInsightCard icon={<Activity className="h-3 w-3 text-success" />} title="Composite risk" value="22 / 100" hint="Low risk tier" tone="success" />
        <AIInsightCard title="Highest dimension" value="Market" hint="34 · macro FX volatility" tone="warning" />
        <AIInsightCard title="Lowest dimension" value="Fraud" hint="9 · no signals detected" tone="success" />
        <AIInsightCard title="Trend (90d)" value="−4 pts" hint="Improving" tone="success" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[360px_1fr]">
        <div className="surface-card flex flex-col items-center p-6">
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Composite risk</p>
          <RiskGauge value={22} />
          <p className="mt-4 text-center text-xs text-muted-foreground">Calibrated against 2,400 historical disputed parcels.</p>
          <div className="mt-6 flex w-full justify-between text-[11px]">
            <Pill tone="success">Low &lt;30</Pill>
            <Pill tone="warning">Mod 30–60</Pill>
            <Pill tone="danger">High &gt;60</Pill>
          </div>
        </div>

        <div className="surface-card p-6">
          <SectionTitle eyebrow="Surface" title="Risk by dimension" />
          <div className="h-72">
            <ResponsiveContainer>
              <RadarChart data={radarData} outerRadius={110}>
                <PolarGrid stroke="oklch(0.92 0 0)" />
                <PolarAngleAxis dataKey="axis" className="text-xs" />
                <Radar dataKey="value" stroke="oklch(0.45 0.08 195)" fill="oklch(0.55 0.1 180)" fillOpacity={0.35} strokeWidth={2} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <ExplainabilityPanel title="Per-dimension contribution" factors={factors} />
        <div className="surface-card p-5">
          <SectionTitle eyebrow="Detail" title="Risk levels & mitigation" />
          <div className="space-y-3">
            {riskBreakdown.map(r => (
              <div key={r.label}>
                <ConfidenceMeter value={r.value} label={r.label} hint={r.value > 30 ? "Mitigation recommended" : "Within tolerance"} />
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-xl bg-warning/10 p-4 ring-1 ring-warning/30">
            <p className="flex items-center gap-2 text-sm font-medium"><ShieldAlert className="h-4 w-4 text-warning-foreground" /> Recommended next action</p>
            <p className="mt-1 text-xs text-muted-foreground">Hedge market-risk exposure by re-running valuation in 7 days. Re-survey boundary to reduce overlap exposure on TT-7710-LG.</p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
