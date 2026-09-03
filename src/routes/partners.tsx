import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const Route = createFileRoute("/partners")({
  head: () => ({ meta: [{ title: "Partners — TerraTrust AI" }, { name: "description", content: "Governments, banks, and NGOs building on TerraTrust." }] }),
  component: Page,
});

const partners = [
  { kind: "Government", name: "Lagos State Lands Bureau", since: "2024" },
  { kind: "Government", name: "FCT Land Registry", since: "2024" },
  { kind: "Bank", name: "Access Bank — Mortgage", since: "2024" },
  { kind: "Bank", name: "GTBank", since: "2024" },
  { kind: "NGO", name: "Habitat for Humanity (West Africa)", since: "2023" },
  { kind: "Tech", name: "Esri ArcGIS", since: "2024" },
  { kind: "Tech", name: "Planet Labs", since: "2024" },
  { kind: "Education", name: "University of Lagos · Geomatics", since: "2023" },
];

function Page() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-6 py-20">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Partners</p>
        <h1 className="font-display mt-2 text-5xl">Built with institutions you trust.</h1>
        <div className="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {partners.map(p => (
            <div key={p.name} className="surface-card p-5">
              <p className="text-[10px] uppercase text-muted-foreground">{p.kind}</p>
              <p className="mt-1 font-display text-lg">{p.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">Partner since {p.since}</p>
            </div>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
