import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Crumbs, Pill } from "@/components/ui-ext/Scaffold";
import { Button } from "@/components/ui/button";
import { Upload, FileText, ShieldCheck, AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/properties/$id/documents")({
  head: () => ({ meta: [{ title: "Documents — TerraTrust AI" }] }),
  component: Page,
});

const docs = [
  { name: "Certificate of Occupancy.pdf", kind: "Deed", size: "2.4 MB", at: "2024-03-14", ocr: 99, verified: true },
  { name: "Survey Plan 2023.pdf", kind: "Survey", size: "1.1 MB", at: "2023-11-02", ocr: 96, verified: true },
  { name: "Tax Clearance 2024.pdf", kind: "Tax", size: "640 KB", at: "2024-08-19", ocr: 98, verified: true },
  { name: "National ID.pdf", kind: "ID", size: "320 KB", at: "2024-03-12", ocr: 100, verified: true },
];

function Page() {
  const { id } = Route.useParams();
  return (
    <AppShell title="Property documents" subtitle="Upload, verify, and manage records for this Property Passport."
      actions={<Button><Upload className="h-4 w-4" /> Upload document</Button>}>
      <Crumbs items={[{ label: "Properties", to: "/properties" }, { label: id, to: "/properties/$id" }, { label: "Documents" }]} />
      <div className="surface-card grid h-48 place-items-center rounded-xl border-2 border-dashed border-border bg-muted/20 text-center">
        <div>
          <p className="text-sm font-medium">Drop files here</p>
          <p className="text-xs text-muted-foreground">PDF, JPG, PNG up to 25MB · OCR runs automatically</p>
        </div>
      </div>
      <div className="mt-6 space-y-2">
        {docs.map(d => (
          <div key={d.name} className="surface-card flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"><FileText className="h-5 w-5" /></div>
            <div className="flex-1">
              <p className="font-medium">{d.name}</p>
              <p className="text-xs text-muted-foreground">{d.kind} · {d.size} · Uploaded {d.at}</p>
            </div>
            <div className="flex items-center gap-3">
              <Pill tone={d.ocr > 95 ? "success" : "warning"}>OCR {d.ocr}%</Pill>
              {d.verified ? <Pill tone="success"><ShieldCheck className="h-3 w-3" /> Verified</Pill> : <Pill tone="warning"><AlertTriangle className="h-3 w-3" /> Pending</Pill>}
              <Link to="/properties/$id" params={{ id }} className="text-xs text-primary">View</Link>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
