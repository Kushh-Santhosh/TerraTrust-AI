import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Button } from "@/components/ui/button";
import {
  Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import {
  TimerReset, ShieldCheck, Banknote, Gauge, HeartHandshake, Globe2,
  Sparkles, ArrowRight, CheckCircle2,
} from "lucide-react";
import { impactMetrics, regionalAggregates, portfolioStats } from "@/lib/mock-extended";

export const Route = createFileRoute("/impact")({
  head: () => ({
    meta: [
      { title: "Impact — TerraTrust AI" },
      { name: "description", content: "Time saved, fraud reduction, government savings, citizen satisfaction, and SDG alignment delivered by TerraTrust AI." },
      { property: "og:title", content: "TerraTrust AI — Measured Impact" },
      { property: "og:description", content: "From 52 days to 5. From bureaucratic guesswork to explainable trust." },
    ],
  }),
  component: ImpactPage,
});

/* Animated count-up hook (respects reduced motion) */
function useCountUp(target: number, durationMs = 1400, decimals = 0) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setVal(target);
      return;
    }
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / durationMs);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs]);
  return decimals === 0 ? Math.round(val) : Number(val.toFixed(decimals));
}

function MetricCard({
  icon: Icon, eyebrow, label, value, suffix, prefix, decimals = 0, hint, tone = "primary",
}: {
  icon: typeof TimerReset;
  eyebrow: string;
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  hint: string;
  tone?: "primary" | "success" | "accent" | "warning";
}) {
  const n = useCountUp(value, 1400, decimals);
  const toneMap = {
    primary: "from-primary/15 to-transparent text-primary",
    success: "from-success/15 to-transparent text-success",
    accent:  "from-accent/15 to-transparent text-accent-foreground",
    warning: "from-warning/15 to-transparent text-warning-foreground",
  } as const;
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className="surface-card relative overflow-hidden p-6"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${toneMap[tone]}`} aria-hidden />
      <div className="relative">
        <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          <Icon className="h-3.5 w-3.5" aria-hidden /> <span>{eyebrow}</span>
        </div>
        <p className="mt-3 font-display text-5xl leading-none tracking-tight text-foreground">
          {prefix}{decimals === 0 ? n.toLocaleString() : n.toFixed(decimals)}{suffix}
        </p>
        <p className="mt-2 text-sm font-medium text-foreground">{label}</p>
        <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
      </div>
    </motion.div>
  );
}

function ImpactPage() {
  const m = impactMetrics;
  const speedSeries = [
    { name: "Manual / paper",         days: m.manualBaselineDays },
    { name: "Existing e-registries",  days: 24 },
    { name: "TerraTrust AI",          days: m.digitalCaseDays },
  ];
  const fraudSeries = [
    { name: "Caught at intake",      value: 62 },
    { name: "Caught at AI review",   value: 24 },
    { name: "Reached human bureau",  value: 11 },
    { name: "Reached final approval", value: 3  },
  ];
  const COLORS = ["hsl(var(--primary))", "hsl(var(--accent))", "hsl(var(--warning))", "hsl(var(--destructive))"];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 hero-gradient" aria-hidden />
        <div className="absolute inset-0 grid-bg" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-20 md:pt-28">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">Measured impact</p>
          <h1 className="font-display mt-3 max-w-3xl text-5xl leading-[1.05] text-foreground md:text-6xl">
            From 52 days of paperwork<br />to 5 days of certainty.
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground">
            TerraTrust AI compresses the verification chain that takes most national land authorities weeks
            into an explainable, auditable workflow that runs in days. Below is what changes when a country
            adopts the Property Passport.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Button asChild className="rounded-full">
              <Link to="/dashboard">Explore the platform <ArrowRight className="h-4 w-4" /></Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/analytics">View national analytics</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* METRICS GRID */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <MetricCard icon={TimerReset} eyebrow="Speed"          label="Days saved per case"      value={m.timeSavedDaysPerCase} suffix=" days" hint={`From ${m.manualBaselineDays} days down to ${m.digitalCaseDays}.`} tone="primary" />
          <MetricCard icon={ShieldCheck} eyebrow="Trust"          label="Fraud reduction"          value={m.fraudReductionPct}    suffix="%"     hint="Forged stamps, duplicate claims, and boundary overlaps caught before approval." tone="success" />
          <MetricCard icon={Banknote}   eyebrow="Public finance" label="Estimated annual savings" value={184}                    prefix="$"     suffix="M"   hint="Per mid-sized national land authority — staff, paper, dispute resolution." tone="accent" />
          <MetricCard icon={Gauge}      eyebrow="Throughput"     label="Verification speed-up"    value={m.verificationSpeedupX} suffix="×"     decimals={1} hint={`Up to ${m.parcelsPerHourScale.toLocaleString()} parcels per hour during national rollouts.`} tone="primary" />
          <MetricCard icon={HeartHandshake} eyebrow="Citizen"    label="Citizen satisfaction"     value={m.citizenSatisfactionPct} suffix="%"   hint="Across 18,000 surveyed property owners post-rollout." tone="success" />
          <MetricCard icon={Globe2}     eyebrow="Scale"          label="Parcels indexed"          value={portfolioStats.totalParcels * 19_400} hint={`From ${portfolioStats.totalOwners.toLocaleString()} owners across 9 demo regions in this build.`} tone="accent" />
        </div>
      </section>

      {/* CHARTS */}
      <section className="mx-auto max-w-7xl px-6 pb-12">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="surface-card p-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Verification speed</p>
            <h3 className="font-display mt-2 text-2xl">Days to issue a verified title</h3>
            <p className="mt-1 text-sm text-muted-foreground">Lower is better. Same workload, same staff, different platform.</p>
            <div className="mt-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={speedSeries} layout="vertical" margin={{ left: 8, right: 24 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" fontSize={11} />
                  <YAxis dataKey="name" type="category" width={140} tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" fontSize={11} />
                  <Tooltip contentStyle={{ background: "hsl(var(--surface-elevated))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                  <Bar dataKey="days" radius={[0, 6, 6, 0]}>
                    {speedSeries.map((_, i) => <Cell key={i} fill={i === 2 ? "hsl(var(--primary))" : "hsl(var(--muted-foreground) / 0.45)"} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="surface-card p-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Fraud funnel</p>
            <h3 className="font-display mt-2 text-2xl">Where fraud gets stopped</h3>
            <p className="mt-1 text-sm text-muted-foreground">97% of fraudulent claims are intercepted before they reach a human officer.</p>
            <div className="mt-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={fraudSeries} dataKey="value" nameKey="name" outerRadius={92} innerRadius={52} paddingAngle={3}>
                    {fraudSeries.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: "hsl(var(--surface-elevated))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* REGIONAL */}
      <section className="mx-auto max-w-7xl px-6 pb-12">
        <div className="surface-card p-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Regional uplift</p>
          <h3 className="font-display mt-2 text-2xl">Average trust score by region</h3>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regionalAggregates}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="region" tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <YAxis tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" fontSize={11} domain={[0, 100]} />
                <Tooltip contentStyle={{ background: "hsl(var(--surface-elevated))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                <Bar dataKey="avgTrust" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* SDG */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">UN Sustainable Development Goals</p>
            <h3 className="font-display mt-2 text-2xl">Aligned with the 2030 Agenda</h3>
          </div>
          <Sparkles className="h-5 w-5 text-primary" aria-hidden />
        </div>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {impactMetrics.sdgs.map(sdg => (
            <div key={sdg.id} className="surface-card flex gap-4 p-5">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground font-display text-xl">
                {sdg.id}
              </div>
              <div className="min-w-0">
                <p className="font-medium text-foreground">SDG {sdg.id} · {sdg.label}</p>
                <p className="mt-1 text-sm text-muted-foreground">{sdg.hit}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CLOSER */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 hero-gradient" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-6 py-20 text-center">
          <CheckCircle2 className="mx-auto h-10 w-10 text-primary" aria-hidden />
          <h2 className="font-display mt-4 text-4xl leading-tight md:text-5xl">
            Trust, made measurable.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            TerraTrust AI is ready to be deployed by national land authorities, community
            councils, and financial institutions — together.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Button asChild className="rounded-full"><Link to="/contact">Talk to our team</Link></Button>
            <Button asChild variant="outline" className="rounded-full"><Link to="/government">View government workbench</Link></Button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
