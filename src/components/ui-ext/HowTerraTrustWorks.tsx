import { FileText, Sparkles, Compass, Landmark, Users2, ShieldCheck, BadgeCheck, ChevronRight } from "lucide-react";
import { SectionTitle } from "@/components/ui-ext/Scaffold";

const STAGES = [
  { icon: FileText, title: "Property & documents", detail: "Owner submits parcel details, title deed, survey plan and tax filings." },
  { icon: Sparkles, title: "AI verification", detail: "OCR extracts fields, checks integrity and screens documents for forgery." },
  { icon: Compass, title: "GIS / boundary validation", detail: "AI polygon is compared against the registry boundary and satellite history." },
  { icon: Landmark, title: "Government validation", detail: "Registry cross-check on ownership chain, encumbrances and tax history." },
  { icon: Users2, title: "Community verification", detail: "Neighbours and local council attest to occupation and boundaries." },
  { icon: ShieldCheck, title: "Trust score", detail: "Eight weighted factors produce one explainable 0–100 trust score." },
  { icon: BadgeCheck, title: "Verified or human review", detail: "Clean parcels issue a Digital Property Passport; conflicts escalate to an officer." },
];

export function HowTerraTrustWorks() {
  return (
    <section className="surface-card p-6" aria-label="How TerraTrust works">
      <SectionTitle
        eyebrow="How TerraTrust works"
        title="One parcel, seven verification gates"
        description="Every passport is produced by the same auditable sequence — no step can be skipped."
      />
      <ol className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {STAGES.map((s, i) => (
          <li key={s.title} className="relative flex gap-3 rounded-xl border border-border bg-muted/20 p-4">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20">
              <s.icon className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">Step {i + 1}</p>
              <p className="text-sm font-medium">{s.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{s.detail}</p>
            </div>
            {i < STAGES.length - 1 && (
              <ChevronRight className="pointer-events-none absolute -right-3 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-border xl:block" aria-hidden />
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
