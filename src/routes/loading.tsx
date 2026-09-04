import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Skeleton } from "@/components/ui-ext/Scaffold";

export const Route = createFileRoute("/loading")({
  head: () => ({ meta: [{ title: "Loading — TerraTrust AI" }] }),
  component: Page,
});

function Page() {
  return (
    <AppShell title="Loading state" subtitle="Skeletons used while data is being fetched.">
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="surface-card p-4">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="mt-3 h-8 w-24" />
            <Skeleton className="mt-2 h-3 w-32" />
          </div>
        ))}
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="surface-card p-5 lg:col-span-2">
          <Skeleton className="h-5 w-40" />
          <div className="mt-4 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-3 w-1/3" />
                  <Skeleton className="h-3 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="surface-card p-5">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="mt-4 h-44 w-full" />
        </div>
      </div>
    </AppShell>
  );
}
