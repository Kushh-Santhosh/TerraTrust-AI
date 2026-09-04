import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Pill } from "@/components/ui-ext/Scaffold";
import { TrustScore } from "@/components/ui-ext/TrustScore";
import { SignalTile, VerdictBanner, ConfidenceMeter } from "@/components/ai/AIPrimitives";
import type { VerificationResult, WorkflowStep } from "@/lib/verification-workflow";
import { STEP_NAMES } from "@/lib/verification-workflow";
import {
  CheckCircle2,
  Loader2,
  Circle,
  AlertTriangle,
  ShieldAlert,
  FileText,
  Compass,
  Activity,
  Workflow,
  Clock,
  Hash,
  Landmark,
  Users2,
  BadgeCheck,
} from "lucide-react";

function StepIcon({ status }: { status: WorkflowStep["status"] }) {
  if (status === "completed") return <CheckCircle2 className="h-4 w-4 text-success" />;
  if (status === "running") return <Loader2 className="h-4 w-4 animate-spin text-primary" />;
  if (status === "attention") return <AlertTriangle className="h-4 w-4 text-warning" />;
  if (status === "failed") return <ShieldAlert className="h-4 w-4 text-destructive" />;
  return <Circle className="h-4 w-4 text-muted-foreground/50" />;
}

export function WorkflowProgress({ steps, running }: { steps: WorkflowStep[]; running: boolean }) {
  const byName = new Map(steps.map((s) => [s.name, s]));
  return (
    <ol className="space-y-1" aria-live="polite">
      {STEP_NAMES.map((name, i) => {
        const s = byName.get(name);
        const status: WorkflowStep["status"] =
          s?.status ?? (running && byName.size === i ? "running" : "queued");
        return (
          <li
            key={name}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors odd:bg-muted/30"
          >
            <StepIcon status={status} />
            <div className="min-w-0 flex-1">
              <p
                className={`text-sm ${status === "queued" ? "text-muted-foreground" : "font-medium"}`}
              >
                {name}
              </p>
              {s?.detail && <p className="truncate text-xs text-muted-foreground">{s.detail}</p>}
            </div>
            {typeof s?.score === "number" && (
              <span className="font-mono text-xs text-muted-foreground">{s.score}</span>
            )}
          </li>
        );
      })}
    </ol>
  );
}

