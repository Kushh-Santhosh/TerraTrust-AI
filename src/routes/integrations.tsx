import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Pill } from "@/components/ui-ext/Scaffold";
import { Button } from "@/components/ui/button";
import { Database, Banknote, Building2, Globe, MessageSquare, BellRing, Workflow } from "lucide-react";
import { activeProvider, getWebhookUrl, STEP_NAMES } from "@/lib/verification-workflow";

export const Route = createFileRoute("/integrations")({
  head: () => ({
    meta: [
      { title: "Integrations — TerraTrust AI" },
      { name: "description", content: "Connect TerraTrust to registries, banks, and the n8n verification orchestrator." },
    ],
  }),
  component: Page,
});

const integrations = [
  { icon: Database, name: "Lagos State Registry", desc: "Two-way sync of cadastral records.", connected: true },
  { icon: Banknote, name: "Access Bank", desc: "Share passports for mortgage origination.", connected: true },
  { icon: Building2, name: "FCT Land Bureau", desc: "Submit permits and receive approvals.", connected: false },
  { icon: Globe, name: "OpenStreetMap", desc: "Sync roads and POI within 5km of parcels.", connected: true },
  { icon: MessageSquare, name: "WhatsApp Business", desc: "Notifications for verification milestones.", connected: false },
  { icon: BellRing, name: "Slack", desc: "Alerts for surveyor team channels.", connected: false },
];

const responseSample = `{
  "workflowId": "WF-N8N-TT8421LG-...",
  "propertyId": "p_001",
  "passportId": "TT-8421-LG",
  "status": "verified | manual_review | rejected",
  "confidenceScore": 96,
  "fraudScore": 12,
  "fraudBand": "Clear",
  "boundaryScore": 94,
  "riskScore": 14,
  "ocrConfidence": 94,
  "documentsVerified": true,
  "boundaryVerified": true,
  "registryCrossCheck": true,
  "decisionReason": "All gates passed — passport ready to issue.",
  "completedAt": "2026-09-03T12:00:00.000Z",
  "steps": [{ "name": "Document / OCR check", "status": "completed", "score": 94 }]
}`;

function Orchestrator() {
  const provider = activeProvider();
  const url = getWebhookUrl();
  const host = (() => { try { return url ? new URL(url).host : null; } catch { return "configured endpoint"; } })();
  return (
    <div className="surface-card p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary"><Workflow className="h-5 w-5" /></div>
          <div>
            <p className="font-medium">N8N Verification Orchestrator</p>
            <p className="text-xs text-muted-foreground">Automates document verification, fraud checks, boundary analysis, risk scoring, confidence calculation, and passport readiness.</p>
          </div>
        </div>
        {provider === "n8n" ? <Pill tone="success">Connected</Pill> : <Pill tone="warning">Demo Mode</Pill>}
      </div>

      <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-muted/20 p-4">
          <dt className="text-xs uppercase tracking-wider text-muted-foreground">Webhook status</dt>
          <dd className="mt-1 font-medium">{provider === "n8n" ? `Configured · ${host}` : "Not configured"}</dd>
          <p className="mt-1 text-xs text-muted-foreground">Set <span className="font-mono">VITE_N8N_WEBHOOK_URL</span> to go live. No secrets are stored in the client.</p>
        </div>
        <div className="rounded-xl border border-border bg-muted/20 p-4">
          <dt className="text-xs uppercase tracking-wider text-muted-foreground">Workflow nodes</dt>
          <dd className="mt-1 font-medium">{STEP_NAMES.length} steps</dd>
          <p className="mt-1 text-xs text-muted-foreground">OCR → Fraud → Boundary → Risk → Confidence → Decision gate.</p>
        </div>
        <div className="rounded-xl border border-border bg-muted/20 p-4">
          <dt className="text-xs uppercase tracking-wider text-muted-foreground">Last workflow run</dt>
          <dd className="mt-1 font-medium">{provider === "n8n" ? "Awaiting first live execution" : "Local simulation only"}</dd>
          <p className="mt-1 text-xs text-muted-foreground">Every run emits workflowId, timestamp, scores and executed steps.</p>
        </div>
      </dl>

      <div className="mt-4 flex flex-wrap gap-2">
        <Button asChild className="rounded-full"><Link to="/properties/$id/verify" params={{ id: "p_001" }}>Test workflow · TT-8421-LG</Link></Button>
        <Button asChild variant="outline" className="rounded-full"><Link to="/properties/$id/verify" params={{ id: "p_003" }}>Human-review path · TT-5512-AB</Link></Button>
        <Button asChild variant="outline" className="rounded-full"><Link to="/developers">Webhook contract</Link></Button>
      </div>

      <div className="mt-5 overflow-hidden rounded-xl border border-border">
        <div className="border-b border-border bg-muted/40 px-4 py-2 font-mono text-xs">Expected response · POST $VITE_N8N_WEBHOOK_URL</div>
        <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed"><code>{responseSample}</code></pre>
      </div>
    </div>
  );
}

function Page() {
  return (
    <AppShell title="Integrations" subtitle="Connect TerraTrust to the registries and tools you already use.">
      <Orchestrator />
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {integrations.map(i => (
          <div key={i.name} className="surface-card p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><i.icon className="h-5 w-5" /></div><p className="font-medium">{i.name}</p></div>
              {i.connected ? <Pill tone="success">Connected</Pill> : <Pill>Off</Pill>}
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{i.desc}</p>
            <Button variant={i.connected ? "outline" : "default"} className="mt-4 w-full">{i.connected ? "Manage" : "Connect"}</Button>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
