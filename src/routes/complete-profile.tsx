import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { roleHome, useAuth } from "@/lib/auth";
import { useState } from "react";

export const Route = createFileRoute("/complete-profile")({
  head: () => ({ meta: [{ title: "Complete profile — TerraTrust AI" }] }),
  component: CompleteProfile,
});

function CompleteProfile() {
  const navigate = useNavigate();
  const { profile, saveProfile } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    const form = new FormData(event.currentTarget);
    const result = await saveProfile({ region: String(form.get("region")) });
    setBusy(false);
    if (result.error) setError(result.error);
    else navigate({ to: roleHome(profile?.role ?? "citizen") as never });
  };
  return (
    <AuthLayout
      title="Complete your profile"
      subtitle="A few details so authorities can verify you against records."
    >
      <form onSubmit={submit} className="grid gap-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="grid gap-2">
            <Label>Country</Label>
            <Select defaultValue="in">
              <SelectTrigger className="h-11">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="in">India</SelectItem>
                <SelectItem value="ke">Kenya</SelectItem>
                <SelectItem value="gh">Ghana</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>Region / State</Label>
            <Input name="region" required className="h-11" defaultValue="Karnataka" />
          </div>
        </div>
        <div className="grid gap-2">
          <Label>National ID number</Label>
          <Input className="h-11" placeholder="Aadhaar / PAN / etc." />
        </div>
        <div className="grid gap-2">
          <Label>Phone</Label>
          <Input className="h-11" placeholder="+91 ..." />
        </div>
        <div className="grid gap-2">
          <Label>Short bio (optional)</Label>
          <Textarea rows={3} placeholder="A few words about you" />
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button className="h-11" disabled={busy}>
          {busy ? "Saving profile…" : "Enter the platform"}
        </Button>
      </form>
    </AuthLayout>
  );
}
