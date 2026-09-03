import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, TrendingUp, Info } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { valuationTrend } from "@/lib/mock-data";

export const Route = createFileRoute("/valuation")({
  head: () => ({ meta: [{ title: "AI Valuation — TerraTrust AI" }] }),
  component: ValuationPage,
});

function ValuationPage() {
  return (
    <AppShell title="AI Property Valuation" subtitle="Defensible, explainable land values backed by comparables, geography, and macro signals.">
      <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
        <div className="surface-card p-6">
          <div className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" /><p className="font-medium">Estimate a property</p></div>
          <form className="mt-5 grid gap-4">
            <div className="grid gap-2"><Label>Region</Label>
              <Select defaultValue="lagos"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>
                <SelectItem value="lagos">Lagos</SelectItem><SelectItem value="abuja">Abuja</SelectItem><SelectItem value="oyo">Oyo</SelectItem><SelectItem value="kaduna">Kaduna</SelectItem>
              </SelectContent></Select></div>
            <div className="grid gap-2"><Label>Property type</Label>
              <Select defaultValue="residential"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>
                <SelectItem value="residential">Residential</SelectItem><SelectItem value="agricultural">Agricultural</SelectItem><SelectItem value="commercial">Commercial</SelectItem><SelectItem value="industrial">Industrial</SelectItem>
              </SelectContent></Select></div>
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-2"><Label>Area (m²)</Label><Input defaultValue="540" /></div>
              <div className="grid gap-2"><Label>Year acquired</Label><Input defaultValue="2019" /></div>
            </div>
            <Button className="mt-2"><Sparkles className="h-4 w-4" /> Run valuation</Button>
          </form>
        </div>

        <div className="grid gap-4">
          <div className="surface-card relative overflow-hidden p-6">
            <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
            <p className="text-xs uppercase tracking-wider text-muted-foreground">AI valuation result</p>
            <div className="mt-2 flex flex-wrap items-end gap-4">
              <p className="font-display text-6xl">$285,000</p>
              <span className="mb-2 inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-xs text-success"><TrendingUp className="h-3 w-3" /> +9.2% YoY</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">95% confidence interval · $268k – $302k</p>
            <div className="mt-6 h-44">
              <ResponsiveContainer>
                <AreaChart data={valuationTrend}>
                  <defs><linearGradient id="vp" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="oklch(0.45 0.08 195)" stopOpacity={0.45}/><stop offset="100%" stopColor="oklch(0.45 0.08 195)" stopOpacity={0}/></linearGradient></defs>
                  <XAxis dataKey="year" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "oklch(0.5 0.018 255)" }} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "oklch(0.5 0.018 255)" }} unit="k" />
                  <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
                  <Area type="monotone" dataKey="value" stroke="oklch(0.45 0.08 195)" strokeWidth={2} fill="url(#vp)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="surface-card p-6">
            <p className="font-medium">What drives this valuation?</p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {[
                ["Local comparables", "+$112k", "From 28 nearby transactions in the last 24 months."],
                ["Infrastructure quality", "+$48k", "Paved access, water, grid power."],
                ["Macro & FX adjustment", "-$12k", "Inflation and currency effects, last 12 months."],
                ["Zoning & permitted use", "+$22k", "Mixed-use residential overlay."],
              ].map(([t, v, d]) => (
                <div key={t} className="rounded-lg border border-border p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{t}</p>
                    <span className={`text-xs font-medium ${v.startsWith("-") ? "text-destructive" : "text-success"}`}>{v}</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{d}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground"><Info className="h-3.5 w-3.5" /> Every TerraTrust valuation ships with a full explainability report.</p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
