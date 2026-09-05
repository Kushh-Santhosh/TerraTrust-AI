import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
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
  const { signIn, updatePassword, session, configError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [recovery, setRecovery] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [recoverySuccess, setRecoverySuccess] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setRecovery(params.get("recovery") === "1");
    setConfirmed(params.get("confirmed") === "1");
  }, []);

  const updatePasswordSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setBusy(true);
    const result = await updatePassword(newPassword);
    setBusy(false);
    if (result.error) setError(result.error);
    else setRecoverySuccess(true);
  };
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
      {recovery && session ? (
        <form onSubmit={updatePasswordSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label>New password</Label>
            <Input
              type="password"
              required
              minLength={8}
              className="h-11"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label>Confirm password</Label>
            <Input
              type="password"
              required
              minLength={8}
              className="h-11"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </div>
          {(error || configError) && (
            <p className="text-sm text-destructive">{error ?? configError}</p>
          )}
          {recoverySuccess && (
            <p className="text-sm text-success">Password updated successfully.</p>
          )}
          {recoverySuccess ? (
            <Link to="/login" className="text-center text-sm font-medium text-primary">
              Continue to sign in
            </Link>
          ) : (
            <Button type="submit" className="h-11" disabled={busy}>
              {busy ? "Updating…" : "Update password"}
            </Button>
          )}
        </form>
      ) : (
        <form onSubmit={submit} className="grid gap-4">
          {confirmed && (
            <p className="text-sm text-success">Email confirmed. You can now sign in.</p>
          )}
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
      )}
    </AuthLayout>
  );
}
