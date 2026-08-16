import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { readingLists } from "@/lib/data";
import { SmartImage } from "@/components/ui/SmartImage";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ReadingLists() {
  return (
    <section className="bg-ivory">
      <div className="container-site py-16 lg:py-24">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            kicker="Reading lists"
            title="Reading lists for every mood"
            copy="Not sure where to begin? Start with a list made by people who read for a living."
          />
          <Link
            href="/reading-lists"
            className="group mb-1 inline-flex shrink-0 items-center gap-2 font-sans text-sm font-extrabold text-burgundy transition-colors hover:text-burgundy-dark"
          >
            View all lists
            <ArrowRight size={17} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {readingLists.map((list) => (
            <article
              key={list.id}
              className="group flex h-full flex-col overflow-hidden rounded-card bg-white shadow-card transition-shadow duration-300 hover:shadow-lift"
            >
              <div className="relative overflow-hidden">
                <Link href={`/reading-lists/${list.slug}`} aria-label={list.title}>
                  <SmartImage
                    src={list.image}
                    alt={list.imageAlt}
                    className="aspect-[4/3] w-full"
                    imgClassName="transition-transform duration-500 group-hover:scale-[1.05]"
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  />
                </Link>
                <span className="absolute left-4 top-4 rounded-full bg-forest px-3 py-1.5 font-sans text-xs font-extrabold text-ivory shadow-soft">
                  {list.bookIds.length} books
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-lg font-extrabold leading-snug tracking-tight text-ink transition-colors duration-200 group-hover:text-forest">
                  <Link href={`/reading-lists/${list.slug}`}>{list.title}</Link>
                </h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-ink/60">
                  {list.copy}
                </p>
                <Link
                  href={`/reading-lists/${list.slug}`}
                  className="mt-auto inline-flex items-center gap-1.5 pt-4 font-sans text-sm font-extrabold text-burgundy transition-colors duration-200 hover:text-burgundy-dark"
                >
                  View list
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}