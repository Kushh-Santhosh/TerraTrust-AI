import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Pill } from "@/components/ui-ext/Scaffold";
import { Check } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const Route = createFileRoute("/pricing")({
  head: () => ({ meta: [{ title: "Pricing — TerraTrust AI" }, { name: "description", content: "Simple plans for citizens, surveyors, banks, and governments." }] }),
  component: Page,
});

const plans = [
  { name: "Citizen", price: "Free", desc: "For individuals registering their land.", popular: false, features: ["1 Property Passport","AI valuation (monthly)","Community attestations","Mobile app"] },
  { name: "Trust Pro", price: "$29/mo", desc: "For owners with multiple properties.", popular: true, features: ["Up to 25 Property Passports","On-demand AI valuation","Boundary comparison","Verifiable share links","Priority support"] },
  { name: "Surveyor", price: "$59/mo", desc: "For licensed field surveyors.", popular: false, features: ["Field toolkit","Mobile GeoJSON upload","Report builder","Signed PDF outputs","Mediation queue access"] },
  { name: "Institution", price: "Talk to us", desc: "Governments, banks, NGOs.", popular: false, features: ["Bulk registry sync","SLA & dedicated support","Audit-grade exports","SSO + role policies"] },
];

function Page() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Pricing</p>
            <h1 className="font-display mt-2 text-6xl">Trust, priced fairly.</h1>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">Citizens never pay to verify their first property. Institutions pay for scale.</p>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {plans.map(p => (
              <div key={p.name} className={`surface-card flex flex-col gap-3 p-6 ${p.popular ? "ring-2 ring-primary" : ""}`}>
                <div className="flex items-center justify-between"><p className="font-display text-2xl">{p.name}</p>{p.popular && <Pill tone="primary">Popular</Pill>}</div>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
                <p className="font-display text-4xl">{p.price}</p>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  {p.features.map(f => <li key={f} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-success" />{f}</li>)}
                </ul>
                <Link to="/register" className="mt-4"><Button className="w-full" variant={p.popular ? "default" : "outline"}>{p.name === "Institution" ? "Contact sales" : "Get started"}</Button></Link>
              </div>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
