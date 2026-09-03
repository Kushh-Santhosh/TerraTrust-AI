import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { roleHome, useAuth } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — TerraTrust AI" }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const { signIn, configError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setBusy(true);
    const result = await signIn(email, password);
    setBusy(false);
    if (result.error) setError(result.error);
    else navigate({ to: roleHome(result.role ?? "citizen") as never });
  };
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Prototype access for the TerraTrust Property Passport demo."
      footer={
        <>
          Don't have an account?{" "}
          <Link to="/register" className="font-medium text-primary">
            Create one
          </Link>
        </>
      }
    >
      <form onSubmit={submit} className="grid gap-4">
        <div className="relative my-1 text-center text-[11px] uppercase tracking-wider text-muted-foreground">
          <span className="bg-background px-2 relative z-10">or with email</span>
          <span className="absolute left-0 top-1/2 h-px w-full bg-border" />
        </div>
        <div className="grid gap-2">
          <Label>Email</Label>
          <Input
            type="email"
            required
            placeholder="you@email.com"
            className="h-11"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <Label>Password</Label>
            <Link to="/forgot-password" className="text-xs text-primary">
              Forgot?
            </Link>
          </div>
          <Input
            type="password"
            required
            placeholder="••••••••"
            className="h-11"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {(error || configError) && (
          <p className="text-sm text-destructive">{error ?? configError}</p>
        )}
        <Button type="submit" className="h-11" disabled={busy}>
          {busy ? "Signing in…" : "Sign in"}
        </Button>
      </form>
    </AuthLayout>
  );
}
