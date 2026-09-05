import { createFileRoute, Link } from "@tanstack/react-router";
import { properties } from "@/lib/mock-data";
import { formatInr } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Download, ShieldCheck, ArrowLeft, Printer } from "lucide-react";
import { useEffect } from "react";

export const Route = createFileRoute("/properties/$id/passport-pdf")({
  component: PassportPDF,
});

/* Inline QR — deterministic pseudo-QR generated from passport id, no deps */
function PseudoQR({ value, size = 132 }: { value: string; size?: number }) {
  const grid = 21;
  // hash to bit grid
  let h = 2166136261;
  for (let i = 0; i < value.length; i++) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const cells: boolean[] = [];
  let state = h >>> 0;
  for (let i = 0; i < grid * grid; i++) {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    cells.push((state & 1) === 1);
  }
  const cell = size / grid;
  // finder squares
  const isFinder = (r: number, c: number) =>
    (r < 7 && c < 7) || (r < 7 && c >= grid - 7) || (r >= grid - 7 && c < 7);
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label={`QR code for ${value}`}
    >
      <rect width={size} height={size} fill="white" />
      {cells.map((on, i) => {
        const r = Math.floor(i / grid),
          c = i % grid;
        if (isFinder(r, c)) return null;
        return on ? (
          <rect key={i} x={c * cell} y={r * cell} width={cell} height={cell} fill="#0a1224" />
        ) : null;
      })}
      {[
        [0, 0],
        [grid - 7, 0],
        [0, grid - 7],
      ].map(([cx, cy], i) => (
        <g key={i}>
          <rect x={cx * cell} y={cy * cell} width={7 * cell} height={7 * cell} fill="#0a1224" />
          <rect
            x={(cx + 1) * cell}
            y={(cy + 1) * cell}
            width={5 * cell}
            height={5 * cell}
            fill="white"
          />
          <rect
            x={(cx + 2) * cell}
            y={(cy + 2) * cell}
            width={3 * cell}
            height={3 * cell}
            fill="#0a1224"
          />
        </g>
      ))}
    </svg>
  );
}

