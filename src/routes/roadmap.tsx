import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Pill } from "@/components/ui-ext/Scaffold";

export const Route = createFileRoute("/roadmap")({
  head: () => ({ meta: [{ title: "Roadmap — TerraTrust AI" }, { name: "description", content: "What we're shipping next." }] }),
  component: Page,
});

const cols = [
  { name: "Now", tone: "primary" as const, items: ["Mobile passport scan","Surveyor offline mode","Mediator hearings module"] },
  { name: "Next", tone: "info" as const, items: ["Bank mortgage API v1","Multi-currency valuation","Cross-border parcel linking"] },
  { name: "Later", tone: "default" as const, items: ["Drone imagery ingestion","Compliance copilot for officers","Voice assistant in 8 languages"] },
];

function Page() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-6 py-20">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Roadmap</p>
        <h1 className="font-display mt-2 text-5xl">What we're building.</h1>
        <p className="mt-3 text-muted-foreground">A transparent view of what's shipping, what's brewing, and what's on the horizon.</p>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {cols.map(c => (
            <div key={c.name} className="surface-card p-5">
              <div className="flex items-center gap-2"><Pill tone={c.tone}>{c.name}</Pill></div>
              <ul className="mt-4 space-y-3">{c.items.map(i => <li key={i} className="rounded-xl border border-border p-3 text-sm">{i}</li>)}</ul>
            </div>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
