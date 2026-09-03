import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Crumbs, Field } from "@/components/ui-ext/Scaffold";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/reports/new")({
  head: () => ({ meta: [{ title: "New report — TerraTrust AI" }] }),
  component: Page,
});

const kinds = ["Valuation", "Boundary audit", "Fraud watch", "Portfolio statement", "Mortgage eligibility", "Dispute log"];

function Page() {
  return (
    <AppShell title="Generate a report" subtitle="Configure scope and let TerraTrust AI compile a full PDF.">
      <Crumbs items={[{ label: "Reports", to: "/reports" }, { label: "New" }]} />
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="surface-card space-y-4 p-6 lg:col-span-2">
          <Field label="Title"><Input defaultValue="Q4 2024 portfolio statement" /></Field>
          <Field label="Report type">
            <div className="flex flex-wrap gap-2">
              {kinds.map((k, i) => <button key={k} className={`rounded-full px-3 py-1.5 text-xs ring-1 ${i === 0 ? "bg-primary text-primary-foreground ring-primary" : "bg-surface ring-border hover:bg-muted"}`}>{k}</button>)}
            </div>
          </Field>
          <div className="grid gap-3 md:grid-cols-2">
            <Field label="Scope"><Input defaultValue="All my properties" /></Field>
            <Field label="Time range"><Input defaultValue="Q4 2024" /></Field>
          </div>
          <Field label="Include sections" hint="Toggle which AI sections to render">
            <div className="grid gap-2 md:grid-cols-2">
              {["Executive summary","Valuation breakdown","GIS verification","Document audit","Risk & fraud","Recommendations"].map(s => (
                <label key={s} className="flex items-center gap-2 rounded-lg border border-border p-2.5 text-sm"><input type="checkbox" defaultChecked /> {s}</label>
              ))}
            </div>
          </Field>
        </div>
        <div className="surface-card flex flex-col gap-3 p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Preview</p>
          <p className="font-display text-2xl">Portfolio statement</p>
          <p className="text-sm text-muted-foreground">4 properties · $1.08M total estimated value · 3 verified, 1 pending</p>
          <p className="text-xs text-muted-foreground">Estimated generation: ~12 seconds</p>
          <Link to="/reports/$id" params={{ id: "R-2242" }} className="mt-2"><Button className="w-full"><Sparkles className="h-4 w-4" /> Generate report</Button></Link>
        </div>
      </div>
    </AppShell>
  );
}
