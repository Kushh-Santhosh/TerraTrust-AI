import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: "Reset password — TerraTrust AI" }] }),
  component: () => (
    <AuthLayout
      title="Reset your password"
      subtitle="We'll email you a secure link to choose a new one."
      footer={<>Remembered it? <Link to="/login" className="font-medium text-primary">Sign in</Link></>}
    >
      <form onSubmit={(e) => { e.preventDefault(); toast.success("Reset link sent to your inbox."); }} className="grid gap-4">
        <div className="grid gap-2"><Label>Email</Label><Input type="email" className="h-11" placeholder="you@email.com" /></div>
        <Button type="submit" className="h-11">Send reset link</Button>
      </form>
    </AuthLayout>
  ),
});
