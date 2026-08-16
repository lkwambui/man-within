import { collections } from "@/lib/data";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";

export default function CollectionsPage() {
  return (
    <div>
      <PageHeader
        title="Curated collections"
        copy="Thoughtfully selected books for every kind of reader."
      />
      <section className="bg-ivory pb-16 lg:pb-24">
        <div className="container-site">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {collections.map((col) => (
              <Link
                key={col.id}
                href={`/collections/${col.slug}`}
                className="group relative flex h-80 flex-col justify-end overflow-hidden rounded-card shadow-card transition-all duration-300 hover:shadow-lift"
              >
                <img
                  src={col.image}
                  alt={col.imageAlt}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/30 to-transparent" />
                <div className="relative p-7 lg:p-9">
                  <span className="inline-flex rounded-full bg-white/15 px-3 py-1 font-sans text-xs font-extrabold uppercase tracking-[0.1em] text-ivory backdrop-blur-sm">
                    {col.bookIds.length} books
                  </span>
                  <h3 className="mt-3 font-display text-2xl font-extrabold tracking-tight text-ivory lg:text-3xl">
                    {col.title}
                  </h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-ivory/75 line-clamp-2">
                    {col.description}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 font-sans text-sm font-extrabold text-ivory transition-transform duration-200 group-hover:translate-x-1">
                    Explore collection
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden="true"
                    >
                      <path
                        d="M6 3l5 5-5 5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}