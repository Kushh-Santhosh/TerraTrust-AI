import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About — TerraTrust AI" }, { name: "description", content: "Our mission: a verifiable digital identity for every parcel of land on Earth." }] }),
  component: Page,
});

const team = [
  { name: "Dr. Adaora Eze", role: "CEO · GIS scientist", bio: "20y in cadastral systems across West Africa." },
  { name: "Tunde Akinwale", role: "CTO · AI", bio: "Ex-Google Maps, built TerraTrust's Geo-LLM." },
  { name: "Hauwa Bello", role: "Head of Policy", bio: "Former senior advisor to the Nigerian Land Bureau." },
  { name: "Chinwe Okafor", role: "Head of Design", bio: "Shipped fintech products to 30M+ users." },
];

function Page() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">About</p>
          <h1 className="font-display mt-2 text-6xl leading-[1.05]">A verifiable identity for every parcel of land.</h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">We started TerraTrust because billions of people work and live on land they cannot prove they own. AI and open registries change that.</p>
        </div>
        <div className="mx-auto mt-16 grid max-w-5xl gap-4 md:grid-cols-3">
          {[{label:"Founded",v:"2023"},{label:"Team",v:"42 across 6 countries"},{label:"Parcels indexed",v:"2.41M"}].map(s => (
            <div key={s.label} className="surface-card p-6 text-center"><p className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</p><p className="font-display mt-2 text-3xl">{s.v}</p></div>
          ))}
        </div>
        <div className="mx-auto mt-16 max-w-5xl">
          <h2 className="font-display text-3xl">Team</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {team.map(t => (
              <div key={t.name} className="surface-card p-5">
                <div className="h-24 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20" />
                <p className="mt-3 font-medium">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
                <p className="mt-2 text-xs text-muted-foreground">{t.bio}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mx-auto mt-16 max-w-3xl rounded-2xl bg-primary p-10 text-center text-primary-foreground">
          <h3 className="font-display text-3xl">Help build the trust layer for land.</h3>
          <p className="mt-2 text-sm opacity-90">We're hiring engineers, surveyors, and policy minds.</p>
          <Link to="/contact"><Button variant="secondary" className="mt-5">Get in touch</Button></Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
