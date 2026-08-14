import { Link } from "@tanstack/react-router";

type Crumb = { label: string; to?: string };

export function PageBreadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
      {items.map((item, i) => {
        const last = i === items.length - 1;
        return (
          <span key={i}>
            {i > 0 ? <span className="px-2">/</span> : null}
            {last || !item.to ? (
              <span className={last ? "text-foreground" : undefined}>{item.label}</span>
            ) : (
              <Link to={item.to} className="hover:text-gold">
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
