import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Crumbs, Field } from "@/components/ui-ext/Scaffold";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Mail, Banknote, Building2 } from "lucide-react";

export const Route = createFileRoute("/properties/$id/share")({
  head: () => ({ meta: [{ title: "Share — TerraTrust AI" }] }),
  component: Page,
});

function Page() {
  const { id } = Route.useParams();
  return (
    <AppShell title="Share Property Passport" subtitle="Issue a verifiable share link or send to a specific institution.">
      <Crumbs items={[{ label: "Properties", to: "/properties" }, { label: id, to: "/properties/$id" }, { label: "Share" }]} />
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="surface-card space-y-3 p-6">
          <p className="font-display text-lg">Verifiable share link</p>
          <div className="flex gap-2"><Input readOnly value={`https://terratrust.ai/p/${id}/v/9F2A-1C7B`} /><Button variant="outline"><Copy className="h-4 w-4" /></Button></div>
          <Field label="Expires after"><Input defaultValue="7 days" /></Field>
          <Field label="Access"><Input defaultValue="View-only · masks personal data" /></Field>
        </div>
        <div className="surface-card space-y-3 p-6">
          <p className="font-display text-lg">Send to institution</p>
          {[{ icon: Banknote, name: "Access Bank — Mortgage" }, { icon: Building2, name: "Lagos Land Bureau" }, { icon: Mail, name: "Custom email" }].map(o => (
            <button key={o.name} className="flex w-full items-center gap-3 rounded-xl border border-border p-3 text-left text-sm hover:bg-muted">
              <o.icon className="h-4 w-4 text-primary" />{o.name}
            </button>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
