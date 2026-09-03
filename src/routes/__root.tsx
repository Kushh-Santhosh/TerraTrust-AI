import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { Toaster } from "@/components/ui/sonner";
import { DemoModeProvider } from "@/lib/demo-mode";
import { AuthProvider, roleHome, useAuth } from "@/lib/auth";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 hero-gradient">
      <div className="surface-card max-w-md p-10 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Error 404
        </p>
        <h1 className="font-display mt-3 text-6xl text-foreground">Page not found</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition hover:opacity-90"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="surface-card max-w-md p-8 text-center">
        <h1 className="font-display text-3xl text-foreground">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          We hit an unexpected issue. Try again or head back home.
        </p>
        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Try again
          </button>
          <a href="/" className="rounded-md border border-input px-4 py-2 text-sm font-medium">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "TerraTrust AI — Digital Property Trust Platform" },
      {
        name: "description",
        content:
          "AI-powered digital identity for every property. Trust, transparency, and verification for land ownership — built for governments, citizens, surveyors, and banks.",
      },
      { name: "author", content: "TerraTrust AI" },
      { property: "og:title", content: "TerraTrust AI — Digital Property Trust Platform" },
      {
        property: "og:description",
        content:
          "An AI-powered Property Passport for every parcel. Verify ownership, value, boundaries, and trust.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <DemoModeProvider>
          <AuthGate />
          <Toaster position="top-right" />
        </DemoModeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

const publicPaths = [
  "/",
  "/login",
  "/register",
  "/forgot-password",
  "/about",
  "/contact",
  "/pricing",
  "/privacy",
  "/terms",
  "/developers",
  "/impact",
  "/changelog",
  "/partners",
  "/mobile",
];

function AuthGate() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const router = useRouter();
  const { user, profile, loading, configError } = useAuth();
  const isPublic = publicPaths.includes(pathname);
  const requiredRole = pathname.startsWith("/surveyor")
    ? "surveyor"
    : pathname.startsWith("/government")
      ? "officer"
      : pathname.startsWith("/verification") ||
          pathname.startsWith("/attestations") ||
          pathname.startsWith("/community")
        ? "verifier"
        : pathname.startsWith("/admin")
          ? "admin"
          : pathname.startsWith("/bank")
            ? "bank"
            : null;

  useEffect(() => {
    if (!loading && !configError && !user && !isPublic) router.navigate({ to: "/login" });
    if (!loading && user && profile && requiredRole && profile.role !== requiredRole)
      router.navigate({ to: roleHome(profile.role) as never });
  }, [configError, isPublic, loading, profile, requiredRole, router, user]);

  if (isPublic) return <Outlet />;
  if (configError)
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-6">
        <div className="surface-card max-w-lg p-8">
          <h1 className="font-display text-3xl">Configuration required</h1>
          <p className="mt-2 text-sm text-muted-foreground">{configError}</p>
        </div>
      </div>
    );
  if (loading || !user)
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-sm text-muted-foreground">
        Loading secure session…
      </div>
    );
  return <Outlet />;
}
