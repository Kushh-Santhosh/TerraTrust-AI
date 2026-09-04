import { cn } from "@/lib/utils";

export function Logo({ className, showWord = true }: { className?: string; showWord?: boolean }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-primary to-[oklch(0.55_0.1_180)] shadow-[var(--shadow-glow)]">
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 text-primary-foreground"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2 4 6v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
        <span className="absolute -inset-1 -z-10 rounded-xl bg-primary/20 blur-md" />
      </div>
      {showWord && (
        <span className="text-[15px] font-semibold tracking-tight text-foreground">
          TerraTrust<span className="text-primary"> AI</span>
        </span>
      )}
    </div>
  );
}