export function VerificationWorkflowPanel({
  result,
  running,
  provider,
  fallbackReason,
  propertyId,
  liveSteps,
}: {
  result: VerificationResult | null;
  running: boolean;
  provider: "n8n" | "demo";
  fallbackReason?: string;
  propertyId: string;
  liveSteps?: WorkflowStep[];
}) {
  const live = provider === "n8n" && !fallbackReason;
  const display = (value: number | boolean | string | null | undefined, suffix = "") =>
    value == null ? "Unavailable" : `${value}${suffix}`;
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_340px]">
      <div className="surface-card p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="flex items-center gap-2 font-medium">
            <Workflow className="h-4 w-4 text-primary" /> Workflow execution
          </p>
          {live ? (
            <Pill tone="success">Live · n8n webhook</Pill>
          ) : (
            <Pill tone="warning">Demo mode · local simulation</Pill>
          )}
        </div>
        {fallbackReason && <p className="mt-2 text-xs text-warning-foreground">{fallbackReason}</p>}
        <div className="mt-4">
          <WorkflowProgress steps={result?.steps ?? liveSteps ?? []} running={running} />
        </div>

        {result && (
          <>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              <SignalTile
                icon={<FileText className="h-3.5 w-3.5" />}
                label="AI / document verification"
                value={`${display(result.ocrConfidence, "%")} · ${result.documentsVerified == null ? "unavailable" : result.documentsVerified ? "cleared" : "incomplete"}`}
                tone={result.documentsVerified ? "success" : "warning"}
              />
              <SignalTile
                icon={<Compass className="h-3.5 w-3.5" />}
                label="GIS / boundary validation"
                value={`${display(result.boundaryScore, "/100")} · ${result.boundaryVerified == null ? "unavailable" : result.boundaryVerified ? "matched" : "re-measure"}`}
                tone={result.boundaryVerified ? "success" : "warning"}
              />
              <SignalTile
                icon={<Landmark className="h-3.5 w-3.5" />}
                label="Government validation"
                value={`${display(result.governmentScore, "/100")} · ${result.governmentCleared == null ? "unavailable" : result.governmentCleared ? "cleared" : "on hold"}`}
                tone={result.governmentCleared ? "success" : "warning"}
              />
              <SignalTile
                icon={<Users2 className="h-3.5 w-3.5" />}
                label="Community verification"
                value={`${display(result.communityAttestations)} attestations · ${result.communityCleared == null ? "unavailable" : result.communityCleared ? "cleared" : "objection"}`}
                tone={result.communityCleared ? "success" : "warning"}
              />
              <SignalTile
                icon={<ShieldAlert className="h-3.5 w-3.5" />}
                label="Fraud screening"
                value={`${display(result.fraudBand)} · ${display(result.fraudScore)}`}
                tone={
                  result.fraudScore != null && result.fraudScore >= 50
                    ? "danger"
                    : result.fraudScore != null && result.fraudScore >= 25
                      ? "warning"
                      : "success"
                }
              />
              <SignalTile
                icon={<Activity className="h-3.5 w-3.5" />}
                label="Composite risk"
                value={display(result.riskScore, "/100")}
                tone={result.riskScore != null && result.riskScore >= 45 ? "warning" : "success"}
              />
            </div>

            <div className="mt-5">
              <VerdictBanner
                verdict={
                  result.status === "verified"
                    ? "trusted"
                    : result.status === "manual_review"
                      ? "review"
                      : "flagged"
                }
                headline={
                  result.status === "verified"
                    ? "Verified — Digital Property Passport ready to issue"
                    : result.status === "manual_review"
                      ? "Human review required — verification conflict detected"
                      : "Automated approval rejected — investigation required"
                }
                detail={result.decisionReason}
              />
            </div>

            {result.status !== "verified" && result.reviewReasons.length > 0 && (
              <div className="mt-4 rounded-xl border border-warning/30 bg-warning/10 p-4">
                <p className="flex items-center gap-2 text-sm font-medium text-warning-foreground">
                  <AlertTriangle className="h-4 w-4" /> What blocked automatic approval
                </p>
                <ul className="mt-2 space-y-1.5 text-xs text-warning-foreground/90">
                  {result.reviewReasons.map((r) => (
                    <li key={r} className="flex gap-2">
                      <span aria-hidden>·</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-xs text-muted-foreground">
                  This is not a system error — the workflow deliberately holds the passport until a
                  government officer signs off.
                </p>
              </div>
            )}

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs ring-1 ${result.passportStatus === "ready" ? "bg-success/10 text-success ring-success/25" : "bg-muted text-muted-foreground ring-border"}`}
              >
                <BadgeCheck className="h-3.5 w-3.5" /> Digital Property Passport:{" "}
                {result.passportStatus === "ready"
                  ? "Ready to issue"
                  : "Held pending human sign-off"}
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {result.status === "verified" ? (
                <>
                  <Button asChild className="rounded-full">
                    <Link to="/properties/$id" params={{ id: propertyId }}>
                      Open Property Passport
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="rounded-full">
                    <Link to="/properties/$id/passport-pdf" params={{ id: propertyId }}>
                      Export signed PDF
                    </Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild className="rounded-full">
                    <Link to="/government/disputes">Send to government review</Link>
                  </Button>
                  <Button asChild variant="outline" className="rounded-full">
                    <Link to="/fraud">Inspect fraud signals</Link>
                  </Button>
                  <Button asChild variant="outline" className="rounded-full">
                    <Link to="/community">Request community attestation</Link>
                  </Button>
                </>
              )}
            </div>

            <div className="mt-5 rounded-xl border border-border bg-muted/20 p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Audit trail
              </p>
              <dl className="mt-3 grid gap-2 text-xs sm:grid-cols-2">
                <div className="flex items-center gap-2">
                  <Hash className="h-3.5 w-3.5 text-muted-foreground" />
                  <dt className="text-muted-foreground">Workflow ID</dt>
                  <dd className="font-mono">{result.workflowId}</dd>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                  <dt className="text-muted-foreground">Completed</dt>
                  <dd className="font-mono">{new Date(result.completedAt).toLocaleString()}</dd>
                </div>
                <div className="flex items-center gap-2">
                  <dt className="text-muted-foreground">Property</dt>
                  <dd className="font-mono">
                    {result.propertyId} · {result.passportId}
                  </dd>
                </div>
                <div className="flex items-center gap-2">
                  <dt className="text-muted-foreground">Registry cross-check</dt>
                  <dd className="font-mono">{result.registryCrossCheck ? "pass" : "hold"}</dd>
                </div>
                <div className="flex items-center gap-2">
                  <dt className="text-muted-foreground">Orchestrator</dt>
                  <dd className="font-mono">{result.provider}</dd>
                </div>
                <div className="flex items-center gap-2">
                  <dt className="text-muted-foreground">Decision</dt>
                  <dd className="font-mono">{result.status}</dd>
                </div>
              </dl>
              <ol className="mt-3 space-y-1 border-t border-border pt-3 text-xs text-muted-foreground">
                {result.steps.map((s, i) => (
                  <li key={s.name} className="font-mono">
                    {String(i + 1).padStart(2, "0")} · {s.name} — {s.status}
                    {typeof s.score === "number" ? ` (${s.score})` : ""}
                  </li>
                ))}
              </ol>
            </div>
          </>
        )}
      </div>

      <div className="surface-card flex flex-col items-center p-5">
        <p className="self-start text-xs uppercase tracking-wider text-muted-foreground">
          Confidence Score
        </p>
        <div className="mt-4">
          <TrustScore value={result?.confidenceScore ?? 0} size={140} />
        </div>
        <div className="mt-6 w-full space-y-3">
          <ConfidenceMeter value={result?.ocrConfidence ?? 0} label="Document integrity" />
          <ConfidenceMeter value={result?.boundaryScore ?? 0} label="Boundary alignment" />
          <ConfidenceMeter
            value={result?.fraudScore != null ? 100 - result.fraudScore : 0}
            label="Fraud clearance"
          />
          <ConfidenceMeter
            value={result?.riskScore != null ? 100 - result.riskScore : 0}
            label="Risk clearance"
          />
          <ConfidenceMeter value={result?.governmentScore ?? 0} label="Government validation" />
          <ConfidenceMeter value={result?.communityScore ?? 0} label="Community verification" />
        </div>
      </div>
    </div>
  );
}
