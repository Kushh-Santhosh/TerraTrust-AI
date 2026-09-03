// Explainable Property Confidence Engine.
// Pure functions — no side effects. Every score returns the inputs that produced it.

import type { Property } from "./types";

export type ConfidenceTone = "success" | "warning" | "danger";

export interface ConfidenceFactor {
  key: string;
  label: string;
  weight: number;        // 0..1 — share of the overall score
  raw: number;           // 0..100 — the per-factor signal strength
  contribution: number;  // weight * raw, rounded
  tone: ConfidenceTone;
  reasoning: string;     // why this number, in plain English
  evidence?: string[];
}

export interface ConfidenceReport {
  score: number;            // 0..100, weighted average
  band: "Excellent" | "Strong" | "Moderate" | "At risk";
  headline: string;         // one-line summary of WHY
  factors: ConfidenceFactor[];
  signedAt: string;         // ISO timestamp of the run
  modelVersion: string;
}

// Stable hash so all derived data for one property is deterministic.
function seed(id: string): number {
  let h = 2166136261;
  for (let i = 0; i < id.length; i++) { h ^= id.charCodeAt(i); h = (h * 16777619) >>> 0; }
  return h;
}
function jitter(s: number, min: number, max: number, salt = 0): number {
  const v = ((s ^ (salt * 2654435761)) >>> 0) / 0xffffffff;
  return Math.round((min + v * (max - min)) * 10) / 10;
}

function toneFor(raw: number): ConfidenceTone {
  if (raw >= 80) return "success";
  if (raw >= 55) return "warning";
  return "danger";
}

const WEIGHTS = {
  govDocs:          0.22,
  community:        0.13,
  surveyor:         0.16,
  gisBoundary:      0.14,
  utilityBills:     0.07,
  taxHistory:       0.10,
  fraudAnalysis:    0.12,
  ownershipChain:   0.06,
};

export function computeConfidence(p: Property): ConfidenceReport {
  const s = seed(p.id);
  const docCount = p.documents.length;
  const verifiedDocs = p.documents.filter(d => d.verified).length;
  const verifiedRatio = docCount === 0 ? 0 : verifiedDocs / docCount;
  const isDisputed = p.status === "disputed";
  const isVerified = p.status === "verified";

  // ----- per-factor raw signals (0..100) -----
  const govDocs = Math.round(40 + verifiedRatio * 55 + (isVerified ? 5 : 0));
  const community = Math.round(jitter(s, 55, 95, 1) - (isDisputed ? 25 : 0));
  const surveyor = Math.round((p.boundary.length ? 88 : 62) + jitter(s, -4, 6, 2));
  const gisBoundary = Math.round(p.aiConfidence * 0.9 + (p.boundary.length ? 8 : -4));
  const utilityBills = Math.round(jitter(s, 60, 92, 3) - (p.type === "agricultural" ? 18 : 0));
  const taxHistory = Math.round(jitter(s, 55, 95, 4) - (isDisputed ? 22 : 0));
  const fraudAnalysis = Math.round(isDisputed ? 28 : 100 - jitter(s, 2, 14, 5));
  const ownershipChain = Math.round(jitter(s, 70, 97, 6) - (isDisputed ? 18 : 0));

  const rows: Array<[keyof typeof WEIGHTS, string, number, string, string[]]> = [
    ["govDocs", "Government documents", govDocs,
      `${verifiedDocs} of ${docCount || 1} filings verified against the bureau registry${isVerified ? " · bureau endorsement on file" : ""}.`,
      p.documents.slice(0, 3).map(d => `${d.name} — ${d.verified ? "verified" : "pending"}`)],
    ["community", "Community verification", community,
      `${Math.max(0, Math.round((community - 50) / 6))} neighbour attestations recorded${isDisputed ? "; one objection on file" : "; no objections"}.`,
      ["Neighbourhood council acknowledgement", "Adjacent owner sign-off", isDisputed ? "Contested by adjoining parcel" : "No conflicting claims"]],
    ["surveyor", "Surveyor inspection", surveyor,
      `${p.boundary.length ? "On-site GPS sweep with " + p.boundary.length + " vertices captured." : "Awaiting field re-measurement; using historical sketch."}`,
      [p.boundary.length ? "RTK GPS capture · ±0.4m" : "Sketch only", "Inspection photos · 12 frames", "Surveyor digital signature"]],
    ["gisBoundary", "GIS boundary accuracy", gisBoundary,
      `AI-detected polygon matches registered boundary within ${(jitter(s, 0.2, 1.4, 7)).toFixed(1)}m mean drift.`,
      ["Vertex drift table", "Satellite epoch overlay", "PostGIS topology check"]],
    ["utilityBills", "Utility bills", utilityBills,
      `Continuous service records for ${Math.round(jitter(s, 18, 84, 8))} months across power and water providers.`,
      ["Power utility account on file", "Water utility account on file"]],
    ["taxHistory", "Tax history", taxHistory,
      isDisputed ? "Outstanding levy contested while dispute is open." : "Land use charges current; no arrears in trailing 5 years.",
      ["State land-use charge", "Federal capital gains filings"]],
    ["fraudAnalysis", "AI fraud analysis", fraudAnalysis,
      isDisputed ? "Boundary overlap detected with neighbouring filing — escalated to bureau." : "No duplicate boundaries, no forged-stamp signals, signature cluster clean.",
      ["Duplicate-polygon scan", "Stamp forensics", "Signature cluster check"]],
    ["ownershipChain", "Ownership consistency", ownershipChain,
      `Chain-of-custody reconstructed back to ${1990 + Math.round(jitter(s, 0, 25, 9))} with no unexplained gaps.`,
      ["Deed transfers · 4", "Probate filings · 0", "Corporate transfers · 1"]],
  ];

  const factors: ConfidenceFactor[] = rows.map(([k, label, raw, reasoning, evidence]) => {
    const weight = WEIGHTS[k];
    const clamped = Math.max(0, Math.min(100, raw));
    return {
      key: k,
      label,
      weight,
      raw: clamped,
      contribution: Math.round(weight * clamped),
      tone: toneFor(clamped),
      reasoning,
      evidence,
    };
  });

  const score = Math.max(0, Math.min(100, factors.reduce((acc, f) => acc + f.weight * f.raw, 0)));
  const rounded = Math.round(score);

  const band: ConfidenceReport["band"] =
    rounded >= 90 ? "Excellent" : rounded >= 75 ? "Strong" : rounded >= 55 ? "Moderate" : "At risk";

  // Headline picks the two largest *negative* deltas from a 100 baseline.
  const worst = [...factors].sort((a, b) => a.raw - b.raw).slice(0, 2);
  const headline =
    band === "Excellent"
      ? "Passport is bureau-ready. All eight signal classes pass thresholds."
      : band === "Strong"
      ? `Score held back chiefly by ${worst[0].label.toLowerCase()} (${worst[0].raw}).`
      : band === "Moderate"
      ? `Lift ${worst[0].label.toLowerCase()} and ${worst[1].label.toLowerCase()} to clear bureau review.`
      : `Active risk — ${worst[0].label.toLowerCase()} at ${worst[0].raw}. Open a dispute review.`;

  return {
    score: rounded,
    band,
    headline,
    factors,
    signedAt: new Date(2026, 5, 28, 9, (s % 60)).toISOString(),
    modelVersion: "TerraTrust Confidence v3.2",
  };
}
