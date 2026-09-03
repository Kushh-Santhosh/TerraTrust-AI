import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Pill } from "@/components/ui-ext/Scaffold";

export const Route = createFileRoute("/changelog")({
  head: () => ({ meta: [{ title: "Changelog — TerraTrust AI" }, { name: "description", content: "Product updates and new features in TerraTrust." }] }),
  component: Page,
});

const entries = [
  { v: "2.7.0", at: "Sep 24, 2024", tag: "AI", changes: ["Geo-LLM v2.1 — 8% better trust-score precision","Fraud detection now ranks duplicate-deed cases by similarity"] },
  { v: "2.6.2", at: "Sep 17, 2024", tag: "Surveyor", changes: ["Offline-first GeoJSON capture in mobile","Signed PDF survey reports"] },
  { v: "2.6.0", at: "Sep 04, 2024", tag: "Citizen", changes: ["Property Passport share links with expiry","Community attestations now SMS-deliverable"] },
  { v: "2.5.4", at: "Aug 22, 2024", tag: "Government", changes: ["Bulk parcel import (up to 50k rows)","Region-scoped audit log exports"] },
];

function Page() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-20">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Product</p>
        <h1 className="font-display mt-2 text-5xl">Changelog</h1>
        <div className="mt-10 space-y-8">
          {entries.map(e => (
            <article key={e.v} className="surface-card p-6">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-display text-2xl">v{e.v}</p>
                <Pill tone="info">{e.tag}</Pill>
                <span className="text-xs text-muted-foreground">· {e.at}</span>
              </div>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                {e.changes.map(c => <li key={c}>{c}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
