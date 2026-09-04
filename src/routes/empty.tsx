import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { EmptyState } from "@/components/ui-ext/Scaffold";
import { Button } from "@/components/ui/button";
import { Inbox, Plus } from "lucide-react";

export const Route = createFileRoute("/empty")({
  head: () => ({ meta: [{ title: "Empty state — TerraTrust AI" }] }),
  component: Page,
});

function Page() {
  return (
    <AppShell title="Empty state" subtitle="Friendly fallbacks when there's nothing to show.">
      <EmptyState
        icon={<Inbox className="h-6 w-6" />}
        title="No properties yet"
        description="Register your first property to mint a verifiable Property Passport in minutes."
        action={
          <Link to="/properties/new">
            <Button>
              <Plus className="h-4 w-4" /> Register property
            </Button>
          </Link>
        }
      />
    </AppShell>
  );
}
