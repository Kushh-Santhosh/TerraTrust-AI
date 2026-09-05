import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { AppShell, StatusBadge } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { properties } from "@/lib/mock-data";
import { formatInr } from "@/lib/utils";
import { Grid3x3, List, Plus, Search, MapPin } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/properties")({
  head: () => ({ meta: [{ title: "Properties — TerraTrust AI" }] }),
  component: PropertiesPage,
});

function PropertiesPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (pathname.replace(/\/$/, "") !== "/properties") return <Outlet />;
  return (
    <AppShell
      title="Properties"
      subtitle="Your Property Passports across regions and types."
      actions={
        <Link to="/properties/new">
          <Button className="rounded-full">
            <Plus className="h-4 w-4" /> New passport
          </Button>
        </Link>
      }
    >
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-64">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input className="h-10 pl-9" placeholder="Search by address, passport ID, owner…" />
        </div>
        <div className="ml-auto flex rounded-md border border-border bg-surface p-1">
          <button
            onClick={() => setView("grid")}
            className={cn("rounded p-1.5", view === "grid" ? "bg-muted" : "text-muted-foreground")}
          >
            <Grid3x3 className="h-4 w-4" />
          </button>
          <button
            onClick={() => setView("list")}
            className={cn("rounded p-1.5", view === "list" ? "bg-muted" : "text-muted-foreground")}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {view === "grid" ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {properties.map((p) => (
            <Link
              key={p.id}
              to="/properties/$id"
              params={{ id: p.id }}
              className="surface-card group overflow-hidden transition hover:shadow-[var(--shadow-elev)]"
            >
              <div className="relative h-36 overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
                <svg viewBox="0 0 200 100" className="absolute inset-0 h-full w-full">
                  <pattern id={`g${p.id}`} width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M20 0H0V20" fill="none" stroke="oklch(0.9 0.01 250)" />
                  </pattern>
                  <rect width="200" height="100" fill={`url(#g${p.id})`} />
                  <polygon
                    points="60,30 140,28 158,68 80,76 50,60"
                    fill="oklch(0.45 0.08 195 / 0.2)"
                    stroke="oklch(0.45 0.08 195)"
                    strokeWidth="1.5"
                  />
                </svg>
                <div className="absolute right-3 top-3">
                  <StatusBadge status={p.status} />
                </div>
              </div>
              <div className="p-4">
                <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {p.passportId}
                </p>
                <p className="mt-1 font-medium text-foreground group-hover:text-primary">
                  {p.title}
                </p>
                <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {p.region}, {p.country}
                </p>
                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      AI valuation
                    </p>
                    <p className="font-display text-xl">₹{(p.valuation / 100000).toFixed(1)} L</p>
                    <p className="font-display text-xl">{formatInr(p.valuation)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      Trust
                    </p>
                    <p
                      className={`font-display text-xl ${p.trustScore >= 85 ? "text-success" : p.trustScore >= 65 ? "text-primary" : p.trustScore >= 45 ? "text-warning" : "text-destructive"}`}
                    >
                      {p.trustScore}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="surface-card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-xs text-muted-foreground">
              <tr className="text-left">
                <th className="px-4 py-3 font-medium">Property</th>
                <th className="px-4 py-3 font-medium">Passport</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Trust</th>
                <th className="px-4 py-3 font-medium text-right">Valuation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {properties.map((p) => (
                <tr key={p.id} className="hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <Link
                      to="/properties/$id"
                      params={{ id: p.id }}
                      className="font-medium hover:text-primary"
                    >
                      {p.title}
                    </Link>
                    <p className="text-xs text-muted-foreground">{p.address}</p>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">{p.passportId}</td>
                  <td className="px-4 py-3 capitalize text-muted-foreground">{p.type}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={p.status} />
                  </td>
                  <td className="px-4 py-3">{p.trustScore}</td>
                  <td className="px-4 py-3 text-right font-medium">
                    ₹{(p.valuation / 100000).toFixed(1)} L{formatInr(p.valuation)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AppShell>
  );
}
