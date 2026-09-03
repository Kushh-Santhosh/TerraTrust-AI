import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { AIBadge, AIInsightCard, ConfidenceMeter, VerdictBanner } from "@/components/ai/AIPrimitives";
import { SectionTitle, Pill } from "@/components/ui-ext/Scaffold";
import { Button } from "@/components/ui/button";
import { FileText, Copy, Download, BookOpen } from "lucide-react";

export const Route = createFileRoute("/ai-summary")({
  head: () => ({ meta: [{ title: "AI Document Summary — TerraTrust AI" }] }),
  component: SummaryPage,
});

const summary = `This is a Certificate of Occupancy issued by the Lagos State Land Bureau on 14 March 2024 in favour of Amara N. Okonkwo. It grants statutory right of occupancy over a 540.20 m² residential parcel at Block 14, Plot 7B, Admiralty Way, Lekki Phase 1, registered under bureau reference LSLB-2024-00831. The document carries a valid bureau stamp matching the Q1-2024 issuance template, an embedded coordinate of 6.4413°N, 3.4709°E, and a clean ownership chain traceable to a 2002 corporate acquisition by Adebayo Estates Ltd. There are no encumbrances, court annotations, or competing claims recorded against this title as of the scan date.`;

const obligations = [
  "Annual ground rent payable to Lagos State by 31 March each year.",
  "Use restricted to residential dwellings — commercial conversion requires a Change of Use permit.",
  "Title is renewable after 99 years (expires 2123).",
  "Subject to government right of pre-emption on resale to non-citizens.",
];

const risks = [
  { label: "Encumbrance check", status: "Clear" as const, tone: "success" as const },
  { label: "Tax clearance currency", status: "Current (2024)" as const, tone: "success" as const },
  { label: "Boundary registration", status: "Verified" as const, tone: "success" as const },
  { label: "Dispute history", status: "None on record" as const, tone: "success" as const },
];

function SummaryPage() {
  return (
    <AppShell
      title="AI Document Summary"
      subtitle="Plain-English briefings for any uploaded title document."
      actions={<><Button variant="outline"><Copy className="h-4 w-4" /> Copy</Button><Button><Download className="h-4 w-4" /> Export PDF</Button></>}
    >
      <div className="grid gap-4 md:grid-cols-4">
        <AIInsightCard icon={<FileText className="h-3 w-3 text-primary" />} title="Doc type" value="C-of-O" hint="Statutory right of occupancy" tone="primary" />
        <AIInsightCard title="Reading level" value="Plain English" hint="Grade 9 · Hemingway equivalent" tone="accent" />
        <AIInsightCard title="Key clauses found" value="11" hint="Surfaced & explained below" tone="primary" />
        <AIInsightCard title="Summary confidence" value="96%" hint="Cross-checked vs full text" tone="success" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <div className="surface-card p-6">
            <SectionTitle eyebrow="Plain-English summary" title="Certificate of Occupancy.pdf" action={<AIBadge>Summary v2.3</AIBadge>} />
            <p className="text-[15px] leading-relaxed text-foreground">{summary}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Pill tone="primary">Residential</Pill>
              <Pill tone="success">Verified</Pill>
              <Pill>540 m²</Pill>
              <Pill>Lekki Phase 1</Pill>
              <Pill>2024-03-14</Pill>
            </div>
          </div>

          <div className="surface-card p-5">
            <SectionTitle eyebrow="Obligations" title="What the document requires of the owner" />
            <ul className="space-y-2 text-sm">
              {obligations.map((o, i) => (
                <li key={i} className="flex items-start gap-2 text-foreground">
                  <BookOpen className="mt-0.5 h-4 w-4 text-primary" />
                  {o}
                </li>
              ))}
            </ul>
          </div>

          <VerdictBanner verdict="trusted" headline="No red flags detected in this document." detail="All clauses parse cleanly, references match bureau records, and dates fall inside valid issuance windows." />
        </div>

        <div className="space-y-6">
          <div className="surface-card p-5">
            <SectionTitle eyebrow="Risk audit" title="Auto-check results" />
            <ul className="space-y-2 text-sm">
              {risks.map(r => (
                <li key={r.label} className="flex items-center justify-between rounded-lg bg-surface p-2.5 ring-1 ring-border">
                  <span className="text-foreground">{r.label}</span>
                  <Pill tone={r.tone}>{r.status}</Pill>
                </li>
              ))}
            </ul>
          </div>
          <div className="surface-card p-5">
            <SectionTitle eyebrow="Section confidence" title="What the model is sure about" />
            <div className="space-y-3">
              <ConfidenceMeter value={98} label="Identity & owner" />
              <ConfidenceMeter value={97} label="Parcel description" />
              <ConfidenceMeter value={94} label="Obligations & clauses" />
              <ConfidenceMeter value={92} label="Renewal terms" />
              <ConfidenceMeter value={89} label="Cross-bureau alignment" />
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
