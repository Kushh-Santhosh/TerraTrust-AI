import { cn } from "@/lib/utils";
import type { ReactNode, HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  tone?: "default" | "primary" | "accent";
}

export function GlassCard({ children, className, tone = "default", ...rest }: Props) {
  return (
    <div
      {...rest}
      className={cn(
        "glass relative overflow-hidden rounded-2xl p-5 shadow-[var(--shadow-elev)]",
        tone === "primary" && "ring-1 ring-primary/20",
        tone === "accent" && "ring-1 ring-accent/40",
        className,
      )}
    >
      {children}
    </div>
  );
}
