import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Logo } from "@/components/brand/Logo";
import { cn } from "@/lib/utils";
import { LayoutDashboard, FileBadge, Bell, User, HelpCircle, LogOut, Search } from "lucide-react";
import { type ReactNode } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { notifications } from "@/lib/mock-data";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import type { Role } from "@/lib/types";
import { roleLabels, useAuth } from "@/lib/auth";

const navByRole: Record<
  Role,
  { group: string; items: { to: string; label: string; icon: typeof LayoutDashboard }[] }[]
> = {
  citizen: [
    {
      group: "Workspace",
      items: [
        { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { to: "/properties", label: "My Properties", icon: FileBadge },
      ],
    },
    {
      group: "Account",
      items: [
        { to: "/notifications", label: "Notifications", icon: Bell },
        { to: "/profile", label: "Profile", icon: User },
        { to: "/help", label: "Help", icon: HelpCircle },
      ],
    },
  ],
  surveyor: [
    {
      group: "Workspace",
      items: [
        { to: "/surveyor", label: "Dashboard", icon: LayoutDashboard },
        { to: "/surveyor/assignments", label: "Assignments", icon: FileBadge },
      ],
    },
    {
      group: "Account",
      items: [
        { to: "/notifications", label: "Notifications", icon: Bell },
        { to: "/profile", label: "Profile", icon: User },
        { to: "/help", label: "Help", icon: HelpCircle },
      ],
    },
  ],
  officer: [
    {
      group: "Workspace",
      items: [
        { to: "/government", label: "Dashboard", icon: LayoutDashboard },
        { to: "/government/disputes", label: "Review Queue", icon: FileBadge },
      ],
    },
    {
      group: "Account",
      items: [
        { to: "/notifications", label: "Notifications", icon: Bell },
        { to: "/profile", label: "Profile", icon: User },
        { to: "/help", label: "Help", icon: HelpCircle },
      ],
    },
  ],
  verifier: [
    {
      group: "Workspace",
      items: [
        { to: "/verification", label: "Dashboard", icon: LayoutDashboard },
        { to: "/community", label: "Verification Requests", icon: FileBadge },
      ],
    },
    {
      group: "Account",
      items: [
        { to: "/notifications", label: "Notifications", icon: Bell },
        { to: "/profile", label: "Profile", icon: User },
        { to: "/help", label: "Help", icon: HelpCircle },
      ],
    },
  ],
  admin: [
    {
      group: "Workspace",
      items: [
        { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
        { to: "/admin/users", label: "Users", icon: User },
        { to: "/admin/audit", label: "Audit / Activity", icon: FileBadge },
      ],
    },
    {
      group: "Account",
      items: [
        { to: "/profile", label: "Profile", icon: User },
        { to: "/help", label: "Help", icon: HelpCircle },
      ],
    },
  ],
  bank: [
    {
      group: "Workspace",
      items: [
        { to: "/bank", label: "Dashboard", icon: LayoutDashboard },
        { to: "/bank", label: "Shared Passports", icon: FileBadge },
      ],
    },
    {
      group: "Account",
      items: [
        { to: "/notifications", label: "Notifications", icon: Bell },
        { to: "/profile", label: "Profile", icon: User },
        { to: "/help", label: "Help", icon: HelpCircle },
      ],
    },
  ],
};

export function AppShell({
  children,
  title,
  subtitle,
  actions,
}: {
  children: ReactNode;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const unread = notifications.filter((n) => !n.read).length;
  const { profile, user, signOut } = useAuth();
  const role = profile?.role ?? "citizen";
  const routeRole = pathname.startsWith("/surveyor")
    ? "surveyor"
    : pathname.startsWith("/government")
      ? "officer"
      : pathname.startsWith("/verification") || pathname.startsWith("/attestations")
        ? "verifier"
        : pathname.startsWith("/admin")
          ? "admin"
          : pathname.startsWith("/bank")
            ? "bank"
            : null;
  const activeRole = routeRole ?? role;
  const nav = navByRole[activeRole];

  return (
    <div className="grid min-h-screen w-full grid-cols-[260px_1fr] bg-background">
      <aside className="sticky top-0 h-screen border-r border-border bg-surface-elevated">
        <div className="flex h-16 items-center px-5">
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <nav className="flex h-[calc(100vh-4rem-3.5rem)] flex-col gap-6 overflow-y-auto px-3 py-3">
          {nav.map((group) => (
            <div key={group.group}>
              <p className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {group.group}
              </p>
              <div className="flex flex-col gap-0.5">
                {group.items.map((item) => {
                  const active =
                    pathname === item.to ||
                    (item.to !== "/dashboard" && pathname.startsWith(item.to));
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      className={cn(
                        "group flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition",
                        active
                          ? "bg-primary/8 text-foreground ring-1 ring-primary/15"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      )}
                    >
                      <item.icon
                        className={cn(
                          "h-4 w-4",
                          active
                            ? "text-primary"
                            : "text-muted-foreground group-hover:text-foreground",
                        )}
                      />
                      <span className="truncate">{item.label}</span>
                      {item.to === "/notifications" && unread > 0 && (
                        <span className="ml-auto rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-medium text-primary-foreground">
                          {unread}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
        <div className="border-t border-border p-3">
          <Link
            to="/login"
            onClick={async (event) => {
              event.preventDefault();
              const result = await signOut();
              if (!result.error) await navigate({ to: "/login" });
            }}
            className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-muted-foreground hover:bg-muted"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </Link>
        </div>
      </aside>

      <div className="flex min-w-0 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-background/80 px-8 backdrop-blur-xl">
          <div className="relative w-full max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="h-9 pl-9" placeholder="Search properties, passport IDs, regions…" />
          </div>
          <div className="ml-auto flex items-center gap-3">
            <Link to="/notifications" className="relative rounded-full p-2 hover:bg-muted">
              <Bell className="h-4 w-4" />
              {unread > 0 && (
                <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-destructive" />
              )}
            </Link>
            <div className="flex items-center gap-2 rounded-full border border-border bg-surface px-2 py-1 pr-3">
              <Avatar className="h-7 w-7">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  AO
                </AvatarFallback>
              </Avatar>
              <div className="hidden text-left md:block">
                <p className="text-xs font-medium leading-tight">
                  {profile?.full_name ?? user?.user_metadata.full_name ?? "TerraTrust user"}
                </p>
                <p className="text-[10px] text-muted-foreground">{roleLabels[activeRole]}</p>
              </div>
            </div>
          </div>
        </header>

        <div className="border-b border-border bg-background px-8 py-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="font-display text-4xl text-foreground">{title}</h1>
              {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
            </div>
            {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
          </div>
        </div>

        <main className="min-w-0 flex-1 px-8 py-8">{children}</main>
      </div>
    </div>
  );
}

export function StatusBadge({ status }: { status: "verified" | "pending" | "disputed" | "draft" }) {
  const map = {
    verified: { label: "Verified", cls: "bg-success/10 text-success ring-success/20" },
    pending: { label: "Pending", cls: "bg-warning/15 text-warning-foreground ring-warning/30" },
    disputed: { label: "Disputed", cls: "bg-destructive/10 text-destructive ring-destructive/30" },
    draft: { label: "Draft", cls: "bg-muted text-muted-foreground ring-border" },
  } as const;
  return (
    <Badge variant="outline" className={cn("rounded-full ring-1", map[status].cls)}>
      <span className="mr-1 h-1.5 w-1.5 rounded-full bg-current" />
      {map[status].label}
    </Badge>
  );
}
