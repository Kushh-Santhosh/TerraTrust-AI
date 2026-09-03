import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Button } from "@/components/ui/button";
import { Code2, Webhook, KeyRound, BookOpen } from "lucide-react";

export const Route = createFileRoute("/developers")({
  head: () => ({ meta: [{ title: "Developers — TerraTrust AI" }, { name: "description", content: "REST & webhook APIs to integrate Property Passports anywhere." }] }),
  component: Page,
});

const sample = `// Fetch a Property Passport
const res = await fetch("https://api.terratrust.ai/v1/passports/TT-8421-LG", {
  headers: { Authorization: "Bearer tt_live_..." },
});
const passport = await res.json();
console.log(passport.trustScore); // 96`;

const webhookRequest = `{
  "propertyId": "p_001",
  "passportId": "TT-8421-LG",
  "property": {
    "title": "Lekki Phase 1 Residence",
    "address": "...", "region": "Lagos", "country": "Nigeria",
    "type": "residential", "area": 640, "owner": "Amara Okonkwo",
    "status": "verified", "boundaryVertices": 6
  },
  "documents": [
    { "id": "d1", "name": "Certificate of Occupancy.pdf",
      "kind": "deed", "verified": true }
  ],
  "existingScores": {
    "trustScore": 96, "aiConfidence": 92, "valuation": 285000
  }
}`;

const webhookResponse = `{
  "workflowId": "WF-N8N-TT8421LG-...",
  "propertyId": "p_001",
  "passportId": "TT-8421-LG",
  "status": "verified",       // | manual_review | rejected
  "confidenceScore": 96,
  "fraudScore": 12, "fraudBand": "Clear",
  "boundaryScore": 94, "riskScore": 14, "ocrConfidence": 94,
  "documentsVerified": true,
  "boundaryVerified": true,
  "registryCrossCheck": true,
  "decisionReason": "All gates passed — passport ready to issue.",
  "completedAt": "2026-09-03T12:00:00.000Z",
  "steps": [
    { "name": "Document / OCR check",
      "status": "completed", "score": 94 }
  ]
}`;

function Page() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-6 py-20">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Developers</p>
        <h1 className="font-display mt-2 text-6xl">Build on the trust layer.</h1>
        <p className="mt-3 max-w-xl text-muted-foreground">Stable REST APIs, webhooks, and SDKs in TypeScript, Python and Go.</p>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {[
            { icon: BookOpen, t: "REST API", d: "Read passports, file disputes, submit boundaries." },
            { icon: Webhook, t: "Webhooks", d: "Real-time events for verifications, disputes, and AI runs." },
            { icon: KeyRound, t: "OAuth & API keys", d: "Granular scopes per app and per environment." },
            { icon: Code2, t: "SDKs", d: "Type-safe clients for TS, Python, Go, Java." },
          ].map(x => (
            <div key={x.t} className="surface-card p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><x.icon className="h-5 w-5" /></div>
              <p className="mt-3 font-medium">{x.t}</p>
              <p className="text-sm text-muted-foreground">{x.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 surface-card overflow-hidden">
          <div className="border-b border-border bg-muted/40 px-4 py-2 text-xs font-mono">examples/fetch-passport.ts</div>
          <pre className="overflow-x-auto p-5 text-sm leading-relaxed font-mono"><code>{sample}</code></pre>
        </div>

        <h2 className="font-display mt-16 text-3xl">n8n Verification Orchestrator</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          TerraTrust posts a verification payload to your n8n webhook (<span className="font-mono text-xs">VITE_N8N_WEBHOOK_URL</span>) and renders the returned decision.
          The URL is public config, not a secret; signing keys stay server-side. Without a configured webhook the app runs a deterministic local simulation of the same graph.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="surface-card overflow-hidden">
            <div className="border-b border-border bg-muted/40 px-4 py-2 text-xs font-mono">request · POST /webhook/terratrust/verify</div>
            <pre className="overflow-x-auto p-5 text-xs leading-relaxed font-mono"><code>{webhookRequest}</code></pre>
          </div>
          <div className="surface-card overflow-hidden">
            <div className="border-b border-border bg-muted/40 px-4 py-2 text-xs font-mono">response · VerificationResult</div>
            <pre className="overflow-x-auto p-5 text-xs leading-relaxed font-mono"><code>{webhookResponse}</code></pre>
          </div>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Importable workflow: <span className="font-mono text-xs">n8n/terratrust-verification-workflow.json</span> — 10 nodes, with a human-in-the-loop gate that escalates
          low-confidence or elevated-fraud parcels to the government review queue instead of auto-approving.
        </p>

        <div className="mt-10"><Button>Read full docs →</Button></div>
      </main>
      <SiteFooter />
    </div>
  );
}
