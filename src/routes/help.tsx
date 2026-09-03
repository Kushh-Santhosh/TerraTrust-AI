import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Search, BookOpen, MessageSquare, LifeBuoy } from "lucide-react";

export const Route = createFileRoute("/help")({
  head: () => ({ meta: [{ title: "Help center — TerraTrust AI" }] }),
  component: () => (
    <AppShell title="Help center" subtitle="Guides, answers, and a way to reach a human.">
      <div className="surface-card relative overflow-hidden p-8 hero-gradient">
        <h2 className="font-display text-3xl">How can we help, Amara?</h2>
        <div className="relative mt-4 max-w-xl">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input className="h-11 pl-9 bg-surface" placeholder="Search articles, like 'upload deed' or 'trust score'" />
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {[
          { i: BookOpen, t: "Getting started", d: "Set up your first Property Passport in under 10 minutes." },
          { i: MessageSquare, t: "Verification", d: "How attestations, OCR, and trust scoring work." },
          { i: LifeBuoy, t: "Disputes & escalation", d: "What to do when a parcel is contested." },
        ].map(g => (
          <div key={g.t} className="surface-card p-5">
            <g.i className="h-5 w-5 text-primary" />
            <p className="mt-3 font-medium">{g.t}</p>
            <p className="mt-1 text-sm text-muted-foreground">{g.d}</p>
          </div>
        ))}
      </div>

      <p className="mt-10 mb-3 text-sm font-medium">Frequently asked</p>
      <Accordion type="single" collapsible className="surface-card divide-y divide-border p-2">
        {[
          ["How do I upload a deed?", "Open the property, go to Documents, then click Upload. Supported formats: PDF, JPG, PNG."],
          ["What does my trust score mean?", "It's a 0–100 explainable score combining documents, GIS, community attestations, taxes, and conflict checks."],
          ["Why is my property pending?", "Pending means at least one verification source (document, boundary, or attestation) hasn't completed yet."],
          ["How is data protected?", "Records are cryptographically signed; access is role-based; every change is auditable."],
        ].map(([q,a], i) => (
          <AccordionItem key={i} value={`q${i}`} className="border-0 px-4">
            <AccordionTrigger className="text-left">{q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </AppShell>
  ),
});
