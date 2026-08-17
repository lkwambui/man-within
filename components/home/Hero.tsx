"use client";

import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BookCover } from "@/components/books/BookCover";
import { books } from "@/lib/data";

const mainBook = books.find((b) => b.id === "beautyful-ones")!;
const sideLeft = books.find((b) => b.id === "weep-not-child")!;
const sideRight = books.find((b) => b.id === "dragonfly-sea")!;
const favourite = books.find((b) => b.id === "kintu")!;

export function Hero() {
  return (
    <section className="overflow-hidden bg-forest text-ivory">
      <div className="container-site grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:py-20">
        {/* Copy */}
        <div className="max-w-xl animate-fade-up">
          <p className="inline-flex items-center gap-2 rounded-full border border-ivory/20 bg-ivory/10 px-4 py-1.5 font-sans text-xs font-extrabold uppercase tracking-[0.16em] text-ivory/80">
            Books. Ideas. Stories.
          </p>

          <h1 className="mt-6 font-display text-[2.6rem] font-extrabold leading-[1.04] tracking-tight sm:text-6xl lg:text-[4rem]">
            Discover books worth
            <span className="relative mx-1 inline-block text-ivory">
              staying with.
              <span
                className="absolute -bottom-1 left-0 h-[0.4em] w-full rounded-full bg-sand/50"
                aria-hidden="true"
              />
            </span>
          </h1>

          <p className="mt-5 max-w-md font-sans text-lg font-medium leading-relaxed text-ivory/70">
            Explore remarkable books, thoughtful ideas, and stories from Kenya
            and beyond. Curated for curious minds.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="/books" variant="ivory" className="group">
              Shop Books
              <ArrowRight
                size={17}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Button>
            <Button href="/journal" variant="outline-light">
              Read the Journal
            </Button>
          </div>

          <p className="mt-10 border-t border-ivory/10 pt-6 font-sans text-sm font-medium text-ivory/60">
            Free delivery across Kenya on orders over KES 2,500
            <span className="mx-2 text-ivory/20" aria-hidden="true">·</span>
            Independently owned, Nairobi
          </p>
        </div>

        {/* Book composition */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none" aria-hidden="false">
          <div
            className="absolute -right-10 -top-12 h-56 w-56 rounded-full border-[10px] border-ivory/10"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-14 -left-8 h-40 w-40 rounded-full border-8 border-burgundy/40"
            aria-hidden="true"
          />

          <div className="relative flex items-center justify-center py-8">
            {/* Behind left */}
            <BookCover
              book={sideLeft}
              className="absolute left-0 top-6 hidden w-40 -rotate-[14deg] rounded-soft shadow-lift sm:block lg:w-44"
            />
            {/* Behind right */}
            <BookCover
              book={sideRight}
              className="absolute right-0 bottom-8 hidden w-40 rotate-[12deg] rounded-soft shadow-lift sm:block lg:w-44"
            />

            {/* Main book */}
            <div className="relative w-64 lg:w-72">
              <BookCover
                book={mainBook}
                  priority
                className="aspect-[2/3] w-full rounded-card shadow-lift"
              />
              <span className="absolute -top-3 right-4 rounded-full bg-burgundy px-3.5 py-1.5 font-sans text-xs font-extrabold uppercase tracking-[0.1em] text-ivory shadow-soft">
                Bestseller
              </span>
            </div>

            {/* Reader favourite card */}
            <div className="absolute -bottom-4 left-1/2 flex w-60 -translate-x-1/2 items-center gap-3 rounded-card bg-ivory p-3.5 shadow-lift sm:-bottom-2 sm:left-auto sm:right-6 sm:translate-x-0">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-burgundy text-ivory">
                <Star size={20} fill="currentColor" />
              </div>
              <div>
                <p className="font-sans text-[10px] font-extrabold uppercase tracking-[0.14em] text-burgundy">
                  Reader favourite
                </p>
                <p className="font-display text-sm font-bold leading-tight text-ink">
                  {favourite.title}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}