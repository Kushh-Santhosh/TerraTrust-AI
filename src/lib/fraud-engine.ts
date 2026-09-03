// Fraud detection engine — deterministic per property.

import type { Property } from "./types";

export type FraudSeverity = "info" | "low" | "moderate" | "high" | "critical";

export interface FraudSignal {
  id: string;
  kind: "duplicate-ownership" | "fake-document" | "boundary-overlap" | "multiple-registrations" | "stamp-forgery" | "signature-anomaly";
  severity: FraudSeverity;
  score: number;     // 0..100 confidence the signal is real
  title: string;
  detail: string;
  evidence: string[];
}

export interface FraudReport {
  riskScore: number;       // 0..100
  band: "Clear" | "Watch" | "Elevated" | "Critical";
  signals: FraudSignal[];
  summary: string;
}

function seed(id: string): number {
  let h = 2166136261;
  for (let i = 0; i < id.length; i++) { h ^= id.charCodeAt(i); h = (h * 16777619) >>> 0; }
  return h;
}

const sevWeight: Record<FraudSeverity, number> = {
  info: 0, low: 10, moderate: 28, high: 55, critical: 90,
};

export function getFraudReport(p: Property): FraudReport {
  const s = seed(p.id);
  const signals: FraudSignal[] = [];
  const r = (salt: number) => ((s ^ (salt * 2654435761)) >>> 0) / 0xffffffff;

  if (p.status === "disputed") {
    signals.push({
      id: "f1", kind: "boundary-overlap", severity: "critical", score: 94,
      title: "Boundary overlap with TT-7710-LG",
      detail: "12.4% polygon intersection with an active parcel filed in 2021.",
      evidence: ["AI polygon diff · 0.84 IoU", "Bureau cadastre overlay", "Adjacent owner objection on file"],
    });
    signals.push({
      id: "f2", kind: "duplicate-ownership", severity: "high", score: 81,
      title: "Conflicting deed of assignment",
      detail: "Two deeds reference the same plot number with different grantees.",
      evidence: ["Plot No. Block-14 / Plot-7B", "Grantor signatures differ"],
    });
  } else {
    if (r(2) > 0.55) signals.push({
      id: "f3", kind: "stamp-forgery", severity: "low", score: 22,
      title: "Stamp template variance",
      detail: "Bureau stamp ink density 6% below 2024 reference template — within tolerance.",
      evidence: ["Stamp ID LSLB-2024-00831", "Template ref v2024.Q1"],
    });
    if (r(3) > 0.7) signals.push({
      id: "f4", kind: "signature-anomaly", severity: "low", score: 18,
      title: "Signature drift",
      detail: "Owner signature 88% match to NIN registry capture (threshold 80%).",
      evidence: ["NIN biometric cross-check", "Notary witness on file"],
    });
  }

  if (p.documents.length < 2) signals.push({
    id: "f5", kind: "fake-document", severity: "moderate", score: 41,
    title: "Sparse documentary base",
    detail: "Only 1 supporting document on file — increases susceptibility to fabricated filings.",
    evidence: ["Document count below median (3)"],
  });

  const riskScore = Math.min(100, Math.round(signals.reduce((a, x) => a + sevWeight[x.severity], 0)));
  const band: FraudReport["band"] =
    riskScore >= 80 ? "Critical" : riskScore >= 50 ? "Elevated" : riskScore >= 20 ? "Watch" : "Clear";

  const summary =
    band === "Critical" ? "Critical fraud signals — manual bureau review required before any transaction."
    : band === "Elevated" ? "Elevated risk — recommend surveyor re-measurement and bureau cross-check."
    : band === "Watch" ? "Low-grade anomalies present; passport remains transactable."
    : "No fraud signals detected. Passport cleared for bank-grade verification.";

  return { riskScore, band, signals, summary };
}
