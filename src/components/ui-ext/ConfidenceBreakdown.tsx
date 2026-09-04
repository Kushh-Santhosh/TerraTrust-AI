import { ChevronDown, ShieldCheck, AlertTriangle, AlertCircle } from "lucide-react";
import { useState } from "react";
import type { ConfidenceReport, ConfidenceFactor } from "@/lib/confidence-engine";

export function ConfidenceBreakdown({ report }: { report: ConfidenceReport }) {
  return (
    <div className="surface-card p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Property Confidence Engine
          </p>
          <p className="mt-1 font-display text-2xl">
            {report.score}{" "}
            <span className="text-base text-muted-foreground">/ 100 · {report.band}</span>
          </p>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">{report.headline}</p>
        </div>
        <div className="text-right text-[10px] uppercase tracking-wider text-muted-foreground">
          <p>{report.modelVersion}</p>
          <p>
            Signed{" "}
            {new Date(report.signedAt).toLocaleDateString("en", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        {report.factors.map((f) => (
          <FactorRow key={f.key} f={f} />
        ))}
      </div>
    </div>
  );
}

function FactorRow({ f }: { f: ConfidenceFactor }) {
  const [open, setOpen] = useState(false);
  const ToneIcon =
    f.tone === "success" ? ShieldCheck : f.tone === "warning" ? AlertTriangle : AlertCircle;
  const tonecls =
    f.tone === "success"
      ? "text-success"
      : f.tone === "warning"
        ? "text-warning-foreground"
        : "text-destructive";
  return (
    <div className="rounded-lg border border-border bg-surface">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-3 px-3 py-2.5 text-left hover:bg-muted/40"
      >
        <ToneIcon className={`h-4 w-4 ${tonecls}`} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium">{f.label}</p>
            <p className="text-xs text-muted-foreground">
              weight {(f.weight * 100).toFixed(0)}% · contributes {f.contribution}
            </p>
          </div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all"
              style={{ width: `${f.raw}%` }}
            />
          </div>
        </div>
        <span className="ml-2 text-sm font-medium tabular-nums">{f.raw}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="border-t border-border bg-muted/30 px-3 py-3 animate-fade-in">
          <p className="text-xs text-muted-foreground">{f.reasoning}</p>
          {f.evidence && (
            <ul className="mt-2 space-y-1">
              {f.evidence.map((e, i) => (
                <li key={i} className="flex items-center gap-2 text-[11px] text-muted-foreground">
                  <span className="h-1 w-1 rounded-full bg-primary" />
                  {e}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
