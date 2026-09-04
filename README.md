# TerraTrust AI

> **AI-Powered Digital Property Trust Platform** — bringing transparency, verifiability, and trust to land ownership for governments, citizens, surveyors, banks, and underserved communities.

[![Built with TanStack Start](https://img.shields.io/badge/TanStack-Start-11C5EA)](https://tanstack.com/start)
[![React 19](https://img.shields.io/badge/React-19-61DAFB)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind-v4-38BDF8)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/license-MIT-green)](#license)

---

## Table of Contents

1. [Project Vision](#1-project-vision)
2. [Problem Statement](#2-problem-statement)
3. [Solution](#3-solution)
4. [Architecture](#4-architecture)
5. [Folder Structure](#5-folder-structure)
6. [Technology Stack](#6-technology-stack)
7. [Data Flow](#7-data-flow)
8. [Routing Flow](#8-routing-flow)
9. [Authentication Flow](#9-authentication-flow)
10. [Database Schema](#10-database-schema)
11. [Firestore Collections](#11-firestore-collections-reference-model)
12. [Component Hierarchy](#12-component-hierarchy)
13. [Reusable Components](#13-reusable-components)
14. [Hooks](#14-hooks)
15. [Utilities](#15-utilities)
16. [Services](#16-services)
17. [AI Architecture](#17-ai-architecture)
18. [Map Architecture](#18-map-architecture)
19. [Future Scope](#19-future-scope)
20. [Deployment Guide](#20-deployment-guide)
21. [Environment Variables](#21-environment-variables)
22. [Installation](#22-installation)
23. [Build Process](#23-build-process)
24. [Testing Strategy](#24-testing-strategy)
25. [Performance Optimizations](#25-performance-optimizations)
26. [Security Considerations](#26-security-considerations)
27. [Accessibility](#27-accessibility)
28. [Scalability](#28-scalability)
29. [Known Limitations](#29-known-limitations)
30. [Future Roadmap](#30-future-roadmap)
31. [Developer Guide](#31-developer-guide)
32. [Contributing Guide](#32-contributing-guide)
33. [License](#33-license)

---

## 1. Project Vision

TerraTrust AI's vision is to make **every parcel of land on Earth verifiable, understandable, and trustworthy** — independent of geography, literacy, or institutional capacity. We believe property is the bedrock of economic dignity. When ownership is opaque, the poor pay the highest tax: lost inheritance, denied credit, stolen plots, and unresolved disputes that span generations.

TerraTrust AI is the digital trust layer for property — combining computer vision, document intelligence, community attestation, and machine-readable property passports into a single platform that any citizen, surveyor, banker, or government officer can use with confidence.

> **One parcel. One passport. One source of truth.**

---

## 2. Problem Statement

Global land administration is broken in measurable ways:

- **70%+ of land globally is undocumented or weakly documented.** (World Bank)
- **Title fraud and double-allocation** drain billions from emerging-market mortgage books each year.
- **Boundary disputes** clog civil courts and stall infrastructure projects for years.
- **Banks won't lend** against properties they cannot independently verify, freezing trillions in dead capital (de Soto's "mystery of capital").
- **Surveyors and registrars** still operate on paper, scanned PDFs, and disconnected silos.
- **Citizens** have no way to prove what they own — or to discover what they've inherited.

The result: an enormous trust deficit between landholders and the institutions that should serve them.

---

## 3. Solution

TerraTrust AI is a **Digital Property Trust Platform** that issues every parcel a _Property Passport_ — a machine-verifiable, AI-augmented identity record built from:

- **AI Property Valuation** — explainable estimates with comparable sales and factor attribution.
- **Document OCR + Summarization** — extract, validate, and plain-English-summarize titles, deeds, mutations, and survey reports.
- **Fraud & Risk Detection** — duplicate boundaries, forged stamps, signature anomalies, and chain-of-custody breaks.
- **Boundary Detection & Satellite Comparison** — AI-detected polygons compared against registered surveys and 8+ years of imagery.
- **Land Health Scoring** — NDVI, moisture, soil carbon, and environmental risk indices.
- **Community Verification** — neighbour attestations, surveyor inspections, and government endorsements that compound into a Trust Score.
- **Multi-Role Workbenches** — purpose-built portals for Citizens, Surveyors, Government Officers, Verifiers, Banks, and Admins.

Every action is auditable. Every score is explainable. Every passport is portable.

---

## 4. Architecture

TerraTrust AI is a **full-stack React 19 application on TanStack Start v1**, designed to run on edge runtimes (Cloudflare Workers) with progressive enhancement and SSR.

```
┌──────────────────────────────────────────────────────────────────┐
│                        Client (React 19)                         │
│  Routes (file-based) · TanStack Router · TanStack Query · UI     │
└─────────────────────────────┬────────────────────────────────────┘
                              │ RPC (createServerFn) / fetch
┌─────────────────────────────▼────────────────────────────────────┐
│                  Server (TanStack Start / Edge)                  │
│   Server Functions · API routes · Auth middleware · SSR shell    │
└─────────────────────────────┬────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
┌──────────────┐      ┌──────────────┐      ┌──────────────────┐
│   Database   │      │  AI Gateway  │      │  GIS / Imagery   │
│  (Postgres)  │      │  (LLM, OCR,  │      │ (tiles, raster,  │
│   + Auth     │      │   vision)    │      │   vector)        │
└──────────────┘      └──────────────┘      └──────────────────┘
```

**Architectural pillars:**

- **File-based routing** under `src/routes/` generates a typed route tree.
- **Server functions** (`createServerFn`) handle privileged work — DB access, AI calls, valuation.
- **TanStack Query** is the canonical data-fetching layer: loaders prefetch, components consume via `useSuspenseQuery`.
- **Design tokens** in `src/styles.css` (OKLCH color, Tailwind v4 theme) drive every surface.
- **Mock-first development** — `src/lib/mock-data.ts` and `src/lib/ai-mock.ts` simulate the entire ecosystem until live services are wired in.

---

## 5. Folder Structure

```
terratrust-ai/
├── public/                          # Static assets served as-is
├── src/
│   ├── routes/                      # File-based routes (82+ screens)
│   │   ├── __root.tsx               # Root layout, providers, head/meta
│   │   ├── index.tsx                # Marketing landing page
│   │   ├── login.tsx                # Auth: sign-in
│   │   ├── register.tsx             # Auth: sign-up
│   │   ├── forgot-password.tsx
│   │   ├── role-select.tsx          # Post-signup role chooser
│   │   ├── complete-profile.tsx
│   │   ├── dashboard.tsx            # Citizen portal home
│   │   ├── properties.tsx           # Portfolio listing
│   │   ├── properties.new.tsx       # Multi-step registration
│   │   ├── properties.$id.tsx       # Property Passport (layout)
│   │   ├── properties.$id.documents.tsx
│   │   ├── properties.$id.timeline.tsx
│   │   ├── properties.$id.ownership.tsx
│   │   ├── properties.$id.boundary.tsx
│   │   ├── properties.$id.satellite.tsx
│   │   ├── properties.$id.gis-layers.tsx
│   │   ├── properties.$id.ai-analysis.tsx
│   │   ├── properties.$id.transfer.tsx
│   │   ├── properties.$id.share.tsx
│   │   ├── map.tsx                  # Interactive GIS
│   │   ├── valuation.tsx            # AI valuation tool
│   │   ├── verification.tsx         # Verifier queue
│   │   ├── community.tsx            # Community attestations
│   │   ├── attestations.tsx
│   │   ├── fraud.tsx, fraud.$id.tsx # Fraud cases
│   │   ├── disputes.*               # Dispute filing & resolution
│   │   ├── reports.*                # Reporting engine
│   │   ├── surveyor.*               # Surveyor workbench
│   │   ├── government.*             # Government bureau
│   │   ├── bank.*                   # Bank origination & loan book
│   │   ├── admin.*                  # Admin: users, roles, audit, system
│   │   ├── ai.tsx, ai-*.tsx         # 14 AI Intelligence screens
│   │   ├── assistant.tsx            # Conversational AI
│   │   ├── search.tsx
│   │   ├── notifications.tsx
│   │   ├── profile.tsx, settings.tsx, billing.tsx, security.tsx
│   │   ├── integrations.tsx, api-tokens.tsx, developers.tsx
│   │   ├── help.tsx, support.*      # Help center & tickets
│   │   ├── onboarding.tsx, mobile.tsx
│   │   ├── about.tsx, pricing.tsx, partners.tsx, roadmap.tsx,
│   │   │   changelog.tsx, contact.tsx, privacy.tsx, terms.tsx, status.tsx
│   │   └── loading.tsx, empty.tsx, error.tsx, success.tsx
│   ├── components/
│   │   ├── ai/                      # AI primitives (ScoreRing, etc.)
│   │   ├── brand/                   # Logo, wordmark
│   │   ├── layout/                  # AppShell, SiteHeader, SiteFooter
│   │   ├── ui/                      # shadcn-style primitives
│   │   └── ui-ext/                  # Scaffold, DataTable, KpiRow, etc.
│   ├── lib/
│   │   ├── types.ts                 # Core domain types
│   │   ├── mock-data.ts             # Realistic seed dataset
│   │   ├── ai-mock.ts               # AI model simulation data
│   │   └── utils.ts
│   ├── hooks/                       # Custom React hooks
│   ├── styles.css                   # Tailwind v4 + design tokens
│   ├── router.tsx                   # Router bootstrap
│   └── start.ts                     # Server entry (middleware chain)
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 6. Technology Stack

| Layer                    | Technology                                                 |
| ------------------------ | ---------------------------------------------------------- |
| **Framework**            | TanStack Start v1 (SSR + Edge)                             |
| **UI Runtime**           | React 19                                                   |
| **Routing**              | TanStack Router (file-based, typed)                        |
| **Data fetching**        | TanStack Query v5                                          |
| **Build tool**           | Vite 7                                                     |
| **Language**             | TypeScript (strict)                                        |
| **Styling**              | Tailwind CSS v4 + native CSS @theme tokens                 |
| **Design tokens**        | OKLCH color model, Instrument Serif + Inter Tight          |
| **Components**           | shadcn-style primitives + custom AI/GIS primitives         |
| **Charts**               | Recharts                                                   |
| **Motion**               | Framer Motion                                              |
| **Icons**                | lucide-react                                               |
| **Validation**           | Zod                                                        |
| **Backend (production)** | Supabase PostgreSQL + Auth with Row Level Security         |
| **AI**                   | TerraTrust prototype engines and n8n verification workflow |
| **Deployment**           | Cloudflare Workers (edge)                                  |

---

## 7. Data Flow

```
User action
   │
   ▼
Route loader  ── ensureQueryData(queryOptions) ──► TanStack Query cache
   │                                                 │
   ▼                                                 ▼
Component renders ──► useSuspenseQuery ──► fresh or cached data
   │
   ▼
Mutation (createServerFn) ──► server validates (Zod) ──► DB / AI Gateway
   │
   ▼
queryClient.invalidateQueries(...) ──► dependent views re-fetch
```

**Principles**

- Loaders prefetch; components consume via `useSuspenseQuery`.
- No `useEffect` + `fetch` for first paint.
- Server functions are the only privileged surface — clients never call DB directly.
- All inputs are Zod-validated server-side, regardless of client-side checks.

---

## 8. Routing Flow

```
/                              Marketing landing
├── /login, /register          Public auth
├── /forgot-password
├── /role-select               Post-signup
├── /complete-profile
│
├── /dashboard                 Citizen home (authenticated)
├── /properties                Portfolio
│   └── /properties/$id        Property Passport (layout w/ <Outlet/>)
│       ├── /documents
│       ├── /timeline
│       ├── /ownership
│       ├── /boundary
│       ├── /satellite
│       ├── /gis-layers
│       ├── /ai-analysis
│       ├── /transfer
│       └── /share
│
├── /map, /valuation, /search, /assistant
│
├── /ai                        AI Intelligence hub
│   ├── /ai-passport, /ai-valuation, /ai-ocr
│   ├── /ai-fraud, /ai-timeline, /ai-risk, /ai-confidence
│   ├── /ai-boundary, /ai-satellite, /ai-land-health
│   └── /ai-recommendations, /ai-summary, /ai-suggestions
│
├── /verification, /community, /attestations
├── /fraud, /fraud/$id
├── /disputes, /disputes/new, /disputes/$id
├── /reports, /reports/new, /reports/$id
│
├── /surveyor + /surveyor/assignments, /surveyor/tools
├── /government + /government/parcels, /permits, /disputes, /audit
├── /bank + /bank/loans
│
├── /admin + /admin/users, /roles, /audit, /system, /api-keys, /feedback, /regions
│
├── /profile, /settings, /billing, /security, /notifications,
│   /integrations, /api-tokens, /developers
├── /help, /support, /support/new, /support/$id
│
├── /about, /pricing, /partners, /roadmap, /changelog,
│   /contact, /privacy, /terms, /status
│
└── State routes: /loading, /empty, /error, /success
```

Each route file exports a `Route` from `createFileRoute(...)`. Dynamic params use `$id`. Parent routes render `<Outlet />`. Every public route declares its own `head()` for SEO.

---

## 9. Authentication Flow

```
Register ──► verify email ──► role-select ──► complete-profile ──► dashboard
                                                    │
Login ──► session token issued ──► attached via client middleware (start.ts)
                                                    │
Protected server fns: requireSupabaseAuth middleware checks bearer token
                                                    │
Protected routes: live under _authenticated/ layout (when promoted)
                                                    │
Forgot-password ──► magic link ──► password reset ──► login
```

- **Roles**: `citizen`, `surveyor`, `officer`, `verifier`, `banker`, `admin` — stored in a separate `user_roles` table with a `has_role(uid, role)` security-definer function.
- **Sessions**: managed by Supabase Auth; the browser client restores and observes the Supabase session.
- **Privilege escalation**: prevented by never storing roles on the profile/users row.

---

## 10. Database Schema

> Production schema runs on **Supabase PostgreSQL** with Row-Level Security (RLS). See `SUPABASE_SETUP.md` and the SQL migration.

**Core tables** (illustrative — exact DDL ships with migrations):

```
auth.users                              -- managed by platform auth
public.profiles(id PK → auth.users, full_name, locale, phone, avatar_url, ...)
public.user_roles(id, user_id, role app_role, UNIQUE(user_id, role))

public.properties(
  id PK, owner_id → auth.users, title, address, region_id, geom geometry(Polygon,4326),
  area_sqm, status, trust_score numeric, valuation_estimate numeric, created_at, updated_at
)

public.documents(
  id PK, property_id → properties, kind, file_path, ocr_json jsonb,
  confidence numeric, uploaded_by, verified_by, created_at
)

public.ownership_events(
  id PK, property_id, from_user, to_user, event_type, evidence_doc_id, occurred_at
)

public.attestations(
  id PK, property_id, attester_id, stance, weight, comment, created_at
)

public.fraud_cases(
  id PK, property_id, signal_type, severity, status, assigned_to, summary, created_at
)

public.disputes(
  id PK, property_id, opened_by, respondent_id, status, kind, opened_at, resolved_at
)

public.ai_runs(
  id PK, subject_kind, subject_id, model, kind, input_hash, output jsonb,
  confidence numeric, explainability jsonb, created_at
)

public.audit_log(
  id PK, actor_id, action, target_kind, target_id, payload jsonb, ip, ua, created_at
)
```

**RLS pattern**: every public table enables RLS. Policies use `auth.uid()` and `public.has_role(auth.uid(), 'admin')`. Each table is followed by explicit `GRANT` statements for `authenticated` and `service_role` (and `anon` only for fully public reads).

Spatial queries use **PostGIS** (`geom`, `ST_Intersects`, `ST_Area`).

---

## 11. Firestore Collections (Reference Model)

For teams porting TerraTrust AI to **Firebase / Firestore**, the equivalent NoSQL shape is:

```
/users/{uid}                      # profile doc
/users/{uid}/roles/{role}         # subcollection — role flags

/properties/{propertyId}          # core property doc
   ├── /documents/{docId}
   ├── /timeline/{eventId}
   ├── /ownership/{eventId}
   ├── /attestations/{attId}
   └── /aiRuns/{runId}

/fraudCases/{caseId}
/disputes/{disputeId}
/reports/{reportId}
/auditLog/{entryId}                # append-only

/regions/{regionId}                # admin geography
/feedback/{id}, /support/{ticketId}
```

**Security rules** mirror the Postgres RLS model: role checks via custom claims; property writes restricted to `owner_id`; admin-only collections gated by `request.auth.token.admin == true`.

---

## 12. Component Hierarchy

```
<RootRoute> (src/routes/__root.tsx)
└── <RouterProvider>
    ├── <SiteHeader />          (marketing routes)
    │
    ├── <AppShell>              (authenticated workspace)
    │   ├── <Sidebar>           groups: Workspace · Trust · AI · Roles · Account
    │   ├── <Topbar>            search · notifications · profile menu
    │   └── <Outlet />          ← page content
    │       └── e.g. <PropertyPassport>
    │              ├── <Tabs> (Overview / Documents / Timeline / Ownership / …)
    │              └── <Outlet /> (nested sub-route)
    │
    └── <SiteFooter />          (marketing routes)
```

---

## 13. Reusable Components

| Component                                   | Path                             | Purpose                       |
| ------------------------------------------- | -------------------------------- | ----------------------------- |
| `Logo`                                      | `components/brand/Logo.tsx`      | Brand mark with size variants |
| `GlassCard`                                 | `components/ui-ext`              | Glassmorphism surface         |
| `StatCard`                                  | `components/ui-ext`              | KPI tile with delta           |
| `TrustScore`                                | `components/ui-ext`              | Custom SVG gauge (0–100)      |
| `MapMock`                                   | `components/ui-ext/MapMock.tsx`  | Stylized GIS canvas           |
| `Scaffold`                                  | `components/ui-ext/Scaffold.tsx` | Page scaffolding              |
| `DataTable`                                 | `components/ui-ext`              | Sortable, filterable table    |
| `KpiRow`, `Stepper`, `Pill`, `SectionTitle` | `components/ui-ext`              | Composition helpers           |
| `ScoreRing`                                 | `components/ai`                  | SVG confidence ring           |
| `ConfidenceMeter`                           | `components/ai`                  | Calibrated progress           |
| `RiskGauge`                                 | `components/ai`                  | Semi-circle meter             |
| `AIInsightCard`                             | `components/ai`                  | Insight w/ delta              |
| `ExplainabilityPanel`                       | `components/ai`                  | Factor weighting              |
| `ReasoningTrace`                            | `components/ai`                  | Step-by-step model trace      |
| `AppShell`, `SiteHeader`, `SiteFooter`      | `components/layout`              | Navigation surfaces           |

Plus the full shadcn primitive set in `components/ui/` (button, input, dialog, tabs, etc.).

---

## 14. Hooks

| Hook                         | Purpose                                   |
| ---------------------------- | ----------------------------------------- |
| `useAuth()`                  | Current user, role, sign-in/out helpers   |
| `useProperty(id)`            | Single-property query wrapper             |
| `usePropertyList()`          | Portfolio query with filters              |
| `useAIRun(kind, subjectId)`  | Subscribes to latest AI run for a subject |
| `useTrustScore(propertyId)`  | Composite score with breakdown            |
| `useToast()`                 | Toast notifications                       |
| `useMediaQuery(q)`           | Responsive logic                          |
| `useDebouncedValue(v, ms)`   | Search inputs                             |
| `useLocalStorage(key, init)` | Persistent UI state                       |
| `usePagination(total, size)` | Table paging                              |

---

## 15. Utilities

- `lib/utils.ts` — `cn()` class merger, currency/area/date formatters, `slugify`, `truncate`.
- `lib/types.ts` — domain types: `User`, `Role`, `Property`, `Document`, `AttestationStance`, `FraudSignal`, `DisputeStatus`, etc.
- `lib/mock-data.ts` — realistic seed data for properties, owners, documents, timeline.
- `lib/ai-mock.ts` — simulated outputs for valuation, OCR, fraud signals, NDVI series, boundary drift.

---

## 16. Services

> Service layer = **server functions** (`createServerFn`) under `src/lib/*.functions.ts`. Each one is typed RPC, Zod-validated, and (when needed) wrapped in `requireSupabaseAuth`.

| Service                     | Responsibility                                    |
| --------------------------- | ------------------------------------------------- |
| `properties.functions.ts`   | CRUD, transfer, share                             |
| `documents.functions.ts`    | Upload, OCR enqueue, verify                       |
| `valuation.functions.ts`    | Trigger AI valuation, return comparables          |
| `fraud.functions.ts`        | Run fraud signals, manage cases                   |
| `attestations.functions.ts` | Submit/withdraw community attestations            |
| `disputes.functions.ts`     | Open, comment, resolve disputes                   |
| `reports.functions.ts`      | Generate exportable reports                       |
| `admin.functions.ts`        | Roles, audit, system health                       |
| `ai.functions.ts`           | Unified gateway to AI Gateway (chat, vision, OCR) |

Public webhook endpoints (e.g. external imagery callbacks) live under `src/routes/api/public/*` and verify signatures inside the handler.

---

## 17. AI Architecture

```
                ┌──────────────────────────────────────────┐
                │           TerraTrust AI Gateway          │
                │  chat · vision · OCR · embeddings · TTS  │
                └────────────┬───────────────┬─────────────┘
                             │               │
       ┌─────────────────────┘               └────────────────────┐
       ▼                                                          ▼
┌──────────────┐   ┌──────────────┐   ┌──────────────┐   ┌────────────────┐
│  Valuation   │   │  Document    │   │   Fraud      │   │   Geospatial   │
│   Engine     │   │   OCR +      │   │  Detection   │   │   Boundary &   │
│ (regression+ │   │  Summary     │   │ (anomalies,  │   │   Land Health  │
│  comparables)│   │              │   │  dup polys)  │   │   (NDVI, etc.) │
└──────┬───────┘   └──────┬───────┘   └──────┬───────┘   └────────┬───────┘
       │                  │                  │                    │
       └──────────────────┴──────────────────┴────────────────────┘
                                 │
                                 ▼
                       ┌──────────────────┐
                       │ Composite Trust  │
                       │  Score + Passport│
                       └──────────────────┘
```

**Explainability is non-negotiable.** Every AI surface ships:

- A **confidence score** (0–100) with calibration history.
- An **explainability panel** (factor weights, top contributors).
- A **reasoning trace** (step-by-step model decisions).
- A **signed run record** stored in `ai_runs` for audit replay.

**Model classes**

- **LLM** — assistant chat, document summarization, recommendations.
- **Vision** — boundary detection, satellite change detection, stamp/signature anomaly.
- **OCR** — multilingual, with field-level confidence and bureau cross-validation.
- **Tabular** — valuation regression with comparable sales attribution.
- **Geospatial** — NDVI, soil carbon proxies, flood/risk overlays.

---

## 18. Map Architecture

The platform ships a **stylized GIS engine** that runs without heavy native deps so it can render on the edge.

```
<MapMock>
  ├── Base layer            cartographic vector tiles (mock)
  ├── Parcel layer          GeoJSON polygons w/ status colors
  ├── AI boundary overlay   AI-detected vs registered, drift vectors
  ├── Satellite layer       multi-epoch raster compare
  ├── GIS layers (toggle)   zoning · flood · soil · roads · infra
  └── Selection overlay     focused parcel + tooltip
```

For production deployment, the same component contract upgrades to **MapLibre GL + PMTiles** (vector) and **COG/STAC** (raster) without changing route code.

---

## 19. Future Scope

- **On-chain anchoring** of passport hashes (verifiable claims, no token speculation).
- **Offline-first mobile capture** for field surveyors in low-connectivity areas.
- **Multilingual OCR** for 30+ scripts (Devanagari, Amharic, Arabic, Khmer, …).
- **Drone imagery ingestion** with automated photogrammetry-to-polygon pipelines.
- **Marketplace** for verified parcels, with bank pre-approval baked in.
- **National registry adapters** — pluggable connectors to government cadastre APIs.

---

## 20. Deployment Guide

TerraTrust AI deploys to **Cloudflare Workers** (edge) with environment-driven configuration.

1. **Set environment variables** (see §21).
2. **Provision the required infrastructure** for Postgres, auth, storage, and the AI gateway.
3. **Build and deploy** the worker bundle to your target environment.
4. **Configure the custom domain** in your hosting environment.
5. **Backend** (server functions, migrations) deploys with the application release.

Stable URLs are environment-specific and managed by your deployment platform.

---

## 21. Environment Variables

| Variable                    | Scope  | Purpose                  |
| --------------------------- | ------ | ------------------------ |
| `SUPABASE_URL`              | server | Cloud DB URL             |
| `SUPABASE_PUBLISHABLE_KEY`  | server | Public anon key          |
| `SUPABASE_SERVICE_ROLE_KEY` | server | Admin (server-only)      |
| `AI_GATEWAY_API_KEY`        | server | AI Gateway key           |
| `WEBHOOK_SECRET`            | server | HMAC for `/api/public/*` |
| `VITE_APP_NAME`             | client | Branding override        |
| `VITE_MAP_STYLE_URL`        | client | Map tile style           |

`process.env.*` is **server-only**. Client-side public config uses `import.meta.env.VITE_*`.

---

## 22. Installation

```bash
# 1. Install deps (bun preferred)
bun install

# 2. Configure env
cp .env.example .env
# fill in the variables from §21

# 3. Run dev server
bun run dev          # http://localhost:8080

# 4. Typecheck
bunx tsgo --noEmit

# 5. Build
bun run build
```

---

## 23. Build Process

- **Vite 7** compiles client + server bundles.
- **TanStack Start plugin** generates `src/routeTree.gen.ts` from `src/routes/`.
- **Tailwind v4** is processed via Lightning CSS from `src/styles.css`.
- **Server entry** (`src/start.ts`) wires the middleware chain (auth attacher, error, request).
- **Output target**: Cloudflare Worker bundle (edge-compatible, no Node-only deps).

> Never hand-edit `src/routeTree.gen.ts` — it is generated.

---

## 24. Testing Strategy

| Layer           | Tooling                        | Focus                                 |
| --------------- | ------------------------------ | ------------------------------------- |
| **Unit**        | Vitest                         | utilities, formatters, pure logic     |
| **Component**   | Vitest + Testing Library       | reusable UI + AI primitives           |
| **Integration** | Vitest + msw                   | server functions with mocked services |
| **E2E**         | Playwright (headless Chromium) | auth, property creation, AI flows     |
| **Visual**      | Playwright screenshots         | per-route smoke set                   |
| **Type**        | `tsgo --noEmit`                | strict mode on every commit           |

Run all tests:

```bash
bunx vitest run
bunx playwright test
```

---

## 25. Performance Optimizations

- **SSR + streaming** via TanStack Start (fast TTFB on the edge).
- **TanStack Query** with `defaultPreloadStaleTime: 0` and route-level prefetch.
- **Code splitting** per route (file-based, automatic).
- **Suspense boundaries** for AI/data-heavy panels.
- **OKLCH design tokens** — no runtime theme JS.
- **Image discipline** — lazy loading, responsive `srcset`, AVIF/WebP preferred.
- **Recharts** rendered only on demand (no global eager imports).
- **Edge-only deps** — no native binaries that would bloat the bundle.

---

## 26. Security Considerations

- **RLS everywhere** — every public Postgres table enables RLS; policies use `auth.uid()` and `has_role()`.
- **Roles in a separate table** — `user_roles` only; never on `profiles`. Prevents privilege escalation.
- **Server-only secrets** — `process.env.*` never crosses to the client.
- **Zod validation** on every server-function input.
- **HMAC verification** on every `/api/public/*` webhook before processing.
- **Signed AI runs** — `ai_runs` is append-only and audit-replayable.
- **CSRF/Cookies** — auth tokens are sent via `Authorization` headers, not cookies, eliminating CSRF on RPC.
- **Audit log** — every privileged action is recorded with actor, target, payload.

---

## 27. Accessibility

- WCAG 2.2 AA target.
- Semantic HTML first; ARIA only where needed.
- Keyboard navigation on every interactive surface (modals, tabs, menus, tables).
- Focus rings preserved — never `outline: none` without a custom replacement.
- Color contrast verified in OKLCH; minimum 4.5:1 for body text, 3:1 for large.
- Reduced-motion support (`prefers-reduced-motion`) wired into Framer Motion variants.
- Screen-reader labels on icon-only buttons and charts (alt-text summaries).

---

## 28. Scalability

- **Edge-native**: stateless server functions scale horizontally per request.
- **Postgres + PostGIS**: partition by `region_id` for national-scale parcel counts.
- **Read replicas** + **materialized views** for analytics surfaces.
- **AI Gateway** abstracts model providers — failover and capacity routing.
- **Object storage** for documents with signed URLs.
- **CDN-cached** marketing routes; authenticated routes SSR per request.

---

## 29. Known Limitations

- Current build uses **mocked AI outputs** (`ai-mock.ts`) — real model wiring is planned per service.
- `MapMock` is a **stylized renderer**, not yet MapLibre/PMTiles in production.
- No mobile native app yet — responsive web only.
- OCR currently demoed on Latin scripts; multi-script training pending.
- Some marketing copy is placeholder pending legal/regulatory review per jurisdiction.

---

## 30. Future Roadmap

**Q3 2026** — Real-model wiring (valuation, OCR, fraud).
**Q4 2026** — National registry adapters; first government pilot.
**Q1 2027** — Offline-first mobile capture app for surveyors.
**Q2 2027** — Marketplace with bank pre-approval and verified listings.
**Q3 2027** — Drone & satellite ingestion pipelines; multi-script OCR.
**Q4 2027** — On-chain anchoring of passport hashes (optional, jurisdiction-aware).

---

## 31. Developer Guide

**Adding a new route**

1. Create `src/routes/<your-route>.tsx`.
2. Export `Route = createFileRoute('/<your-route>')({ component, head })`.
3. The TanStack Router Vite plugin regenerates `routeTree.gen.ts` automatically.

**Adding a server function**

```ts
// src/lib/example.functions.ts
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const doThing = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({ id: z.string() }).parse(d))
  .handler(async ({ data }) => {
    // privileged work here
    return { ok: true };
  });
```

**Adding a UI primitive** — drop it under `src/components/ui-ext/` or `components/ai/` and export from a barrel only when widely shared.

**Design rules**

- Never hardcode colors. Use semantic tokens (`bg-background`, `text-foreground`, etc.).
- Never `@import` remote stylesheets in `styles.css` — use `<link>` in `__root.tsx` head.
- Prefer SVG over icon fonts. Prefer Recharts over heavy chart libs.

---

## 32. Contributing Guide

1. **Fork & branch** — `feat/<short-name>` or `fix/<short-name>`.
2. **Follow strict TS** — no `any`, no unresolved imports.
3. **Match the design system** — semantic tokens, no ad-hoc hex colors.
4. **Write tests** — unit for logic, component for UI, Playwright for flows.
5. **Run `bunx tsgo --noEmit`** before opening a PR.
6. **PRs need**: a short description, screenshots for UI changes, and a checklist confirming tests/typecheck pass.
7. **Be kind in reviews.** TerraTrust AI exists to extend trust — that starts with how we treat each other.

---

## 33. License

MIT © TerraTrust AI contributors.

```
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

---

<p align="center"><em>One parcel. One passport. One source of truth.</em></p>
