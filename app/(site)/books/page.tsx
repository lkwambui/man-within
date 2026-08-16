"use client";

import { useState, useMemo } from "react";
import type { Book } from "@/lib/data";
import { PageHeader } from "@/components/ui/PageHeader";
import { BookCard } from "@/components/books/BookCard";
import { LoadMore } from "@/components/ui/LoadMore";
import {
  books as allBooks,
  bestsellers,
  newReleases,
  booksByCategory,
} from "@/lib/data";

const FILTERS = [
  { label: "All", slug: "all" },
  { label: "Bestsellers", slug: "bestsellers" },
  { label: "New Releases", slug: "new-releases" },
  { label: "African Literature", slug: "african-literature" },
  { label: "Fiction", slug: "fiction" },
  { label: "Nonfiction", slug: "nonfiction" },
  { label: "Poetry", slug: "poetry" },
  { label: "Philosophy", slug: "philosophy" },
  { label: "Biography", slug: "biography" },
  { label: "Personal Development", slug: "personal-development" },
  { label: "Business", slug: "business" },
  { label: "History", slug: "history" },
  { label: "Essays", slug: "essays" },
] as const;

type FilterSlug = (typeof FILTERS)[number]["slug"];

const SORT_OPTIONS = [
  { label: "Trending", value: "trending" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Newest", value: "newest" },
  { label: "Top Rated", value: "top-rated" },
] as const;

export default function BooksPage() {
  const [searchText, setSearchText] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterSlug>("all");
  const [sortBy, setSortBy] = useState("trending");

  const filteredBooks = useMemo(() => {
    let result: typeof allBooks;

    if (activeFilter === "bestsellers") {
      result = bestsellers;
    } else if (activeFilter === "new-releases") {
      result = newReleases;
    } else if (activeFilter !== "all") {
      result = booksByCategory(activeFilter);
    } else {
      result = [...allBooks];
    }

    if (searchText.trim()) {
      const q = searchText.trim().toLowerCase();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q),
      );
    }

    switch (sortBy) {
      case "price-asc":
        result = [...result].sort((a, b) => a.priceNumber - b.priceNumber);
        break;
      case "price-desc":
        result = [...result].sort((a, b) => b.priceNumber - a.priceNumber);
        break;
      case "newest":
        result = [...result].sort((a, b) => Number(b.year) - Number(a.year));
        break;
      case "top-rated":
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      case "trending":
      default:
        result = [...result].sort((a, b) => b.reviews - a.reviews);
        break;
    }

    return result;
  }, [activeFilter, sortBy, searchText]);

  return (
    <div>
      <PageHeader title="Books" copy="Find your next great read." />

      <section className="bg-ivory">
        <div className="container-site py-8 lg:py-10">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Search by title or author..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="w-full rounded-card border border-ink/15 bg-white px-4 py-3 font-sans text-sm text-ink placeholder:text-moss focus:border-forest focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-3">
                <label
                  htmlFor="sort-select"
                  className="font-sans text-sm font-semibold text-ink/60"
                >
                  Sort by
                </label>
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-card border border-ink/15 bg-white px-4 py-3 font-sans text-sm font-semibold text-ink focus:border-forest focus:outline-none"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {FILTERS.map((f) => (
                <button
                  key={f.slug}
                  type="button"
                  onClick={() => setActiveFilter(f.slug)}
                  className={`shrink-0 rounded-full px-5 py-2.5 font-sans text-sm font-extrabold transition-all duration-200 ${
                    activeFilter === f.slug
                      ? "bg-forest text-ivory"
                      : "bg-white text-ink/70 border border-ink/15 hover:border-forest hover:text-forest"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ivory pb-16 lg:pb-24">
        <div className="container-site">
          {filteredBooks.length > 0 ? (
            <BookGridWithLoadMore books={filteredBooks} />
          ) : (
            <div className="py-16 text-center">
              <p className="font-display text-xl font-bold text-ink/60">
                No books found
              </p>
              <p className="mt-2 font-sans text-sm text-ink/40">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function BookGridWithLoadMore({ books }: { books: Book[] }) {
  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-9 sm:grid-cols-3 lg:grid-cols-4">
      <LoadMore initial={8} step={8}>
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </LoadMore>
    </div>
  );
}