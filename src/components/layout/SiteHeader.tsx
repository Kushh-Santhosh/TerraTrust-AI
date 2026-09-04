import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { to: "/#features", label: "Platform" },
  { to: "/#how", label: "How it works" },
  { to: "/#impact", label: "Impact" },
  { to: "/#faq", label: "FAQ" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-6">
        <Link to="/">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.to}
              href={l.to}
              className="text-sm text-muted-foreground transition hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Link to="/login">
            <Button variant="ghost" size="sm">
              Sign in
            </Button>
          </Link>
          <Link to="/register">
            <Button size="sm" className="rounded-full px-4">
              Get started
            </Button>
          </Link>
        </div>
        <button className="md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border bg-background px-6 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {links.map((l) => (
              <a key={l.to} href={l.to} className="text-sm text-foreground">
                {l.label}
              </a>
            ))}
            <Link to="/login" className="text-sm">
              Sign in
            </Link>
            <Link to="/register">
              <Button size="sm" className="w-full">
                Get started
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
