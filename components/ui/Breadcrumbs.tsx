import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type Crumb = {
  label: string;
  href?: string;
};

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((crumb, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={`${crumb.label}-${i}`} className="flex items-center gap-1.5">
              {crumb.href && !isLast ? (
                <Link
                  href={crumb.href}
                  className="font-sans text-sm font-bold text-ink/50 transition-colors hover:text-forest"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className="font-sans text-sm font-extrabold text-ink/80"
                >
                  {crumb.label}
                </span>
              )}
              {!isLast ? <ChevronRight size={14} className="text-ink/30" /> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}