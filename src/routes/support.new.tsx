import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Crumbs, Field } from "@/components/ui-ext/Scaffold";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/support/new")({
  head: () => ({ meta: [{ title: "New ticket — TerraTrust AI" }] }),
  component: Page,
});

function Page() {
  return (
    <AppShell title="Open a support ticket" subtitle="We typically reply within 90 minutes.">
      <Crumbs items={[{ label: "Support", to: "/support" }, { label: "New" }]} />
      <div className="surface-card grid gap-4 p-6 md:grid-cols-2">
        <Field label="Subject"><Input placeholder="Brief summary" /></Field>
        <Field label="Category"><Input defaultValue="Documents" /></Field>
        <div className="md:col-span-2"><Field label="Describe the issue"><Textarea rows={6} placeholder="What were you trying to do? What happened instead?" /></Field></div>
        <Field label="Property (optional)"><Input placeholder="TT-8421-LG" /></Field>
        <Field label="Priority"><Input defaultValue="Medium" /></Field>
        <div className="md:col-span-2 flex justify-end gap-2">
          <Link to="/support"><Button variant="outline">Cancel</Button></Link>
          <Button>Submit ticket</Button>
        </div>
      </div>
    </AppShell>
  );
}
