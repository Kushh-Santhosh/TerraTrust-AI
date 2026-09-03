import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, StatusBadge } from "@/components/layout/AppShell";
import { MapMock } from "@/components/ui-ext/MapMock";
import { properties } from "@/lib/mock-data";
import { useState } from "react";
import { Layers, Filter, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/map")({
  head: () => ({ meta: [{ title: "GIS Map — TerraTrust AI" }] }),
  component: MapPage,
});

function MapPage() {
  const [sel, setSel] = useState(properties[0]);
  return (
    <AppShell title="GIS Map" subtitle="Spatial view of every parcel in your portfolio and pilot regions."
      actions={<><Button variant="outline" className="rounded-full"><Layers className="h-4 w-4" /> Layers</Button><Button className="rounded-full"><Plus className="h-4 w-4" /> Add boundary</Button></>}>
      <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
        <aside className="surface-card flex h-fit flex-col gap-3 p-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="h-9 pl-9" placeholder="Search parcels…" />
          </div>
          <Button variant="outline" size="sm"><Filter className="h-4 w-4" /> Filter parcels</Button>
          <div className="-mx-1 max-h-[480px] divide-y divide-border overflow-y-auto">
            {properties.map(p => (
              <button key={p.id} onClick={() => setSel(p)} className={`flex w-full flex-col items-start gap-1 px-3 py-3 text-left text-sm hover:bg-muted ${sel.id === p.id ? "bg-primary/5" : ""}`}>
                <div className="flex w-full items-center justify-between">
                  <p className="font-medium">{p.title}</p>
                  <StatusBadge status={p.status} />
                </div>
                <p className="text-xs text-muted-foreground">{p.passportId} · {p.region}</p>
              </button>
            ))}
          </div>
        </aside>

        <div className="grid gap-4">
          <MapMock properties={properties} highlightId={sel.id} onSelect={setSel} height={560} />
          <div className="surface-card flex items-center justify-between p-4">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Selected parcel</p>
              <p className="font-display text-xl">{sel.title}</p>
              <p className="text-xs text-muted-foreground">{sel.coords.lat.toFixed(4)}, {sel.coords.lng.toFixed(4)} · {sel.area.toLocaleString()} m²</p>
            </div>
            <Link to="/properties/$id" params={{ id: sel.id }}><Button>Open passport</Button></Link>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
