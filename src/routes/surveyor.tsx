import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { StatCard } from "@/components/ui-ext/StatCard";
import { Button } from "@/components/ui/button";
import { surveyorKpis, properties } from "@/lib/mock-data";
import { MapPin, Calendar, ChevronRight, Briefcase } from "lucide-react";

export const Route = createFileRoute("/surveyor")({
  head: () => ({ meta: [{ title: "Surveyor — TerraTrust AI" }] }),
  component: () => <SurveyorPage />,
});

function SurveyorPage() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (pathname !== "/surveyor") return <Outlet />;
  return (
    <AppShell
      title="Surveyor workspace"
      subtitle="Assignments, boundary captures, and quality scoring."
      actions={
        <Link to="/surveyor/assignments">
          <Button className="rounded-full">
            <Briefcase className="h-4 w-4" /> View assignments
          </Button>
        </Link>
      }
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {surveyorKpis.map((k) => (
          <StatCard key={k.label} kpi={k} />
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="surface-card p-5">
          <p className="font-medium">Upcoming field work</p>
          <ul className="mt-4 divide-y divide-border">
            {properties.slice(0, 3).map((p, i) => (
              <li key={p.id} className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium">{p.title}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-2">
                    <MapPin className="h-3 w-3" />
                    {p.region} · <Calendar className="h-3 w-3" /> in {i + 1} day{i ? "s" : ""}
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </li>
            ))}
          </ul>
        </div>
        <div className="surface-card p-5">
          <p className="font-medium">Boundary captures awaiting review</p>
          <ul className="mt-4 space-y-3">
            {[
              "Mysuru Farm Parcel — 14 boundary points",
              "Pune Family Compound — 8 boundary points",
              "Gurugram Commercial Plot — 12 boundary points",
            ].map((x) => (
              <li
                key={x}
                className="flex items-center justify-between rounded-lg border border-border p-3 text-sm"
              >
                {x}
                <Link to="/surveyor/assignments/$id" params={{ id: "S-2238" }}>
                  <Button size="sm" variant="ghost">
                    Review
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AppShell>
  );
}
