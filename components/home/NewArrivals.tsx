import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { books } from "@/lib/data";
import { BookCarousel } from "@/components/books/BookCarousel";
import { SectionHeading } from "@/components/ui/SectionHeading";

const newArrivals = books.filter((b) => b.isNew);

export function NewArrivals() {
  if (newArrivals.length === 0) return null;

  return (
    <section className="bg-ivory">
      <div className="container-site py-20 lg:py-28">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            kicker="New arrivals"
            title="Fresh on the shelves"
            copy="The latest additions to the Man Within collection, freshly selected."
          />
          <Link
            href="/books?filter=new"
            className="group mb-1 inline-flex shrink-0 items-center gap-2 font-sans text-sm font-extrabold text-burgundy transition-colors hover:text-burgundy-dark"
          >
            View all new arrivals
            <ArrowRight size={17} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-10">
          <BookCarousel books={newArrivals} />
        </div>
      </div>
    </section>
  );
}