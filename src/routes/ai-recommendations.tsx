import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { AIBadge, AIInsightCard } from "@/components/ai/AIPrimitives";
import { SectionTitle, Pill } from "@/components/ui-ext/Scaffold";
import { Button } from "@/components/ui/button";
import { Lightbulb, ArrowRight, TrendingUp } from "lucide-react";
import { aiRecommendations } from "@/lib/ai-mock";

export const Route = createFileRoute("/ai-recommendations")({
  head: () => ({ meta: [{ title: "AI Recommendations — TerraTrust AI" }] }),
  component: RecsPage,
});

const tone = (p: string) => p === "high" ? "danger" as const : p === "medium" ? "warning" as const : "primary" as const;

function RecsPage() {
  return (
    <AppShell
      title="AI Recommendations"
      subtitle="Prioritized, projected actions to raise your portfolio trust and value."
      actions={<AIBadge>Refreshed 4 min ago</AIBadge>}
    >
      <div className="grid gap-4 md:grid-cols-4">
        <AIInsightCard icon={<Lightbulb className="h-3 w-3 text-primary" />} title="Open actions" value="5" hint="2 high · 2 med · 1 low" tone="primary" />
        <AIInsightCard icon={<TrendingUp className="h-3 w-3 text-success" />} title="Projected trust lift" value="+13 pts" hint="If all completed in 7 days" tone="success" />
        <AIInsightCard title="Time to complete" value="~38 min" hint="Across all actions" tone="accent" />
        <AIInsightCard title="Bank-readiness" value="2 unlocks" hint="Mortgage & HELOC" tone="primary" />
      </div>

      <div className="mt-6 space-y-3">
        {aiRecommendations.map(r => (
          <div key={r.id} className="surface-card flex flex-wrap items-center gap-5 p-5">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 text-primary ring-1 ring-primary/20">
              <Lightbulb className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <Pill tone={tone(r.priority)}>{r.priority} priority</Pill>
                <Pill tone="success">{r.impact}</Pill>
              </div>
              <p className="mt-1.5 font-medium text-foreground">{r.title}</p>
              <p className="text-xs text-muted-foreground">{r.reason}</p>
            </div>
            <Button>{r.cta} <ArrowRight className="h-4 w-4" /></Button>
          </div>
        ))}
      </div>

      <div className="mt-8 surface-card p-6">
        <SectionTitle eyebrow="Roadmap" title="What 7 days of action unlocks" />
        <ol className="space-y-3 text-sm">
          {[
            { day: "Day 1", text: "Upload tax clearance · trust +6 pts", tone: "primary" as const },
            { day: "Day 2", text: "Initiate boundary re-survey · removes dispute risk", tone: "warning" as const },
            { day: "Day 3", text: "Satellite refresh + community attestor invite", tone: "primary" as const },
            { day: "Day 5", text: "Bureau cross-validation completes · +5 confidence", tone: "success" as const },
            { day: "Day 7", text: "Portfolio reaches bank-collateral tier · 2 mortgage products unlock", tone: "success" as const },
          ].map((s, i) => (
            <li key={i} className="flex items-start gap-3">
              <Pill tone={s.tone}>{s.day}</Pill>
              <span className="text-foreground">{s.text}</span>
            </li>
          ))}
        </ol>
      </div>
    </AppShell>
  );
}
