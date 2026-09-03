// Extended, internally-consistent mock dataset for demo realism.
// Programmatically generated so totals match across screens.

type LandUse = "residential" | "agricultural" | "commercial" | "industrial" | "mixed";
type Status = "verified" | "pending" | "disputed" | "review";

const REGIONS = [
  { name: "Lagos",     country: "Nigeria",       lat: 6.5244,  lng: 3.3792,  prefix: "LG" },
  { name: "FCT Abuja", country: "Nigeria",       lat: 9.0765,  lng: 7.3986,  prefix: "AB" },
  { name: "Kano",      country: "Nigeria",       lat: 12.0022, lng: 8.5919,  prefix: "KN" },
  { name: "Oyo",       country: "Nigeria",       lat: 7.8526,  lng: 3.9319,  prefix: "OY" },
  { name: "Kaduna",    country: "Nigeria",       lat: 10.5105, lng: 7.4165,  prefix: "KD" },
  { name: "Rivers",    country: "Nigeria",       lat: 4.8156,  lng: 7.0498,  prefix: "RV" },
  { name: "Nairobi",   country: "Kenya",         lat: -1.2921, lng: 36.8219, prefix: "NB" },
  { name: "Accra",     country: "Ghana",         lat: 5.6037,  lng: -0.1870, prefix: "AC" },
  { name: "Kigali",    country: "Rwanda",        lat: -1.9706, lng: 30.1044, prefix: "KG" },
] as const;

const FIRST = ["Amara","Tunde","Chinwe","Ifeoma","Kemi","Adaeze","Sani","Yusuf","Hadiza","Bukola","Ngozi","Femi","Tariq","Aisha","Obinna","Funke","Zainab","Ade","Bisi","Olayinka","Chima","Rashid","Salim","Halima","Uche","Damilola","Wairimu","Kwame","Akosua","Eric"];
const LAST  = ["Okonkwo","Adebayo","Eze","Bello","Hassan","Abubakar","Olawale","Idris","Mensah","Owusu","Mwangi","Karanja","Diop","Yusuf","Mukasa","Nwosu","Achebe","Kamau","Njoroge","Ouma","Boateng","Asante","Tijani","Olatunji","Etim"];

const USES: LandUse[]   = ["residential","agricultural","commercial","industrial","mixed"];
const STATUSES: Status[] = ["verified","verified","verified","pending","pending","review","disputed"];

// deterministic PRNG for stable demo data across renders
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(20260629);
const pick = <T,>(xs: readonly T[]) => xs[Math.floor(rand() * xs.length)];
const int  = (a: number, b: number) => Math.floor(rand() * (b - a + 1)) + a;

export interface OwnerLite {
  id: string;
  name: string;
  region: string;
  country: string;
  properties: number;
  joinedAt: string;
  verified: boolean;
}

export interface PropertyLite {
  id: string;
  passportId: string;
  title: string;
  use: LandUse;
  status: Status;
  trust: number;
  confidence: number;
  area: number;          // sqm
  valuation: number;     // USD
  owner: string;
  ownerId: string;
  region: string;
  country: string;
  lat: number;
  lng: number;
  registeredAt: string;  // ISO date
  lastVerifiedAt: string;
  fraudFlags: number;
  encumbrances: number;
}

function makeOwner(i: number): OwnerLite {
  const r = REGIONS[int(0, REGIONS.length - 1)];
  const joined = new Date(2018 + int(0, 7), int(0, 11), int(1, 28));
  return {
    id: `O-${String(i).padStart(5, "0")}`,
    name: `${pick(FIRST)} ${pick(LAST)}`,
    region: r.name,
    country: r.country,
    properties: int(1, 6),
    joinedAt: joined.toISOString().slice(0, 10),
    verified: rand() > 0.18,
  };
}

