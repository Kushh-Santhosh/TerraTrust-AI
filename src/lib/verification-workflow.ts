// n8n-orchestrated verification workflow adapter.
// Two providers — "n8n" (live webhook) and "demo" (deterministic local simulation).
// Both return the identical VerificationResult contract.

import type { Property } from "./types";
import { computeConfidence } from "./confidence-engine";
import { getFraudReport } from "./fraud-engine";
import { getRiskIndicators } from "./property-intel";

export type WorkflowStepStatus = "queued" | "running" | "completed" | "failed" | "attention";

export interface WorkflowStep {
  name: string;
  status: WorkflowStepStatus;
  score?: number;
  detail?: string;
}

export type VerificationStatus = "verified" | "manual_review" | "rejected";
export type WorkflowProvider = "n8n" | "demo";

export interface VerificationResult {
  workflowId: string;
  provider: WorkflowProvider;
  propertyId: string;
  passportId: string;
  status: VerificationStatus;
  confidenceScore: number | null;
  fraudScore: number | null;
  fraudBand: string | null;
  boundaryScore: number | null;
  riskScore: number | null;
  ocrConfidence: number | null;
  documentsVerified: boolean | null;
  boundaryVerified: boolean | null;
  registryCrossCheck: boolean | null;
  decisionReason: string;
  reviewReasons: string[];
  governmentScore: number | null;
  governmentCleared: boolean | null;
  communityScore: number | null;
  communityAttestations: number | null;
  communityCleared: boolean | null;
  passportStatus: "ready" | "held";
  completedAt: string;
  steps: WorkflowStep[];
}

export interface VerificationPayload {
  propertyId: string;
  passportId: string;
  property: {
    title: string;
    address: string;
    region: string;
    country: string;
    type: string;
    area: number;
    owner: string;
    status: string;
    boundaryVertices: number;
  };
  documents: { id: string; name: string; kind: string; verified: boolean }[];
  existingScores: {
    trustScore: number;
    aiConfidence: number;
    valuation: number;
  };
}

export const STEP_NAMES = [
  "Property submitted",
  "Document / OCR check",
  "Fraud analysis",
  "Boundary verification",
  "Government validation",
  "Community verification",
  "Risk analysis",
  "Confidence engine",
  "Automated decision",
  "Passport readiness",
] as const;

/** Webhook URL is public config only — never a secret. */
export function getWebhookUrl(): string | undefined {
  const raw = import.meta.env["VITE_N8N_WEBHOOK_URL"] as string | undefined;
  const v = raw?.trim();
  return v ? v : undefined;
}

export function activeProvider(): WorkflowProvider {
  return getWebhookUrl() ? "n8n" : "demo";
}

export function buildPayload(p: Property): VerificationPayload {
  return {
    propertyId: p.id,
    passportId: p.passportId,
    property: {
      title: p.title,
      address: p.address,
      region: p.region,
      country: p.country,
      type: p.type,
      area: p.area,
      owner: p.owner,
      status: p.status,
      boundaryVertices: p.boundary?.length ?? 0,
    },
    documents: p.documents.map((d) => ({
      id: d.id,
      name: d.name,
      kind: d.kind,
      verified: d.verified,
    })),
    existingScores: {
      trustScore: p.trustScore,
      aiConfidence: p.aiConfidence,
      valuation: p.valuation,
    },
  };
}

function workflowId(p: Property, provider: WorkflowProvider): string {
  const stamp = Date.now().toString(36).toUpperCase();
  return `WF-${provider === "n8n" ? "N8N" : "SIM"}-${p.passportId.replace(/[^A-Z0-9]/gi, "")}-${stamp}`;
}

