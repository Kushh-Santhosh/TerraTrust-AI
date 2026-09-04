import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Crumbs, KpiRow, Pill } from "@/components/ui-ext/Scaffold";
import { Button } from "@/components/ui/button";
import { CheckCircle2, MapPin, Upload } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/surveyor/assignments/$id")({
  head: () => ({ meta: [{ title: "Assignment — TerraTrust AI" }] }),
  component: Page,
});

function Page() {
  const { id } = Route.useParams();
  const [uploaded, setUploaded] = useState(false);
  const [completed, setCompleted] = useState(false);
  return (
    <AppShell
      title={`Assignment ${id}`}
      subtitle="Parcel TT-7188-LG · Ikoyi Family Compound"
      actions={
        <>
          <Button variant="outline" onClick={() => setUploaded(true)}>
            <Upload className="h-4 w-4" /> {uploaded ? "Survey uploaded" : "Upload survey"}
          </Button>
          <Button onClick={() => setCompleted(true)} disabled={completed}>
            <CheckCircle2 className="h-4 w-4" /> {completed ? "Completed" : "Mark complete"}
          </Button>
        </>
      }
    >
      <Crumbs items={[{ label: "Assignments", to: "/surveyor/assignments" }, { label: id }]} />
      <KpiRow
        items={[
          { label: "Area to survey", value: "1,240 sqm" },
          { label: "GPS accuracy", value: "±0.6m" },
          { label: "Visits required", value: "1" },
          { label: "Fee", value: "$140" },
        ]}
      />
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="surface-card p-5 lg:col-span-2">
          <h3 className="font-display text-xl">Field instructions</h3>
          <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
            <li>Confirm corner markers match registry coordinates within ±1m.</li>
            <li>Photograph each beacon and upload via the mobile app.</li>
            <li>Capture neighbour signatures (3 minimum) on attestation form.</li>
            <li>Submit final GeoJSON and signed PDF report.</li>
          </ol>
          <div className="mt-5">
            <p className="text-xs font-medium text-muted-foreground">Submitted deliverables</p>
            <div className="mt-2 space-y-2">
              {["Site photos (12)", "Beacon coordinates.csv", "Field notes.pdf"].map((x) => (
                <div
                  key={x}
                  className="flex items-center justify-between rounded-lg border border-border p-3 text-sm"
                >
                  {x}
                  <Pill tone="success">Uploaded</Pill>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="surface-card p-5">
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" /> 7 Bourdillon Rd, Ikoyi
          </p>
          <svg viewBox="0 0 200 160" className="mt-3 h-44 w-full rounded-lg bg-muted/40">
            <pattern id="sp" width="16" height="16" patternUnits="userSpaceOnUse">
              <path d="M16 0H0V16" fill="none" stroke="oklch(0.9 0.01 250)" />
            </pattern>
            <rect width="200" height="160" fill="url(#sp)" />
            <polygon
              points="55,40 150,38 165,110 70,118"
              fill="oklch(0.55 0.18 250 / 0.18)"
              stroke="oklch(0.55 0.18 250)"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>
    </AppShell>
  );
}
