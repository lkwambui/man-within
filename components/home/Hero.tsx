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
      <div className="container-site grid items-center gap-14 py-20 lg:grid-cols-[1fr_minmax(0,1.1fr)] lg:gap-10 lg:py-28">
        {/* Copy */}
        <div className="max-w-lg animate-fade-up">
          <p className="meta-xs text-ivory/60">
            Books for curious minds
          </p>

          <h1 className="display-xl mt-5">
            Discover books worth{" "}
            <span className="relative inline-block text-ivory">
              staying with.
              <span
                className="absolute -bottom-1.5 left-0 h-[0.35em] w-full rounded-full bg-sand/50"
                aria-hidden="true"
              />
            </span>
          </h1>

          <p className="body-lg mt-6 max-w-md text-ivory/65">
            Discover stories, ideas and perspectives worth spending time with. We curate remarkable books from Kenya and beyond for readers who care.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button href="/books" variant="ivory" className="group">
              Explore Books
              <ArrowRight
                size={17}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Button>
            <Button href="/journal" variant="outline-light">
              Read Journal
            </Button>
          </div>

          <p className="mt-10 border-t border-ivory/10 pt-5 font-sans text-sm font-medium text-ivory/55">
            Free delivery across Kenya on orders over KES 2,500
            <span className="mx-2.5 text-ivory/20" aria-hidden="true">·</span>
            Independently owned, Nairobi
          </p>
        </div>

        {/* Book composition */}
        <div className="relative mx-auto w-full max-w-[560px] lg:max-w-none">
          <div
            className="absolute -right-8 -top-10 h-60 w-60 rounded-full border-[10px] border-ivory/10"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-16 -left-10 h-48 w-48 rounded-full border-8 border-burgundy/40"
            aria-hidden="true"
          />

          <div className="relative flex items-center justify-center py-10">
            {/* Behind left */}
            <BookCover
              book={sideLeft}
              className="absolute left-0 top-4 hidden w-36 -rotate-[16deg] rounded-soft shadow-lift sm:block lg:w-44 lg:top-6"
            />
            {/* Behind right */}
            <BookCover
              book={sideRight}
              className="absolute right-0 bottom-4 hidden w-36 rotate-[14deg] rounded-soft shadow-lift sm:block lg:w-44 lg:bottom-6"
            />

            {/* Main book */}
            <div className="relative w-72 sm:w-80 lg:w-[400px]">
              <BookCover
                book={mainBook}
                priority
                className="aspect-[2/3] w-full rounded-card shadow-lift"
              />
              <span className="absolute -top-3.5 right-5 rounded-full bg-burgundy px-4 py-2 font-sans text-xs font-extrabold uppercase tracking-[0.1em] text-ivory shadow-soft">
                Bestseller
              </span>
            </div>

            {/* Reader favourite card */}
            <div className="absolute -bottom-4 left-1/2 flex w-64 -translate-x-1/2 items-center gap-3.5 rounded-card bg-ivory p-4 shadow-lift sm:-bottom-2 sm:left-auto sm:right-8 sm:translate-x-0 lg:w-72">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-burgundy text-ivory">
                <Star size={20} fill="currentColor" />
              </div>
              <div>
                <p className="meta-xs text-burgundy">Reader favourite</p>
                <p className="font-display text-sm font-bold leading-tight text-ink mt-0.5">
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