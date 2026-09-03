import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { DataTable, KpiRow, Pill } from "@/components/ui-ext/Scaffold";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";

export const Route = createFileRoute("/billing")({
  head: () => ({ meta: [{ title: "Billing — TerraTrust AI" }] }),
  component: Page,
});

const invoices = [
  { id: "INV-44211", date: "2024-09-01", plan: "Trust Pro", amount: "$29.00", status: "Paid" },
  { id: "INV-44012", date: "2024-08-01", plan: "Trust Pro", amount: "$29.00", status: "Paid" },
  { id: "INV-43818", date: "2024-07-01", plan: "Trust Pro", amount: "$29.00", status: "Paid" },
  { id: "INV-43622", date: "2024-06-01", plan: "Trust Pro", amount: "$29.00", status: "Paid" },
];

function Page() {
  return (
    <AppShell title="Billing" subtitle="Manage your plan, invoices, and payment methods.">
      <KpiRow items={[
        { label: "Plan", value: "Trust Pro" },
        { label: "Next invoice", value: "$29.00", hint: "on Oct 1, 2024" },
        { label: "Properties", value: "4 / 25" },
        { label: "AI credits", value: "2,180 / 5,000" },
      ]} />
      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_320px]">
        <div className="surface-card overflow-hidden">
          <div className="border-b border-border p-4 font-medium">Invoices</div>
          <DataTable rows={invoices} columns={[
            { key: "id", label: "Invoice", render: r => <span className="font-mono text-xs">{r.id}</span> },
            { key: "date", label: "Date", render: r => r.date },
            { key: "plan", label: "Plan", render: r => r.plan },
            { key: "amt", label: "Amount", render: r => r.amount },
            { key: "s", label: "Status", render: r => <Pill tone="success">{r.status}</Pill> },
          ]} />
        </div>
        <div className="surface-card p-5">
          <p className="text-xs font-medium text-muted-foreground">Payment method</p>
          <div className="mt-3 flex items-center gap-3 rounded-xl border border-border p-3">
            <CreditCard className="h-5 w-5" />
            <div><p className="text-sm font-medium">Visa •• 4821</p><p className="text-[11px] text-muted-foreground">Expires 11/27</p></div>
          </div>
          <Button variant="outline" className="mt-4 w-full">Update card</Button>
        </div>
      </div>
    </AppShell>
  );
}
