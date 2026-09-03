import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Crumbs, Pill } from "@/components/ui-ext/Scaffold";
import { Button } from "@/components/ui/button";
import { ShieldAlert, CheckCircle2, X, Flag } from "lucide-react";

export const Route = createFileRoute("/fraud/$id")({
  head: () => ({ meta: [{ title: "Fraud case — TerraTrust AI" }] }),
  component: Page,
});

function Page() {
  const { id } = Route.useParams();
  return (
    <AppShell title={`Case ${id}`} subtitle="Duplicate deed detected on TT-5512-AB"
      actions={<><Button variant="outline"><X className="h-4 w-4" /> Dismiss</Button><Button><CheckCircle2 className="h-4 w-4" /> Escalate to officer</Button></>}>
      <Crumbs items={[{ label: "Fraud", to: "/fraud" }, { label: id }]} />
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="surface-card p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Risk score</p>
              <p className="font-display text-5xl text-destructive">92</p>
            </div>
            <Pill tone="danger"><ShieldAlert className="h-3 w-3" /> Open</Pill>
          </div>
          <h3 className="mt-6 font-display text-xl">What the AI found</h3>
          <p className="mt-1 text-sm text-muted-foreground">Two distinct Deed of Assignment documents were filed within 14 days of each other claiming overlapping ownership on the same parcel at Wuse II, Abuja. OCR-extracted signatures show a 0.83 similarity score (false-positive likelihood &lt; 2%).</p>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {["Deed A — filed 2023-02-11 by O. Adeyemi","Deed B — filed 2023-02-25 by S. Bello","Boundary overlap: 38% of parcel area","Survey plans cite different surveyors"].map((x,i)=>(
              <div key={i} className="rounded-xl border border-destructive/20 bg-destructive/5 p-3 text-sm">{x}</div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <div className="surface-card p-5">
            <p className="text-xs font-medium text-muted-foreground">Parcel</p>
            <Link to="/properties/$id" params={{ id: "p_003" }} className="mt-1 block font-medium hover:text-primary">Abuja Commercial Plot</Link>
            <p className="text-xs text-muted-foreground">Plot 88, Wuse II — TT-5512-AB</p>
          </div>
          <div className="surface-card p-5">
            <p className="text-xs font-medium text-muted-foreground">Timeline</p>
            <ul className="mt-2 space-y-2 text-xs">
              <li><span className="font-medium">2024-09-21</span> · AI detected duplicate deed</li>
              <li><span className="font-medium">2024-09-22</span> · Escalated to FCT registry</li>
              <li><span className="font-medium">2024-09-25</span> · Awaiting community attestation</li>
            </ul>
          </div>
          <Button variant="outline" className="w-full"><Flag className="h-4 w-4" /> Report to authorities</Button>
        </div>
      </div>
    </AppShell>
  );
}
