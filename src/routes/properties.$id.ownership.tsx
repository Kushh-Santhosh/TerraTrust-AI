import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Crumbs, DataTable, Pill } from "@/components/ui-ext/Scaffold";

export const Route = createFileRoute("/properties/$id/ownership")({
  head: () => ({ meta: [{ title: "Ownership history — TerraTrust AI" }] }),
  component: Page,
});

const rows = [
  {
    from: "2019-06-14",
    to: "—",
    owner: "Ananya Sharma",
    method: "Purchase",
    price: "₹2.68 Cr",
    source: "Bengaluru Revenue Office",
  },
  {
    from: "2009-04-22",
    to: "2019-06-14",
    owner: "S. Adesanya",
    method: "Inheritance",
    price: "—",
    source: "Karnataka Probate Court",
  },
  {
    from: "1994-11-08",
    to: "2009-04-22",
    owner: "M. Adesanya",
    method: "Purchase",
    price: "₹12 L",
    source: "Karnataka State Allocation",
  },
  {
    from: "1978-01-15",
    to: "1994-11-08",
    owner: "Karnataka State Government",
    method: "C of O issued",
    price: "—",
    source: "Federal Gazette",
  },
];

function Page() {
  const { id } = Route.useParams();
  return (
    <AppShell title="Ownership history" subtitle="Verified chain of title for this parcel.">
      <Crumbs
        items={[
          { label: "Properties", to: "/properties" },
          { label: id, to: "/properties/$id" },
          { label: "Ownership" },
        ]}
      />
      <DataTable
        rows={rows}
        columns={[
          { key: "from", label: "From", render: (r) => r.from },
          { key: "to", label: "To", render: (r) => r.to },
          {
            key: "owner",
            label: "Owner",
            render: (r) => <span className="font-medium">{r.owner}</span>,
          },
          { key: "method", label: "Method", render: (r) => <Pill tone="info">{r.method}</Pill> },
          {
            key: "price",
            label: "Price",
            render: (r) => <span className="text-muted-foreground">{r.price}</span>,
          },
          {
            key: "source",
            label: "Source",
            render: (r) => <span className="text-muted-foreground">{r.source}</span>,
          },
        ]}
      />
    </AppShell>
  );
}
