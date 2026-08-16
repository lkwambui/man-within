import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { cn } from "@/lib/utils";

export function PageHeader({
  title,
  copy,
  breadcrumbs,
  align = "left",
  tone = "light",
  children,
  className,
}: {
  title: string;
  copy?: string;
  breadcrumbs?: Crumb[];
  align?: "left" | "center";
  tone?: "light" | "dark" | "forest";
  children?: ReactNode;
  className?: string;
}) {
  const bg =
    tone === "forest"
      ? "bg-forest text-ivory"
      : tone === "dark"
        ? "bg-forest text-ivory"
        : "bg-ivory";

  const titleColor =
    tone === "light" ? "text-ink" : "text-ivory";
  const copyColor =
    tone === "light" ? "text-ink/60" : "text-ivory/70";

  return (
    <section className={cn(bg, className)}>
      <div className="container-site py-12 lg:py-16">
        {breadcrumbs ? (
          <div className={cn("mb-6", tone !== "light" && "[&_a]:text-ivory/50 [&_a:hover]:text-ivory [&_span]:text-ivory/80")}>
            <Breadcrumbs items={breadcrumbs} />
          </div>
        ) : null}
        <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
          <h1 className={cn("font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-tight", titleColor)}>
            {title}
          </h1>
          {copy ? (
            <p className={cn("mt-3 text-lg leading-relaxed", copyColor)}>{copy}</p>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}
