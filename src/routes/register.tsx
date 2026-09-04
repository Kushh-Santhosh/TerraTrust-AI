import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { roleHome, useAuth } from "@/lib/auth";
import { useState, type FormEvent } from "react";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Create account — TerraTrust AI" }] }),
  component: RegisterPage,
});

function RegisterPage() {
  const navigate = useNavigate();
  const { signUp, configError } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState(false);
  const [busy, setBusy] = useState(false);
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setBusy(true);
    const form = new FormData(event.currentTarget);
    const result = await signUp({
      email: String(form.get("email")),
      password: String(form.get("password")),
      fullName: `${form.get("firstName")} ${form.get("lastName")}`,
      role: "citizen",
      region: "Lagos",
    });
    setBusy(false);
    if (result.error) setError(result.error);
    else if (result.needsEmailConfirmation) setConfirmation(true);
    else navigate({ to: roleHome("citizen") as never });
  };
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Get a free Property Passport for your land in minutes."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-primary">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={submit} className="grid gap-4">
        <div className="relative my-1 text-center text-[11px] uppercase tracking-wider text-muted-foreground">
          <span className="bg-background px-2 relative z-10">or with email</span>
          <span className="absolute left-0 top-1/2 h-px w-full bg-border" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="grid gap-2">
            <Label>First name</Label>
            <Input name="firstName" required className="h-11" />
          </div>
          <div className="grid gap-2">
            <Label>Last name</Label>
            <Input name="lastName" required className="h-11" />
          </div>
        </div>
        <div className="grid gap-2">
          <Label>Email</Label>
          <Input name="email" type="email" required className="h-11" />
        </div>
        <div className="grid gap-2">
          <Label>Password</Label>
          <Input name="password" type="password" required minLength={8} className="h-11" />
        </div>
        {(error || configError) && (
          <p className="text-sm text-destructive">{error ?? configError}</p>
        )}
        {confirmation ? (
          <p className="text-sm text-success">
            Check your email to confirm your account, then sign in.
          </p>
        ) : (
          <Button type="submit" className="h-11" disabled={busy}>
            {busy ? "Creating account…" : "Create account"}
          </Button>
        )}
        <p className="text-center text-xs text-muted-foreground">
          By continuing you agree to our Terms and Privacy.
        </p>
      </form>
    </AuthLayout>
  );
}
