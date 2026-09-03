import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { AIInsightCard, ScoreRing, AIBadge, ConfidenceMeter } from "@/components/ai/AIPrimitives";
import { SectionTitle, Pill } from "@/components/ui-ext/Scaffold";
import { Brain, Sparkles, Satellite, Leaf, ShieldAlert, ScanLine, Activity, Compass, ListChecks, Lightbulb, FileText, ShieldCheck, ArrowUpRight } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { valuationHistory } from "@/lib/ai-mock";

export const Route = createFileRoute("/ai")({
  head: () => ({ meta: [{ title: "AI Overview — TerraTrust AI" }] }),
  component: AIOverview,
});

const modules = [
  { to: "/ai-passport", icon: FileBadge2, title: "AI Property Passport", desc: "Composite, explainable identity for every parcel.", stat: "96 / 100", tag: "Trusted" },
  { to: "/ai-valuation", icon: Sparkles, title: "AI Valuation Engine", desc: "Defensible land values with comp & macro signals.", stat: "₦312M", tag: "+8.4% YoY" },
  { to: "/ai-ocr", icon: ScanLine, title: "Document OCR", desc: "Extract & verify fields from any title document.", stat: "8 fields", tag: "94% conf." },
  { to: "/ai-fraud", icon: ShieldAlert, title: "Fraud Detection", desc: "Duplicate boundaries, forged stamps, signature clusters.", stat: "3 flags", tag: "Live" },
  { to: "/ai-timeline", icon: ListChecks, title: "Ownership Timeline", desc: "Reconstructed chain of custody from 1998.", stat: "4 events", tag: "Verified" },
  { to: "/ai-risk", icon: Activity, title: "Risk Analysis", desc: "Title, boundary, climate, market, fraud composite.", stat: "Low / 22", tag: "Stable" },
  { to: "/ai-confidence", icon: ShieldCheck, title: "Confidence Score", desc: "Calibrated trust certainty per signal source.", stat: "92%", tag: "Calibrated" },
  { to: "/ai-boundary", icon: Compass, title: "Boundary Detection", desc: "AI-extracted parcel polygons vs. survey ground truth.", stat: "0.4m drift", tag: "Within tol." },
  { to: "/ai-satellite", icon: Satellite, title: "Satellite Comparison", desc: "Multi-temporal imagery change detection.", stat: "12 epochs", tag: "Fresh 4d" },
  { to: "/ai-land-health", icon: Leaf, title: "Land Health Score", desc: "NDVI, moisture, erosion, soil carbon, slope.", stat: "B+ / 78", tag: "Healthy" },
  { to: "/ai-recommendations", icon: Lightbulb, title: "AI Recommendations", desc: "Prioritized actions to lift trust score this week.", stat: "5 actions", tag: "+13 pts" },
  { to: "/ai-summary", icon: FileText, title: "Document Summary", desc: "1-paragraph human briefing per uploaded doc.", stat: "Auto", tag: "Plain-English" },
  { to: "/ai-suggestions", icon: Sparkles, title: "Verification Suggestions", desc: "Next verification steps with expected lift.", stat: "5 paths", tag: "Smart" },
];

import { FileBadge2 } from "lucide-react";

function AIOverview() {
  return (
    <AppShell title="AI Intelligence" subtitle="Every signal on your land, modeled and explained." actions={<AIBadge tone="accent">Live · 14 models</AIBadge>}>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <AIInsightCard icon={<Brain className="h-3 w-3 text-primary" />} title="Composite Trust" value="92" delta={{ value: 4, label: "vs last week" }} hint="Across 12 properties" tone="primary" />
        <AIInsightCard icon={<Sparkles className="h-3 w-3 text-primary" />} title="Portfolio AV" value="₦1.84B" delta={{ value: 6, label: "QoQ" }} hint="AI-modeled valuation" tone="accent" />
        <AIInsightCard icon={<ShieldAlert className="h-3 w-3 text-warning-foreground" />} title="Open fraud signals" value="3" hint="2 medium · 1 low" tone="warning" />
        <AIInsightCard icon={<Activity className="h-3 w-3 text-success" />} title="Land health avg." value="78" delta={{ value: 2, label: "MoM" }} hint="NDVI + moisture composite" tone="success" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="surface-card p-6">
          <SectionTitle eyebrow="Portfolio · AI" title="AI-modeled value (12 months)" description="Composite of comparable sales, geography, infrastructure & macro factors." />
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={valuationHistory}>
                <defs>
                  <linearGradient id="av" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.55 0.1 180)" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="oklch(0.55 0.1 180)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0 0)" />
                <XAxis dataKey="m" tickLine={false} axisLine={false} className="text-xs" />
                <YAxis tickLine={false} axisLine={false} className="text-xs" />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.92 0 0)" }} />
                <Area type="monotone" dataKey="value" stroke="oklch(0.45 0.08 195)" fill="url(#av)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="surface-card flex flex-col items-center justify-center p-6">
          <ScoreRing value={92} label="Trust" sublabel="Composite confidence" />
          <div className="mt-5 w-full space-y-3">
            <ConfidenceMeter value={96} label="Document integrity" />
            <ConfidenceMeter value={88} label="Boundary alignment" />
            <ConfidenceMeter value={74} label="Market certainty" />
          </div>
        </div>
      </div>

      <div className="mt-8">
        <SectionTitle eyebrow="Modules" title="14 AI capabilities" description="Tap any module to explore its dedicated workbench." />
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {modules.map(m => (
            <Link key={m.to} to={m.to} className="group surface-card flex items-start gap-4 p-5 transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-elev)]">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 text-primary ring-1 ring-primary/20">
                <m.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium">{m.title}</p>
                  <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground transition group-hover:text-primary" />
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">{m.desc}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="font-display text-lg text-foreground">{m.stat}</span>
                  <Pill tone="primary">{m.tag}</Pill>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
