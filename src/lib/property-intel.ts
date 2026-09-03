// Property intelligence: encumbrance, nearby infrastructure, risk indicators,
// reconstructed ownership history. Deterministic per property id.

import type { Property } from "./types";

function seed(id: string): number {
  let h = 2166136261;
  for (let i = 0; i < id.length; i++) { h ^= id.charCodeAt(i); h = (h * 16777619) >>> 0; }
  return h;
}
function rng(s: number, salt: number): number {
  return ((s ^ (salt * 2654435761)) >>> 0) / 0xffffffff;
}

export interface Encumbrance {
  id: string;
  kind: "mortgage" | "lien" | "easement" | "caveat" | "tax-arrears";
  status: "active" | "released" | "contested";
  party: string;
  amount?: number;
  filedAt: string;
  note: string;
}

export interface NearbyInfra {
  category: "school" | "hospital" | "transit" | "road" | "market" | "utility";
  name: string;
  distanceKm: number;
  impact: "positive" | "neutral" | "negative";
  note?: string;
}

export interface RiskIndicator {
  key: string;
  label: string;
  severity: "low" | "moderate" | "high";
  score: number;     // 0..100, higher = more risk
  reasoning: string;
}

export interface OwnershipRecord {
  year: number;
  owner: string;
  event: "Original allocation" | "Deed transfer" | "Inheritance" | "Corporate sale" | "Mortgage release" | "Current owner";
  confidence: number;
  evidence: string;
}

export function getEncumbrances(p: Property): Encumbrance[] {
  const s = seed(p.id);
  const list: Encumbrance[] = [];
  if (p.status === "disputed") {
    list.push({ id: "e1", kind: "caveat", status: "active", party: "FCT Land Registry",
      filedAt: "2024-07-30", note: "Caveat lodged pending boundary overlap resolution." });
  }
  if (p.valuation > 200000 && p.status === "verified") {
    list.push({ id: "e2", kind: "mortgage", status: "released", party: "Stanbic IBTC",
      amount: Math.round(p.valuation * 0.42), filedAt: "2019-08-12",
      note: "Mortgage fully discharged; release certificate on file." });
  }
  if (rng(s, 11) > 0.55) {
    list.push({ id: "e3", kind: "easement", status: "active", party: "State utility authority",
      filedAt: "2017-02-18", note: "Underground service corridor along southern boundary (1.2m)." });
  }
  if (p.type === "agricultural" && p.status !== "verified") {
    list.push({ id: "e4", kind: "tax-arrears", status: "active", party: "Kaduna IRS",
      amount: Math.round(p.area * 0.12), filedAt: "2024-01-10",
      note: "Land use charge unpaid for FY2024 — settle to lift encumbrance." });
  }
  return list;
}

const POOLS: Record<NearbyInfra["category"], string[]> = {
  school:   ["Greenwood International School", "Children's Aid College", "St. Saviour's Primary", "Lekki British"],
  hospital: ["Reddington Hospital", "Lagoon Specialist Centre", "Federal Medical Centre"],
  transit:  ["BRT Lekki Phase 1 Station", "Ikoyi Ferry Terminal", "Lagos Light Rail – Blue Line"],
  road:     ["Lekki–Epe Expressway", "Admiralty Way", "Ahmadu Bello Way"],
  market:   ["Lekki Market", "Wuse Market", "Bodija Market"],
  utility:  ["IKEDC 33kV substation", "Lagos Water Corp pump station"],
};

export function getNearbyInfra(p: Property): NearbyInfra[] {
  const s = seed(p.id);
  const cats: NearbyInfra["category"][] = ["school", "hospital", "transit", "road", "market", "utility"];
  return cats.map((category, i) => {
    const pool = POOLS[category];
    const name = pool[Math.floor(rng(s, i + 30) * pool.length)];
    const distanceKm = Math.round((0.2 + rng(s, i + 60) * 4.2) * 10) / 10;
    const impact: NearbyInfra["impact"] =
      category === "road" && distanceKm < 0.5 ? "positive"
      : category === "utility" && distanceKm < 0.4 ? "negative"
      : distanceKm < 1.5 ? "positive" : distanceKm > 3 ? "neutral" : "positive";
    return { category, name, distanceKm, impact };
  });
}

export function getRiskIndicators(p: Property): RiskIndicator[] {
  const s = seed(p.id);
  const disputed = p.status === "disputed";
  const items: RiskIndicator[] = [
    { key: "title", label: "Title / legal risk",
      severity: disputed ? "high" : "low",
      score: disputed ? 78 : Math.round(8 + rng(s, 1) * 14),
      reasoning: disputed ? "Active overlap claim with neighbouring parcel." : "Deed chain unbroken; bureau endorsement on file." },
    { key: "boundary", label: "Boundary integrity",
      severity: p.boundary.length ? "low" : "moderate",
      score: p.boundary.length ? Math.round(12 + rng(s, 2) * 10) : Math.round(40 + rng(s, 2) * 20),
      reasoning: p.boundary.length ? "RTK GPS capture present; AI drift within 0.4m." : "Field re-measurement required to harden polygon." },
    { key: "env", label: "Environmental risk",
      severity: "low",
      score: Math.round(10 + rng(s, 3) * 20),
      reasoning: "1.8km from 100-year floodplain; slope <5°; no erosion signals." },
    { key: "market", label: "Market drift",
      severity: "moderate",
      score: Math.round(28 + rng(s, 4) * 16),
      reasoning: "FX volatility and rate compression introduce ±9% valuation band." },
    { key: "fraud", label: "Fraud exposure",
      severity: disputed ? "high" : "low",
      score: disputed ? 72 : Math.round(4 + rng(s, 5) * 10),
      reasoning: disputed ? "Duplicate polygon match flagged by fraud engine." : "All fraud signals below alert threshold." },
    { key: "infra", label: "Infrastructure proximity",
      severity: "low",
      score: Math.round(10 + rng(s, 6) * 18),
      reasoning: "Major utility easement runs along boundary; no encroachment detected." },
  ];
  return items;
}

export function getOwnershipHistory(p: Property): OwnershipRecord[] {
  const startYear = new Date(p.ownerSince).getFullYear() - Math.round(rng(seed(p.id), 21) * 24 + 8);
  const mid1 = startYear + 6;
  const mid2 = startYear + 14;
  const since = new Date(p.ownerSince).getFullYear();
  return [
    { year: startYear, owner: "Federal Land Registry", event: "Original allocation", confidence: 84,
      evidence: "Gazette notice · Vol. 12 No. 88" },
    { year: mid1, owner: `${p.region} Estates Holdings Ltd.`, event: "Corporate sale", confidence: 91,
      evidence: "Deed of Assignment · CAC-validated" },
    { year: mid2, owner: "Chinedu A. Okafor", event: "Deed transfer", confidence: 93,
      evidence: "Stamp duty paid · LSLB-2014-04421" },
    { year: since, owner: p.owner, event: "Current owner", confidence: 96,
      evidence: "Bureau-endorsed transfer · NIN/BVN matched" },
  ];
}
