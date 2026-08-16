"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import {
  books,
  authors,
  articles,
  collections,
  readingLists,
} from "@/lib/data";
import type { Book, Author, Article } from "@/lib/data";
import { BookGrid } from "@/components/books/BookGrid";
import { AuthorCard } from "@/components/authors/AuthorCard";
import { ArticleCard } from "@/components/journal/ArticleCard";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import Link from "next/link";

export default function SearchResults() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(initialQuery);
  const [submitted, setSubmitted] = useState(Boolean(initialQuery));

  const results = useMemo(() => {
    if (!submitted || !query.trim()) return null;
    const q = query.trim().toLowerCase();
    const rBooks = books.filter(
      (b: Book) =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q),
    );
    const rAuthors = authors.filter((a: Author) =>
      a.name.toLowerCase().includes(q),
    );
    const rArticles = articles.filter(
      (a: Article) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q),
    );
    const rCollections = collections.filter((c) =>
      c.title.toLowerCase().includes(q),
    );
    const rLists = readingLists.filter((r) =>
      r.title.toLowerCase().includes(q),
    );
    return {
      books: rBooks,
      authors: rAuthors,
      articles: rArticles,
      collections: rCollections,
      lists: rLists,
      totalCount:
        rBooks.length +
        rAuthors.length +
        rArticles.length +
        rCollections.length +
        rLists.length,
    };
  }, [query, submitted]);

  const hasResults = results !== null && results.totalCount > 0;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(Boolean(query.trim()));
  };

  if (results === null) {
    return (
      <section className="bg-ivory pb-16 lg:pb-24">
        <div className="container-site">
          <form onSubmit={handleSearch} className="relative max-w-2xl">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-moss"
              aria-hidden="true"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a book, author, topic..."
              className="w-full rounded-card border border-ink/15 bg-white py-4 pl-12 pr-4 font-sans text-sm text-ink placeholder:text-moss focus:border-forest focus:outline-none"
            />
          </form>
          <div className="mt-8">
            <EmptyState
              icon={<Search size={28} />}
              title="Search the bookstore"
              copy="Find books by title, author, or topic. Explore journal articles, collections, and reading lists."
            />
          </div>
        </div>
      </section>
    );
  }

  if (!hasResults) {
    return (
      <section className="bg-ivory pb-16 lg:pb-24">
        <div className="container-site">
          <form onSubmit={handleSearch} className="relative max-w-2xl">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-moss"
              aria-hidden="true"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a book, author, topic..."
              className="w-full rounded-card border border-ink/15 bg-white py-4 pl-12 pr-4 font-sans text-sm text-ink placeholder:text-moss focus:border-forest focus:outline-none"
            />
          </form>
          <div className="mt-8">
            <EmptyState
              icon={<Search size={28} />}
              title="No results found"
              copy={`No results for "${query}". Try searching for another book, author, or topic.`}
              action={
                <Button href="/books" variant="outline" className="mt-2">
                  Browse all books
                </Button>
              }
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-ivory pb-16 lg:pb-24">
      <div className="container-site">
        <form onSubmit={handleSearch} className="relative max-w-2xl">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-moss"
            aria-hidden="true"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a book, author, topic..."
            className="w-full rounded-card border border-ink/15 bg-white py-4 pl-12 pr-4 font-sans text-sm text-ink placeholder:text-moss focus:border-forest focus:outline-none"
          />
        </form>

        <p className="font-sans text-sm text-ink/50">
          {results.totalCount}{" "}
          {results.totalCount === 1 ? "result" : "results"} for "
          <span className="font-extrabold text-ink">{query}</span>"
        </p>

        {results.books.length > 0 && (
          <div className="mt-10">
            <h2 className="font-display text-lg font-extrabold tracking-tight text-ink">
              Books
            </h2>
            <p className="mt-1 font-sans text-sm text-ink/50">
              {results.books.length}{" "}
              {results.books.length === 1 ? "book" : "books"}
            </p>
            <div className="mt-5">
              <BookGrid books={results.books.slice(0, 4)} />
            </div>
          </div>
        )}

        {results.authors.length > 0 && (
          <div className="mt-10">
            <h2 className="font-display text-lg font-extrabold tracking-tight text-ink">
              Authors
            </h2>
            <p className="mt-1 font-sans text-sm text-ink/50">
              {results.authors.length}{" "}
              {results.authors.length === 1 ? "author" : "authors"}
            </p>
            <div className="mt-5 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {results.authors.slice(0, 4).map((author) => (
                <AuthorCard key={author.slug} author={author} />
              ))}
            </div>
          </div>
        )}

        {results.articles.length > 0 && (
          <div className="mt-10">
            <h2 className="font-display text-lg font-extrabold tracking-tight text-ink">
              Journal
            </h2>
            <p className="mt-1 font-sans text-sm text-ink/50">
              {results.articles.length}{" "}
              {results.articles.length === 1 ? "article" : "articles"}
            </p>
            <div className="mt-5 grid grid-cols-1 gap-8 md:grid-cols-3">
              {results.articles.slice(0, 3).map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        )}

        {results.collections.length > 0 && (
          <div className="mt-10">
            <h2 className="font-display text-lg font-extrabold tracking-tight text-ink">
              Collections
            </h2>
            <p className="mt-1 font-sans text-sm text-ink/50">
              {results.collections.length}{" "}
              {results.collections.length === 1
                ? "collection"
                : "collections"}
            </p>
            <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {results.collections.slice(0, 3).map((col) => (
                <Link
                  key={col.id}
                  href={`/collections/${col.slug}`}
                  className="group relative flex h-60 flex-col justify-end overflow-hidden rounded-card shadow-card transition-shadow hover:shadow-lift"
                >
                  <img
                    src={col.image}
                    alt={col.imageAlt}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/30 to-transparent" />
                  <div className="relative p-6">
                    <h3 className="font-display text-lg font-extrabold tracking-tight text-ivory">
                      {col.title}
                    </h3>
                    <p className="mt-1 font-sans text-xs text-ivory/60">
                      {col.bookIds.length} books
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {results.lists.length > 0 && (
          <div className="mt-10">
            <h2 className="font-display text-lg font-extrabold tracking-tight text-ink">
              Reading Lists
            </h2>
            <p className="mt-1 font-sans text-sm text-ink/50">
              {results.lists.length}{" "}
              {results.lists.length === 1 ? "list" : "lists"}
            </p>
            <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-3">
              {results.lists.slice(0, 3).map((list) => (
                <Link
                  key={list.id}
                  href={`/reading-lists/${list.slug}`}
                  className="group flex flex-col overflow-hidden rounded-card bg-white shadow-card transition-shadow hover:shadow-lift"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={list.image}
                      alt={list.imageAlt}
                      className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-base font-extrabold tracking-tight text-ink transition-colors group-hover:text-forest">
                      {list.title}
                    </h3>
                    <p className="mt-1.5 font-sans text-xs text-ink/50">
                      {list.bookIds.length} books
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}