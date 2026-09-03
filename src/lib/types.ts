export type Role = "citizen" | "surveyor" | "officer" | "verifier" | "admin" | "bank";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  region?: string;
  verified?: boolean;
  joinedAt: string;
}

export type PropertyStatus = "verified" | "pending" | "disputed" | "draft";
export type PropertyType = "residential" | "agricultural" | "commercial" | "industrial" | "vacant";

export interface PropertyBoundary {
  lat: number;
  lng: number;
}

export interface PropertyDocument {
  id: string;
  name: string;
  kind: "deed" | "survey" | "tax" | "id" | "other";
  uploadedAt: string;
  verified: boolean;
}

export interface VerificationEvent {
  id: string;
  actor: string;
  role: Role;
  action: string;
  at: string;
  note?: string;
}

export interface Property {
  id: string;
  passportId: string; // TT-XXXX
  title: string;
  type: PropertyType;
  status: PropertyStatus;
  trustScore: number; // 0-100
  area: number; // sqm
  address: string;
  region: string;
  country: string;
  owner: string;
  ownerSince: string;
  valuation: number; // USD
  aiConfidence: number; // 0-100
  coords: { lat: number; lng: number };
  boundary: PropertyBoundary[];
  documents: PropertyDocument[];
  timeline: VerificationEvent[];
  image?: string;
  tags?: string[];
}

export interface KPI {
  label: string;
  value: string;
  delta?: string;
  trend?: "up" | "down" | "flat";
  hint?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  at: string;
  read: boolean;
  kind: "info" | "success" | "warning" | "alert";
}
