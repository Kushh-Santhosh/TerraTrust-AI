import { AlertTriangle, BadgeCheck, Bus, Building2, GraduationCap, HeartPulse, Plug, Store, ShoppingBag, Compass } from "lucide-react";
import type { Encumbrance, NearbyInfra, RiskIndicator, OwnershipRecord } from "@/lib/property-intel";

export function EncumbrancePanel({ items }: { items: Encumbrance[] }) {
  return (
    <div className="surface-card p-5">
      <div className="flex items-center gap-2">
        <BadgeCheck className="h-4 w-4 text-primary" />
        <p className="font-medium">Encumbrances & alerts</p>
        <span className="ml-auto text-xs text-muted-foreground">{items.length} on file</span>
      </div>
      {items.length === 0 ? (
        <p className="mt-3 text-sm text-muted-foreground">No active encumbrances. Passport is free of liens, mortgages, and caveats.</p>
      ) : (
        <ul className="mt-3 space-y-2">
          {items.map(e => (
            <li key={e.id} className="rounded-lg border border-border bg-surface p-3">
              <div className="flex items-center gap-2">
                <span className="capitalize text-sm font-medium">{e.kind.replace("-", " ")}</span>
                <StatusDot status={e.status} />
                <span className="text-[11px] capitalize text-muted-foreground">{e.status}</span>
                {e.amount && <span className="ml-auto text-sm font-medium text-foreground">${e.amount.toLocaleString()}</span>}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{e.note}</p>
              <p className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">{e.party} · {e.filedAt}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function StatusDot({ status }: { status: Encumbrance["status"] }) {
  const c = status === "active" ? "bg-warning" : status === "contested" ? "bg-destructive" : "bg-success";
  return <span className={`inline-block h-1.5 w-1.5 rounded-full ${c}`} />;
}

const INFRA_ICON: Record<NearbyInfra["category"], typeof GraduationCap> = {
  school: GraduationCap, hospital: HeartPulse, transit: Bus,
  road: Compass, market: ShoppingBag, utility: Plug,
};

export function NearbyInfraPanel({ items }: { items: NearbyInfra[] }) {
  return (
    <div className="surface-card p-5">
      <div className="flex items-center gap-2">
        <Building2 className="h-4 w-4 text-primary" />
        <p className="font-medium">Nearby infrastructure</p>
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {items.map((i, k) => {
          const Icon = INFRA_ICON[i.category] ?? Store;
          return (
            <div key={k} className="flex items-center gap-3 rounded-lg border border-border bg-surface px-3 py-2">
              <div className="grid h-8 w-8 place-items-center rounded-md bg-primary/10 text-primary"><Icon className="h-4 w-4" /></div>
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium">{i.name}</p>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground capitalize">{i.category}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium tabular-nums">{i.distanceKm} km</p>
                <p className={`text-[10px] ${i.impact === "positive" ? "text-success" : i.impact === "negative" ? "text-destructive" : "text-muted-foreground"}`}>{i.impact}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function RiskIndicatorsPanel({ items }: { items: RiskIndicator[] }) {
  return (
    <div className="surface-card p-5">
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-4 w-4 text-warning-foreground" />
        <p className="font-medium">Risk indicators</p>
      </div>
      <div className="mt-3 space-y-2">
        {items.map(r => {
          const tone = r.severity === "high" ? "from-destructive to-warning"
                    : r.severity === "moderate" ? "from-warning to-accent"
                    : "from-primary to-accent";
          return (
            <div key={r.key} className="rounded-lg border border-border bg-surface p-3">
              <div className="flex items-center gap-3">
                <p className="text-sm font-medium">{r.label}</p>
                <span className={`ml-auto rounded-full px-2 py-0.5 text-[10px] capitalize ring-1 ${r.severity === "high" ? "bg-destructive/10 text-destructive ring-destructive/20" : r.severity === "moderate" ? "bg-warning/15 text-warning-foreground ring-warning/30" : "bg-success/10 text-success ring-success/20"}`}>{r.severity}</span>
                <span className="text-sm font-medium tabular-nums">{r.score}</span>
              </div>
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-muted">
                <div className={`h-full rounded-full bg-gradient-to-r ${tone}`} style={{ width: `${r.score}%` }} />
              </div>
              <p className="mt-1.5 text-[11px] text-muted-foreground">{r.reasoning}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function OwnershipHistoryPanel({ items }: { items: OwnershipRecord[] }) {
  return (
    <div className="surface-card p-5">
      <p className="font-medium">Ownership history</p>
      <ol className="mt-4 relative ml-3 border-l border-border">
        {items.map((r, i) => (
          <li key={i} className="mb-5 pl-6 last:mb-0">
            <span className="absolute -left-[7px] h-3.5 w-3.5 rounded-full bg-primary ring-4 ring-background" />
            <div className="flex flex-wrap items-baseline gap-2">
              <p className="font-display text-lg leading-none">{r.year}</p>
              <p className="text-sm font-medium">{r.owner}</p>
              <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] capitalize text-muted-foreground">{r.event}</span>
              <span className="ml-auto text-[10px] uppercase tracking-wider text-muted-foreground">conf. {r.confidence}</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{r.evidence}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
