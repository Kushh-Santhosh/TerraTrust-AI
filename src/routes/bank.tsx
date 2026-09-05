import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { KpiRow, Pill, DataTable } from "@/components/ui-ext/Scaffold";

export const Route = createFileRoute("/bank")({
  head: () => ({ meta: [{ title: "Bank portal — TerraTrust AI" }] }),
  component: Page,
});

const pipeline = [
  {
    id: "MTG-7821",
    parcel: "TT-8421-LG",
    borrower: "Ananya Sharma",
    amount: "₹18,40,000",
    ltv: "65%",
    trust: 96,
    decision: "Approved",
  },
  {
    id: "MTG-7815",
    parcel: "TT-7188-LG",
    borrower: "R. Natarajan",
    amount: "₹22,00,000",
    ltv: "60%",
    trust: 92,
    decision: "Approved",
  },
  {
    id: "MTG-7809",
    parcel: "TT-2210-KD",
    borrower: "M. Iqbal",
    amount: "₹3,20,000",
    ltv: "70%",
    trust: 71,
    decision: "Review",
  },
  {
    id: "MTG-7795",
    parcel: "TT-5512-AB",
    borrower: "S. Reddy",
    amount: "₹42,00,000",
    ltv: "68%",
    trust: 42,
    decision: "Declined",
  },
];

function Page() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (pathname !== "/bank") return <Outlet />;
  return (
    <AppShell
      title="Bank origination"
      subtitle="Underwriting view of Property Passports shared with your institution."
    >
      <KpiRow
        items={[
          { label: "Active applications", value: "184" },
          { label: "Avg. underwrite time", value: "1.8d", hint: "↓ 32% YoY" },
          { label: "Auto-approved rate", value: "62%" },
          { label: "Portfolio value", value: "₹284 Cr" },
        ]}
      />
      <div className="mt-6 flex gap-2">
        <Link to="/bank/loans" className="text-sm text-primary">
          View full loan book →
        </Link>
      </div>
      <div className="mt-3">
        <DataTable
          rows={pipeline}
          columns={[
            {
              key: "id",
              label: "Application",
              render: (r) => <span className="font-mono text-xs">{r.id}</span>,
            },
            {
              key: "p",
              label: "Parcel",
              render: (r) => (
                <Link
                  to="/properties/$id"
                  params={{
                    id:
                      r.parcel === "TT-8421-LG"
                        ? "p_001"
                        : r.parcel === "TT-5512-AB"
                          ? "p_003"
                          : "p_002",
                  }}
                  className="font-mono text-xs text-primary hover:underline"
                >
                  {r.parcel}
                </Link>
              ),
            },
            { key: "b", label: "Borrower", render: (r) => r.borrower },
            { key: "a", label: "Amount", render: (r) => r.amount },
            { key: "ltv", label: "LTV", render: (r) => r.ltv },
            {
              key: "t",
              label: "Trust",
              render: (r) => (
                <Pill tone={r.trust > 85 ? "success" : r.trust > 65 ? "warning" : "danger"}>
                  {r.trust}
                </Pill>
              ),
            },
            {
              key: "d",
              label: "Decision",
              render: (r) => (
                <Pill
                  tone={
                    r.decision === "Approved"
                      ? "success"
                      : r.decision === "Review"
                        ? "warning"
                        : "danger"
                  }
                >
                  {r.decision}
                </Pill>
              ),
            },
          ]}
        />
      </div>
    </AppShell>
  );
}