function PassportPDF() {
  const { id } = Route.useParams();
  const p = properties.find((x) => x.id === id);

  useEffect(() => {
    document.title = p ? `Property Passport · ${p.passportId}` : "Property Passport";
  }, [p]);

  if (!p) {
    return (
      <div className="mx-auto max-w-3xl p-10">
        <p className="text-sm text-muted-foreground">
          Passport not found.{" "}
          <Link to="/properties" className="text-primary">
            Back
          </Link>
        </p>
      </div>
    );
  }

  const passportIssued = p.status === "verified";
  const issuedOn = new Date().toISOString().slice(0, 10);
  const signatureSeed = `${p.passportId}-${issuedOn}`;
  const signatureHash = Array.from(signatureSeed)
    .reduce((a, c) => (a * 33 + c.charCodeAt(0)) >>> 0, 5381)
    .toString(16)
    .padStart(8, "0")
    .toUpperCase();

  return (
    <div className="min-h-screen bg-muted/30 print:bg-white">
      {/* Toolbar — hidden in print */}
      <div className="sticky top-0 z-10 border-b border-border bg-surface/95 backdrop-blur print:hidden">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-6 py-3">
          <Button asChild variant="ghost" size="sm" className="rounded-full">
            <Link to="/properties/$id" params={{ id: p.id }}>
              <ArrowLeft className="h-4 w-4" /> Back to passport
            </Link>
          </Button>
          <div className="flex gap-2">
            <Button onClick={() => window.print()} className="rounded-full">
              <Download className="h-4 w-4" /> Download PDF
            </Button>
            <Button onClick={() => window.print()} variant="outline" className="rounded-full">
              <Printer className="h-4 w-4" /> Print
            </Button>
          </div>
        </div>
      </div>

      {/* Document */}
      <main className="mx-auto my-8 max-w-[820px] bg-white text-[#0a1224] shadow-[var(--shadow-elev)] print:my-0 print:shadow-none">
        {/* Government header band */}
        <div className="relative overflow-hidden bg-[#0a1224] px-10 py-8 text-white">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, #2563eb 0%, transparent 40%), radial-gradient(circle at 80% 60%, #f59e0b 0%, transparent 35%)",
            }}
            aria-hidden
          />
          <div className="relative flex items-start justify-between gap-6">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/60">
                National Land Authority · Federal Republic of {p.country}
              </p>
              <h1 className="mt-2 font-display text-3xl leading-tight">
                Digital Property Passport
              </h1>
              <p className="mt-1 text-sm text-white/70">
                {passportIssued
                  ? "Machine-verifiable certificate of registered tenure — issued via TerraTrust AI."
                  : "Property verification record — passport issuance pending review."}
              </p>
            </div>
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-lg bg-white/10 ring-1 ring-white/20">
              <ShieldCheck className="h-7 w-7 text-white" aria-hidden />
            </div>
          </div>
          <div className="relative mt-6 flex flex-wrap gap-x-8 gap-y-2 text-xs text-white/80">
            <span>
              <span className="text-white/50">Passport ID</span>{" "}
              <span className="ml-2 font-mono text-white">{p.passportId}</span>
            </span>
            <span>
              <span className="text-white/50">Issued</span>{" "}
              <span className="ml-2 font-mono text-white">{issuedOn}</span>
            </span>
            <span>
              <span className="text-white/50">Status</span>{" "}
              <span className="ml-2 font-mono uppercase text-white">{p.status}</span>
            </span>
          </div>
        </div>

        {/* Body grid */}
        <div className="grid grid-cols-[1fr_220px] gap-10 px-10 py-8">
          {/* LEFT */}
          <div>
            <section>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0a1224]/60">
                Property summary
              </p>
              <h2 className="mt-1 font-display text-2xl">{p.title}</h2>
              <p className="mt-1 text-sm text-[#0a1224]/70">
                {p.address} · {p.region}, {p.country}
              </p>
              <dl className="mt-4 grid grid-cols-2 gap-y-3 text-sm">
                <dt className="text-[#0a1224]/60">Registered owner</dt>
                <dd className="font-medium">{p.owner}</dd>
                <dt className="text-[#0a1224]/60">Owner since</dt> <dd>{p.ownerSince}</dd>
                <dt className="text-[#0a1224]/60">Land use</dt>{" "}
                <dd className="capitalize">{p.type}</dd>
                <dt className="text-[#0a1224]/60">Area</dt> <dd>{p.area.toLocaleString()} m²</dd>
                <dt className="text-[#0a1224]/60">Coordinates</dt>{" "}
                <dd className="font-mono text-xs">
                  {p.coords.lat.toFixed(4)}, {p.coords.lng.toFixed(4)}
                </dd>
                <dt className="text-[#0a1224]/60">AI valuation</dt>{" "}
                <dd>₹{p.valuation.toLocaleString()}</dd>
                <dd>{formatInr(p.valuation)}</dd>
              </dl>
            </section>

            <section className="mt-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0a1224]/60">
                Confidence breakdown
              </p>
              <div className="mt-3 grid grid-cols-3 gap-3">
                {[
                  { k: "Trust score", v: `${p.trustScore} / 100` },
                  { k: "AI confidence", v: `${p.aiConfidence}%` },
                  { k: "Fraud signals", v: p.status === "disputed" ? "1 active" : "None detected" },
                ].map((x) => (
                  <div key={x.k} className="rounded-lg border border-[#0a1224]/10 bg-[#f8fafc] p-3">
                    <p className="text-[10px] uppercase tracking-wider text-[#0a1224]/60">{x.k}</p>
                    <p className="mt-1 font-display text-xl">{x.v}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0a1224]/60">
                Verification timeline
              </p>
              <ol className="mt-3 space-y-2 text-sm">
                {p.timeline.map((t) => (
                  <li key={t.id} className="flex gap-3 border-l-2 border-[#0a1224]/15 pl-3">
                    <span className="flex-1">
                      <span className="font-medium">{t.action}</span>
                      <span className="ml-2 text-[#0a1224]/60">
                        — {t.actor} · {t.role}
                      </span>
                    </span>
                    <span className="text-[#0a1224]/50">{t.at}</span>
                  </li>
                ))}
              </ol>
            </section>

            <section className="mt-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0a1224]/60">
                Documents on file
              </p>
              <table className="mt-3 w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-[#0a1224]/15 text-left text-[11px] uppercase tracking-wider text-[#0a1224]/60">
                    <th className="py-1.5">Document</th>
                    <th>Kind</th>
                    <th>Uploaded</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {p.documents.map((d) => (
                    <tr key={d.id} className="border-b border-[#0a1224]/10">
                      <td className="py-2">{d.name}</td>
                      <td className="capitalize text-[#0a1224]/70">{d.kind}</td>
                      <td className="text-[#0a1224]/70">{d.uploadedAt}</td>
                      <td>{d.verified ? "Verified" : "Pending"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </div>

          {/* RIGHT — QR + signature column */}
          <aside className="space-y-6">
            <div className="rounded-lg border border-[#0a1224]/10 p-4 text-center">
              <PseudoQR value={`https://terratrust.ai/p/${p.passportId}`} />
              <p className="mt-2 text-[10px] uppercase tracking-wider text-[#0a1224]/60">
                Scan to verify
              </p>
              <p className="mt-1 break-all font-mono text-[10px] text-[#0a1224]/80">
                terratrust.ai/p/{p.passportId}
              </p>
            </div>

            <div className="rounded-lg border border-[#0a1224]/10 p-4">
              <p className="text-[10px] uppercase tracking-wider text-[#0a1224]/60">
                Digital signature
              </p>
              {passportIssued ? (
                <>
                  <p className="mt-1 font-mono text-[11px] leading-tight text-[#0a1224]">
                    ed25519:{signatureHash}…
                  </p>
                  <p className="mt-2 text-[10px] text-[#0a1224]/60">
                    Signed by the issuing bureau on {issuedOn}. Any modification invalidates this
                    passport.
                  </p>
                </>
              ) : (
                <p className="mt-1 text-[11px] text-[#0a1224]/60">
                  Not issued. This passport is held pending human verification.
                </p>
              )}
            </div>

            <div className="rounded-lg border border-[#0a1224]/10 p-4">
              <p className="text-[10px] uppercase tracking-wider text-[#0a1224]/60">
                Ownership status
              </p>
              <p className="mt-1 text-sm font-medium capitalize">{p.status}</p>
              <p className="mt-1 text-[11px] text-[#0a1224]/60">
                {p.status === "verified"
                  ? "Verification evidence cleared the prototype decision gates."
                  : p.status === "disputed"
                    ? "Active dispute on file — see case docket."
                    : "Awaiting completion of verification steps."}
              </p>
            </div>
          </aside>
        </div>

        {/* Footer band */}
        <div className="border-t border-[#0a1224]/10 bg-[#f8fafc] px-10 py-5 text-[11px] text-[#0a1224]/60">
          <p>
            {passportIssued
              ? "This document is a prototype representation of the digital Property Passport record."
              : "This document is a preview of the Property Passport record and is not an issued certificate."}
            For real-time status, scan the QR code or visit terratrust.ai/p/{p.passportId}.
            {passportIssued
              ? ` Generated from the TerraTrust AI verification result · Doc ref ${p.passportId}-${signatureHash.slice(0, 4)}.`
              : " Issuance requires completion of the verification workflow and human review."}
          </p>
        </div>
      </main>

      <style>{`
        @media print {
          @page { size: A4; margin: 14mm; }
          body { background: white !important; }
        }
      `}</style>
    </div>
  );
}