/** Deterministic local simulation — mirrors the exact n8n node graph. */
export function computeVerification(
  p: Property,
  provider: WorkflowProvider = "demo",
): VerificationResult {
  const confidence = computeConfidence(p);
  const fraud = getFraudReport(p);
  const risks = getRiskIndicators(p);

  const boundaryFactor = confidence.factors.find((f) => f.key === "gisBoundary");
  const docFactor = confidence.factors.find((f) => f.key === "govDocs");
  const communityFactor = confidence.factors.find((f) => f.key === "community");
  const taxFactor = confidence.factors.find((f) => f.key === "taxHistory");
  const boundaryScore = Math.round(boundaryFactor?.raw ?? 70);
  const ocrConfidence = Math.round(docFactor?.raw ?? 80);
  const riskScore = Math.round(risks.reduce((a, r) => a + r.score, 0) / Math.max(risks.length, 1));

  const docsVerified = p.documents.length > 0 && p.documents.every((d) => d.verified);
  const boundaryVerified = (p.boundary?.length ?? 0) >= 3 && boundaryScore >= 70;
  const registryCrossCheck = p.status !== "disputed" && p.status !== "pending";
  const governmentScore = Math.round(((docFactor?.raw ?? 70) + (taxFactor?.raw ?? 70)) / 2);
  const governmentCleared = registryCrossCheck && governmentScore >= 70;
  const communityScore = Math.round(communityFactor?.raw ?? 70);
  const communityAttestations = Math.max(0, Math.round((communityScore - 50) / 6));
  const communityCleared = communityScore >= 65 && p.status !== "disputed";

  const critical = fraud.band === "Critical" || fraud.band === "Elevated";
  let status: VerificationStatus;
  let decisionReason: string;

  const reviewReasons: string[] = [];
  if (critical)
    reviewReasons.push(
      `Fraud engine returned ${fraud.band} (${fraud.riskScore}/100) — conflicting ownership or document signals detected.`,
    );
  if (confidence.score < 78)
    reviewReasons.push(`Trust score ${confidence.score} is below the 78 auto-approval threshold.`);
  if (!boundaryVerified)
    reviewReasons.push(
      "GIS boundary could not be matched to the registry polygon within tolerance.",
    );
  if (!docsVerified)
    reviewReasons.push(
      `${p.documents.filter((d) => !d.verified).length} document(s) are still unverified by the registry.`,
    );
  if (riskScore >= 45)
    reviewReasons.push(`Composite risk ${riskScore}/100 exceeds the acceptable band.`);
  if (!governmentCleared)
    reviewReasons.push("Government registry cross-check is on hold for this parcel.");
  if (!communityCleared)
    reviewReasons.push("Community verification is incomplete or an objection is on file.");

  if (reviewReasons.length > 0) {
    status = "manual_review";
    const priority =
      fraud.band === "Critical" && fraud.riskScore >= 80 ? "Critical priority — " : "";
    decisionReason = `${priority}A verification conflict was detected, so this parcel was escalated to a government officer instead of being auto-approved. ${reviewReasons.length} of the seven gates did not clear.`;
  } else {
    status = "verified";
    decisionReason = `All gates passed: confidence ${confidence.score}, fraud ${fraud.band} (${fraud.riskScore}), boundary ${boundaryScore}, risk ${riskScore}. Passport is ready to issue.`;
  }

  const steps: WorkflowStep[] = [
    {
      name: "Property submitted",
      status: "completed",
      detail: `${p.passportId} · ${p.region}, ${p.country}`,
    },
    {
      name: "Document / OCR check",
      status: docsVerified ? "completed" : "attention",
      score: ocrConfidence,
      detail: `${p.documents.filter((d) => d.verified).length}/${p.documents.length} documents verified`,
    },
    {
      name: "Fraud analysis",
      status: critical ? "attention" : "completed",
      score: fraud.riskScore,
      detail: `${fraud.band} · ${fraud.signals.length} signal(s)`,
    },
    {
      name: "Boundary verification",
      status: boundaryVerified ? "completed" : "attention",
      score: boundaryScore,
      detail: boundaryVerified
        ? "AI polygon matches registry within tolerance"
        : "Field re-measurement recommended",
    },
    {
      name: "Risk analysis",
      status: riskScore >= 45 ? "attention" : "completed",
      score: riskScore,
      detail: `${risks.length} dimensions scored`,
    },
    {
      name: "Confidence engine",
      status: "completed",
      score: confidence.score,
      detail: `${confidence.band} · ${confidence.factors.length} weighted factors`,
    },
    {
      name: "Automated decision",
      status: status === "verified" ? "completed" : "attention",
      detail:
        status === "verified"
          ? "Auto-approved"
          : status === "manual_review"
            ? "Escalated to government review"
            : "Rejected pending investigation",
    },
    {
      name: "Passport readiness",
      status: status === "verified" ? "completed" : "attention",
      detail: status === "verified" ? "Passport ready" : "Held until human sign-off",
    },
  ];

  return {
    workflowId: workflowId(p, provider),
    provider,
    propertyId: p.id,
    passportId: p.passportId,
    status,
    confidenceScore: confidence.score,
    fraudScore: fraud.riskScore,
    fraudBand: fraud.band,
    boundaryScore,
    riskScore,
    ocrConfidence,
    documentsVerified: docsVerified,
    boundaryVerified,
    registryCrossCheck,
    decisionReason,
    reviewReasons,
    governmentScore,
    governmentCleared,
    communityScore,
    communityAttestations,
    communityCleared,
    passportStatus: status === "verified" ? "ready" : "held",
    completedAt: new Date().toISOString(),
    steps,
  };
}

