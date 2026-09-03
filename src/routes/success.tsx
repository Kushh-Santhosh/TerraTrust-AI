import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/success")({
  head: () => ({ meta: [{ title: "Success — TerraTrust AI" }] }),
  component: Page,
});

function Page() {
  return (
    <AppShell title="Success" subtitle="Your Property Passport has been minted.">
      <div className="surface-card flex flex-col items-center justify-center gap-3 px-6 py-20 text-center">
        <div className="rounded-full bg-success/10 p-4 text-success"><CheckCircle2 className="h-7 w-7" /></div>
        <h2 className="font-display text-3xl">All set — passport TT-9942-LG is live</h2>
        <p className="max-w-md text-sm text-muted-foreground">AI valuation is running and your community has been notified. Your trust score will update within 24 hours.</p>
        <div className="mt-2 flex gap-2"><Link to="/properties/$id" params={{ id: "p_001" }}><Button>View passport</Button></Link><Link to="/dashboard"><Button variant="outline">Back to dashboard</Button></Link></div>
      </div>
    </AppShell>
  );
}