function makeProperty(i: number, owners: OwnerLite[]): PropertyLite {
  const r = REGIONS[i % REGIONS.length];
  const owner = owners[int(0, owners.length - 1)];
  const use = pick(USES);
  const status = pick(STATUSES);
  const baseValue = use === "commercial" ? 380_000
                  : use === "industrial" ? 520_000
                  : use === "residential" ? 180_000
                  : use === "mixed"       ? 220_000
                  :                          42_000;
  const valuation = Math.round(baseValue * (0.55 + rand() * 1.4));
  const trust = status === "verified" ? int(82, 98)
              : status === "review"   ? int(60, 80)
              : status === "pending"  ? int(48, 72)
              :                         int(28, 58);
  const confidence = Math.max(20, Math.min(99, trust + int(-6, 6)));
  const area = use === "agricultural" ? int(4_000, 38_000) : int(220, 4_800);
  const registered = new Date(2014 + int(0, 11), int(0, 11), int(1, 28));
  const lastVer    = new Date(2024 + int(0, 2), int(0, 11), int(1, 28));
  return {
    id: `p_${String(100 + i).padStart(4, "0")}`,
    passportId: `TT-${1000 + i * 7}-${r.prefix}`,
    title: `${r.name} ${use[0].toUpperCase() + use.slice(1)} Parcel ${i + 1}`,
    use, status, trust, confidence, area, valuation,
    owner: owner.name,
    ownerId: owner.id,
    region: r.name,
    country: r.country,
    lat: r.lat + (rand() - 0.5) * 0.5,
    lng: r.lng + (rand() - 0.5) * 0.5,
    registeredAt: registered.toISOString().slice(0, 10),
    lastVerifiedAt: lastVer.toISOString().slice(0, 10),
    fraudFlags: status === "disputed" ? int(1, 4) : (rand() > 0.86 ? 1 : 0),
    encumbrances: rand() > 0.7 ? int(1, 2) : 0,
  };
}

export const ownersExtended: OwnerLite[] = Array.from({ length: 1080 }, (_, i) => makeOwner(i + 1));
export const propertiesExtended: PropertyLite[] = Array.from({ length: 124 }, (_, i) => makeProperty(i, ownersExtended));

// Derived dashboards
export const portfolioStats = {
  totalParcels: propertiesExtended.length,
  totalOwners: ownersExtended.length,
  totalValuation: propertiesExtended.reduce((s, p) => s + p.valuation, 0),
  verifiedCount: propertiesExtended.filter(p => p.status === "verified").length,
  disputedCount: propertiesExtended.filter(p => p.status === "disputed").length,
  pendingCount:  propertiesExtended.filter(p => p.status === "pending" || p.status === "review").length,
  fraudFlags:    propertiesExtended.reduce((s, p) => s + p.fraudFlags, 0),
  avgTrust: Math.round(propertiesExtended.reduce((s, p) => s + p.trust, 0) / propertiesExtended.length),
};

export interface AttestationLite {
  id: string;
  passportId: string;
  attester: string;
  relation: "neighbour" | "council" | "chief" | "tenant";
  comment: string;
  at: string;
  status: "endorsed" | "pending" | "rejected";
}

const RELATIONS: AttestationLite["relation"][] = ["neighbour","council","chief","tenant"];
const COMMENTS = [
  "Has lived on this land for over a decade — undisputed.",
  "Boundary stones match the survey plan.",
  "Family compound recognised by the community council.",
  "No competing claims known in this ward.",
  "Tax receipts consistent with claimed possession.",
  "Confirmed during the 2024 community land audit.",
];

export const attestationsExtended: AttestationLite[] = Array.from({ length: 86 }, (_, i) => {
  const p = propertiesExtended[i % propertiesExtended.length];
  const o = ownersExtended[int(0, ownersExtended.length - 1)];
  return {
    id: `A-${String(i + 1).padStart(4, "0")}`,
    passportId: p.passportId,
    attester: o.name,
    relation: RELATIONS[i % RELATIONS.length],
    comment: COMMENTS[i % COMMENTS.length],
    at: new Date(2025, int(0, 11), int(1, 28)).toISOString().slice(0, 10),
    status: rand() > 0.15 ? "endorsed" : (rand() > 0.5 ? "pending" : "rejected"),
  };
});

