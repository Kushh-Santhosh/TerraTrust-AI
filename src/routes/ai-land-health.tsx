import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { AIBadge, ScoreRing, AIInsightCard, ConfidenceMeter, SignalTile } from "@/components/ai/AIPrimitives";
import { SectionTitle } from "@/components/ui-ext/Scaffold";
import { Leaf, Droplets, Mountain, TreePine, Sprout } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ndviSeries, landHealth } from "@/lib/ai-mock";

export const Route = createFileRoute("/ai-land-health")({
  head: () => ({ meta: [{ title: "AI Land Health Score — TerraTrust AI" }] }),
  component: LandHealthPage,
});

function LandHealthPage() {
  return (
    <AppShell
      title="AI Land Health Score"
      subtitle="Environmental fitness for agricultural, residential, or commercial use."
      actions={<AIBadge tone="success">B+ · 78 / 100</AIBadge>}
    >
      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <div className="surface-card flex flex-col items-center p-6">
          <ScoreRing value={78} label="Land Health" sublabel="Healthy · agri-suitable" tone="success" />
          <div className="mt-5 grid w-full grid-cols-2 gap-3">
            <SignalTile icon={<Leaf className="h-3 w-3 text-success" />} label="NDVI" value={landHealth.ndvi.toFixed(2)} tone="success" />
            <SignalTile icon={<Droplets className="h-3 w-3 text-info" />} label="Moisture" value={landHealth.moisture.toFixed(2)} tone="success" />
            <SignalTile icon={<Mountain className="h-3 w-3 text-warning-foreground" />} label="Slope" value={`${landHealth.slope}°`} tone="success" />
            <SignalTile icon={<Sprout className="h-3 w-3 text-success" />} label="Soil C" value={`${landHealth.soilCarbon}%`} tone="success" />
            <SignalTile icon={<TreePine className="h-3 w-3 text-success" />} label="Tree cvr" value={`${(landHealth.treeCover * 100).toFixed(0)}%`} tone="default" />
            <SignalTile label="Erosion" value={`${(landHealth.erosion * 100).toFixed(0)}%`} tone="success" />
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <AIInsightCard title="Vegetation trend" value="+0.06" delta={{ value: 9, label: "YoY NDVI" }} tone="success" />
            <AIInsightCard title="Water stress" value="Low" hint="Moisture above seasonal mean" tone="success" />
            <AIInsightCard title="Climate exposure" value="Moderate" hint="2 heat events this season" tone="warning" />
          </div>

          <div className="surface-card p-6">
            <SectionTitle eyebrow="12 months" title="NDVI & soil moisture" description="Sentinel-2 derived, smoothed monthly." />
            <div className="h-64">
              <ResponsiveContainer>
                <AreaChart data={ndviSeries}>
                  <defs>
                    <linearGradient id="ndvi" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="oklch(0.72 0.16 145)" stopOpacity={0.5} /><stop offset="100%" stopColor="oklch(0.72 0.16 145)" stopOpacity={0} /></linearGradient>
                    <linearGradient id="moist" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="oklch(0.55 0.1 180)" stopOpacity={0.4} /><stop offset="100%" stopColor="oklch(0.55 0.1 180)" stopOpacity={0} /></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0 0)" />
                  <XAxis dataKey="m" tickLine={false} axisLine={false} className="text-xs" />
                  <YAxis tickLine={false} axisLine={false} className="text-xs" />
                  <Tooltip />
                  <Area type="monotone" dataKey="ndvi" stroke="oklch(0.55 0.16 145)" fill="url(#ndvi)" strokeWidth={2} />
                  <Area type="monotone" dataKey="moisture" stroke="oklch(0.45 0.08 195)" fill="url(#moist)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="surface-card p-5">
            <SectionTitle eyebrow="Score build" title="Composite breakdown" />
            <div className="grid gap-3 md:grid-cols-2">
              <ConfidenceMeter value={Math.round(landHealth.ndvi * 100)} label="Vegetation density (NDVI)" />
              <ConfidenceMeter value={Math.round(landHealth.moisture * 100)} label="Soil moisture" />
              <ConfidenceMeter value={Math.round((1 - landHealth.erosion) * 100)} label="Erosion resistance" />
              <ConfidenceMeter value={84} label="Slope suitability" hint="4.2° — ideal for residential" />
              <ConfidenceMeter value={72} label="Climate stability" hint="2 heat events flagged" />
              <ConfidenceMeter value={68} label="Air quality (PM2.5)" hint="Urban edge effect" />
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
