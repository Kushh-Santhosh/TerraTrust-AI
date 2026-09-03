import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";

export const Route = createFileRoute("/error")({
  head: () => ({ meta: [{ title: "Error — TerraTrust AI" }] }),
  component: Page,
});

function Page() {
  return (
    <AppShell title="Error state" subtitle="A graceful fallback when something breaks.">
      <div className="surface-card flex flex-col items-center justify-center gap-3 px-6 py-20 text-center">
        <div className="rounded-full bg-destructive/10 p-4 text-destructive"><AlertTriangle className="h-7 w-7" /></div>
        <h2 className="font-display text-3xl">Something went sideways</h2>
        <p className="max-w-md text-sm text-muted-foreground">We couldn't load this page. The team has been notified — try again or head back to your dashboard.</p>
        <div className="mt-2 flex gap-2"><Button><RefreshCw className="h-4 w-4" /> Try again</Button><Link to="/dashboard"><Button variant="outline">Go home</Button></Link></div>
      </div>
    </AppShell>
  );
}
