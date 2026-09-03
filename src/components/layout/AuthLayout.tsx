import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/brand/Logo";
import { ShieldCheck, MapPinned, Sparkles } from "lucide-react";

export function AuthLayout({ title, subtitle, children, footer }: {
  title: string; subtitle?: string; children: ReactNode; footer?: ReactNode;
}) {
  return (
    <div className="grid min-h-screen grid-cols-1 bg-background lg:grid-cols-2">
      <div className="flex flex-col px-6 py-8 md:px-12">
        <Link to="/" className="w-fit"><Logo /></Link>
        <div className="m-auto w-full max-w-md py-10">
          <h1 className="font-display text-4xl text-foreground">{title}</h1>
          {subtitle && <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>}
          <div className="mt-8">{children}</div>
          {footer && <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>}
        </div>
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} TerraTrust AI</p>
      </div>
      <div className="relative hidden overflow-hidden border-l border-border bg-surface-elevated lg:block">
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 grid-bg" />
        <div className="relative flex h-full flex-col justify-between p-12">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface/80 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" /> Trusted by 4 government land bureaus
          </div>
          <div>
            <h2 className="font-display max-w-md text-5xl text-foreground">A passport for every parcel of land.</h2>
            <p className="mt-3 max-w-md text-muted-foreground">
              Verify ownership, value, and boundaries — for governments, citizens, surveyors, and banks.
            </p>
            <div className="mt-8 grid max-w-md gap-3">
              <Feat icon={ShieldCheck} t="Tamper-evident audit trail" />
              <Feat icon={Sparkles} t="AI valuation with confidence scoring" />
              <Feat icon={MapPinned} t="GIS-grade boundary capture" />
            </div>
          </div>
          <p className="max-w-md text-xs text-muted-foreground">
            "We resolved 612 disputed parcels in our first quarter on TerraTrust." — Director, Lagos Land Bureau
          </p>
        </div>
      </div>
    </div>
  );
}

function Feat({ icon: Icon, t }: { icon: any; t: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-surface/60 p-3 backdrop-blur">
      <Icon className="h-4 w-4 text-primary" />
      <span className="text-sm text-foreground">{t}</span>
    </div>
  );
}
