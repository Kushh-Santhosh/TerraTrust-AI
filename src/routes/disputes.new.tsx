import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Crumbs, Field, Stepper } from "@/components/ui-ext/Scaffold";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/disputes/new")({
  head: () => ({ meta: [{ title: "File dispute — TerraTrust AI" }] }),
  component: Page,
});

function Page() {
  return (
    <AppShell title="File a dispute" subtitle="Open a formal dispute on a property with supporting evidence.">
      <Crumbs items={[{ label: "Disputes", to: "/disputes" }, { label: "New" }]} />
      <Stepper steps={["Property", "Issue", "Evidence", "Review"]} current={1} />
      <div className="surface-card space-y-4 p-6">
        <div className="grid gap-3 md:grid-cols-2">
          <Field label="Property"><Input defaultValue="TT-5512-AB — Abuja Commercial Plot" /></Field>
          <Field label="Dispute type"><Input defaultValue="Ownership overlap" /></Field>
        </div>
        <Field label="Summary" hint="Describe the issue clearly. Mediators will see this first.">
          <Textarea rows={5} defaultValue="An unrelated party filed a Deed of Assignment claiming the same plot at Wuse II. The boundary overlaps with mine by 38%." />
        </Field>
        <Field label="Counter-party (optional)"><Input placeholder="Name or registered ID" /></Field>
        <div className="flex justify-end gap-2">
          <Link to="/disputes"><Button variant="outline">Cancel</Button></Link>
          <Button>Continue to evidence</Button>
        </div>
      </div>
    </AppShell>
  );
}
