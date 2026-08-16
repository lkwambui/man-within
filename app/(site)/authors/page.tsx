"use client";

import { useState } from "react";
import Link from "next/link";
import { authors, articlesByAuthor } from "@/lib/data";
import type { Author } from "@/lib/data";
import { PageHeader } from "@/components/ui/PageHeader";
import { AuthorCard } from "@/components/authors/AuthorCard";
import { BookOpen } from "lucide-react";
import { SmartImage } from "@/components/ui/SmartImage";
import { ArrowUpRight } from "lucide-react";

const ALL_GENRES = [
  ...new Set(authors.flatMap((a) => a.genres)),
].sort();

export default function AuthorsPage() {
  const [searchText, setSearchText] = useState("");
  const [activeGenre, setActiveGenre] = useState("All");

  const filtered = authors.filter((author) => {
    const matchesSearch =
      !searchText.trim() ||
      author.name.toLowerCase().includes(searchText.trim().toLowerCase());
    const matchesGenre =
      activeGenre === "All" || author.genres.includes(activeGenre);
    return matchesSearch && matchesGenre;
  });

  return (
    <div>
      <PageHeader
        title="Meet the authors"
        copy="Discover writers whose stories deserve your attention."
      />

      <section className="bg-ivory">
        <div className="container-site pb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search authors..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full rounded-card border border-ink/15 bg-white px-4 py-3 font-sans text-sm text-ink placeholder:text-moss focus:border-forest focus:outline-none"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <button
                type="button"
                onClick={() => setActiveGenre("All")}
                className={`shrink-0 rounded-full px-4 py-2 font-sans text-sm font-extrabold transition-all duration-200 ${
                  activeGenre === "All"
                    ? "bg-forest text-ivory"
                    : "bg-white text-ink/70 border border-ink/15 hover:border-forest hover:text-forest"
                }`}
              >
                All
              </button>
              {ALL_GENRES.map((genre) => (
                <button
                  key={genre}
                  type="button"
                  onClick={() => setActiveGenre(genre)}
                  className={`shrink-0 rounded-full px-4 py-2 font-sans text-sm font-extrabold transition-all duration-200 ${
                    activeGenre === genre
                      ? "bg-forest text-ivory"
                      : "bg-white text-ink/70 border border-ink/15 hover:border-forest hover:text-forest"
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ivory pb-16 lg:pb-24">
        <div className="container-site">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
              {filtered.map((author) => (
                <div
                  key={author.slug}
                  className="group rounded-card overflow-hidden bg-forest shadow-card transition-all duration-300 hover:shadow-lift"
                >
                  <div className="relative overflow-hidden">
                    <SmartImage
                      src={author.image}
                      alt={author.imageAlt}
                      className="aspect-[4/5] w-full"
                    />
                    <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-ivory text-forest opacity-0 transition-all duration-300 group-hover:opacity-100">
                      <ArrowUpRight size={17} />
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-xl font-extrabold tracking-tight text-ivory">
                      {author.name}
                    </h3>
                    <p className="mt-1 font-sans text-sm font-bold text-ivory/60">
                      {author.role}
                    </p>
                    <p className="mt-2 font-sans text-sm leading-relaxed text-ivory/50 line-clamp-2">
                      {author.note}
                    </p>
                    <Link
                      href={`/authors/${author.slug}`}
                      className="mt-3 inline-block font-sans text-sm font-extrabold text-ivory/80 underline decoration-ivory/30 underline-offset-4 transition-colors hover:text-ivory"
                    >
                      View profile
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <p className="font-display text-xl font-bold text-ink/60">
                No authors found
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