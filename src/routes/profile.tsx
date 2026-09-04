import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck } from "lucide-react";
import { roleLabels, useAuth } from "@/lib/auth";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — TerraTrust AI" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  const { user, profile, saveProfile } = useAuth();
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);
    setBusy(true);
    const form = new FormData(event.currentTarget);
    const result = await saveProfile({
      full_name: String(form.get("fullName")),
      region: String(form.get("region")),
    });
    setBusy(false);
    setMessage(result.error ?? "Profile saved.");
  };
  const name = profile?.full_name ?? user?.user_metadata.full_name ?? "TerraTrust user";
  return (
    <AppShell title="Profile" subtitle="Your identity, verification status, and contact info.">
      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <div className="surface-card flex flex-col items-center p-6 text-center">
          <Avatar className="h-24 w-24">
            <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-2xl text-primary-foreground">
              {name
                .split(" ")
                .map((part) => part[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <p className="mt-4 font-display text-2xl">{name}</p>
          <p className="text-sm text-muted-foreground">
            {roleLabels[profile?.role ?? "citizen"]} · {profile?.region ?? "Region not set"}
          </p>
          <div className="mt-4 inline-flex items-center gap-1 rounded-full bg-success/10 px-3 py-1 text-xs text-success">
            <ShieldCheck className="h-3 w-3" /> Identity verified
          </div>
        </div>
        <div className="surface-card p-6">
          <p className="font-medium">Account information</p>
          <form onSubmit={submit} className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label>Full name</Label>
              <Input name="fullName" required defaultValue={name} />
            </div>
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input readOnly value={user?.email ?? ""} />
            </div>
            <div className="grid gap-2">
              <Label>Region</Label>
              <Input name="region" defaultValue={profile?.region ?? ""} />
            </div>
            {message && (
              <p
                className={`text-sm ${message === "Profile saved." ? "text-success" : "text-destructive"}`}
              >
                {message}
              </p>
            )}
            <div className="md:col-span-2">
              <Button disabled={busy}>{busy ? "Saving…" : "Save changes"}</Button>
            </div>
          </form>
        </div>
      </div>
    </AppShell>
  );
}
