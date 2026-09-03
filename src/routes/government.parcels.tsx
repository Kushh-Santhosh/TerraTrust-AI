import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { DataTable, KpiRow, Pill } from "@/components/ui-ext/Scaffold";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export const Route = createFileRoute("/government/parcels")({
  head: () => ({ meta: [{ title: "Parcels — TerraTrust AI" }] }),
  component: Page,
});

const rows = [
  { id: "TT-8421-LG", region: "Lagos", lga: "Eti-Osa", area: "540 sqm", owner: "Amara Okonkwo", status: "Verified" },
  { id: "TT-7188-LG", region: "Lagos", lga: "Ikoyi", area: "1,240 sqm", owner: "B. Adetola", status: "Verified" },
  { id: "TT-5512-AB", region: "FCT", lga: "Wuse", area: "1,800 sqm", owner: "Disputed", status: "Disputed" },
  { id: "TT-2210-KD", region: "Kaduna", lga: "Birnin Gwari", area: "1.24 ha", owner: "Amara Okonkwo", status: "Pending" },
  { id: "TT-9930-OY", region: "Oyo", lga: "Ibadan North", area: "880 sqm", owner: "Amara Okonkwo", status: "Verified" },
  { id: "TT-4422-RV", region: "Rivers", lga: "Port Harcourt", area: "620 sqm", owner: "K. Fubara", status: "Verified" },
];

function Page() {
  return (
    <AppShell title="Parcel registry" subtitle="Read-only access to the national parcel registry. 2,418,332 entries indexed."
      actions={<Button variant="outline"><Download className="h-4 w-4" /> Export region</Button>}>
      <KpiRow items={[
        { label: "Total parcels", value: "2.41M" },
        { label: "Verified", value: "91.5%" },
        { label: "Pending", value: "6.2%" },
        { label: "Disputed", value: "1.2%" },
      ]} />
      <div className="mt-6">
        <DataTable rows={rows} columns={[
          { key: "id", label: "Passport", render: r => <span className="font-mono text-xs">{r.id}</span> },
          { key: "region", label: "Region", render: r => r.region },
          { key: "lga", label: "LGA", render: r => <span className="text-muted-foreground">{r.lga}</span> },
          { key: "area", label: "Area", render: r => r.area },
          { key: "owner", label: "Owner", render: r => <span className="text-muted-foreground">{r.owner}</span> },
          { key: "s", label: "Status", render: r => <Pill tone={r.status === "Verified" ? "success" : r.status === "Disputed" ? "danger" : "warning"}>{r.status}</Pill> },
        ]} />
      </div>
    </AppShell>
  );
}
