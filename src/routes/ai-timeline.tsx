import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { AIBadge, ConfidenceMeter, AIInsightCard } from "@/components/ai/AIPrimitives";
import { SectionTitle, Pill } from "@/components/ui-ext/Scaffold";
import { Calendar, ListChecks, FileText, ShieldCheck } from "lucide-react";
import { ownershipChain } from "@/lib/ai-mock";

export const Route = createFileRoute("/ai-timeline")({
  head: () => ({ meta: [{ title: "AI Ownership Timeline — TerraTrust AI" }] }),
  component: TimelinePage,
});

function TimelinePage() {
  return (
    <AppShell
      title="AI Ownership Timeline"
      subtitle="Every transfer reconstructed from documents, registries, and gazette entries."
      actions={<AIBadge tone="success">Chain verified</AIBadge>}
    >
      <div className="grid gap-4 md:grid-cols-4">
        <AIInsightCard title="Transfers detected" value="4" hint="1998 → 2019" tone="primary" />
        <AIInsightCard title="Chain confidence" value="94%" delta={{ value: 6, label: "MoM" }} tone="success" />
        <AIInsightCard title="Gaps" value="0" hint="No unexplained periods" tone="success" />
        <AIInsightCard title="Sources" value="7" hint="Bureau, gazette, NIN, court" tone="accent" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="surface-card p-6">
          <SectionTitle eyebrow="Reconstructed chain" title="Lekki Phase 1 Residence · TT-8421-LG" />
          <ol className="relative space-y-8 pl-8">
            <div className="absolute left-3 top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-primary/40 via-primary/15 to-transparent" />
            {ownershipChain.map((e, i) => (
              <li key={i} className="relative">
                <span className="absolute -left-8 grid h-6 w-6 place-items-center rounded-full bg-surface ring-2 ring-primary/30">
                  <Calendar className="h-3 w-3 text-primary" />
                </span>
                <div className="surface-card p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-display text-xl text-foreground">{e.year}</p>
                    <Pill tone="primary">AI conf. {e.confidence}%</Pill>
                  </div>
                  <p className="mt-1 text-sm font-medium text-foreground">{e.owner}</p>
                  <p className="text-xs text-muted-foreground">{e.event}</p>
                  <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-muted-foreground">
                    <Pill><FileText className="h-3 w-3" /> Source: Bureau gazette</Pill>
                    <Pill><ShieldCheck className="h-3 w-3" /> Notarized</Pill>
                    <Pill><ListChecks className="h-3 w-3" /> 3 corroborating docs</Pill>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="space-y-6">
          <div className="surface-card p-5">
            <SectionTitle eyebrow="Per-event certainty" title="Confidence by transfer" />
            <div className="space-y-3">
              {ownershipChain.map(e => (
                <ConfidenceMeter key={e.year} value={e.confidence} label={`${e.year} · ${e.owner.split(" ")[0]}`} />
              ))}
            </div>
          </div>
          <div className="surface-card p-5">
            <SectionTitle eyebrow="Evidence base" title="Source documents" />
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>· 1998 Federal allocation gazette (vol. 89, no. 14)</li>
              <li>· 2002 Adebayo Estates incorporation filings</li>
              <li>· 2011 Deed of assignment — Land Registry</li>
              <li>· 2019 Certificate of Occupancy (LSLB)</li>
              <li>· 3 corroborating tax clearances</li>
              <li>· 2 sworn community attestations</li>
            </ul>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
