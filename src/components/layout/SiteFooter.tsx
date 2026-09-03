import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/brand/Logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface-elevated">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            The AI-powered Digital Property Trust Platform. A passport for every parcel.
          </p>
        </div>
        <FooterCol title="Platform" items={[["Property Passport", "/properties"], ["GIS Map", "/map"], ["AI Valuation", "/valuation"], ["Verification", "/verification"]]} />
        <FooterCol title="For" items={[["Citizens", "/dashboard"], ["Surveyors", "/surveyor"], ["Government", "/government"], ["Banks (coming)", "/#"]]} />
        <FooterCol title="Company" items={[["Help center", "/help"], ["Privacy", "/#"], ["Terms", "/#"], ["Contact", "/#contact"]]} />
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-6 py-5 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} TerraTrust AI. All rights reserved.</p>
          <p>Built for governments, citizens, surveyors, and banks.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: [string, string][] }) {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">{title}</h4>
      <ul className="mt-4 space-y-2">
        {items.map(([label, href]) => (
          <li key={label}>
            <Link to={href} className="text-sm text-muted-foreground transition hover:text-foreground">{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