function coerceResult(raw: unknown, p: Property): VerificationResult {
  const r = ((Array.isArray(raw) ? raw[0] : raw) ?? {}) as Partial<VerificationResult> & {
    documentScore?: number;
    fraudStatus?: string;
    confidence?: number;
    decision?: string;
  };
  const status =
    r.status ??
    (r.decision === "VERIFIED"
      ? "verified"
      : r.decision === "HUMAN_REVIEW_REQUIRED"
        ? "manual_review"
        : "rejected");
  return {
    workflowId: r.workflowId ?? `WF-N8N-${p.passportId}`,
    provider: "n8n",
    propertyId: r.propertyId ?? p.id,
    passportId: r.passportId ?? p.passportId,
    status,
    confidenceScore: r.confidenceScore ?? r.confidence ?? null,
    fraudScore: r.fraudScore ?? null,
    fraudBand: r.fraudBand ?? r.fraudStatus ?? null,
    boundaryScore: r.boundaryScore ?? null,
    riskScore: r.riskScore ?? null,
    ocrConfidence: r.ocrConfidence ?? r.documentScore ?? null,
    documentsVerified: r.documentsVerified ?? null,
    boundaryVerified: r.boundaryVerified ?? null,
    registryCrossCheck: r.registryCrossCheck ?? null,
    decisionReason: r.decisionReason ?? "Live n8n verification completed without an explanation.",
    reviewReasons: Array.isArray(r.reviewReasons) ? r.reviewReasons : [],
    governmentScore: r.governmentScore ?? null,
    governmentCleared: r.governmentCleared ?? null,
    communityScore: r.communityScore ?? null,
    communityAttestations: r.communityAttestations ?? null,
    communityCleared: r.communityCleared ?? null,
    passportStatus: r.passportStatus ?? (status === "verified" ? "ready" : "held"),
    completedAt: r.completedAt ?? new Date().toISOString(),
    steps: Array.isArray(r.steps) && r.steps.length ? r.steps : [],
  };
}

function failedLiveResult(p: Property, reason: string): VerificationResult {
  return {
    workflowId: `WF-N8N-${p.passportId}`,
    provider: "n8n",
    propertyId: p.id,
    passportId: p.passportId,
    status: "manual_review",
    confidenceScore: null,
    fraudScore: null,
    fraudBand: null,
    boundaryScore: null,
    riskScore: null,
    ocrConfidence: null,
    documentsVerified: null,
    boundaryVerified: null,
    registryCrossCheck: null,
    decisionReason: `Live n8n verification could not be completed: ${reason}`,
    reviewReasons: ["Live verification did not return a usable decision."],
    governmentScore: null,
    governmentCleared: null,
    communityScore: null,
    communityAttestations: null,
    communityCleared: null,
    passportStatus: "held",
    completedAt: new Date().toISOString(),
    steps: STEP_NAMES.map((name, index) => ({
      name,
      status: index === 0 ? "completed" : "failed",
      detail: index === 0 ? `${p.passportId} submitted` : "Awaiting a live n8n response",
    })),
  };
}

export interface RunOutcome {
  result: VerificationResult;
  /** Set when the live webhook was configured but could not be reached. */
  fallbackReason?: string;
}

/** Calls the n8n webhook when configured; otherwise runs the deterministic simulation. */
export async function runVerification(p: Property, signal?: AbortSignal): Promise<RunOutcome> {
  const url = getWebhookUrl();
  if (!url) return { result: computeVerification(p, "demo") };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buildPayload(p)),
      signal,
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    const json = await res.json();
    const candidate = Array.isArray(json) ? json[0] : json;
    if (
      !candidate ||
      typeof candidate !== "object" ||
      !("propertyId" in candidate) ||
      !("passportId" in candidate) ||
      (!("decision" in candidate) && !("status" in candidate))
    ) {
      throw new Error("Webhook returned an invalid verification result");
    }
    return { result: coerceResult(json, p) };
  } catch (err) {
    const reason = err instanceof Error ? err.message : "Webhook unreachable";
    return {
      result: failedLiveResult(p, reason),
      fallbackReason: `Live n8n verification unavailable (${reason}).`,
    };
  }
}
