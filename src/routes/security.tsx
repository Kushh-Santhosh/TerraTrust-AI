import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Pill } from "@/components/ui-ext/Scaffold";
import { Button } from "@/components/ui/button";
import { Shield, Smartphone, Key, LogOut } from "lucide-react";

export const Route = createFileRoute("/security")({
  head: () => ({ meta: [{ title: "Security — TerraTrust AI" }] }),
  component: Page,
});

const sessions = [
  { device: "MacBook Pro · Lagos", browser: "Chrome 127", at: "Active now", current: true },
  { device: "iPhone 15 · Lagos", browser: "Safari Mobile", at: "2 hours ago" },
  { device: "Windows 11 · Abuja", browser: "Edge 126", at: "Yesterday" },
];

function Page() {
  return (
    <AppShell title="Account security" subtitle="Authentication, devices, and recovery.">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="surface-card p-5">
          <div className="flex items-center gap-3"><Shield className="h-5 w-5 text-primary" /><div><p className="font-medium">Password</p><p className="text-xs text-muted-foreground">Last changed 47 days ago</p></div></div>
          <Button variant="outline" className="mt-4 w-full">Change password</Button>
        </div>
        <div className="surface-card p-5">
          <div className="flex items-center gap-3"><Smartphone className="h-5 w-5 text-primary" /><div className="flex-1"><p className="font-medium">Two-factor authentication</p><p className="text-xs text-muted-foreground">Authenticator app · Backup codes generated</p></div><Pill tone="success">Enabled</Pill></div>
          <Button variant="outline" className="mt-4 w-full">Manage 2FA</Button>
        </div>
        <div className="surface-card p-5 md:col-span-2">
          <div className="flex items-center gap-3"><Key className="h-5 w-5 text-primary" /><p className="font-medium">Active sessions</p></div>
          <div className="mt-3 space-y-2">
            {sessions.map((s, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border border-border p-3 text-sm">
                <div><p className="font-medium">{s.device}</p><p className="text-xs text-muted-foreground">{s.browser} · {s.at}</p></div>
                {s.current ? <Pill tone="success">This device</Pill> : <Button variant="ghost" size="sm"><LogOut className="h-4 w-4" /> Sign out</Button>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
