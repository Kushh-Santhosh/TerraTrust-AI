import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Field } from "@/components/ui-ext/Scaffold";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";

export const Route = createFileRoute("/feedback")({
  head: () => ({ meta: [{ title: "Feedback — TerraTrust AI" }] }),
  component: Page,
});

function Page() {
  return (
    <AppShell title="Send feedback" subtitle="What's working, what isn't, and what we should build next.">
      <div className="surface-card grid gap-4 p-6 md:grid-cols-2">
        <div className="md:col-span-2 flex items-center gap-2">
          <p className="text-sm">How would you rate TerraTrust today?</p>
          <div className="flex">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-5 w-5 cursor-pointer text-warning-foreground" />)}</div>
        </div>
        <Field label="What's working"><Textarea rows={4} placeholder="Tell us what you love" /></Field>
        <Field label="What needs work"><Textarea rows={4} placeholder="Where do we fall short?" /></Field>
        <Field label="Feature wishlist"><Input placeholder="One feature that would change everything" /></Field>
        <Field label="Email (optional)"><Input placeholder="if you'd like a reply" /></Field>
        <div className="md:col-span-2 flex justify-end gap-2">
          <Link to="/dashboard"><Button variant="outline">Cancel</Button></Link>
          <Button>Send feedback</Button>
        </div>
      </div>
    </AppShell>
  );
}
