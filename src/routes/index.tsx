import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui-ext/GlassCard";
import { TrustScore } from "@/components/ui-ext/TrustScore";
import { MapMock } from "@/components/ui-ext/MapMock";
import { properties } from "@/lib/mock-data";
import {
  ShieldCheck, MapPinned, FileBadge, Sparkles, Users2, Building2,
  ScanSearch, Banknote, Globe2, ArrowRight, CheckCircle2, Star, Quote,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { StartDemoButton } from "@/lib/demo-mode";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TerraTrust AI — A digital passport for every property" },
      { name: "description", content: "AI-powered land trust platform. Verify ownership, value, boundaries, and history — for governments, citizens, surveyors, and banks." },
      { property: "og:title", content: "TerraTrust AI" },
      { property: "og:description", content: "A digital Property Passport for every parcel of land." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <Hero />
      <Trustbar />
      <Problem />
      <Solution />
      <Features />
      <HowItWorks />
      <Stats />
      <Impact />
      <Testimonials />
      <Partners />
      <FAQ />
      <Contact />
      <SiteFooter />
    </div>
  );
}

/* ----------------------------- HERO ----------------------------- */
function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 grid-bg" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 pb-20 pt-20 md:grid-cols-2 md:pt-28">
        <div className="flex flex-col justify-center">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface/80 px-3 py-1 text-xs text-muted-foreground shadow-[var(--shadow-soft)] backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
            Now piloting with 4 government land bureaus
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.05 }}
            className="font-display mt-6 text-5xl leading-[1.05] tracking-tight text-foreground md:text-7xl">
            A digital <em className="text-primary">passport</em><br /> for every parcel of land.
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 max-w-xl text-balance text-lg text-muted-foreground">
            TerraTrust AI turns fragmented, paper-based land records into verified digital identities — with AI valuation, GIS boundaries, and a community-attested trust score.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            className="mt-8 flex flex-wrap gap-3">
            <Link to="/register"><Button size="lg" className="rounded-full px-6 shadow-[var(--shadow-glow)]">Create a Property Passport <ArrowRight className="h-4 w-4" /></Button></Link>
            <StartDemoButton className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background hover:opacity-90" />
            <Link to="/dashboard"><Button size="lg" variant="ghost" className="rounded-full px-6">Skip the tour →</Button></Link>
          </motion.div>
          <div className="mt-10 grid max-w-md grid-cols-3 gap-6 text-sm">
            <Quick stat="2.4M" label="parcels indexed" />
            <Quick stat="184k" label="users onboarded" />
            <Quick stat="99.98%" label="uptime" />
          </div>
        </div>

        {/* Hero passport mock */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
          className="relative">
          <div className="absolute -inset-6 -z-10 rounded-[40px] bg-gradient-to-br from-primary/15 via-transparent to-accent/20 blur-2xl" />
          <GlassCard className="p-0">
            <div className="flex items-center justify-between border-b border-border/60 p-5">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span className="font-medium text-foreground">Property Passport</span>
                <span className="text-muted-foreground">· TT-8421-LG</span>
              </div>
              <span className="rounded-full bg-success/10 px-2 py-0.5 text-[11px] font-medium text-success ring-1 ring-success/20">Verified</span>
            </div>
            <div className="grid gap-6 p-6 sm:grid-cols-[1fr_auto]">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Owner of record</p>
                <p className="mt-1 font-display text-2xl">Amara Okonkwo</p>
                <p className="text-sm text-muted-foreground">12 Admiralty Way, Lekki Phase 1 · Lagos</p>
                <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
                  <KV k="AI valuation" v="$285,000" tone="primary" />
                  <KV k="Plot area" v="540 m²" />
                  <KV k="Type" v="Residential" />
                  <KV k="Owned since" v="Jun 2019" />
                </div>
              </div>
              <div className="flex flex-col items-center justify-center gap-2 border-l border-border/60 pl-6">
                <TrustScore value={96} size={120} />
                <span className="text-[11px] uppercase tracking-wider text-success">High trust</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 border-t border-border/60 p-4 text-xs">
              <Chip icon={CheckCircle2} label="Deed verified" />
              <Chip icon={CheckCircle2} label="Survey on file" />
              <Chip icon={CheckCircle2} label="Tax current" />
            </div>
          </GlassCard>

          {/* floating mini cards */}
          <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity }}
            className="absolute -left-6 bottom-10 hidden md:block">
            <GlassCard className="w-56 p-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground"><Sparkles className="h-3.5 w-3.5 text-accent" /> AI confidence</div>
              <div className="mt-2 font-display text-3xl">92<span className="text-base text-muted-foreground">%</span></div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-primary to-accent" />
              </div>
            </GlassCard>
          </motion.div>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 6, repeat: Infinity }}
            className="absolute -right-4 top-10 hidden md:block">
            <GlassCard className="w-52 p-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground"><MapPinned className="h-3.5 w-3.5 text-primary" /> GIS boundary</div>
              <svg viewBox="0 0 100 60" className="mt-2 h-14 w-full">
                <polygon points="10,50 25,12 70,18 88,46 60,55 30,58" fill="oklch(0.62 0.14 155 / 0.2)" stroke="oklch(0.55 0.14 155)" strokeWidth="1.4" />
                <circle cx="50" cy="35" r="2" fill="oklch(0.55 0.14 155)" />
              </svg>
            </GlassCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Quick({ stat, label }: { stat: string; label: string }) {
  return (
    <div>
      <div className="font-display text-2xl text-foreground">{stat}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}
function KV({ k, v, tone }: { k: string; v: string; tone?: "primary" }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{k}</p>
      <p className={`mt-0.5 text-sm font-medium ${tone === "primary" ? "text-primary" : "text-foreground"}`}>{v}</p>
    </div>
  );
}
function Chip({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <div className="flex items-center gap-1.5 rounded-md bg-surface px-2.5 py-1.5 text-[11px] text-muted-foreground ring-1 ring-border">
      <Icon className="h-3 w-3 text-success" /> {label}
    </div>
  );
}

