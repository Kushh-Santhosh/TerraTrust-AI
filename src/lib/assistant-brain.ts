// Context-aware deterministic assistant. Produces grounded answers from the
// confidence, fraud, intel, and valuation engines — no network calls.

import { properties } from "./mock-data";
import type { Property } from "./types";
import { computeConfidence } from "./confidence-engine";
import { getFraudReport } from "./fraud-engine";
import { getValuationReport } from "./valuation-engine";
import { getEncumbrances, getRiskIndicators } from "./property-intel";

export interface AssistantResponse {
  text: string;
  citations?: { label: string; passportId?: string }[];
  suggestions?: string[];
}

const KEYWORDS = {
  score:    ["trust score", "confidence", "score", "rating"],
  fraud:    ["fraud", "forgery", "duplicate", "overlap", "suspicious", "fake"],
  value:    ["value", "valuation", "worth", "price", "estimate"],
  docs:     ["document", "missing", "papers", "upload", "ocr"],
  dispute:  ["dispute", "conflict", "claim", "litigation"],
  steps:    ["next step", "what should i do", "recommend", "suggest", "how do i"],
  risk:     ["risk", "exposure", "encumbrance", "lien", "mortgage"],
};

function pickProperty(q: string): Property | undefined {
  const lo = q.toLowerCase();
  return properties.find(p =>
    lo.includes(p.title.toLowerCase()) ||
    lo.includes(p.passportId.toLowerCase()) ||
    lo.includes(p.region.toLowerCase()) ||
    (p.tags ?? []).some(t => lo.includes(t.toLowerCase()))
  );
}

function topMissing(p: Property): string[] {
  const have = new Set(p.documents.map(d => d.kind));
  const need = (["deed", "survey", "tax", "id"] as const).filter(k => !have.has(k));
  const map: Record<string, string> = {
    deed: "Deed of assignment", survey: "Survey plan",
    tax: "Tax clearance / land use charge", id: "Owner government ID",
  };
  return need.map(k => map[k]);
}

export function answer(q: string): AssistantResponse {
  const lo = q.toLowerCase();
  const target = pickProperty(q) ?? properties[0];
  const conf = computeConfidence(target);
  const fraud = getFraudReport(target);
  const val = getValuationReport(target);
  const risks = getRiskIndicators(target);
  const encs = getEncumbrances(target);

  // Trust / confidence
  if (KEYWORDS.score.some(k => lo.includes(k))) {
    const worst = [...conf.factors].sort((a, b) => a.raw - b.raw)[0];
    return {
      text:
        `**${target.title}** (${target.passportId}) is sitting at **${conf.score}/100 — ${conf.band}**.\n\n` +
        `${conf.headline}\n\n` +
        `Lowest contributor: *${worst.label}* at ${worst.raw}/100 — ${worst.reasoning}`,
      citations: [{ label: target.title, passportId: target.passportId }],
      suggestions: ["Show me the full breakdown", "What can I do to raise the score?"],
    };
  }

  // Fraud
  if (KEYWORDS.fraud.some(k => lo.includes(k))) {
    const top = fraud.signals[0];
    return {
      text:
        `Fraud check on **${target.title}**: **${fraud.band}** (risk ${fraud.riskScore}/100).\n\n` +
        `${fraud.summary}` +
        (top ? `\n\nTop signal: *${top.title}* — ${top.detail}` : ""),
      citations: [{ label: target.title, passportId: target.passportId }],
    };
  }

  // Valuation
  if (KEYWORDS.value.some(k => lo.includes(k))) {
    return {
      text:
        `**AI valuation** for ${target.title}: **$${val.estimate.toLocaleString()}** ` +
        `(range $${val.low.toLocaleString()}–$${val.high.toLocaleString()}, confidence ${val.confidence}%).\n\n` +
        val.narrative,
      citations: [{ label: target.title, passportId: target.passportId }],
      suggestions: ["Show comparable sales", "Why is the confidence not higher?"],
    };
  }

  // Documents
  if (KEYWORDS.docs.some(k => lo.includes(k))) {
    const missing = topMissing(target);
    return {
      text: missing.length
        ? `**${target.title}** is missing: ${missing.map(m => `*${m}*`).join(", ")}. ` +
          `Uploading these typically lifts trust by **+${missing.length * 7} points** within 48h.`
        : `**${target.title}** has the full base document set. OCR confidence across files averages ${85 + (target.aiConfidence % 8)}%.`,
      citations: [{ label: target.title, passportId: target.passportId }],
    };
  }

  // Dispute
  if (KEYWORDS.dispute.some(k => lo.includes(k))) {
    return {
      text:
        target.status === "disputed"
          ? `**${target.title}** has an active dispute. To file a response, head to **Disputes → New filing**, attach your deed and survey, and the bureau auto-routes to the FCT mediation desk.`
          : `No active dispute on **${target.title}**. If you want to *raise* one against another parcel, use **Disputes → New filing** with the conflicting passport ID.`,
    };
  }

  // Risk / encumbrance
  if (KEYWORDS.risk.some(k => lo.includes(k))) {
    const top = [...risks].sort((a, b) => b.score - a.score)[0];
    return {
      text:
        `Risk profile for **${target.title}**: top exposure is *${top.label}* (${top.score}/100, ${top.severity}). ${top.reasoning}\n\n` +
        (encs.length
          ? `Encumbrances on file: ${encs.map(e => `${e.kind} (${e.status})`).join(", ")}.`
          : `No encumbrances on file.`),
    };
  }

  // Next-steps
  if (KEYWORDS.steps.some(k => lo.includes(k))) {
    const worst = [...conf.factors].sort((a, b) => a.raw - b.raw).slice(0, 2);
    return {
      text:
        `Two highest-leverage actions for **${target.title}**:\n\n` +
        worst.map((w, i) => `${i + 1}. Lift *${w.label}* (${w.raw}/100) — ${w.reasoning}`).join("\n"),
      suggestions: ["Walk me through step 1", "How long will this take?"],
    };
  }

  // Fallback
  return {
    text:
      `I can answer grounded questions about any of your ${properties.length} properties. ` +
      `Try asking about **trust score**, **valuation**, **fraud signals**, **missing documents**, **encumbrances**, or **next steps** — ` +
      `name a property by its passport ID (e.g. *${properties[0].passportId}*) for a focused answer.`,
    suggestions: [
      `What's the trust score on ${properties[0].title}?`,
      "What documents am I missing?",
      "Estimate the value of my Abuja plot",
      "Any fraud signals on my portfolio?",
    ],
  };
}
