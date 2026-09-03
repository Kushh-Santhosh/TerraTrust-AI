import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Pill } from "@/components/ui-ext/Scaffold";
import { Smartphone, Wifi, BatteryFull } from "lucide-react";

export const Route = createFileRoute("/mobile")({
  head: () => ({ meta: [{ title: "Mobile preview — TerraTrust AI" }] }),
  component: Page,
});

function Page() {
  return (
    <AppShell title="Mobile experience" subtitle="A peek at TerraTrust on phones and tablets.">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="surface-card flex justify-center p-8">
          <div className="relative h-[640px] w-[320px] rounded-[40px] border-[10px] border-foreground/90 bg-background shadow-[var(--shadow-elev)]">
            <div className="flex items-center justify-between px-6 pt-3 text-[10px]"><span>9:41</span><span className="flex items-center gap-1"><Wifi className="h-3 w-3" /><BatteryFull className="h-3 w-3" /></span></div>
            <div className="p-4">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Welcome back</p>
              <p className="font-display text-2xl">Amara</p>
              <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
                <div className="rounded-lg bg-muted p-2"><p className="text-muted-foreground">Trust</p><p className="font-display text-xl">74</p></div>
                <div className="rounded-lg bg-muted p-2"><p className="text-muted-foreground">Value</p><p className="font-display text-xl">$1.08M</p></div>
              </div>
              <p className="mt-4 text-xs font-medium">Your passports</p>
              <div className="mt-2 space-y-2">
                {["Lekki Phase 1","Kaduna Farmland","Abuja Plot","Ibadan Compound"].map((n, i) => (
                  <div key={n} className="flex items-center justify-between rounded-lg bg-surface px-3 py-2 text-xs ring-1 ring-border">
                    <span>{n}</span><Pill tone={i === 0 || i === 3 ? "success" : i === 2 ? "danger" : "warning"}>{i === 0 || i === 3 ? "Verified" : i === 2 ? "Disputed" : "Pending"}</Pill>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="surface-card flex justify-center p-8">
          <div className="relative h-[520px] w-[680px] rounded-[28px] border-[8px] border-foreground/90 bg-background shadow-[var(--shadow-elev)]">
            <div className="grid h-full grid-cols-[200px_1fr]">
              <aside className="border-r border-border p-4 text-xs">
                <p className="font-display text-lg">TerraTrust</p>
                <div className="mt-4 space-y-2 text-muted-foreground">{["Dashboard","Properties","Map","Verification","Profile"].map(x => <p key={x}>{x}</p>)}</div>
              </aside>
              <main className="p-6">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Tablet · landscape</p>
                <p className="font-display text-3xl">Portfolio overview</p>
                <div className="mt-4 grid grid-cols-4 gap-2 text-[11px]">
                  {["Properties · 4","Trust · 74","Value · $1.08M","Open · 3"].map(x => <div key={x} className="rounded-lg bg-muted p-3"><p>{x}</p></div>)}
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="h-40 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20" />
                  <div className="h-40 rounded-lg bg-muted" />
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center gap-3 text-sm text-muted-foreground"><Smartphone className="h-4 w-4" /> All TerraTrust screens are fully responsive from 320px wide to 4K.</div>
    </AppShell>
  );
}
