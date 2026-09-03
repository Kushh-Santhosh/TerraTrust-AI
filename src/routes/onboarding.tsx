import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { Stepper } from "@/components/ui-ext/Scaffold";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/onboarding")({
  head: () => ({ meta: [{ title: "Welcome — TerraTrust AI" }] }),
  component: Page,
});

const steps = [
  "Set up your profile",
  "Verify your identity (KYC)",
  "Register your first property",
  "Invite neighbours for attestation",
];

function Page() {
  return (
    <div className="min-h-screen bg-background hero-gradient">
      <header className="border-b border-border bg-background/70 px-8 py-4 backdrop-blur-xl"><Link to="/"><Logo /></Link></header>
      <main className="mx-auto max-w-3xl px-4 py-16">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Welcome to TerraTrust</p>
        <h1 className="font-display mt-2 text-5xl">Let's give your property a passport.</h1>
        <p className="mt-3 text-muted-foreground">In four short steps, you'll have a verifiable, AI-scored digital identity for your land.</p>
        <div className="mt-8"><Stepper steps={["Profile","KYC","Property","Community"]} current={0} /></div>
        <div className="surface-card mt-2 p-6">
          <ol className="space-y-3">
            {steps.map((s, i) => (
              <li key={s} className="flex items-center gap-3 rounded-xl border border-border p-3">
                <CheckCircle2 className={`h-5 w-5 ${i === 0 ? "text-primary" : "text-muted-foreground"}`} />
                <p className="flex-1 text-sm">{s}</p>
                <span className="text-xs text-muted-foreground">~{2 + i} min</span>
              </li>
            ))}
          </ol>
          <div className="mt-6 flex justify-end gap-2">
            <Link to="/dashboard"><Button variant="outline">Skip for now</Button></Link>
            <Link to="/complete-profile"><Button>Begin onboarding</Button></Link>
          </div>
        </div>
      </main>
    </div>
  );
}
