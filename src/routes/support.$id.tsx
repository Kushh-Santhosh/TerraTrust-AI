import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Crumbs, Pill } from "@/components/ui-ext/Scaffold";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/support/$id")({
  head: () => ({ meta: [{ title: "Ticket — TerraTrust AI" }] }),
  component: Page,
});

const thread = [
  { who: "You", at: "2024-09-23 10:02", text: "Trying to upload a 14MB Survey Plan and the upload stalls at 78%. Tried Chrome and Safari." },
  { who: "TerraTrust Support · Joy", at: "2024-09-23 10:48", text: "Hi Amara — thanks for the report. We just rolled out a fix for files over 12MB. Could you retry and let us know?" },
  { who: "You", at: "2024-09-23 13:12", text: "Worked this time — uploaded in 11 seconds. Thanks!" },
];

function Page() {
  const { id } = Route.useParams();
  return (
    <AppShell title="Cannot upload Survey Plan PDF over 12MB" subtitle={`${id} · Documents · Medium priority`}>
      <Crumbs items={[{ label: "Support", to: "/support" }, { label: id }]} />
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="surface-card space-y-4 p-6 lg:col-span-2">
          {thread.map((m, i) => (
            <div key={i} className={`rounded-2xl p-4 ${i % 2 === 0 ? "bg-muted/40" : "bg-primary/5 ring-1 ring-primary/10"}`}>
              <div className="flex items-center justify-between text-xs text-muted-foreground"><span className="font-medium text-foreground">{m.who}</span><span>{m.at}</span></div>
              <p className="mt-2 text-sm">{m.text}</p>
            </div>
          ))}
          <div className="space-y-2 border-t border-border pt-4">
            <Textarea rows={3} placeholder="Reply…" />
            <div className="flex justify-end"><Button>Send reply</Button></div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="surface-card p-5"><p className="text-xs font-medium text-muted-foreground">Status</p><div className="mt-2"><Pill tone="warning">Open</Pill></div></div>
          <div className="surface-card p-5"><p className="text-xs font-medium text-muted-foreground">Assigned</p><p className="mt-2 text-sm">Joy O. (Support T1)</p></div>
          <div className="surface-card p-5"><p className="text-xs font-medium text-muted-foreground">SLA</p><p className="mt-2 text-sm">Responds in 90 min</p></div>
        </div>
      </div>
    </AppShell>
  );
}
