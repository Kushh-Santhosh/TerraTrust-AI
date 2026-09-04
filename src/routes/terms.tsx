import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms — TerraTrust AI" },
      { name: "description", content: "Terms of service for TerraTrust AI." },
    ],
  }),
  component: Page,
});

const sections = [
  {
    h: "1. Acceptance",
    b: "By using TerraTrust you agree to these terms. If you don't, please stop using the service.",
  },
  {
    h: "2. Property Passports",
    b: "A Property Passport is a verifiable digital certificate. It does not, by itself, transfer legal title. Title transfers require government registry endorsement.",
  },
  {
    h: "3. Fees",
    b: "Citizens may use the free tier indefinitely. Paid plans renew monthly and may be cancelled at any time.",
  },
  {
    h: "4. Liability",
    b: "TerraTrust is provided 'as is'. We are not liable for losses arising from registry errors outside our control.",
  },
  {
    h: "5. Disputes",
    b: "Disputes between users are mediated by accredited mediators on the platform. Either party may escalate to formal courts.",
  },
  {
    h: "6. Termination",
    b: "We reserve the right to suspend accounts that commit fraud or otherwise violate these terms.",
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
        <h1 className="font-display mt-2 text-5xl">Terms of service</h1>
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
