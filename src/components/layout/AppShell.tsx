import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Logo } from "@/components/brand/Logo";
import { cn } from "@/lib/utils";
import { LayoutDashboard, FileBadge, Bell, User, HelpCircle, LogOut, Search } from "lucide-react";
import { type ReactNode } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import type { Role } from "@/lib/types";
import { roleHome, roleLabels, useAuth } from "@/lib/auth";
import { useNotifications } from "@/lib/notifications";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  const { unreadCount } = useNotifications();
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
    <div className="grid min-h-screen w-full grid-cols-1 bg-background lg:grid-cols-[260px_1fr]">
      <aside className="sticky top-0 hidden h-screen border-r border-border bg-surface-elevated lg:block">
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
                      {item.to === "/notifications" && unreadCount > 0 && (
                        <span className="ml-auto rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-medium text-primary-foreground">
                          {unreadCount}
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
            <Link
              to="/notifications"
              aria-label="Notifications"
              className="relative rounded-full p-2 hover:bg-muted"
            >
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-destructive" />
              )}
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex max-w-[220px] items-center gap-2 rounded-full border border-border bg-surface px-2 py-1 pr-3 text-left outline-none focus-visible:ring-1 focus-visible:ring-ring">
                  <Avatar className="h-7 w-7 shrink-0">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                      {initials(
                        profile?.full_name ?? user?.user_metadata.full_name ?? "TerraTrust user",
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden min-w-0 md:block">
                    <span className="block truncate text-xs font-medium leading-tight">
                      {profile?.full_name ?? user?.user_metadata.full_name ?? "TerraTrust user"}
                    </span>
                    <span className="block truncate text-[10px] text-muted-foreground">
                      {roleLabels[activeRole]}
                    </span>
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuLabel className="font-normal">
                  <p className="truncate font-medium">
                    {profile?.full_name ?? user?.user_metadata.full_name ?? "TerraTrust user"}
                  </p>
                  <p className="truncate text-xs font-normal text-muted-foreground">
                    {profile?.email ?? user?.email}
                  </p>
                  <p className="mt-1 text-xs font-normal text-muted-foreground">
                    {roleLabels[activeRole]}
                  </p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile">
                    <User /> My Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/notifications">
                    <Bell /> Notifications{unreadCount > 0 ? ` (${unreadCount})` : ""}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={async (event) => {
                    event.preventDefault();
                    const result = await signOut();
                    if (!result.error) await navigate({ to: "/login" });
                  }}
                >
                  <LogOut /> Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
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
