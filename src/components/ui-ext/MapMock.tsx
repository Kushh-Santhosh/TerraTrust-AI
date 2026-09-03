import type { Property } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * Stylized SVG mock map. Not an actual map widget — used to express GIS UI
 * before Mapbox wiring. Renders a parchment-like canvas with parcel polygons.
 */
export function MapMock({
  properties,
  highlightId,
  onSelect,
  className,
  height = 480,
}: {
  properties: Property[];
  highlightId?: string;
  onSelect?: (p: Property) => void;
  className?: string;
  height?: number;
}) {
  return (
    <div className={cn("surface-card relative overflow-hidden", className)} style={{ height }}>
      {/* canvas */}
      <svg viewBox="0 0 800 480" className="absolute inset-0 h-full w-full">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0H0V40" fill="none" stroke="oklch(0.92 0.008 250)" strokeWidth="1" />
          </pattern>
          <radialGradient id="glow" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="oklch(0.88 0.06 195 / 0.5)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <linearGradient id="river" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.85 0.05 220)" />
            <stop offset="100%" stopColor="oklch(0.78 0.07 200)" />
          </linearGradient>
        </defs>
        <rect width="800" height="480" fill="url(#glow)" />
        <rect width="800" height="480" fill="url(#grid)" />
        {/* faux river */}
        <path d="M-20 320 C 180 280, 320 360, 520 300 S 820 260, 860 300 L 860 480 L -20 480 Z"
          fill="url(#river)" opacity="0.35" />
        {/* faux roads */}
        <path d="M0 240 H800" stroke="oklch(0.85 0.01 250)" strokeWidth="2" strokeDasharray="2 6" />
        <path d="M380 0 V480" stroke="oklch(0.85 0.01 250)" strokeWidth="2" strokeDasharray="2 6" />

        {/* parcels */}
        {properties.map((p, i) => {
          const x = 120 + (i % 4) * 160 + ((i * 13) % 40);
          const y = 90 + Math.floor(i / 4) * 150 + ((i * 7) % 30);
          const w = 90 + (i % 3) * 18;
          const h = 70 + (i % 2) * 14;
          const active = highlightId === p.id;
          const fill =
            p.status === "verified" ? "oklch(0.62 0.14 155 / 0.25)" :
            p.status === "pending" ? "oklch(0.78 0.13 75 / 0.3)" :
            p.status === "disputed" ? "oklch(0.6 0.22 27 / 0.25)" :
            "oklch(0.7 0.01 250 / 0.2)";
          const stroke =
            p.status === "verified" ? "oklch(0.55 0.14 155)" :
            p.status === "pending" ? "oklch(0.6 0.15 75)" :
            p.status === "disputed" ? "oklch(0.55 0.22 27)" :
            "oklch(0.55 0.01 250)";
          return (
            <g key={p.id} className="cursor-pointer" onClick={() => onSelect?.(p)}>
              <rect
                x={x} y={y} width={w} height={h} rx="6"
                fill={fill} stroke={stroke} strokeWidth={active ? 2.5 : 1.4}
                className={cn("transition-all", active && "drop-shadow-md")}
              />
              <circle cx={x + w / 2} cy={y + h / 2} r={active ? 5 : 3} fill={stroke} />
              {active && <circle cx={x + w / 2} cy={y + h / 2} r="14" fill="none" stroke={stroke} className="animate-pulse-ring" />}
              <text x={x + 6} y={y + 14} fontSize="9" fill="oklch(0.3 0.02 250)" className="font-medium">{p.passportId}</text>
            </g>
          );
        })}
      </svg>

      {/* legend */}
      <div className="glass-strong absolute bottom-3 left-3 flex items-center gap-3 rounded-lg px-3 py-2 text-[11px]">
        <Dot c="oklch(0.55 0.14 155)" /> Verified
        <Dot c="oklch(0.6 0.15 75)" /> Pending
        <Dot c="oklch(0.55 0.22 27)" /> Disputed
      </div>
      <div className="glass-strong absolute right-3 top-3 rounded-lg px-3 py-1.5 text-[11px] text-muted-foreground">
        GIS preview · {properties.length} parcels
      </div>
    </div>
  );
}

function Dot({ c }: { c: string }) {
  return <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: c }} />;
}
