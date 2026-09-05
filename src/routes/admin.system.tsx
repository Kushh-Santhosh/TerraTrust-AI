import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { KpiRow, Pill } from "@/components/ui-ext/Scaffold";
import { Activity, Database, Cpu, Cloud } from "lucide-react";

export const Route = createFileRoute("/admin/system")({
  head: () => ({ meta: [{ title: "System health — Admin" }] }),
  component: Page,
});

const services = [
  {
    name: "API gateway",
    status: "Healthy",
    uptime: "Prototype",
    latency: "Not measured",
    icon: Cloud,
  },
  {
    name: "Postgres (primary)",
    status: "Healthy",
    uptime: "Prototype",
    latency: "Not measured",
    icon: Database,
  },
  {
    name: "GIS engine",
    status: "Healthy",
    uptime: "Prototype",
    latency: "Not measured",
    icon: Activity,
  },
  {
    name: "AI Gateway",
    status: "Available",
    uptime: "Prototype",
    latency: "Not measured",
    icon: Cpu,
  },
  {
    name: "OCR pipeline",
    status: "Healthy",
    uptime: "Prototype",
    latency: "Not measured",
    icon: Cpu,
  },
  {
    name: "Notification queue",
    status: "Healthy",
    uptime: "Prototype",
    latency: "Not measured",
    icon: Cloud,
  },
];

function Page() {
  return (
    <AppShell
      title="System health"
      subtitle="Prototype status across the configured service surfaces."
    >
      <KpiRow
        items={[
          { label: "Overall status", value: "Prototype" },
          { label: "Active incidents", value: "Demo" },
          { label: "AI workflow", value: "Ready" },
          { label: "Background jobs", value: "Demo" },
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
