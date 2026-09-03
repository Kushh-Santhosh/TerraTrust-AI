import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { AIBadge, AIInsightCard, ConfidenceMeter, ReasoningTrace, VerdictBanner } from "@/components/ai/AIPrimitives";
import { SectionTitle, Pill } from "@/components/ui-ext/Scaffold";
import { Button } from "@/components/ui/button";
import { Compass, RefreshCw, Ruler } from "lucide-react";
import { MapMock } from "@/components/ui-ext/MapMock";
import { properties } from "@/lib/mock-data";

export const Route = createFileRoute("/ai-boundary")({
  head: () => ({ meta: [{ title: "AI Boundary Detection — TerraTrust AI" }] }),
  component: BoundaryPage,
});

const vertices = [
  { id: "V1", expected: "6.4414, 3.4707", detected: "6.4414, 3.4707", drift: 0.1 },
  { id: "V2", expected: "6.4415, 3.4712", detected: "6.4415, 3.4712", drift: 0.2 },
  { id: "V3", expected: "6.4411, 3.4713", detected: "6.4410, 3.4713", drift: 0.5 },
  { id: "V4", expected: "6.4410, 3.4708", detected: "6.4410, 3.4708", drift: 0.3 },
];

function BoundaryPage() {
  return (
    <AppShell
      title="AI Boundary Detection"
      subtitle="Polygon extraction from satellite imagery, cross-checked against surveyor ground truth."
      actions={<><Button variant="outline"><Ruler className="h-4 w-4" /> Re-measure</Button><Button><RefreshCw className="h-4 w-4" /> Re-detect</Button></>}
    >
      <div className="grid gap-4 md:grid-cols-4">
        <AIInsightCard icon={<Compass className="h-3 w-3 text-primary" />} title="Mean drift" value="0.4 m" hint="±1.0m tolerance" tone="success" />
        <AIInsightCard title="Max vertex drift" value="0.5 m" hint="V3 · NW corner" tone="success" />
        <AIInsightCard title="Polygon IoU" value="98.7%" hint="vs registered shape" tone="success" />
        <AIInsightCard title="Imagery age" value="4 days" hint="Pleiades · 25 Jun 2026" tone="primary" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="surface-card p-6">
          <SectionTitle eyebrow="Overlay" title="Detected polygon vs registered" action={<AIBadge>Vision v5.0</AIBadge>} />
          <MapMock properties={properties} highlightId="p_001" />
          <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
            <div className="rounded-lg bg-primary/8 p-3 ring-1 ring-primary/20">
              <p className="font-semibold text-primary">AI-detected polygon</p>
              <p className="mt-1 text-muted-foreground">Edges extracted with sub-pixel precision from high-res ortho-rectified imagery.</p>
            </div>
            <div className="rounded-lg bg-accent/15 p-3 ring-1 ring-accent/30">
              <p className="font-semibold text-foreground">Registered survey</p>
              <p className="mt-1 text-muted-foreground">Surveyor field measurement from 2 Nov 2023 — RTK-GPS.</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <VerdictBanner verdict="trusted" headline="Boundary is within tolerance." detail="All 4 vertices align within 0.5m. No re-survey required." />
          <div className="surface-card p-5">
            <SectionTitle eyebrow="Per-vertex" title="Drift breakdown" />
            <table className="w-full text-sm">
              <thead className="text-xs text-muted-foreground">
                <tr className="text-left"><th className="py-2">Vertex</th><th>Detected</th><th>Drift (m)</th></tr>
              </thead>
              <tbody>
                {vertices.map(v => (
                  <tr key={v.id} className="border-t border-border">
                    <td className="py-2"><Pill>{v.id}</Pill></td>
                    <td className="text-muted-foreground">{v.detected}</td>
                    <td><Pill tone={v.drift > 0.5 ? "warning" : "success"}>{v.drift}</Pill></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="surface-card p-5">
            <SectionTitle eyebrow="Pipeline" title="How detection works" />
            <ReasoningTrace steps={[
              { label: "Fetch latest imagery", detail: "Pleiades 0.5m, ortho-rectified 25 Jun 2026." },
              { label: "Segment parcel", detail: "U-Net polygon mask · IoU 98.7% vs registered." },
              { label: "Vector simplification", detail: "Douglas-Peucker @ ε=0.3m → 4 vertices." },
              { label: "Compare to survey", detail: "Per-vertex Haversine drift; max 0.5m." },
              { label: "Verdict", detail: "Within ±1.0m bureau tolerance — auto-approve." },
            ]} />
          </div>
          <div className="surface-card p-5">
            <ConfidenceMeter value={98} label="Polygon detection" hint="Sub-pixel precision" />
            <div className="mt-3"><ConfidenceMeter value={92} label="Imagery quality" hint="0% cloud cover" /></div>
            <div className="mt-3"><ConfidenceMeter value={96} label="Vertex alignment" hint="All within tolerance" /></div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
