import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Category } from "@/lib/data";
import { SmartImage } from "@/components/ui/SmartImage";
import { cn } from "@/lib/utils";

const accentStyles: Record<Category["accent"], string> = {
  forest: "text-forest",
  burgundy: "text-burgundy",
  sand: "text-moss",
};

export function CategoryCard({ category }: { category: Category }) {
  return (
    <article className="group overflow-hidden rounded-card bg-white shadow-card transition-shadow duration-300 hover:shadow-lift">
      <Link href={`/categories/${category.slug}`} aria-label={category.title}>
        <div className="relative overflow-hidden">
          <SmartImage
            src={category.image}
            alt={category.imageAlt}
            className="aspect-[16/11] w-full"
            imgClassName="transition-transform duration-500 group-hover:scale-[1.04]"
            sizes="(min-width: 768px) 33vw, 100vw"
          />
        </div>
      </Link>
      <div className="px-6 pb-6 pt-5">
        <h3 className={cn("font-display text-2xl font-extrabold tracking-tight", accentStyles[category.accent])}>
          <Link href={`/categories/${category.slug}`} className="transition-colors hover:text-burgundy">
            {category.title}
          </Link>
        </h3>
        <p className="mt-2 font-sans text-[15px] leading-relaxed text-ink/60">
          {category.description}
        </p>
        <Link
          href={`/categories/${category.slug}`}
          className="mt-4 inline-flex items-center gap-1.5 font-sans text-sm font-extrabold text-forest transition-colors duration-200 hover:text-burgundy"
        >
          Browse category
          <ArrowUpRight size={17} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </article>
  );
}
