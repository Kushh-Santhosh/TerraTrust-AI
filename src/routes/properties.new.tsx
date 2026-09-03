import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Crumbs, Field, Stepper } from "@/components/ui-ext/Scaffold";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/properties/new")({
  head: () => ({ meta: [{ title: "Register property — TerraTrust AI" }] }),
  component: Page,
});

const steps = ["Basics", "Location", "Boundary", "Documents", "Review"];

function Page() {
  const [s, setS] = useState(0);
  const [title, setTitle] = useState("");
  const [area, setArea] = useState("540");
  const [region, setRegion] = useState("Lagos");
  const [address, setAddress] = useState("12 Admiralty Way, Lekki Phase 1");
  const [saving, setSaving] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const submitProperty = async () => {
    if (!user) {
      setError("You must be signed in to submit a property.");
      return;
    }
    if (!title.trim() || Number(area) <= 0 || !region.trim() || !address.trim()) {
      setError("Complete the property title, area, region, and address before submitting.");
      return;
    }
    setSaving(true);
    setError(null);
    const { error: insertError } = await supabase.from("properties").insert({
      owner_id: user.id,
      property_name: title.trim(),
      passport_id: `TT-${Date.now().toString(36).toUpperCase()}`,
      location: { region: region.trim(), address: address.trim(), country: "Nigeria" },
      area: Number(area),
      status: "pending",
      trust_score: 0,
    });
    setSaving(false);
    if (insertError) setError(insertError.message);
    else setSubmitted(true);
  };
  return (
    <AppShell
      title="Register a new property"
      subtitle="Open a Property Passport in under 5 minutes."
    >
      <Crumbs items={[{ label: "Properties", to: "/properties" }, { label: "New" }]} />
      <Stepper steps={steps} current={s} />
      <div className="surface-card p-6">
        {s === 0 && (
          <div className="space-y-4">
            <div className="grid gap-3 md:grid-cols-2">
              <Field label="Property title">
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Lekki Phase 1 Residence"
                />
              </Field>
              <Field label="Property type">
                <Input defaultValue="Residential" />
              </Field>
              <Field label="Area (sqm)">
                <Input value={area} onChange={(e) => setArea(e.target.value)} />
              </Field>
              <Field label="Estimated value (USD)">
                <Input defaultValue="280000" />
              </Field>
            </div>
            <Field label="Description">
              <Textarea rows={3} placeholder="Describe the property…" />
            </Field>
          </div>
        )}
        {s === 1 && (
          <div className="grid gap-3 md:grid-cols-2">
            <Field label="Country">
              <Input defaultValue="Nigeria" />
            </Field>
            <Field label="Region/State">
              <Input value={region} onChange={(e) => setRegion(e.target.value)} />
            </Field>
            <Field label="Address" hint="Full street address">
              <Input value={address} onChange={(e) => setAddress(e.target.value)} />
            </Field>
            <Field label="GPS coordinates">
              <Input defaultValue="6.4413, 3.4709" />
            </Field>
          </div>
        )}
        {s === 2 && (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Drag the polygon points on the map, or upload a GIS file.
            </p>
            <div className="grid h-64 place-items-center rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 text-sm text-muted-foreground">
              [ Interactive boundary editor ]
            </div>
            <Button variant="outline">Upload .geojson or .kml</Button>
          </div>
        )}
        {s === 3 && (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Upload deed, survey plan, tax clearance, and ID.
            </p>
            <div className="grid h-40 place-items-center rounded-xl border-2 border-dashed border-border bg-muted/30 text-sm text-muted-foreground">
              Drop files here or click to browse
            </div>
            <Link
              to="/properties/$id/documents"
              params={{ id: "p_001" }}
              className="text-xs text-primary"
            >
              Go to dedicated upload screen →
            </Link>
          </div>
        )}
        {s === 4 && (
          <div className="space-y-2 text-sm">
            <p className="font-medium">
              You're about to mint Property Passport <span className="font-mono">TT-XXXX-LG</span>.
            </p>
            <p className="text-muted-foreground">
              TerraTrust AI will run OCR, boundary verification, and AI valuation, then route this
              to the registry queue.
            </p>
          </div>
        )}
        {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
        {submitted && (
          <p className="mt-4 text-sm text-success">
            Property submitted to your account. It is now pending verification.
          </p>
        )}
        <div className="mt-6 flex justify-between">
          <Button variant="outline" onClick={() => setS(Math.max(0, s - 1))} disabled={s === 0}>
            Back
          </Button>
          {s < steps.length - 1 ? (
            <Button onClick={() => setS(s + 1)}>Continue</Button>
          ) : (
            <Button onClick={submitProperty} disabled={saving || submitted}>
              {saving ? "Submitting…" : submitted ? "Submitted" : "Submit property"}
            </Button>
          )}
        </div>
      </div>
    </AppShell>
  );
}
