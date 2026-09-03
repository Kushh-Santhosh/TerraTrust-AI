import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — TerraTrust AI" }] }),
  component: () => (
    <AppShell title="Settings" subtitle="Preferences, security, and integrations.">
      <div className="grid gap-6">
        {[
          { t: "Notifications", rows: [
            ["Verification updates", "Email me when a property's verification status changes.", true],
            ["Community attestations", "Notify me when neighbors attest a property I track.", true],
            ["Dispute alerts", "Immediately alert me on any new dispute.", true],
            ["Weekly digest", "A summary of trust score changes every Monday.", false],
          ]},
          { t: "Security", rows: [
            ["Two-factor auth", "Require a code from your authenticator app on sign-in.", true],
            ["Biometric login", "Use Face/Touch ID on supported devices.", false],
            ["Session timeout", "Sign me out after 30 minutes of inactivity.", true],
          ]},
          { t: "Integrations", rows: [
            ["Government registry sync", "Push verified passports to local land bureau.", true],
            ["Bank lookup API", "Allow partner banks to verify passports.", false],
            ["Surveyor marketplace", "Receive quotes from certified surveyors.", true],
          ]},
        ].map(section => (
          <div key={section.t} className="surface-card p-6">
            <p className="font-medium">{section.t}</p>
            <Separator className="my-4" />
            <div className="grid gap-5">
              {section.rows.map(([t, d, on]) => (
                <div key={t as string} className="flex items-start justify-between gap-6">
                  <div><Label className="text-sm font-medium">{t}</Label><p className="text-xs text-muted-foreground">{d}</p></div>
                  <Switch defaultChecked={on as boolean} />
                </div>
              ))}
            </div>
          </div>
        ))}
        <Button className="w-fit">Save preferences</Button>
      </div>
    </AppShell>
  ),
});
