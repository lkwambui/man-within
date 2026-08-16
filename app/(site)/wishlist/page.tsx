"use client";

import { useMemo } from "react";
import Link from "next/link";
import { getBookById } from "@/lib/data";
import type { Book } from "@/lib/data";
import { useWishlist } from "@/lib/store";
import { PageHeader } from "@/components/ui/PageHeader";
import { BookCard } from "@/components/books/BookCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { WishlistButton } from "@/components/ui/WishlistButton";

export default function WishlistPage() {
  const { ids, remove } = useWishlist();

  const wishlistBooks = useMemo(
    () =>
      ids
        .map((id: string) => getBookById(id))
        .filter((b): b is Book => b !== undefined),
    [ids],
  );

  if (wishlistBooks.length === 0) {
    return (
      <div>
        <PageHeader title="My wishlist" copy="Books you have saved for later." />
        <section className="bg-ivory pb-16 lg:pb-24">
          <div className="container-site">
            <EmptyState
              icon={<BookOpen size={28} />}
              title="Your reading list is waiting"
              copy="Save books here when you find something you want to remember."
              action={
                <Button href="/books" variant="outline" className="mt-2">
                  Browse books
                </Button>
              }
            />
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="My wishlist"
        copy={`${wishlistBooks.length} ${wishlistBooks.length === 1 ? "book" : "books"} saved`}
      />
      <section className="bg-ivory pb-16 lg:pb-24">
        <div className="container-site">
          <div className="grid grid-cols-2 gap-x-5 gap-y-9 sm:grid-cols-3 lg:grid-cols-4">
            {wishlistBooks.map((book) => (
              <div key={book.id} className="relative">
                <BookCard book={book} />
                <button
                  type="button"
                  onClick={() => remove(book.id)}
                  aria-label={`Remove ${book.title} from wishlist`}
                  className="mt-3 w-full rounded-full border border-burgundy/30 bg-white px-3 py-2 font-sans text-xs font-extrabold text-burgundy transition-colors hover:bg-burgundy hover:text-ivory"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link
              href="/books"
              className="inline-flex items-center gap-2 font-sans text-sm font-bold text-forest transition-colors hover:text-burgundy"
            >
              Continue browsing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}