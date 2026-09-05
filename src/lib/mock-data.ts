import type { Property, NotificationItem, KPI } from "./types";

export const properties: Property[] = [
  {
    id: "p_001",
    passportId: "TT-8421-LG",
    title: "Ramamurthy Nagar Residence",
    type: "residential",
    status: "verified",
    trustScore: 96,
    area: 540,
    address: "12, 4th Cross, Ramamurthy Nagar, Bengaluru",
    region: "Bengaluru",
    country: "India",
    owner: "Ananya Sharma",
    ownerSince: "2019-06-14",
    valuation: 24000000,
    aiConfidence: 92,
    coords: { lat: 6.4413, lng: 3.4709 },
    boundary: [
      { lat: 6.4414, lng: 3.4707 },
      { lat: 6.4415, lng: 3.4712 },
      { lat: 6.4411, lng: 3.4713 },
      { lat: 6.441, lng: 3.4708 },
    ],
    documents: [
      {
        id: "d1",
        name: "Certificate of Occupancy.pdf",
        kind: "deed",
        uploadedAt: "2024-03-14",
        verified: true,
      },
      {
        id: "d2",
        name: "Survey Plan 2023.pdf",
        kind: "survey",
        uploadedAt: "2023-11-02",
        verified: true,
      },
      {
        id: "d3",
        name: "Tax Clearance 2024.pdf",
        kind: "tax",
        uploadedAt: "2024-08-19",
        verified: true,
      },
    ],
    timeline: [
      {
        id: "t1",
        actor: "Bengaluru Revenue Office",
        role: "officer",
        action: "Ownership confirmed on registry",
        at: "2024-03-20",
      },
      {
        id: "t2",
        actor: "Surveyor Idris A.",
        role: "surveyor",
        action: "GIS boundary uploaded & verified",
        at: "2024-03-15",
      },
      {
        id: "t3",
        actor: "TerraTrust AI",
        role: "admin",
        action: "AI valuation generated",
        at: "2024-03-15",
      },
      {
        id: "t4",
        actor: "Community Council",
        role: "verifier",
        action: "Neighborhood attestation received",
        at: "2024-04-02",
      },
    ],
    tags: ["Family home", "Mortgage-eligible"],
  },
  {
    id: "p_002",
    passportId: "TT-2210-KD",
    title: "Mysuru Farm Parcel",
    type: "agricultural",
    status: "pending",
    trustScore: 71,
    area: 12400,
    address: "Plot 14, Hunsur Road, Mysuru",
    region: "Mysuru",
    country: "India",
    owner: "Ravi Kumar",
    ownerSince: "2022-01-09",
    valuation: 4850000,
    aiConfidence: 78,
    coords: { lat: 10.5105, lng: 7.4165 },
    boundary: [],
    documents: [
      {
        id: "d4",
        name: "Customary right of occupancy.pdf",
        kind: "deed",
        uploadedAt: "2024-09-10",
        verified: false,
      },
    ],
    timeline: [
      {
        id: "t5",
        actor: "Ravi Kumar",
        role: "citizen",
        action: "Property submitted for verification",
        at: "2024-09-10",
      },
      {
        id: "t6",
        actor: "TerraTrust AI",
        role: "admin",
        action: "OCR completed on 1 document",
        at: "2024-09-10",
      },
    ],
    tags: ["Family land"],
  },
  {
    id: "p_003",
    passportId: "TT-5512-AB",
    title: "Gurugram Commercial Plot",
    type: "commercial",
    status: "disputed",
    trustScore: 42,
    area: 1800,
    address: "Plot 88, Sector 29, Gurugram",
    region: "Gurugram",
    country: "India",
    owner: "Priya Reddy",
    ownerSince: "2021-05-22",
    valuation: 61200000,
    aiConfidence: 65,
    coords: { lat: 9.0765, lng: 7.3986 },
    boundary: [],
    documents: [
      {
        id: "d5",
        name: "Deed of Assignment.pdf",
        kind: "deed",
        uploadedAt: "2023-02-11",
        verified: true,
      },
      {
        id: "d6",
        name: "Conflicting claim notice.pdf",
        kind: "other",
        uploadedAt: "2024-07-30",
        verified: false,
      },
    ],
    timeline: [
      {
        id: "t7",
        actor: "Gurugram Land Registry",
        role: "officer",
        action: "Dispute flagged — overlapping claim detected",
        at: "2024-07-30",
      },
      {
        id: "t8",
        actor: "TerraTrust AI",
        role: "admin",
        action: "Boundary conflict detected via GIS",
        at: "2024-07-30",
      },
    ],
    tags: ["Under dispute"],
  },
  {
    id: "p_004",
    passportId: "TT-9930-OY",
    title: "Pune Family Compound",
    type: "residential",
    status: "verified",
    trustScore: 88,
    area: 880,
    address: "23 Baner Road, Pune",
    region: "Pune",
    country: "India",
    owner: "Meera Iyer",
    ownerSince: "2015-11-30",
    valuation: 14200000,
    aiConfidence: 90,
    coords: { lat: 7.4378, lng: 3.8966 },
    boundary: [],
    documents: [
      {
        id: "d7",
        name: "Deed of Gift.pdf",
        kind: "deed",
        uploadedAt: "2022-04-01",
        verified: true,
      },
    ],
    timeline: [
      {
        id: "t9",
        actor: "Pune Revenue Office",
        role: "officer",
        action: "Title confirmed",
        at: "2022-04-12",
      },
    ],
    tags: ["Inherited"],
  },
];

