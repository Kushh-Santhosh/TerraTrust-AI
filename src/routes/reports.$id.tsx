import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Crumbs, KpiRow, Pill } from "@/components/ui-ext/Scaffold";
import { Button } from "@/components/ui/button";
import { Download, Share2, Printer } from "lucide-react";

export const Route = createFileRoute("/reports/$id")({
  head: () => ({ meta: [{ title: "Report — TerraTrust AI" }] }),
  component: Page,
});

function Page() {
  const { id } = Route.useParams();
  return (
    <AppShell title="Lagos regional valuation Q3 2024" subtitle={`${id} · Generated 2024-09-22 by TerraTrust AI`}
      actions={<><Button variant="outline"><Share2 className="h-4 w-4" /> Share</Button><Button variant="outline"><Printer className="h-4 w-4" /> Print</Button><Button><Download className="h-4 w-4" /> Download PDF</Button></>}>
      <Crumbs items={[{ label: "Reports", to: "/reports" }, { label: id }]} />
      <KpiRow items={[
        { label: "Parcels analysed", value: "412,388" },
        { label: "Median value", value: "$184k", hint: "+6.4% YoY" },
        { label: "Verified rate", value: "91.5%" },
        { label: "AI confidence", value: "94%" },
      ]} />
      <div className="mt-6 surface-card p-6">
        <h2 className="font-display text-2xl">Executive summary</h2>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">Property values in Lagos State rose 6.4% year-over-year, driven primarily by Lekki Phase 1, Victoria Island, and the Ibeju-Lekki corridor. Verification throughput improved by 18% as more surveyors onboarded, and disputed parcels fell to 1.2% of the active inventory — the lowest since Q1 2022.</p>
        <h3 className="mt-6 font-display text-xl">Key findings</h3>
        <ul className="mt-2 list-disc space-y-1 pl-6 text-sm text-muted-foreground">
          <li>Lekki Phase 1 median valuation: $312k (up from $268k)</li>
          <li>Boundary disputes concentrated in Epe LGA (62% of regional total)</li>
          <li>AI confidence on agricultural parcels improved from 71 → 84 after new satellite imagery</li>
          <li>Fraud flag rate fell to 0.07% — a 3-year low</li>
        </ul>
        <div className="mt-6 flex gap-2"><Pill tone="info">Source: 2024 Q3 registry sync</Pill><Pill tone="success">Auditor approved</Pill></div>
      </div>
    </AppShell>
  );
}