/* ----------------------------- TRUSTBAR ----------------------------- */
function Trustbar() {
  const labels = ["Lagos Land Bureau", "FCT Abuja Registry", "Oyo State", "Kano GIS", "African Dev Bank", "UN-Habitat"];
  return (
    <section className="border-y border-border bg-surface-elevated/50 py-8">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">Trusted by governments and institutions</p>
        <div className="mt-5 grid grid-cols-2 gap-6 text-sm text-muted-foreground md:grid-cols-6">
          {labels.map(l => (
            <div key={l} className="flex items-center justify-center font-medium tracking-tight opacity-70">{l}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- PROBLEM ----------------------------- */
function Problem() {
  const items = [
    { t: "Fragmented records", d: "Paper deeds, scattered registries, duplicate ownership claims across overlapping authorities." },
    { t: "Fraud and forgery", d: "An estimated 30–70% of land documents in emerging markets are tampered with or duplicated." },
    { t: "Opaque valuations", d: "Communities and banks have no shared, defensible source of truth for what land is worth." },
    { t: "Invisible parcels", d: "Hundreds of millions of plots — especially rural and informal — never enter a digital system." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="grid gap-10 md:grid-cols-[1fr_2fr]">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">The problem</p>
          <h2 className="font-display mt-3 text-4xl text-foreground md:text-5xl">Land is the world's largest asset class — and the least trustworthy.</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map(i => (
            <div key={i.t} className="surface-card p-5">
              <p className="font-medium text-foreground">{i.t}</p>
              <p className="mt-1.5 text-sm text-muted-foreground">{i.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- SOLUTION ----------------------------- */
function Solution() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-surface-elevated/60 py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-2">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">The solution</p>
          <h2 className="font-display mt-3 text-4xl text-foreground md:text-5xl">One verified digital identity for every property.</h2>
          <p className="mt-5 text-lg text-muted-foreground">
            TerraTrust AI ingests documents, surveys, and community testimony to mint a tamper-evident Property Passport. AI fills the gaps. People verify the truth.
          </p>
          <ul className="mt-8 space-y-3">
            {["Tamper-evident audit trail", "AI-assisted document OCR + fraud detection", "GIS boundary capture, including informal parcels", "Community attestation network", "Open APIs for banks and government"].map(t => (
              <li key={t} className="flex items-start gap-2 text-sm text-foreground">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-success" /> {t}
              </li>
            ))}
          </ul>
        </div>
        <MapMock properties={properties} highlightId="p_001" height={520} />
      </div>
    </section>
  );
}

/* ----------------------------- FEATURES ----------------------------- */
function Features() {
  const feats = [
    { icon: FileBadge, t: "Property Passport", d: "A single digital identity for every parcel — deed, survey, valuation, history, and trust score in one place." },
    { icon: Sparkles, t: "AI Valuation", d: "Defensible, explainable land values based on comparables, geography, and macro signals." },
    { icon: MapPinned, t: "GIS Map & Boundaries", d: "Capture and verify boundaries — including informal and rural parcels — with surveyor tools." },
    { icon: ScanSearch, t: "Document AI + OCR", d: "Extract, classify, and cross-check ownership documents. Detect tampering automatically." },
    { icon: Users2, t: "Community Verification", d: "Neighborhood attestations and dispute flags from people who actually live on the land." },
    { icon: ShieldCheck, t: "Trust Score", d: "A transparent, explainable 0–100 score banks and buyers can rely on." },
    { icon: Banknote, t: "Bank-Ready APIs", d: "Lend confidently — verified collateral, automatic title checks, fraud signals." },
    { icon: Building2, t: "Government Workbench", d: "Bulk parcel ingestion, dispute resolution, and live analytics for land bureaus." },
  ];
  return (
    <section id="features" className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-12 max-w-2xl">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Platform</p>
        <h2 className="font-display mt-3 text-4xl text-foreground md:text-5xl">Everything a trustworthy land system needs.</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {feats.map(f => (
          <motion.div key={f.t} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="surface-card group p-6 transition hover:shadow-[var(--shadow-elev)]">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/15">
              <f.icon className="h-5 w-5" />
            </div>
            <p className="mt-4 font-medium text-foreground">{f.t}</p>
            <p className="mt-1.5 text-sm text-muted-foreground">{f.d}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ----------------------------- HOW IT WORKS ----------------------------- */
function HowItWorks() {
  const steps = [
    { n: "01", t: "Register the property", d: "Citizen or officer submits documents, photos, and location. OCR extracts the key fields automatically." },
    { n: "02", t: "Capture GIS boundaries", d: "Certified surveyors walk the parcel, drop boundary points, and upload validated polygons." },
    { n: "03", t: "AI valuation & checks", d: "The model values the property and flags inconsistencies — duplicate IDs, overlapping boundaries, forged seals." },
    { n: "04", t: "Community attestation", d: "Neighbors and verifiers confirm occupancy. Disputes are routed to the right authority." },
    { n: "05", t: "Passport issued", d: "A tamper-evident Property Passport is minted with a live trust score and shareable QR identity." },
  ];
  return (
    <section id="how" className="bg-surface-elevated/60 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">How it works</p>
            <h2 className="font-display mt-3 text-4xl text-foreground md:text-5xl">From paper claim to verified passport — in days.</h2>
          </div>
          <Link to="/register"><Button variant="outline" className="rounded-full">Start a passport <ArrowRight className="h-4 w-4" /></Button></Link>
        </div>
        <div className="grid gap-4 md:grid-cols-5">
          {steps.map((s, i) => (
            <motion.div key={s.n} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="surface-card relative p-5">
              <p className="font-display text-xs text-primary">{s.n}</p>
              <p className="mt-2 font-medium text-foreground">{s.t}</p>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- STATS ----------------------------- */
function Stats() {
  const items = [
    { v: "2.4M+", l: "Parcels indexed", s: "Across 6 states in pilot" },
    { v: "$1.8B", l: "Asset value verified", s: "Tied to live property passports" },
    { v: "612", l: "Disputes resolved", s: "Using GIS conflict detection" },
    { v: "4.92/5", l: "Surveyor quality", s: "Avg rating, past 12 months" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="grid gap-6 md:grid-cols-4">
        {items.map(i => (
          <div key={i.l} className="surface-card p-6">
            <p className="font-display text-5xl text-primary">{i.v}</p>
            <p className="mt-2 font-medium text-foreground">{i.l}</p>
            <p className="text-sm text-muted-foreground">{i.s}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ----------------------------- IMPACT ----------------------------- */
function Impact() {
  const groups = [
    { i: Users2, t: "For citizens", d: "Prove what you own. Defend your land. Pass it on with confidence.", b: ["Free Property Passport", "Lifetime ownership history", "Mobile attestation app"] },
    { i: Building2, t: "For governments", d: "Modernize land bureaus without ripping out legacy systems.", b: ["Bulk ingestion of paper records", "Live disputes dashboard", "Analytics for policy"] },
    { i: Banknote, t: "For banks", d: "Lend against verified collateral, not photocopied deeds.", b: ["Title verification API", "Fraud signals", "Valuation as a service"] },
    { i: Globe2, t: "For communities", d: "Bring informal and rural parcels into the formal economy.", b: ["Community verifier program", "Customary-rights friendly", "Multilingual capture"] },
  ];
  return (
    <section id="impact" className="bg-gradient-to-b from-surface-elevated/60 to-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Impact</p>
          <h2 className="font-display mt-3 text-4xl text-foreground md:text-5xl">Built for everyone who depends on land.</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {groups.map(g => (
            <div key={g.t} className="surface-card flex flex-col p-6">
              <g.i className="h-6 w-6 text-primary" />
              <p className="mt-4 font-display text-2xl">{g.t}</p>
              <p className="mt-2 text-sm text-muted-foreground">{g.d}</p>
              <ul className="mt-5 space-y-2 text-sm">
                {g.b.map(x => <li key={x} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-success" />{x}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- TESTIMONIALS ----------------------------- */
function Testimonials() {
  const items = [
    { q: "We resolved 612 disputed parcels in our first quarter on TerraTrust. The conflict-detection alone has paid for the rollout.", a: "Director, Lagos Land Bureau" },
    { q: "For the first time, our farmers can prove what they own without a lawyer. The Property Passport just works.", a: "Community organizer, Kaduna" },
    { q: "The valuation model is more rigorous than what our internal team produces. We've started lending against TerraTrust passports.", a: "Head of Mortgage, Tier-1 Bank" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-12">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Voices</p>
        <h2 className="font-display mt-3 text-4xl text-foreground md:text-5xl">What partners are saying.</h2>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {items.map(t => (
          <div key={t.a} className="surface-card flex flex-col gap-5 p-6">
            <Quote className="h-5 w-5 text-primary/60" />
            <p className="text-foreground">"{t.q}"</p>
            <div className="mt-auto flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{t.a}</span>
              <span className="flex">{Array.from({length:5}).map((_,i) => <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />)}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ----------------------------- PARTNERS ----------------------------- */
function Partners() {
  return (
    <section className="border-y border-border bg-surface-elevated/50 py-14">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Pilot partners and ecosystem</p>
        <div className="mt-6 grid grid-cols-2 gap-6 text-sm font-medium text-muted-foreground md:grid-cols-6">
          {["Lagos Land Bureau","Oyo State","Kano GIS","FCT Abuja","African Dev Bank","UN-Habitat"].map(p => (
            <div key={p} className="opacity-70">{p}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- FAQ ----------------------------- */
function FAQ() {
  const qs = [
    { q: "Who owns a Property Passport?", a: "The verified owner of record. TerraTrust AI is the infrastructure; the citizen and the relevant land authority retain ownership of the record." },
    { q: "How is the AI valuation calculated?", a: "We combine local comparables, geography, infrastructure, macro signals, and zoning. Every valuation ships with a confidence score and an explainability report." },
    { q: "What happens if a parcel is disputed?", a: "The passport status switches to 'Disputed', the timeline records the claim, and the case is routed to the appropriate land bureau with all evidence attached." },
    { q: "Does this replace the government registry?", a: "No. TerraTrust AI augments existing registries with digital, machine-readable, tamper-evident records and analytics — and bulk-imports legacy paper records." },
    { q: "Is it secure?", a: "Records are cryptographically signed, every change is auditable, and access is role-based. We run a tamper-evident change log on every passport." },
    { q: "How do informal or rural parcels work?", a: "Surveyors and community verifiers capture boundaries on foot. Customary rights are first-class — we don't require a deed to begin a passport." },
  ];
  return (
    <section id="faq" className="mx-auto max-w-4xl px-6 py-24">
      <div className="mb-10 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">FAQ</p>
        <h2 className="font-display mt-3 text-4xl text-foreground md:text-5xl">Questions, answered.</h2>
      </div>
      <Accordion type="single" collapsible className="surface-card divide-y divide-border p-2">
        {qs.map((x, i) => (
          <AccordionItem key={i} value={`q-${i}`} className="border-0 px-4">
            <AccordionTrigger className="text-left text-base font-medium">{x.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{x.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

/* ----------------------------- CONTACT ----------------------------- */
function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-24">
      <div className="absolute inset-0 hero-gradient opacity-70" />
      <div className="relative mx-auto max-w-5xl px-6">
        <div className="surface-card flex flex-col items-center gap-6 p-12 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Get in touch</p>
          <h2 className="font-display text-4xl text-foreground md:text-5xl">Bring trust to your land.</h2>
          <p className="max-w-xl text-muted-foreground">Talk to our team about a pilot for your registry, bank, or community — or create your first Property Passport today.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/register"><Button size="lg" className="rounded-full px-6">Create a passport</Button></Link>
            <a href="mailto:hello@terratrust.ai"><Button size="lg" variant="outline" className="rounded-full px-6">Contact sales</Button></a>
          </div>
        </div>
      </div>
    </section>
  );
}
