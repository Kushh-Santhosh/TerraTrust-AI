import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Sparkles, Info, ShieldCheck, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";

/* ---------------- AI Badge ---------------- */
export function AIBadge({ children = "AI", tone = "primary" }: { children?: ReactNode; tone?: "primary" | "accent" | "success" | "warning" }) {
  const map = {
    primary: "from-primary/15 to-primary/5 text-primary ring-primary/25",
    accent: "from-accent/30 to-accent/5 text-accent-foreground ring-accent/40",
    success: "from-success/15 to-success/5 text-success ring-success/25",
    warning: "from-warning/25 to-warning/5 text-warning-foreground ring-warning/30",
  } as const;
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full bg-gradient-to-r px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] ring-1", map[tone])}>
      <Sparkles className="h-2.5 w-2.5" />
      {children}
    </span>
  );
}

/* ---------------- Score Ring (animated SVG) ---------------- */
export function ScoreRing({ value, label, sublabel, size = 160, tone = "primary" }: { value: number; label?: string; sublabel?: string; size?: number; tone?: "primary" | "success" | "warning" | "danger" }) {
  const r = size / 2 - 12;
  const c = 2 * Math.PI * r;
  const off = c - (Math.min(100, Math.max(0, value)) / 100) * c;
  const stroke = {
    primary: "stroke-primary",
    success: "stroke-success",
    warning: "stroke-warning",
    danger: "stroke-destructive",
  }[tone];
  return (
    <div className="relative flex flex-col items-center" style={{ width: size }}>
      <svg width={size} height={size} className="rotate-[-90deg]">
        <defs>
          <linearGradient id={`grad-${tone}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} className="stroke-muted" strokeWidth="10" fill="none" />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          className={cn(stroke, "transition-[stroke-dashoffset] duration-700 ease-out")}
          strokeWidth="10" fill="none" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={off}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <p className="font-display text-4xl leading-none text-foreground">{value}</p>
        {label && <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{label}</p>}
        {sublabel && <p className="mt-0.5 text-[11px] text-muted-foreground">{sublabel}</p>}
      </div>
    </div>
  );
}

/* ---------------- Confidence Meter (bar) ---------------- */
export function ConfidenceMeter({ value, label, hint }: { value: number; label?: string; hint?: string }) {
  const tone = value >= 80 ? "bg-success" : value >= 60 ? "bg-primary" : value >= 40 ? "bg-warning" : "bg-destructive";
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-foreground">{label ?? "Confidence"}</span>
        <span className="tabular-nums text-muted-foreground">{value}%</span>
      </div>
      <div className="relative h-2 overflow-hidden rounded-full bg-muted">
        <div className={cn("absolute inset-y-0 left-0 rounded-full transition-all", tone)} style={{ width: `${value}%` }} />
        <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-border" />
      </div>
      {hint && <p className="text-[11px] text-muted-foreground">{hint}</p>}
    </div>
  );
}

/* ---------------- Risk Gauge (semi-circle) ---------------- */
export function RiskGauge({ value, label = "Risk Score" }: { value: number; label?: string }) {
  // 0 = low risk (success), 100 = high risk (danger)
  const angle = (Math.min(100, Math.max(0, value)) / 100) * 180;
  const radius = 80;
  const cx = 100, cy = 90;
  const rad = (180 - angle) * (Math.PI / 180);
  const x = cx + radius * Math.cos(rad);
  const y = cy - radius * Math.sin(rad);
  const tone = value < 25 ? "text-success" : value < 55 ? "text-warning" : "text-destructive";
  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 200 110" width="200" height="110">
        <defs>
          <linearGradient id="risk-grad" x1="0" x2="1">
            <stop offset="0%" stopColor="oklch(0.72 0.16 145)" />
            <stop offset="50%" stopColor="oklch(0.78 0.16 75)" />
            <stop offset="100%" stopColor="oklch(0.6 0.2 25)" />
          </linearGradient>
        </defs>
        <path d="M 20 90 A 80 80 0 0 1 180 90" fill="none" stroke="url(#risk-grad)" strokeWidth="14" strokeLinecap="round" />
        <line x1={cx} y1={cy} x2={x} y2={y} stroke="currentColor" strokeWidth="3" className={cn(tone, "transition-all")} strokeLinecap="round" />
        <circle cx={cx} cy={cy} r="5" fill="currentColor" className={tone} />
      </svg>
      <p className={cn("font-display text-3xl leading-none", tone)}>{value}</p>
      <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
    </div>
  );
}

/* ---------------- AI Insight Card ---------------- */
export function AIInsightCard({
  icon, title, value, delta, hint, tone = "primary",
}: {
  icon?: ReactNode;
  title: string;
  value: ReactNode;
  delta?: { value: number; label?: string };
  hint?: string;
  tone?: "primary" | "success" | "warning" | "danger" | "accent";
}) {
  const ring = {
    primary: "ring-primary/15 from-primary/8",
    success: "ring-success/15 from-success/8",
    warning: "ring-warning/20 from-warning/10",
    danger: "ring-destructive/15 from-destructive/8",
    accent: "ring-accent/30 from-accent/15",
  }[tone];
  return (
    <div className={cn("relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br to-transparent p-5 ring-1", ring)}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {icon ?? <Sparkles className="h-3 w-3 text-primary" />} {title}
        </div>
        <AIBadge tone={tone === "danger" ? "warning" : tone === "accent" ? "accent" : "primary"}>AI</AIBadge>
      </div>
      <div className="mt-3 font-display text-3xl text-foreground">{value}</div>
      {(delta || hint) && (
        <div className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
          {delta && (
            <span className={cn("inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-medium", delta.value >= 0 ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive")}>
              {delta.value >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {delta.value >= 0 ? "+" : ""}{delta.value}% {delta.label}
            </span>
          )}
          {hint && <span>{hint}</span>}
        </div>
      )}
    </div>
  );
}

/* ---------------- Explainability Panel (factor weights) ---------------- */
export function ExplainabilityPanel({ title = "Why this score", factors }: { title?: string; factors: { label: string; weight: number; direction: "up" | "down" | "neutral"; note?: string }[] }) {
  return (
    <div className="surface-card p-5">
      <div className="flex items-center gap-2">
        <Info className="h-4 w-4 text-primary" />
        <p className="font-medium">{title}</p>
        <AIBadge>Explainable</AIBadge>
      </div>
      <div className="mt-4 space-y-3">
        {factors.map((f, i) => (
          <div key={i}>
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 font-medium text-foreground">
                {f.direction === "up" && <TrendingUp className="h-3 w-3 text-success" />}
                {f.direction === "down" && <TrendingDown className="h-3 w-3 text-destructive" />}
                {f.direction === "neutral" && <span className="h-1 w-3 rounded-full bg-muted-foreground/40" />}
                {f.label}
              </span>
              <span className="tabular-nums text-muted-foreground">{f.weight > 0 ? "+" : ""}{f.weight} pts</span>
            </div>
            <div className="relative mt-1 h-1.5 overflow-hidden rounded-full bg-muted">
              <div
                className={cn("absolute inset-y-0 rounded-full", f.direction === "down" ? "bg-destructive" : f.direction === "up" ? "bg-success" : "bg-muted-foreground/40")}
                style={{ width: `${Math.min(100, Math.abs(f.weight) * 4)}%`, left: f.direction === "down" ? "auto" : 0, right: f.direction === "down" ? 0 : "auto" }}
              />
            </div>
            {f.note && <p className="mt-1 text-[11px] text-muted-foreground">{f.note}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Signal Tile (compact stat for AI panels) ---------------- */
export function SignalTile({ icon, label, value, tone = "default" }: { icon?: ReactNode; label: string; value: ReactNode; tone?: "default" | "success" | "warning" | "danger" }) {
  const cls = {
    default: "ring-border",
    success: "ring-success/25 bg-success/5",
    warning: "ring-warning/30 bg-warning/8",
    danger: "ring-destructive/25 bg-destructive/5",
  }[tone];
  return (
    <div className={cn("rounded-xl bg-surface p-3 ring-1", cls)}>
      <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{icon} {label}</div>
      <p className="mt-1 font-display text-xl text-foreground">{value}</p>
    </div>
  );
}

/* ---------------- AI Reasoning Stream (mock thinking trace) ---------------- */
export function ReasoningTrace({ steps }: { steps: { label: string; detail: string; status?: "done" | "active" | "queued" }[] }) {
  return (
    <ol className="space-y-3">
      {steps.map((s, i) => {
        const status = s.status ?? "done";
        return (
          <li key={i} className="flex gap-3">
            <div className="relative mt-0.5">
              <span className={cn(
                "block h-2.5 w-2.5 rounded-full ring-4",
                status === "done" ? "bg-success ring-success/15" : status === "active" ? "bg-primary ring-primary/15 animate-pulse" : "bg-muted-foreground/40 ring-muted",
              )} />
              {i < steps.length - 1 && <span className="absolute left-1/2 top-3 h-7 w-px -translate-x-1/2 bg-border" />}
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{s.label}</p>
              <p className="text-xs text-muted-foreground">{s.detail}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/* ---------------- Verdict Banner ---------------- */
export function VerdictBanner({ verdict, headline, detail }: { verdict: "trusted" | "review" | "flagged"; headline: string; detail: string }) {
  const map = {
    trusted: { icon: ShieldCheck, cls: "from-success/15 to-success/5 ring-success/30 text-success" },
    review: { icon: Info, cls: "from-warning/20 to-warning/5 ring-warning/30 text-warning-foreground" },
    flagged: { icon: AlertTriangle, cls: "from-destructive/15 to-destructive/5 ring-destructive/30 text-destructive" },
  } as const;
  const v = map[verdict];
  return (
    <div className={cn("flex items-start gap-3 rounded-2xl bg-gradient-to-br p-5 ring-1", v.cls)}>
      <v.icon className="mt-0.5 h-5 w-5" />
      <div>
        <p className="font-display text-xl text-foreground">{headline}</p>
        <p className="mt-1 text-sm text-muted-foreground">{detail}</p>
      </div>
    </div>
  );
}
