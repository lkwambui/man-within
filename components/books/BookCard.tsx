import Link from "next/link";
import { Star } from "lucide-react";
import type { Book } from "@/lib/data";
import { BookCover } from "@/components/books/BookCover";
import { WishlistButton } from "@/components/ui/WishlistButton";
import { cn } from "@/lib/utils";

export function BookCard({
  book,
  fluid = false,
}: {
  book: Book;
  fluid?: boolean;
}) {
  return (
    <article className={cn(fluid ? "w-full" : "group w-full max-w-[240px] shrink-0 sm:max-w-[256px]")}>
      <div className="relative rounded-card shadow-card transition-shadow duration-300 group-hover:shadow-lift">
        <div className="relative">
          <Link href={`/books/${book.slug}`} aria-label={`View ${book.title} by ${book.author}`}>
            <BookCover book={book} className="aspect-[2/3] rounded-card" />
          </Link>
          <WishlistButton
            book={book}
            className="absolute right-3 top-3"
          />
        </div>

        <div className="rounded-b-card bg-white px-4 py-4">
          <p className="font-sans text-[11px] font-extrabold uppercase tracking-[0.12em] text-moss">
            {book.category}
          </p>
          <h3 className="mt-1 line-clamp-2 font-display text-base font-bold leading-snug text-ink">
            <Link href={`/books/${book.slug}`} className="transition-colors duration-200 hover:text-forest">
              {book.title}
            </Link>
          </h3>
          <p className="mt-1 font-sans text-sm font-semibold text-ink/60">{book.author}</p>

          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="flex items-center gap-0.5">
                <Star size={14} className="fill-burgundy text-burgundy" />
                <span className="font-sans text-sm font-bold text-ink">{book.rating.toFixed(1)}</span>
              </span>
              <span className="font-sans text-xs text-ink/40">({book.reviews.toLocaleString()})</span>
            </div>
            <p className="font-sans text-sm font-extrabold text-forest">{book.price}</p>
          </div>
        </div>
      </div>
    </article>
  );
}