// Mock data for AI-powered feature screens.

export const valuationFactors = [
  { label: "Location desirability (Lekki Phase 1)", weight: 32, direction: "up" as const, note: "Top 5% premium corridor in Lagos coastal zone." },
  { label: "Recent comparable sales (12 nearby)", weight: 24, direction: "up" as const, note: "Median sale ₦125M · 90-day window." },
  { label: "Verified title chain", weight: 14, direction: "up" as const, note: "Unbroken transfer history since 2002." },
  { label: "Macro headwinds (FX volatility)", weight: -9, direction: "down" as const, note: "USD/NGN swings reduce dollar-equivalent value." },
  { label: "Distance to flood risk zone", weight: -4, direction: "down" as const, note: "1.8km from 100-year floodplain." },
  { label: "Infrastructure (road + utilities)", weight: 11, direction: "up" as const, note: "Tarred dual carriageway, public water grid." },
];

export const fraudSignals = [
  { label: "Duplicate boundary overlap", weight: 38, direction: "down" as const, note: "Polygon shares 12% area with TT-7710-LG (filed 2021)." },
  { label: "Document fingerprint mismatch", weight: 21, direction: "down" as const, note: "Survey plan watermark inconsistent with bureau template v2023." },
  { label: "Signature anomaly score", weight: 14, direction: "down" as const, note: "92% match to known forgery cluster #FC-204." },
  { label: "Bureau cross-validation", weight: 10, direction: "up" as const, note: "Lagos Bureau acknowledges parcel exists." },
  { label: "Owner verified ID", weight: 8, direction: "up" as const, note: "NIN + BVN matched." },
];

export const valuationHistory = [
  { m: "Jan", value: 248 }, { m: "Feb", value: 252 }, { m: "Mar", value: 261 },
  { m: "Apr", value: 258 }, { m: "May", value: 269 }, { m: "Jun", value: 274 },
  { m: "Jul", value: 281 }, { m: "Aug", value: 285 }, { m: "Sep", value: 290 },
  { m: "Oct", value: 295 }, { m: "Nov", value: 301 }, { m: "Dec", value: 312 },
];

export const ndviSeries = [
  { m: "Jan", ndvi: 0.42, moisture: 0.31 },
  { m: "Feb", ndvi: 0.39, moisture: 0.28 },
  { m: "Mar", ndvi: 0.45, moisture: 0.34 },
  { m: "Apr", ndvi: 0.58, moisture: 0.46 },
  { m: "May", ndvi: 0.66, moisture: 0.52 },
  { m: "Jun", ndvi: 0.72, moisture: 0.58 },
  { m: "Jul", ndvi: 0.76, moisture: 0.61 },
  { m: "Aug", ndvi: 0.74, moisture: 0.59 },
  { m: "Sep", ndvi: 0.68, moisture: 0.54 },
  { m: "Oct", ndvi: 0.61, moisture: 0.48 },
  { m: "Nov", ndvi: 0.55, moisture: 0.41 },
  { m: "Dec", ndvi: 0.48, moisture: 0.36 },
];

export const ownershipChain = [
  { year: 1998, owner: "Federal Land Registry", event: "Original allocation", confidence: 88 },
  { year: 2002, owner: "Adebayo Estates Ltd.", event: "Corporate acquisition", confidence: 91 },
  { year: 2011, owner: "Chinedu Okafor", event: "Private transfer", confidence: 94 },
  { year: 2019, owner: "Amara Okonkwo", event: "Verified deed transfer", confidence: 96 },
];

export const aiRecommendations = [
  { id: "r1", priority: "high" as const, title: "Upload tax clearance for Kaduna Farmland", impact: "+13 trust pts", reason: "Closes the documentation gap and unlocks bank-collateral eligibility.", cta: "Upload now" },
  { id: "r2", priority: "high" as const, title: "Resolve 0.4m boundary overlap with TT-2210-KD", impact: "Removes dispute risk", reason: "AI detected polygon intersection with neighbor parcel — re-survey recommended.", cta: "Open survey request" },
  { id: "r3", priority: "medium" as const, title: "Refresh satellite scan (last: 47 days ago)", impact: "+4 confidence pts", reason: "Newer imagery improves boundary detection accuracy by ~6%.", cta: "Refresh imagery" },
  { id: "r4", priority: "medium" as const, title: "Add second attestor to Abuja plot", impact: "Reaches community gold tier", reason: "Properties with ≥3 community attestations clear bureau review 2.3× faster.", cta: "Invite attestor" },
  { id: "r5", priority: "low" as const, title: "Enable monthly AI passport refresh", impact: "Automated trust drift alerts", reason: "Get notified when any score drops more than 5 points.", cta: "Enable" },
];

export const ocrFields = [
  { label: "Owner name", value: "Amara N. Okonkwo", confidence: 98 },
  { label: "Plot number", value: "Block 14 / Plot 7B", confidence: 96 },
  { label: "Survey ref.", value: "LG/SUR/2023/8421", confidence: 99 },
  { label: "Area (sqm)", value: "540.20", confidence: 94 },
  { label: "Issued date", value: "14 March 2024", confidence: 92 },
  { label: "Issuing authority", value: "Lagos State Land Bureau", confidence: 97 },
  { label: "Bureau stamp ID", value: "LSLB-2024-00831", confidence: 88 },
  { label: "Coordinates (centroid)", value: "6.4413° N, 3.4709° E", confidence: 91 },
];

export const verificationSuggestions = [
  { id: "v1", action: "Cross-check coordinates with Bureau dataset", confidence: 96, status: "Auto-passed" as const },
  { id: "v2", action: "Request community attestation (≥2 neighbors)", confidence: 81, status: "Suggested" as const },
  { id: "v3", action: "Surveyor field re-measurement", confidence: 72, status: "Suggested" as const },
  { id: "v4", action: "Re-issue survey plan with watermark v2024", confidence: 64, status: "Optional" as const },
  { id: "v5", action: "Tax clearance reconciliation", confidence: 88, status: "Auto-passed" as const },
];

export const riskBreakdown = [
  { label: "Title / legal risk", value: 12, tone: "success" as const },
  { label: "Boundary integrity", value: 28, tone: "warning" as const },
  { label: "Environmental (flood, erosion)", value: 18, tone: "success" as const },
  { label: "Market / valuation drift", value: 34, tone: "warning" as const },
  { label: "Fraud signal exposure", value: 9, tone: "success" as const },
];

export const landHealth = {
  ndvi: 0.71, moisture: 0.58, erosion: 0.12, slope: 4.2, soilCarbon: 1.8,
  treeCover: 0.34, builtupRatio: 0.62,
};

export const recommendationsForDoc = [
  "Owner name matches NIN registry — high confidence.",
  "Survey reference cross-validates with Lagos Bureau dataset.",
  "Plot coordinates within stated boundary polygon (0.4m drift).",
  "Stamp ID matches valid issuance window (Q1 2024).",
];
