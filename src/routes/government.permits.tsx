import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { DataTable, Pill, KpiRow } from "@/components/ui-ext/Scaffold";

export const Route = createFileRoute("/government/permits")({
  head: () => ({ meta: [{ title: "Permits — TerraTrust AI" }] }),
  component: Page,
});

const rows = [
  {
    id: "PMT-44021",
    parcel: "TT-8421-LG",
    kind: "Building permit",
    filed: "2024-09-12",
    status: "Approved",
  },
  {
    id: "PMT-44018",
    parcel: "TT-7188-LG",
    kind: "Subdivision",
    filed: "2024-09-10",
    status: "Under review",
  },
  {
    id: "PMT-44012",
    parcel: "TT-5512-AB",
    kind: "Change of use",
    filed: "2024-09-08",
    status: "On hold",
  },
  {
    id: "PMT-44002",
    parcel: "TT-9930-OY",
    kind: "Fencing",
    filed: "2024-09-04",
    status: "Approved",
  },
  {
    id: "PMT-43988",
    parcel: "TT-2210-KD",
    kind: "Agricultural use",
    filed: "2024-08-29",
    status: "Approved",
  },
];

function Page() {
  return (
    <AppShell
      title="Permits"
      subtitle="Construction, subdivision, and land-use permits issued by your bureau."
    >
      <KpiRow
        items={[
          { label: "Active", value: "184" },
          { label: "Approved YTD", value: "1,402" },
          { label: "Avg. processing", value: "9.2d" },
          { label: "Appeals", value: "12" },
        ]}
      />
      <div className="mt-6">
        <DataTable
          rows={rows}
          columns={[
            {
              key: "id",
              label: "Permit",
              render: (r) => <span className="font-mono text-xs">{r.id}</span>,
            },
            {
              key: "parcel",
              label: "Parcel",
              render: (r) => <span className="font-mono text-xs">{r.parcel}</span>,
            },
            { key: "kind", label: "Type", render: (r) => r.kind },
            {
              key: "filed",
              label: "Filed",
              render: (r) => <span className="text-muted-foreground">{r.filed}</span>,
            },
            {
              key: "s",
              label: "Status",
              render: (r) => (
                <Pill
                  tone={
                    r.status === "Approved"
                      ? "success"
                      : r.status === "On hold"
                        ? "danger"
                        : "warning"
                  }
                >
                  {r.status}
                </Pill>
              ),
            },
          ]}
        />
      </div>
    </AppShell>
  );
}
