// Guided demo mode — context, tour steps, banner. No external deps.

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import { Sparkles, X, ChevronRight, ChevronLeft, Play } from "lucide-react";

interface DemoStep {
  to: string;
  title: string;
  body: string;
}

const STEPS: DemoStep[] = [
  {
    to: "/dashboard",
    title: "Citizen dashboard",
    body: "Every property in one portfolio. KPIs roll up from real registry signals — no spreadsheets, no missing fields.",
  },
  {
    to: "/properties",
    title: "My properties",
    body: "Open any property to inspect its digital Property Passport and verification status.",
  },
  {
    to: "/properties/p_001",
    title: "Property Passport",
    body: "The machine-verifiable identity of a parcel: trust score, AI valuation, ownership history, encumbrances, nearby infrastructure.",
  },
  {
    to: "/properties/p_001/verify",
    title: "Run verification",
    body: "Run the n8n-orchestrated checks and see whether this clean parcel is ready for its passport.",
  },
  {
    to: "/properties/p_003/verify",
    title: "Human review path",
    body: "A disputed parcel shows how fraud, boundary, and confidence signals route a property to review.",
  },
];

interface Ctx {
  active: boolean;
  step: number;
  total: number;
  current: DemoStep | null;
  start: () => void;
  stop: () => void;
  next: () => void;
  prev: () => void;
  go: (i: number) => void;
}

const DemoCtx = createContext<Ctx | null>(null);

export function DemoModeProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [active, setActive] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem("tt:demo") === "1") setActive(true);
  }, []);

  const navigate = (i: number) => {
    const s = STEPS[i];
    if (!s) return;
    router.navigate({ to: s.to });
  };

  const start = () => {
    setActive(true);
    setStep(0);
    if (typeof window !== "undefined") localStorage.setItem("tt:demo", "1");
    navigate(0);
  };
  const stop = () => {
    setActive(false);
    if (typeof window !== "undefined") localStorage.removeItem("tt:demo");
  };
  const next = () => {
    const i = Math.min(STEPS.length - 1, step + 1);
    setStep(i);
    navigate(i);
  };
  const prev = () => {
    const i = Math.max(0, step - 1);
    setStep(i);
    navigate(i);
  };
  const go = (i: number) => {
    setStep(i);
    navigate(i);
  };

  const value: Ctx = useMemo(
    () => ({
      active,
      step,
      total: STEPS.length,
      current: active ? STEPS[step] : null,
      start,
      stop,
      next,
      prev,
      go,
    }),
    [active, step],
  );

  return (
    <DemoCtx.Provider value={value}>
      {children}
      <DemoTourOverlay />
    </DemoCtx.Provider>
  );
}

export function useDemo() {
  const ctx = useContext(DemoCtx);
  if (!ctx) throw new Error("useDemo must be used inside DemoModeProvider");
  return ctx;
}

function DemoTourOverlay() {
  const { active, step, total, current, next, prev, stop } = useDemo();
  if (!active || !current) return null;
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[60] flex justify-center px-4">
      <div className="pointer-events-auto w-full max-w-2xl rounded-2xl border border-primary/20 bg-surface-elevated/95 p-4 shadow-[var(--shadow-elev)] backdrop-blur-xl animate-fade-in">
        <div className="flex items-start gap-4">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              <span>Guided demo</span>
              <span>·</span>
              <span>
                {step + 1} / {total}
              </span>
            </div>
            <p className="mt-1 font-display text-xl leading-tight">{current.title}</p>
            <p className="mt-1 text-sm text-muted-foreground">{current.body}</p>
            <div className="mt-3 h-1 rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all"
                style={{ width: `${((step + 1) / total) * 100}%` }}
              />
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <button
              onClick={stop}
              className="rounded-full p-1.5 text-muted-foreground hover:bg-muted"
              aria-label="End demo"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-1.5">
              <button
                onClick={prev}
                disabled={step === 0}
                className="rounded-full border border-border bg-surface p-1.5 disabled:opacity-40"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={next}
                disabled={step === total - 1}
                className="rounded-full bg-primary p-1.5 text-primary-foreground disabled:opacity-40"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function StartDemoButton({ className }: { className?: string }) {
  const { start } = useDemo();
  return (
    <button
      onClick={start}
      className={
        className ??
        "inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:opacity-90"
      }
    >
      <Play className="h-3.5 w-3.5" /> Try the guided demo
    </button>
  );
}

export function DemoLink({
  to,
  children,
  className,
}: {
  to: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}
