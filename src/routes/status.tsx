import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Pill } from "@/components/ui-ext/Scaffold";

export const Route = createFileRoute("/status")({
  head: () => ({
    meta: [
      { title: "Status — TerraTrust AI" },
      { name: "description", content: "TerraTrust system status and incident history." },
    ],
  }),
  component: Page,
});

const services = [
  { name: "API gateway", status: "Operational", uptime: "99.99%" },
  { name: "Web app", status: "Operational", uptime: "99.99%" },
  { name: "AI Gateway", status: "Degraded", uptime: "99.81%" },
  { name: "GIS engine", status: "Operational", uptime: "99.97%" },
  { name: "OCR pipeline", status: "Operational", uptime: "99.95%" },
];

const incidents = [
  {
    at: "2024-09-25 10:14 UTC",
    title: "Elevated latency on AI Gateway",
    status: "Investigating",
    note: "Some valuation runs are taking up to 6s. Mitigation in progress.",
  },
  {
    at: "2024-09-21 03:02 UTC",
    title: "Brief OCR queue backlog",
    status: "Resolved",
    note: "All documents processed within 45 minutes of upload.",
  },
];

function Page() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-6 py-20">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Status
        </p>
        <h1 className="font-display mt-2 text-5xl">System status</h1>
        <div className="mt-6 rounded-2xl border border-warning/30 bg-warning/10 p-4 text-sm">
          ⚠︎ Some systems experiencing minor disruption — see AI Gateway below.
        </div>
        <div className="mt-8 surface-card overflow-hidden">
          {services.map((s, i) => (
            <div
              key={s.name}
              className={`flex items-center justify-between p-4 ${i < services.length - 1 ? "border-b border-border" : ""}`}
            >
              <div>
                <p className="font-medium">{s.name}</p>
                <p className="text-xs text-muted-foreground">90-day uptime · {s.uptime}</p>
              </div>
              <Pill tone={s.status === "Operational" ? "success" : "warning"}>{s.status}</Pill>
            </div>
          ))}
        </div>
        <h2 className="font-display mt-10 text-3xl">Recent incidents</h2>
        <div className="mt-4 space-y-3">
          {incidents.map((inc, i) => (
            <div key={i} className="surface-card p-5">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-medium">{inc.title}</p>
                <Pill tone={inc.status === "Resolved" ? "success" : "warning"}>{inc.status}</Pill>
                <span className="text-xs text-muted-foreground">· {inc.at}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{inc.note}</p>
            </div>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
