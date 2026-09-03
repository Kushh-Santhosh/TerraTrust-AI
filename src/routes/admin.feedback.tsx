import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { KpiRow, Pill } from "@/components/ui-ext/Scaffold";
import { Star } from "lucide-react";

export const Route = createFileRoute("/admin/feedback")({
  head: () => ({ meta: [{ title: "Feedback — Admin" }] }),
  component: Page,
});

const items = [
  { name: "Tunde A.", role: "Citizen", rating: 5, text: "The Property Passport got my Lekki place verified in 4 days. Wild.", at: "2024-09-23" },
  { name: "Surveyor I. A.", role: "Surveyor", rating: 4, text: "The mobile GeoJSON uploader is fast but I'd love offline mode.", at: "2024-09-22" },
  { name: "K. Bello", role: "Officer", rating: 5, text: "Dispute mediation queue cut our backlog by 60% this quarter.", at: "2024-09-20" },
  { name: "M. Yusuf", role: "Citizen", rating: 3, text: "Trust score logic isn't clear enough. Needs a plain-language explanation.", at: "2024-09-19" },
];

function Page() {
  return (
    <AppShell title="User feedback" subtitle="What the field is saying.">
      <KpiRow items={[
        { label: "NPS", value: "62", hint: "+8 vs last quarter" },
        { label: "Avg. rating", value: "4.6 / 5" },
        { label: "Responses (30d)", value: "8,412" },
        { label: "Action items open", value: "23" },
      ]} />
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {items.map((f, i) => (
          <div key={i} className="surface-card p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium">{f.name}</p>
                <Pill tone="info">{f.role}</Pill>
              </div>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, j) => <Star key={j} className={`h-4 w-4 ${j < f.rating ? "fill-warning text-warning-foreground" : "text-muted-foreground"}`} />)}
              </div>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">"{f.text}"</p>
            <p className="mt-2 text-[11px] text-muted-foreground">{f.at}</p>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
