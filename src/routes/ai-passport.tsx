import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { AIBadge, ScoreRing, ConfidenceMeter, ExplainabilityPanel, VerdictBanner, SignalTile, ReasoningTrace } from "@/components/ai/AIPrimitives";
import { SectionTitle, Pill } from "@/components/ui-ext/Scaffold";
import { Button } from "@/components/ui/button";
import { Brain, FileText, MapPin, ShieldCheck, Calendar, Coins, Layers, Download, Share2 } from "lucide-react";
import { valuationFactors } from "@/lib/ai-mock";

export const Route = createFileRoute("/ai-passport")({
  head: () => ({ meta: [{ title: "AI Property Passport — TerraTrust AI" }] }),
  component: PassportPage,
});

function PassportPage() {
  return (
    <AppShell
      title="AI Property Passport"
      subtitle="A composite, signed, machine-verifiable identity for every parcel."
      actions={<>
        <Button variant="outline"><Share2 className="h-4 w-4" /> Share</Button>
        <Button><Download className="h-4 w-4" /> Download passport</Button>
      </>}
    >
      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <div className="surface-card relative overflow-hidden p-6">
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-br from-primary/15 via-accent/15 to-transparent" />
          <div className="relative">
            <AIBadge tone="primary">Signed · 2026-06-29</AIBadge>
            <p className="mt-3 font-display text-3xl text-foreground">TT-8421-LG</p>
            <p className="text-sm text-muted-foreground">Lekki Phase 1 Residence · 540 m²</p>
            <div className="mt-5 grid place-items-center">
              <ScoreRing value={96} label="Composite" sublabel="Verified · Lagos Bureau" />
            </div>
            <dl className="mt-6 space-y-2 text-sm">
              {[
                { icon: MapPin, k: "Coordinates", v: "6.4413° N, 3.4709° E" },
                { icon: Calendar, k: "Owner since", v: "14 June 2019" },
                { icon: Coins, k: "AI valuation", v: "₦312,000,000" },
                { icon: Layers, k: "Documents", v: "3 verified" },
                { icon: ShieldCheck, k: "Last verified", v: "20 Mar 2024" },
              ].map(r => (
                <div key={r.k} className="flex items-center gap-2 text-muted-foreground">
                  <r.icon className="h-3.5 w-3.5" />
                  <span>{r.k}</span>
                  <span className="ml-auto font-medium text-foreground">{r.v}</span>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="space-y-6">
          <VerdictBanner verdict="trusted" headline="This passport is safe to act on." detail="All four AI verifiers agree: documents, boundary, ownership chain, and bureau cross-checks pass within tolerance." />

          <div className="grid gap-4 md:grid-cols-4">
            <SignalTile icon={<FileText className="h-3 w-3 text-primary" />} label="Doc integrity" value="98" tone="success" />
            <SignalTile icon={<MapPin className="h-3 w-3 text-primary" />} label="Boundary" value="0.4m" tone="success" />
            <SignalTile icon={<Brain className="h-3 w-3 text-primary" />} label="Chain confidence" value="94" tone="success" />
            <SignalTile icon={<ShieldCheck className="h-3 w-3 text-primary" />} label="Fraud signal" value="0" tone="success" />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <ExplainabilityPanel title="Composite score · contributing signals" factors={valuationFactors.slice(0, 5)} />
            <div className="surface-card p-5">
              <SectionTitle eyebrow="AI" title="How we built this passport" />
              <ReasoningTrace steps={[
                { label: "Ingest source documents", detail: "Parsed 3 PDFs · 12 pages · OCR @ 99.1% accuracy.", status: "done" },
                { label: "Cross-reference Bureau registry", detail: "Matched parcel ID, owner NIN, and stamp ID.", status: "done" },
                { label: "Reconstruct ownership chain", detail: "4 events resolved from 1998 → 2019.", status: "done" },
                { label: "Verify boundary with satellite", detail: "Polygon drift 0.4m — within ±1.0m tolerance.", status: "done" },
                { label: "Score & sign passport", detail: "Composite 96. Signed by TerraTrust Trust Authority.", status: "done" },
              ]} />
            </div>
          </div>

          <div className="surface-card p-5">
            <SectionTitle eyebrow="Confidence breakdown" title="By signal source" />
            <div className="grid gap-3 md:grid-cols-2">
              <ConfidenceMeter value={98} label="Document OCR & forensics" hint="Stamp + watermark + signature pass" />
              <ConfidenceMeter value={94} label="Land Bureau registry match" hint="Exact parcel + owner ID match" />
              <ConfidenceMeter value={88} label="Satellite boundary detection" hint="High-res Pleiades · 14 Jun 2026" />
              <ConfidenceMeter value={92} label="Community attestation" hint="3 verified neighbors" />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link to="/ai-valuation"><Pill tone="primary">View valuation →</Pill></Link>
            <Link to="/ai-boundary"><Pill tone="info">Boundary analysis →</Pill></Link>
            <Link to="/ai-fraud"><Pill tone="warning">Fraud scan →</Pill></Link>
            <Link to="/ai-timeline"><Pill tone="success">Ownership timeline →</Pill></Link>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
