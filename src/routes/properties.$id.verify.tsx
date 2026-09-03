import { useCallback, useEffect, useRef, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Crumbs, Pill, SectionTitle } from "@/components/ui-ext/Scaffold";
import { Button } from "@/components/ui/button";
import { VerificationWorkflowPanel } from "@/components/ui-ext/VerificationWorkflowPanel";
import { HowTerraTrustWorks } from "@/components/ui-ext/HowTerraTrustWorks";
import { properties } from "@/lib/mock-data";
import {
  STEP_NAMES,
  activeProvider,
  buildPayload,
  runVerification,
  type VerificationResult,
  type WorkflowStep,
} from "@/lib/verification-workflow";
import { MapPin, Play, RotateCcw, Ruler, User2, Workflow } from "lucide-react";

export const Route = createFileRoute("/properties/$id/verify")({
  head: () => ({
    meta: [
      { title: "Live Verification — TerraTrust AI" },
      { name: "description", content: "Run the n8n-orchestrated verification workflow: OCR, fraud, boundary, risk, confidence, decision." },
    ],
  }),
  loader: ({ params }) => {
    const p = properties.find(x => x.id === params.id);
    if (!p) throw notFound();
    return { property: p };
  },
  component: Page,
});

function Page() {
  const { property } = Route.useLoaderData();
  const provider = activeProvider();
  const [running, setRunning] = useState(false);
  const [visible, setVisible] = useState<WorkflowStep[]>([]);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [fallbackReason, setFallbackReason] = useState<string | undefined>();
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const run = useCallback(async () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setRunning(true);
    setResult(null);
    setVisible([]);
    setFallbackReason(undefined);

    const outcome = await runVerification(property);
    setFallbackReason(outcome.fallbackReason);

    outcome.result.steps.forEach((step, i) => {
      timers.current.push(
        setTimeout(() => {
          setVisible(prev => [...prev, step]);
          if (i === outcome.result.steps.length - 1) {
            setResult(outcome.result);
            setRunning(false);
          }
        }, 420 * (i + 1)),
      );
    });
  }, [property]);

  const shown = result ? result.steps : visible;

  return (
    <AppShell
      title="Live verification"
      subtitle={`${property.title} · ${property.passportId} — orchestrated end-to-end by n8n.`}
      actions={
        <>
          <Button variant="outline" className="rounded-full" onClick={run} disabled={running}>
            <RotateCcw className="h-4 w-4" /> Re-run
          </Button>
          <Button className="rounded-full" onClick={run} disabled={running}>
            <Play className="h-4 w-4" /> {running ? "Running…" : "Run Live Verification"}
          </Button>
        </>
      }>
      <Crumbs items={[{ label: "Properties", to: "/properties" }, { label: property.passportId, to: "/properties/$id" }, { label: "Live verification" }]} />

      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <Workflow className="h-4 w-4 text-primary" />
        <span>Orchestrator:</span>
        {provider === "n8n" ? <Pill tone="success">n8n webhook configured</Pill> : <Pill tone="warning">Demo mode — VITE_N8N_WEBHOOK_URL not set</Pill>}
        <span>· {STEP_NAMES.length} nodes · human-in-the-loop gate on step 7</span>
      </div>

      <div className="mt-4 surface-card p-5">
        <div className="grid gap-4 md:grid-cols-4">
          <div>
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Property ID</p>
            <p className="mt-1 font-mono text-sm">{property.id} · {property.passportId}</p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Location</p>
            <p className="mt-1 flex items-center gap-1.5 text-sm"><MapPin className="h-3.5 w-3.5 text-primary" />{property.address}, {property.region}</p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Parcel</p>
            <p className="mt-1 flex items-center gap-1.5 text-sm capitalize"><Ruler className="h-3.5 w-3.5 text-primary" />{property.type} · {property.area.toLocaleString()} m²</p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Owner of record</p>
            <p className="mt-1 flex items-center gap-1.5 text-sm"><User2 className="h-3.5 w-3.5 text-primary" />{property.owner}</p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <VerificationWorkflowPanel
          result={result}
          running={running}
          provider={result?.provider ?? provider}
          fallbackReason={fallbackReason}
          propertyId={property.id}
          liveSteps={shown}
        />
      </div>

      {!result && !running && shown.length === 0 && (
        <div className="mt-6 surface-card p-5">
          <SectionTitle eyebrow="Ready" title="Start the orchestrated run" description="The workflow calls the existing TerraTrust engines in sequence and returns a signed, auditable decision." />
          <p className="text-sm text-muted-foreground">Try <Link to="/properties/$id/verify" params={{ id: "p_001" }} className="text-primary">TT-8421-LG</Link> for a clean auto-approval, or <Link to="/properties/$id/verify" params={{ id: "p_003" }} className="text-primary">TT-5512-AB</Link> to see the human-review path.</p>
        </div>
      )}

      <div className="mt-6"><HowTerraTrustWorks /></div>

      <details className="mt-6 surface-card overflow-hidden">
        <summary className="cursor-pointer bg-muted/40 px-4 py-3 text-sm font-medium">Technical details</summary>
        <div className="border-t border-border px-4 py-2 font-mono text-xs">POST $VITE_N8N_WEBHOOK_URL · request payload</div>
        <pre className="overflow-x-auto p-5 font-mono text-xs leading-relaxed"><code>{JSON.stringify(buildPayload(property), null, 2)}</code></pre>
      </details>
    </AppShell>
  );
}