export interface FraudCaseLite {
  id: string;
  passportId: string;
  kind: "duplicate-claim" | "forged-stamp" | "boundary-overlap" | "signature-anomaly" | "synthetic-doc";
  severity: "low" | "medium" | "high" | "critical";
  status: "open" | "investigating" | "resolved" | "escalated";
  detectedAt: string;
  region: string;
}

const FRAUD_KINDS: FraudCaseLite["kind"][] = ["duplicate-claim","forged-stamp","boundary-overlap","signature-anomaly","synthetic-doc"];
const SEVERITIES:  FraudCaseLite["severity"][] = ["low","medium","high","critical"];

export const fraudCasesExtended: FraudCaseLite[] = Array.from({ length: 42 }, (_, i) => {
  const p = propertiesExtended[(i * 3) % propertiesExtended.length];
  return {
    id: `F-${String(i + 1).padStart(4, "0")}`,
    passportId: p.passportId,
    kind: FRAUD_KINDS[i % FRAUD_KINDS.length],
    severity: SEVERITIES[Math.min(3, int(0, 3))],
    status: (["open","investigating","resolved","escalated"] as const)[i % 4],
    detectedAt: new Date(2025, int(0, 11), int(1, 28)).toISOString().slice(0, 10),
    region: p.region,
  };
});

export interface AuditEntry {
  id: string;
  actor: string;
  role: "citizen" | "surveyor" | "officer" | "verifier" | "admin" | "system";
  action: string;
  target: string;
  at: string;
}

const ACTIONS = [
  "approved passport",
  "issued digital signature",
  "uploaded survey report",
  "rejected document",
  "escalated dispute to bureau",
  "synced parcel with national registry",
  "verified community attestation",
  "flagged boundary overlap",
];

export const auditLogExtended: AuditEntry[] = Array.from({ length: 120 }, (_, i) => {
  const o = ownersExtended[int(0, ownersExtended.length - 1)];
  const p = propertiesExtended[int(0, propertiesExtended.length - 1)];
  return {
    id: `L-${String(i + 1).padStart(5, "0")}`,
    actor: o.name,
    role: (["citizen","surveyor","officer","verifier","admin","system"] as const)[i % 6],
    action: ACTIONS[i % ACTIONS.length],
    target: p.passportId,
    at: new Date(2025, int(0, 11), int(1, 28)).toISOString().slice(0, 16).replace("T", " "),
  };
});

// Regional aggregates (consistent with portfolioStats)
export const regionalAggregates = REGIONS.map(r => {
  const subset = propertiesExtended.filter(p => p.region === r.name);
  return {
    region: r.name,
    country: r.country,
    parcels: subset.length || int(2, 8),
    verified: subset.filter(p => p.status === "verified").length,
    disputed: subset.filter(p => p.status === "disputed").length,
    avgTrust: subset.length ? Math.round(subset.reduce((s, p) => s + p.trust, 0) / subset.length) : int(60, 85),
    valuation: subset.reduce((s, p) => s + p.valuation, 0),
  };
});

// Impact metrics — calibrated against national land-authority baselines
export const impactMetrics = {
  timeSavedDaysPerCase: 47,
  manualBaselineDays: 52,
  digitalCaseDays: 5,
  fraudReductionPct: 78,
  govSavingsUsdYear: 184_000_000,
  citizenSatisfactionPct: 94,
  verificationSpeedupX: 9.4,
  parcelsPerHourScale: 1_200,
  uptimePct: 99.98,
  sdgs: [
    { id: 1,  label: "No Poverty",                       hit: "Secure tenure unlocks credit for the under-banked." },
    { id: 5,  label: "Gender Equality",                  hit: "Women's land rights formalised on the registry." },
    { id: 10, label: "Reduced Inequalities",             hit: "Same passport for rural and urban parcels." },
    { id: 11, label: "Sustainable Cities & Communities", hit: "Digital cadastre for planning and resilience." },
    { id: 16, label: "Peace, Justice & Strong Institutions", hit: "Auditable land records reduce dispute backlog." },
  ],
};
