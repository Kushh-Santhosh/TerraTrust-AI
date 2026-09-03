import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { AIBadge, AIInsightCard, ExplainabilityPanel, ConfidenceMeter, ReasoningTrace } from "@/components/ai/AIPrimitives";
import { SectionTitle, Pill } from "@/components/ui-ext/Scaffold";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, TrendingUp, MapPin, Building2 } from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { valuationHistory, valuationFactors } from "@/lib/ai-mock";

export const Route = createFileRoute("/ai-valuation")({
  head: () => ({ meta: [{ title: "AI Valuation Engine — TerraTrust AI" }] }),
  component: ValuationEnginePage,
});

const comps = [
  { id: "C-1", addr: "8 Admiralty Way", area: 510, price: 298, dist: 0.2 },
  { id: "C-2", addr: "21 Fola Osibo Rd", area: 560, price: 322, dist: 0.4 },
  { id: "C-3", addr: "4 Bisi Williams Rd", area: 495, price: 281, dist: 0.6 },
  { id: "C-4", addr: "16 Olukunle St", area: 600, price: 348, dist: 0.7 },
  { id: "C-5", addr: "11 Yusuf Adesoji", area: 530, price: 305, dist: 0.9 },
];

function ValuationEnginePage() {
  return (
    <AppShell
      title="AI Valuation Engine"
      subtitle="Defensible, explainable land values backed by comparables, geography, and macro signals."
      actions={<AIBadge tone="accent">Model v2.4 · calibrated weekly</AIBadge>}
    >
      <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
        <div className="surface-card p-6">
          <div className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" /><p className="font-medium">Estimate a parcel</p></div>
          <form className="mt-5 grid gap-4">
            <div className="grid gap-2"><Label>Region</Label>
              <Select defaultValue="lagos"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>
                <SelectItem value="lagos">Lagos</SelectItem><SelectItem value="abuja">Abuja</SelectItem><SelectItem value="kaduna">Kaduna</SelectItem>
              </SelectContent></Select></div>
            <div className="grid gap-2"><Label>Type</Label>
              <Select defaultValue="residential"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>
                <SelectItem value="residential">Residential</SelectItem><SelectItem value="agricultural">Agricultural</SelectItem><SelectItem value="commercial">Commercial</SelectItem>
              </SelectContent></Select></div>
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-2"><Label>Area (m²)</Label><Input defaultValue="540" /></div>
              <div className="grid gap-2"><Label>Year acquired</Label><Input defaultValue="2019" /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-2"><Label>Frontage (m)</Label><Input defaultValue="18" /></div>
              <div className="grid gap-2"><Label>Setback (m)</Label><Input defaultValue="4.5" /></div>
            </div>
            <Button className="mt-2"><Sparkles className="h-4 w-4" /> Run AI valuation</Button>
          </form>

          <div className="mt-6 space-y-3">
            <ConfidenceMeter value={92} label="Model certainty" hint="Tight comp-set · low macro drift" />
            <ConfidenceMeter value={86} label="Comparable density" hint="5 comps within 1km" />
            <ConfidenceMeter value={74} label="Macro stability" hint="FX volatility elevated" />
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <AIInsightCard icon={<TrendingUp className="h-3 w-3 text-success" />} title="Point estimate" value="₦312M" delta={{ value: 8.4, label: "YoY" }} tone="success" />
            <AIInsightCard icon={<Building2 className="h-3 w-3 text-primary" />} title="Range" value="₦298M – ₦326M" hint="80% confidence interval" tone="primary" />
            <AIInsightCard icon={<MapPin className="h-3 w-3 text-primary" />} title="Price / m²" value="₦577K" hint="vs. corridor median ₦548K" tone="accent" />
          </div>

          <div className="surface-card p-6">
            <SectionTitle eyebrow="12 months" title="AI valuation history" description="Reconstructed point estimate with weekly recalibration." />
            <div className="h-64">
              <ResponsiveContainer><AreaChart data={valuationHistory}>
                <defs><linearGradient id="vh" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="oklch(0.55 0.1 180)" stopOpacity={0.45} /><stop offset="100%" stopColor="oklch(0.55 0.1 180)" stopOpacity={0} /></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0 0)" />
                <XAxis dataKey="m" tickLine={false} axisLine={false} className="text-xs" />
                <YAxis tickLine={false} axisLine={false} className="text-xs" />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="oklch(0.45 0.08 195)" fill="url(#vh)" strokeWidth={2} />
              </AreaChart></ResponsiveContainer>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <ExplainabilityPanel title="Factor attribution" factors={valuationFactors} />
            <div className="surface-card p-5">
              <SectionTitle eyebrow="Comparables" title="5 nearby sales · last 90 days" />
              <div className="h-48 mt-2">
                <ResponsiveContainer><BarChart data={comps}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0 0)" />
                  <XAxis dataKey="id" tickLine={false} axisLine={false} className="text-xs" />
                  <YAxis tickLine={false} axisLine={false} className="text-xs" />
                  <Tooltip />
                  <Bar dataKey="price" fill="oklch(0.55 0.1 180)" radius={[6, 6, 0, 0]} />
                </BarChart></ResponsiveContainer>
              </div>
              <ul className="mt-4 space-y-2 text-sm">
                {comps.map(c => (
                  <li key={c.id} className="flex items-center justify-between rounded-lg bg-surface p-2.5 ring-1 ring-border">
                    <span className="flex items-center gap-2 text-foreground"><Pill>{c.id}</Pill> {c.addr}</span>
                    <span className="text-muted-foreground">{c.area} m² · ₦{c.price}M · {c.dist}km</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="surface-card p-5">
            <SectionTitle eyebrow="Reasoning" title="How the engine arrived at ₦312M" />
            <ReasoningTrace steps={[
              { label: "Pull comparable sales", detail: "12 candidates → 5 retained after recency, type & distance filters." },
              { label: "Geographic adjustment", detail: "Lekki Phase 1 corridor premium: +18% over Lagos median." },
              { label: "Document trust adjustment", detail: "+3% for verified C-of-O and clean survey chain." },
              { label: "Macro overlay", detail: "Applied -3.1% FX volatility damper (60-day NGN/USD vol)." },
              { label: "Calibration", detail: "Model RMSE 4.2% on holdout comps. Final: ₦312M ±₦14M." },
            ]} />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
