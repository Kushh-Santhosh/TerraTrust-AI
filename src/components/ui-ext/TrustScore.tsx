import { cn } from "@/lib/utils";

export function TrustScore({
  value,
  size = 96,
  label = true,
}: {
  value: number;
  size?: number;
  label?: boolean;
}) {
  const radius = (size - 12) / 2;
  const c = 2 * Math.PI * radius;
  const offset = c - (value / 100) * c;
  const tone =
    value >= 85
      ? "text-success"
      : value >= 65
        ? "text-primary"
        : value >= 45
          ? "text-warning"
          : "text-destructive";

  return (
    <div className="inline-flex flex-col items-center gap-1">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            className="text-muted/60"
            strokeWidth="6"
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={offset}
            className={cn("transition-all duration-700", tone)}
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <div className="text-center leading-none">
            <div className={cn("font-display text-2xl", tone)}>{value}</div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">/ 100</div>
          </div>
        </div>
      </div>
      {label && <div className="text-xs text-muted-foreground">Trust score</div>}
    </div>
  );
}
