import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { DataTable, KpiRow, Pill } from "@/components/ui-ext/Scaffold";
import { regions } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/regions")({
  head: () => ({ meta: [{ title: "Regions — Admin" }] }),
  component: Page,
});

function Page() {
  const rows = regions.map((r) => ({
    ...r,
    total: r.verified + r.pending,
    rate: ((r.verified / (r.verified + r.pending)) * 100).toFixed(1) + "%",
  }));
  return (
    <AppShell title="Regions" subtitle="Coverage and verification health per state.">
      <KpiRow
        items={[
          { label: "States live", value: "12 / 36" },
          { label: "Total verified", value: "1.36M" },
          { label: "Total pending", value: "187k" },
          { label: "Avg. verification rate", value: "87.8%" },
        ]}
      />
      <div className="mt-6">
        <DataTable
          rows={rows}
          columns={[
            {
              key: "name",
              label: "Region",
              render: (r) => <span className="font-medium">{r.name}</span>,
            },
            { key: "v", label: "Verified", render: (r) => r.verified.toLocaleString() },
            { key: "p", label: "Pending", render: (r) => r.pending.toLocaleString() },
            { key: "t", label: "Total", render: (r) => r.total.toLocaleString() },
            {
              key: "rate",
              label: "Rate",
              render: (r) => (
                <Pill tone={parseFloat(r.rate) > 90 ? "success" : "warning"}>{r.rate}</Pill>
              ),
            },
          ]}
        />
      </div>
    </AppShell>
  );
}
