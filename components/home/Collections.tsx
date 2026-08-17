import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { collections, type Collection } from "@/lib/data";
import { SmartImage } from "@/components/ui/SmartImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

const accentStyles: Record<Collection["accent"], { badge: string; numeral: string }> = {
  forest: { badge: "bg-forest", numeral: "text-forest" },
  burgundy: { badge: "bg-burgundy", numeral: "text-burgundy" },
  sand: { badge: "bg-moss", numeral: "text-moss" },
};

export function Collections() {
  return (
    <section id="collections" className="bg-ivory">
      <div className="container-site py-20 lg:py-28">
        <SectionHeading
          kicker="Curated collections"
          title="Curated for you"
          copy="Three places to begin: stories, ideas and the next chapter of you."
        />

        <div className="mt-12 grid gap-7 md:grid-cols-3">
          {collections.map((collection, i) => {
            const accent = accentStyles[collection.accent];
            return (
              <article
                key={collection.id}
                className="group flex flex-col overflow-hidden rounded-card bg-white shadow-card transition-shadow duration-300 hover:shadow-lift"
              >
                <div className="relative">
                  <Link href={`/collections/${collection.slug}`} aria-label={collection.title}>
                    <SmartImage
                      src={collection.image}
                      alt={collection.imageAlt}
                      className="aspect-[16/11] w-full overflow-hidden"
                      imgClassName="transition-transform duration-500 group-hover:scale-[1.04]"
                      sizes="(min-width: 768px) 33vw, 100vw"
                    />
                  </Link>
                  <span
                    className={cn(
                      "absolute -bottom-4 left-6 flex h-10 w-10 items-center justify-center rounded-full font-display text-sm font-extrabold text-ivory shadow-soft",
                      accent.badge,
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="flex flex-1 flex-col px-7 pt-8 pb-7">
                  <h3 className={cn("font-display text-2xl font-extrabold tracking-tight", accent.numeral)}>
                    {collection.title}
                  </h3>
                  <p className="mt-2.5 font-sans text-[15px] leading-relaxed text-ink/60">
                    {collection.copy}
                  </p>
                  <Link
                    href={`/collections/${collection.slug}`}
                    className="mt-5 inline-flex items-center gap-2 font-sans text-sm font-extrabold text-forest transition-colors duration-200 hover:text-burgundy"
                  >
                    {collection.cta}
                    <ArrowUpRight
                      size={17}
                      className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}