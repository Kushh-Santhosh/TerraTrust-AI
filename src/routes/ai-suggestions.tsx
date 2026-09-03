import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { AIBadge, AIInsightCard, ConfidenceMeter, ReasoningTrace } from "@/components/ai/AIPrimitives";
import { SectionTitle, Pill } from "@/components/ui-ext/Scaffold";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { verificationSuggestions } from "@/lib/ai-mock";

export const Route = createFileRoute("/ai-suggestions")({
  head: () => ({ meta: [{ title: "AI Verification Suggestions — TerraTrust AI" }] }),
  component: SuggestionsPage,
});

const statusTone = (s: string) => s === "Auto-passed" ? "success" as const : s === "Suggested" ? "primary" as const : "default" as const;

function SuggestionsPage() {
  return (
    <AppShell
      title="AI Verification Suggestions"
      subtitle="The next set of actions to lift this property from 92 → 99 trust."
      actions={<AIBadge>Smart routing</AIBadge>}
    >
      <div className="grid gap-4 md:grid-cols-4">
        <AIInsightCard icon={<Sparkles className="h-3 w-3 text-primary" />} title="Auto-passed" value="2" hint="Bureau & tax checks" tone="success" />
        <AIInsightCard title="Suggested" value="2" hint="Community + surveyor" tone="primary" />
        <AIInsightCard title="Optional" value="1" hint="Watermark re-issue" tone="accent" />
        <AIInsightCard title="Projected lift" value="+7 pts" hint="If all suggested complete" tone="success" />
      </div>

      <div className="mt-6 space-y-3">
        {verificationSuggestions.map((s, i) => (
          <div key={s.id} className="surface-card flex flex-wrap items-center gap-5 p-5">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
              {s.status === "Auto-passed" ? <CheckCircle2 className="h-5 w-5 text-success" /> : <Sparkles className="h-5 w-5" />}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <Pill tone="primary">Step {i + 1}</Pill>
                <Pill tone={statusTone(s.status)}>{s.status}</Pill>
              </div>
              <p className="mt-1 font-medium text-foreground">{s.action}</p>
              <div className="mt-2 w-full max-w-md">
                <ConfidenceMeter value={s.confidence} label="Expected lift / certainty" />
              </div>
            </div>
            {s.status !== "Auto-passed" ? <Button>Start <ArrowRight className="h-4 w-4" /></Button> : <Pill tone="success">Done</Pill>}
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="surface-card p-5">
          <SectionTitle eyebrow="Routing logic" title="How we pick the next step" />
          <ReasoningTrace steps={[
            { label: "Score current evidence", detail: "Documents 98 · bureau 94 · satellite 88 · community 92." },
            { label: "Identify weakest dimension", detail: "Satellite & community → highest marginal lift." },
            { label: "Match to verifier supply", detail: "5 surveyors available within 20km; 12 attestors active." },
            { label: "Project lift per action", detail: "Community +5 pts · surveyor +3 pts · watermark +2 pts." },
            { label: "Recommend ordered plan", detail: "Run community first (24h), surveyor follow-up (3d)." },
          ]} />
        </div>
        <div className="surface-card p-5">
          <SectionTitle eyebrow="Outcomes" title="What completion unlocks" />
          <ul className="space-y-2 text-sm text-foreground">
            <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-success" /> Bank-collateral eligibility (mortgage + HELOC)</li>
            <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-success" /> Cross-state portability of passport</li>
            <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-success" /> Faster bureau approval on future transfers (2.3×)</li>
            <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-success" /> "Gold" badge on public passport view</li>
          </ul>
        </div>
      </div>
    </AppShell>
  );
}
