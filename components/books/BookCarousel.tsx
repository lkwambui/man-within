"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import type { Book } from "@/lib/data";
import { BookCard } from "@/components/books/BookCard";

/**
 * Horizontal, keyboard-accessible book carousel with previous/next controls.
 * Scrolls one viewport of cards per click.
 */
export function BookCarousel({ books }: { books: Book[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const step = track.clientWidth * 0.8;
    track.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        tabIndex={0}
        role="region"
        aria-label="Featured books"
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 pt-1 touch-pan-x overscroll-contain scrollbar-hide"
      >
        {books.map((book) => (
          <div key={book.id} className="snap-start">
            <BookCard book={book} />
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-end gap-3">
        <button
          type="button"
          aria-label="Previous books"
          onClick={() => scrollBy(-1)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 bg-white text-forest transition-all duration-200 hover:border-forest hover:bg-forest hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy/60"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          type="button"
          aria-label="Next books"
          onClick={() => scrollBy(1)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 bg-white text-forest transition-all duration-200 hover:border-forest hover:bg-forest hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy/60"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}