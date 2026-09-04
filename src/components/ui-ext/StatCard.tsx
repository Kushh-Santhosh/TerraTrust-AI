import type { KPI } from "@/lib/types";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

export function StatCard({ kpi }: { kpi: KPI }) {
  const Icon = kpi.trend === "up" ? ArrowUpRight : kpi.trend === "down" ? ArrowDownRight : Minus;
  const tone =
    kpi.trend === "up"
      ? "text-success bg-success/10"
      : kpi.trend === "down"
        ? "text-destructive bg-destructive/10"
        : "text-muted-foreground bg-muted";
  return (
    <div className="surface-card flex flex-col gap-3 p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {kpi.label}
        </p>
        {kpi.delta && (
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium",
              tone,
            )}
          >
            <Icon className="h-3 w-3" />
            {kpi.delta}
          </span>
        )}
      </div>
      <div className="font-display text-4xl text-foreground">{kpi.value}</div>
      {kpi.hint && <p className="text-xs text-muted-foreground">{kpi.hint}</p>}
    </div>
  );
}
