import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { AIBadge, ConfidenceMeter, AIInsightCard, ReasoningTrace, VerdictBanner } from "@/components/ai/AIPrimitives";
import { SectionTitle, Pill } from "@/components/ui-ext/Scaffold";
import { Button } from "@/components/ui/button";
import { ScanLine, Upload, FileText, CheckCircle2 } from "lucide-react";
import { ocrFields, recommendationsForDoc } from "@/lib/ai-mock";

export const Route = createFileRoute("/ai-ocr")({
  head: () => ({ meta: [{ title: "AI Document OCR — TerraTrust AI" }] }),
  component: OCRPage,
});

function OCRPage() {
  return (
    <AppShell
      title="Document OCR & Extraction"
      subtitle="Pull structured fields out of any title document — verified line by line."
      actions={<><Button variant="outline"><Upload className="h-4 w-4" /> Upload</Button><Button><ScanLine className="h-4 w-4" /> Re-scan</Button></>}
    >
      <div className="grid gap-4 md:grid-cols-4">
        <AIInsightCard title="Fields extracted" value="8 / 8" hint="C-of-O · pg 2 of 4" tone="success" />
        <AIInsightCard title="Avg. confidence" value="94%" delta={{ value: 3, label: "vs prior scan" }} tone="primary" />
        <AIInsightCard title="Verification" value="Auto-pass" hint="All checks aligned" tone="success" />
        <AIInsightCard title="Time to extract" value="1.2s" hint="GPU-accelerated" tone="accent" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_440px]">
        <div className="surface-card p-6">
          <SectionTitle eyebrow="Source · page 2" title="Certificate of Occupancy.pdf" action={<AIBadge>OCR v3.1</AIBadge>} />
          <div className="relative overflow-hidden rounded-xl border border-border bg-[oklch(0.985_0.005_95)] p-6">
            <div className="absolute right-4 top-4"><Pill tone="success"><CheckCircle2 className="h-3 w-3" /> Stamped & valid</Pill></div>
            <p className="text-center text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Lagos State Land Bureau</p>
            <p className="mt-1 text-center font-display text-2xl">Certificate of Occupancy</p>
            <p className="mt-1 text-center text-xs text-muted-foreground">Ref. LSLB-2024-00831</p>
            <div className="mt-6 space-y-3 text-sm">
              {ocrFields.map((f, i) => (
                <div key={i} className="group relative rounded-md bg-surface p-2.5 ring-1 ring-primary/15">
                  <div className="absolute inset-y-0 left-0 w-1 rounded-l-md bg-primary/40" />
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{f.label}</p>
                  <p className="font-medium text-foreground">{f.value}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-center text-[10px] text-muted-foreground">— end of extracted region —</p>
          </div>
        </div>

        <div className="space-y-6">
          <VerdictBanner verdict="trusted" headline="All 8 fields extracted & cross-validated." detail="Stamp matches issuance window. NIN, BVN and bureau ref. align with registry." />
          <div className="surface-card p-5">
            <SectionTitle eyebrow="Per-field confidence" title="Extraction quality" />
            <div className="space-y-3">
              {ocrFields.map((f, i) => (
                <ConfidenceMeter key={i} value={f.confidence} label={f.label} hint={f.value} />
              ))}
            </div>
          </div>
          <div className="surface-card p-5">
            <SectionTitle eyebrow="Cross-checks" title="What the model verified" />
            <ul className="space-y-2 text-sm">
              {recommendationsForDoc.map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-foreground"><CheckCircle2 className="mt-0.5 h-4 w-4 text-success" /> {r}</li>
              ))}
            </ul>
          </div>
          <div className="surface-card p-5">
            <SectionTitle eyebrow="Pipeline" title="OCR reasoning trace" />
            <ReasoningTrace steps={[
              { label: "Document fingerprint", detail: "Hash matches Bureau template v2024." },
              { label: "Layout detection", detail: "Identified 4 regions: header, body, stamp, signature." },
              { label: "Field-level OCR", detail: "Tesseract + LayoutLMv3 ensemble · 99.1% char accuracy." },
              { label: "Schema validation", detail: "All 8 fields conform to expected types." },
              { label: "Registry cross-check", detail: "Bureau ref. LSLB-2024-00831 confirmed valid." },
            ]} />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
