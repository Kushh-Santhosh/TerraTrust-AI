import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Crumbs, DataTable, KpiRow, Pill } from "@/components/ui-ext/Scaffold";

export const Route = createFileRoute("/bank/loans")({
  head: () => ({ meta: [{ title: "Loan book — TerraTrust AI" }] }),
  component: Page,
});

const loans = [
  {
    id: "LN-2241",
    parcel: "TT-8421-LG",
    borrower: "Ananya Sharma",
    principal: "₹18,40,000",
    outstanding: "₹16,72,000",
    rate: "11.5%",
    status: "Performing",
    since: "2024-04-12",
  },
  {
    id: "LN-2238",
    parcel: "TT-7188-LG",
    borrower: "R. Natarajan",
    principal: "₹22,00,000",
    outstanding: "₹19,84,000",
    rate: "12.0%",
    status: "Performing",
    since: "2024-03-30",
  },
  {
    id: "LN-2210",
    parcel: "TT-9930-OY",
    borrower: "C. Iyer",
    principal: "₹7,85,000",
    outstanding: "₹7,12,000",
    rate: "12.5%",
    status: "Performing",
    since: "2024-02-12",
  },
  {
    id: "LN-2188",
    parcel: "TT-4422-RV",
    borrower: "K. Reddy",
    principal: "₹11,00,000",
    outstanding: "₹9,88,000",
    rate: "11.8%",
    status: "Watch",
    since: "2023-12-04",
  },
  {
    id: "LN-2104",
    parcel: "TT-5512-AB",
    borrower: "—",
    principal: "₹42,00,000",
    outstanding: "₹39,12,000",
    rate: "13.0%",
    status: "Default",
    since: "2023-08-19",
  },
];

function Page() {
  return (
    <AppShell title="Loan book" subtitle="Mortgages secured by TerraTrust Property Passports.">
      <Crumbs items={[{ label: "Bank", to: "/bank" }, { label: "Loans" }]} />
      <KpiRow
        items={[
          { label: "Outstanding", value: "₹284 Cr" },
          { label: "Performing", value: "94.1%" },
          { label: "On watch", value: "4.3%" },
          { label: "In default", value: "1.6%" },
        ]}
      />
      <div className="mt-6">
        <DataTable
          rows={loans}
          columns={[
            {
              key: "id",
              label: "Loan",
              render: (r) => <span className="font-mono text-xs">{r.id}</span>,
            },
            {
              key: "p",
              label: "Parcel",
              render: (r) => <span className="font-mono text-xs">{r.parcel}</span>,
            },
            { key: "b", label: "Borrower", render: (r) => r.borrower },
            { key: "pr", label: "Principal", render: (r) => r.principal },
            { key: "os", label: "Outstanding", render: (r) => r.outstanding },
            { key: "rate", label: "Rate", render: (r) => r.rate },
            {
              key: "s",
              label: "Status",
              render: (r) => (
                <Pill
                  tone={
                    r.status === "Performing"
                      ? "success"
                      : r.status === "Watch"
                        ? "warning"
                        : "danger"
                  }
                >
                  {r.status}
                </Pill>
              ),
            },
            {
              key: "sn",
              label: "Since",
              render: (r) => <span className="text-muted-foreground">{r.since}</span>,
            },
          ]}
        />
      </div>
    </AppShell>
  );
}
