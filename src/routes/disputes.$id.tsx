import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Crumbs, Pill } from "@/components/ui-ext/Scaffold";
import { Button } from "@/components/ui/button";
import { MessageSquare, Paperclip } from "lucide-react";

export const Route = createFileRoute("/disputes/$id")({
  head: () => ({ meta: [{ title: "Dispute — TerraTrust AI" }] }),
  component: Page,
});

const events = [
  { at: "2024-09-25", actor: "Mediator J. Adeyemi", text: "Hearing scheduled for 2024-10-08 at the FCT Land Registry." },
  { at: "2024-09-20", actor: "Amara Okonkwo", text: "Submitted original Deed of Assignment and 2021 survey plan as evidence." },
  { at: "2024-09-15", actor: "Counter-party S. Bello", text: "Claims rightful ownership based on a 2023 transaction. Documents under OCR review." },
  { at: "2024-07-30", actor: "TerraTrust AI", text: "Boundary overlap detected via GIS — case auto-escalated." },
];

function Page() {
  const { id } = Route.useParams();
  return (
    <AppShell title="Overlapping ownership claim" subtitle={`${id} · Filed 2024-07-30 · Status: Mediation`}
      actions={<><Button variant="outline"><Paperclip className="h-4 w-4" /> Add evidence</Button><Button><MessageSquare className="h-4 w-4" /> Reply</Button></>}>
      <Crumbs items={[{ label: "Disputes", to: "/disputes" }, { label: id }]} />
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="surface-card p-6 lg:col-span-2">
          <h3 className="font-display text-xl">Case timeline</h3>
          <ol className="mt-4 space-y-4">
            {events.map((e, i) => (
              <li key={i} className="relative pl-6">
                <span className="absolute left-0 top-1.5 h-2 w-2 rounded-full bg-primary" />
                <p className="text-xs text-muted-foreground">{e.at}</p>
                <p className="text-sm"><span className="font-medium">{e.actor}</span> — {e.text}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="space-y-3">
          <div className="surface-card p-5">
            <p className="text-xs font-medium text-muted-foreground">Parcel</p>
            <Link to="/properties/$id" params={{ id: "p_003" }} className="mt-1 block font-medium hover:text-primary">Abuja Commercial Plot</Link>
          </div>
          <div className="surface-card p-5">
            <p className="text-xs font-medium text-muted-foreground">Parties</p>
            <ul className="mt-2 space-y-1 text-sm">
              <li>Amara Okonkwo <Pill tone="primary">Claimant</Pill></li>
              <li>S. Bello <Pill tone="warning">Counter-party</Pill></li>
              <li>FCT Land Registry <Pill tone="info">Mediator</Pill></li>
            </ul>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
