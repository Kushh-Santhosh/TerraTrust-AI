import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy — TerraTrust AI" },
      { name: "description", content: "How TerraTrust handles your personal and property data." },
    ],
  }),
  component: Page,
});

const sections = [
  {
    h: "1. Data we collect",
    b: "We collect the minimum necessary to verify property ownership: identity documents, GPS coordinates, deed photographs, and bureau-issued IDs.",
  },
  {
    h: "2. How we use it",
    b: "Only to produce Property Passports, detect fraud, and improve our AI models. We never sell personal data to advertisers.",
  },
  {
    h: "3. Who can see it",
    b: "You, plus officers and verifiers you authorise. Banks see passports only when you share them, and only for the window you allow.",
  },
  {
    h: "4. Retention",
    b: "Identity documents are retained for 7 years per land-administration regulation, then cryptographically destroyed.",
  },
  {
    h: "5. Your rights",
    b: "Export, correct, or delete your data at any time from Settings → Account → Data.",
  },
  {
    h: "6. Contact",
    b: "privacy@terratrust.ai · We respond within 14 days, in line with GDPR and NDPR.",
  },
];

function Page() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-20">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Last updated · September 24, 2024
        </p>
        <h1 className="font-display mt-2 text-5xl">Privacy policy</h1>
        <div className="mt-10 space-y-8">
          {sections.map((s) => (
            <section key={s.h}>
              <h2 className="font-display text-2xl">{s.h}</h2>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.b}</p>
            </section>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
