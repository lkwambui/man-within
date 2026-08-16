import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { books } from "@/lib/data";
import { BookCarousel } from "@/components/books/BookCarousel";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FeaturedBooks() {
  return (
    <section id="books" className="bg-sand">
      <div className="container-site py-16 lg:py-20">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            kicker="Featured books"
            title="Your next read"
            copy="Books selected to inspire, challenge and stay with you."
          />
          <Link
            href="#books"
            className="group mb-1 inline-flex shrink-0 items-center gap-2 font-sans text-sm font-extrabold text-burgundy transition-colors hover:text-burgundy-dark"
          >
            Browse all books
            <ArrowRight size={17} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-10">
          <BookCarousel books={books} />
        </div>
      </div>
    </section>
  );
}