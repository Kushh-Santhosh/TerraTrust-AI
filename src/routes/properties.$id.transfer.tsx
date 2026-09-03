import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Crumbs, Field, Stepper } from "@/components/ui-ext/Scaffold";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/properties/$id/transfer")({
  head: () => ({ meta: [{ title: "Transfer property — TerraTrust AI" }] }),
  component: Page,
});

function Page() {
  const { id } = Route.useParams();
  return (
    <AppShell title="Transfer ownership" subtitle="Securely transfer this Property Passport to another verified user.">
      <Crumbs items={[{ label: "Properties", to: "/properties" }, { label: id, to: "/properties/$id" }, { label: "Transfer" }]} />
      <Stepper steps={["Recipient","Terms","Sign","Registry"]} current={1} />
      <div className="surface-card grid gap-4 p-6 md:grid-cols-2">
        <Field label="Recipient email or wallet"><Input placeholder="ben@terratrust.ai" /></Field>
        <Field label="Recipient legal name"><Input placeholder="Ben Adekola" /></Field>
        <Field label="Transfer type"><Input defaultValue="Sale" /></Field>
        <Field label="Agreed price (USD)"><Input defaultValue="285000" /></Field>
        <div className="md:col-span-2"><Field label="Notes"><Textarea rows={3} placeholder="Additional clauses, payment terms…" /></Field></div>
        <div className="md:col-span-2 flex justify-end gap-2">
          <Link to="/properties/$id" params={{ id }}><Button variant="outline">Cancel</Button></Link>
          <Button>Send for recipient signature</Button>
        </div>
      </div>
    </AppShell>
  );
}
