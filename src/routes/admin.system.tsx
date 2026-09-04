import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { KpiRow, Pill } from "@/components/ui-ext/Scaffold";
import { Activity, Database, Cpu, Cloud } from "lucide-react";

export const Route = createFileRoute("/admin/system")({
  head: () => ({ meta: [{ title: "System health — Admin" }] }),
  component: Page,
});

const services = [
  { name: "API gateway", status: "Healthy", uptime: "99.99%", latency: "84ms", icon: Cloud },
  {
    name: "Postgres (primary)",
    status: "Healthy",
    uptime: "99.98%",
    latency: "1.2ms",
    icon: Database,
  },
  { name: "GIS engine", status: "Healthy", uptime: "99.97%", latency: "120ms", icon: Activity },
  { name: "AI Gateway", status: "Degraded", uptime: "99.81%", latency: "2.1s", icon: Cpu },
  { name: "OCR pipeline", status: "Healthy", uptime: "99.95%", latency: "1.4s", icon: Cpu },
  { name: "Notification queue", status: "Healthy", uptime: "99.99%", latency: "32ms", icon: Cloud },
];

function Page() {
  return (
    <AppShell title="System health" subtitle="Live status across every backend service.">
      <KpiRow
        items={[
          { label: "Overall uptime", value: "99.98%" },
          { label: "Active incidents", value: "1" },
          { label: "AI requests/sec", value: "284" },
          { label: "Background jobs", value: "12,884" },
        ]}
      />
      <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <div key={s.name} className="surface-card p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <s.icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="font-medium">{s.name}</p>
                <p className="text-xs text-muted-foreground">
                  Uptime {s.uptime} · Latency {s.latency}
                </p>
              </div>
              <Pill tone={s.status === "Healthy" ? "success" : "warning"}>{s.status}</Pill>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
