import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { AIBadge, ScoreRing, ConfidenceMeter, AIInsightCard, ExplainabilityPanel } from "@/components/ai/AIPrimitives";
import { SectionTitle } from "@/components/ui-ext/Scaffold";
import { ShieldCheck } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/ai-confidence")({
  head: () => ({ meta: [{ title: "AI Confidence Score — TerraTrust AI" }] }),
  component: ConfidencePage,
});

const sources = [
  { src: "Documents", v: 96 },
  { src: "Bureau", v: 94 },
  { src: "Satellite", v: 88 },
  { src: "Community", v: 92 },
  { src: "Surveyor", v: 90 },
  { src: "Identity", v: 97 },
];

const calibration = [
  { bin: "0–20", expected: 10, observed: 11 },
  { bin: "20–40", expected: 30, observed: 28 },
  { bin: "40–60", expected: 50, observed: 49 },
  { bin: "60–80", expected: 70, observed: 71 },
  { bin: "80–100", expected: 90, observed: 92 },
];

function ConfidencePage() {
  return (
    <AppShell
      title="AI Confidence Score"
      subtitle="A single number for how certain the model is about a property — calibrated, not guessed."
      actions={<AIBadge>Calibrated weekly</AIBadge>}
    >
      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <div className="surface-card flex flex-col items-center p-6">
          <ScoreRing value={92} label="Confidence" sublabel="High certainty" />
          <p className="mt-4 max-w-[220px] text-center text-xs text-muted-foreground">Brier score 0.034 · ECE 1.8% on holdout of 4,200 parcels.</p>
          <div className="mt-6 flex w-full items-center gap-2 rounded-xl bg-success/10 p-3 text-xs ring-1 ring-success/25">
            <ShieldCheck className="h-4 w-4 text-success" />
            <span>Safe to use as bank collateral or court evidence.</span>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <AIInsightCard title="ECE (calibration error)" value="1.8%" hint="Lower is better" tone="success" />
            <AIInsightCard title="Brier score" value="0.034" hint="On 4.2k holdout parcels" tone="primary" />
            <AIInsightCard title="Drift (30d)" value="+0.4%" hint="Model stable" tone="success" />
          </div>

          <div className="surface-card p-6">
            <SectionTitle eyebrow="Per source" title="Confidence by signal origin" />
            <div className="h-56">
              <ResponsiveContainer>
                <BarChart data={sources}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0 0)" />
                  <XAxis dataKey="src" tickLine={false} axisLine={false} className="text-xs" />
                  <YAxis tickLine={false} axisLine={false} className="text-xs" domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="v" fill="oklch(0.55 0.1 180)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {sources.map(s => <ConfidenceMeter key={s.src} value={s.v} label={s.src} />)}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="surface-card p-5">
              <SectionTitle eyebrow="Reliability" title="Calibration curve" />
              <div className="h-48">
                <ResponsiveContainer>
                  <BarChart data={calibration}>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0 0)" />
                    <XAxis dataKey="bin" tickLine={false} axisLine={false} className="text-xs" />
                    <YAxis tickLine={false} axisLine={false} className="text-xs" />
                    <Tooltip />
                    <Bar dataKey="expected" fill="oklch(0.85 0.04 195)" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="observed" fill="oklch(0.45 0.08 195)" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="mt-2 text-[11px] text-muted-foreground">Observed accuracy closely tracks predicted probability — model is well calibrated.</p>
            </div>
            <ExplainabilityPanel title="Why 92%" factors={[
              { label: "All 3 documents on-file & verified", weight: 22, direction: "up", note: "Drives bulk of certainty." },
              { label: "Bureau registry exact match", weight: 18, direction: "up", note: "Parcel ID + owner match." },
              { label: "High-res satellite agrees", weight: 14, direction: "up", note: "Polygon within ±1m." },
              { label: "Comparable density low (3 comps)", weight: -6, direction: "down", note: "More comps → tighter intervals." },
              { label: "Macro volatility this quarter", weight: -4, direction: "down", note: "FX spread widens value band." },
            ]} />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
