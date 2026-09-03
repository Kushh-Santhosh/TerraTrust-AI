import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";

export function SectionTitle({ eyebrow, title, description, action }: { eyebrow?: string; title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
      <div>
        {eyebrow && <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{eyebrow}</p>}
        <h2 className="font-display text-2xl text-foreground">{title}</h2>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-foreground">{label}</span>
      {hint && <span className="ml-2 text-[11px] text-muted-foreground">{hint}</span>}
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

export function Crumbs({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav className="mb-3 flex items-center gap-1.5 text-xs text-muted-foreground">
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {it.to ? <Link to={it.to} className="hover:text-foreground">{it.label}</Link> : <span className="text-foreground">{it.label}</span>}
          {i < items.length - 1 && <span className="text-muted-foreground/50">/</span>}
        </span>
      ))}
    </nav>
  );
}

export function Pill({ children, tone = "default" }: { children: ReactNode; tone?: "default" | "primary" | "success" | "warning" | "danger" | "info" }) {
  const map = {
    default: "bg-muted text-muted-foreground ring-border",
    primary: "bg-primary/10 text-primary ring-primary/20",
    success: "bg-success/10 text-success ring-success/20",
    warning: "bg-warning/15 text-warning-foreground ring-warning/30",
    danger: "bg-destructive/10 text-destructive ring-destructive/30",
    info: "bg-accent/15 text-accent-foreground ring-accent/30",
  } as const;
  return <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ring-1", map[tone])}>{children}</span>;
}

export function DataTable<T>({ rows, columns, empty }: { rows: T[]; columns: { key: string; label: string; render: (r: T) => ReactNode; className?: string }[]; empty?: ReactNode }) {
  if (!rows.length) return <div className="surface-card p-10 text-center text-sm text-muted-foreground">{empty ?? "No records yet."}</div>;
  return (
    <div className="surface-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-xs text-muted-foreground">
            <tr className="text-left">
              {columns.map(c => <th key={c.key} className={cn("px-4 py-3 font-medium", c.className)}>{c.label}</th>)}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((r, i) => (
              <tr key={i} className="hover:bg-muted/30">
                {columns.map(c => <td key={c.key} className={cn("px-4 py-3", c.className)}>{c.render(r)}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function EmptyState({ icon, title, description, action }: { icon?: ReactNode; title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="surface-card flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
      {icon && <div className="rounded-full bg-muted p-3 text-muted-foreground">{icon}</div>}
      <h3 className="font-display text-2xl">{title}</h3>
      {description && <p className="max-w-md text-sm text-muted-foreground">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-md bg-muted", className)} />;
}

export function KpiRow({ items }: { items: { label: string; value: string; hint?: string }[] }) {
  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
      {items.map((k, i) => (
        <div key={i} className="surface-card p-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{k.label}</p>
          <p className="mt-1 font-display text-3xl text-foreground">{k.value}</p>
          {k.hint && <p className="mt-0.5 text-xs text-muted-foreground">{k.hint}</p>}
        </div>
      ))}
    </div>
  );
}

export function Stepper({ steps, current }: { steps: string[]; current: number }) {
  return (
    <ol className="mb-6 flex flex-wrap gap-2">
      {steps.map((s, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={s} className={cn("flex items-center gap-2 rounded-full px-3 py-1.5 text-xs ring-1",
            done && "bg-success/10 text-success ring-success/20",
            active && "bg-primary text-primary-foreground ring-primary",
            !done && !active && "bg-muted text-muted-foreground ring-border")}>
            <span className={cn("flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-semibold",
              done ? "bg-success/20" : active ? "bg-white/20" : "bg-background ring-1 ring-border")}>{i + 1}</span>
            {s}
          </li>
        );
      })}
    </ol>
  );
}