export const notifications: NotificationItem[] = [
  {
    id: "n1",
    title: "Verification complete",
    body: "Koramangala Residence trust score updated to 96.",
    at: "2 hours ago",
    read: false,
    kind: "success",
  },
  {
    id: "n2",
    title: "New community attestation",
    body: "Baner Compound received 3 neighborhood attestations.",
    at: "Yesterday",
    read: false,
    kind: "info",
  },
  {
    id: "n3",
    title: "Action needed",
    body: "Upload tax clearance for Mysuru Farm to raise trust score.",
    at: "2 days ago",
    read: true,
    kind: "warning",
  },
  {
    id: "n4",
    title: "Dispute filed",
    body: "An overlapping claim was registered on Gurugram Commercial Plot.",
    at: "Last week",
    read: true,
    kind: "alert",
  },
];

export const citizenKpis: KPI[] = [
  { label: "Properties", value: "4", delta: "+1", trend: "up", hint: "in your portfolio" },
  { label: "Avg. trust score", value: "74", delta: "+6", trend: "up", hint: "rolling 30 days" },
  { label: "Portfolio value", value: "₹1.08 Cr", delta: "+4.2%", trend: "up", hint: "AI estimate" },
  { label: "Open actions", value: "3", delta: "-1", trend: "down", hint: "verification tasks" },
];

export const govKpis: KPI[] = [
  { label: "Registered parcels", value: "24.1k", delta: "+180", trend: "up" },
  { label: "Verifications / day", value: "9,184", delta: "+12%", trend: "up" },
  { label: "Disputes resolved", value: "612", delta: "+44", trend: "up" },
  { label: "Fraud flags", value: "27", delta: "-9", trend: "down" },
];

export const surveyorKpis: KPI[] = [
  { label: "Active assignments", value: "12", trend: "flat" },
  { label: "Completed this month", value: "38", delta: "+5", trend: "up" },
  { label: "Avg. turnaround", value: "2.4d", delta: "-0.3d", trend: "down" },
  { label: "Quality score", value: "4.92", delta: "+0.04", trend: "up" },
];

export const adminKpis: KPI[] = [
  { label: "Active users", value: "1,842", delta: "+3.1%", trend: "up" },
  { label: "Properties indexed", value: "24.1k", delta: "+0.7%", trend: "up" },
  { label: "AI requests / day", value: "1.2k", delta: "+8%", trend: "up" },
  { label: "Uptime", value: "99.5%", trend: "flat" },
];

export const verificationsOverTime = [
  { month: "Jan", verified: 6200, pending: 1800, disputed: 240 },
  { month: "Feb", verified: 7100, pending: 1600, disputed: 220 },
  { month: "Mar", verified: 7800, pending: 1500, disputed: 210 },
  { month: "Apr", verified: 8600, pending: 1400, disputed: 190 },
  { month: "May", verified: 9100, pending: 1320, disputed: 180 },
  { month: "Jun", verified: 9800, pending: 1240, disputed: 170 },
  { month: "Jul", verified: 10400, pending: 1180, disputed: 165 },
  { month: "Aug", verified: 11200, pending: 1100, disputed: 158 },
];

export const valuationTrend = [
  { year: "2019", value: 180 },
  { year: "2020", value: 198 },
  { year: "2021", value: 222 },
  { year: "2022", value: 244 },
  { year: "2023", value: 261 },
  { year: "2024", value: 285 },
];

export const trustDistribution = [
  { name: "90–100", value: 38 },
  { name: "70–89", value: 32 },
  { name: "50–69", value: 18 },
  { name: "< 50", value: 12 },
];

export const regions = [
  { name: "Bengaluru", verified: 412000, pending: 38000 },
  { name: "Gurugram", verified: 184000, pending: 22000 },
  { name: "Mysuru", verified: 268000, pending: 41000 },
  { name: "Pune", verified: 198000, pending: 27000 },
  { name: "Karnataka", verified: 142000, pending: 35000 },
  { name: "Hyderabad", verified: 156000, pending: 24000 },
];
