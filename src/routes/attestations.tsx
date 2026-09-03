import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { DataTable, Pill, KpiRow } from "@/components/ui-ext/Scaffold";

export const Route = createFileRoute("/attestations")({
  head: () => ({ meta: [{ title: "Attestations — TerraTrust AI" }] }),
  component: Page,
});

const rows = [
  { id: "A-7741", parcel: "TT-8421-LG", attester: "Mrs. T. Aluko", relation: "Neighbour, 18y", result: "Confirmed", at: "2024-09-23" },
  { id: "A-7720", parcel: "TT-8421-LG", attester: "Chief E. Sanusi", relation: "Community elder", result: "Confirmed", at: "2024-09-20" },
  { id: "A-7715", parcel: "TT-9930-OY", attester: "I. Adebola", relation: "Neighbour", result: "Confirmed", at: "2024-09-18" },
  { id: "A-7702", parcel: "TT-2210-KD", attester: "Imam M. Sule", relation: "Community elder", result: "Pending", at: "2024-09-12" },
  { id: "A-7688", parcel: "TT-5512-AB", attester: "N. Ibrahim", relation: "Adjacent owner", result: "Disputed", at: "2024-09-05" },
];

function Page() {
  return (
    <AppShell title="Your attestations" subtitle="Community endorsements you've given or received.">
      <KpiRow items={[
        { label: "Given", value: "14" },
        { label: "Received", value: "9" },
        { label: "Confirmed", value: "21" },
        { label: "Disputed", value: "2" },
      ]} />
      <div className="mt-6">
        <DataTable rows={rows} columns={[
          { key: "id", label: "ID", render: r => <span className="font-mono text-xs">{r.id}</span> },
          { key: "parcel", label: "Parcel", render: r => <span className="font-mono text-xs">{r.parcel}</span> },
          { key: "attester", label: "Attester", render: r => r.attester },
          { key: "relation", label: "Relation", render: r => <span className="text-muted-foreground">{r.relation}</span> },
          { key: "at", label: "Date", render: r => <span className="text-muted-foreground">{r.at}</span> },
          { key: "r", label: "Result", render: r => <Pill tone={r.result === "Confirmed" ? "success" : r.result === "Pending" ? "warning" : "danger"}>{r.result}</Pill> },
        ]} />
      </div>
    </AppShell>
  );
}
