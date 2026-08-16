import { readingLists } from "@/lib/data";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { BookOpen } from "lucide-react";

export default function ReadingListsPage() {
  if (readingLists.length === 0) {
    return (
      <div>
        <PageHeader
          title="Reading lists"
          copy="Curated book selections for every kind of reader."
        />
        <section className="bg-ivory pb-16 lg:pb-24">
          <div className="container-site">
            <EmptyState
              title="No reading lists yet"
              copy="Check back soon for curated selections from our team."
              icon={<BookOpen size={24} />}
            />
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Reading lists"
        copy="Curated book selections for every kind of reader."
      />
      <section className="bg-ivory pb-16 lg:pb-24">
        <div className="container-site">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {readingLists.map((list) => (
              <Link
                key={list.id}
                href={`/reading-lists/${list.slug}`}
                className="group flex flex-col overflow-hidden rounded-card bg-white shadow-card transition-all duration-300 hover:shadow-lift"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={list.image}
                    alt={list.imageAlt}
                    className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-4 right-4 rounded-full bg-forest px-3.5 py-1.5 font-sans text-xs font-extrabold uppercase tracking-[0.1em] text-ivory">
                    {list.bookIds.length} books
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-xl font-extrabold tracking-tight text-ink transition-colors group-hover:text-forest">
                    {list.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 font-sans text-[15px] leading-relaxed text-ink/60">
                    {list.description}
                  </p>
                  <p className="mt-3 font-sans text-xs font-bold uppercase tracking-[0.12em] text-burgundy">
                    Curated by {list.curator}
                  </p>
                  <span className="mt-auto pt-4 inline-flex items-center gap-2 font-sans text-sm font-extrabold text-forest transition-colors group-hover:text-burgundy">
                    Explore list
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    >
                      <path
                        d="M6 3l5 5-5 5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}