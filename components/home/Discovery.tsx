"use client";

import {
  BookOpen,
  ChevronDown,
  ListChecks,
  PenLine,
  Search,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import { discoveryFilters } from "@/lib/data";
import { cn } from "@/lib/utils";

const chipIcons: Record<string, typeof BookOpen> = {
  categories: BookOpen,
  authors: PenLine,
  "new-releases": Sparkles,
  bestsellers: TrendingUp,
  "reading-lists": ListChecks,
};

export function Discovery() {
  const [active, setActive] = useState(discoveryFilters[0].id);

  return (
    <section className="border-b border-ink/5 bg-ivory">
      <div className="container-site py-16 lg:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="section-title">Find your next great read</h2>
          <p className="mt-3 text-lg text-ink/60">
            Explore books selected for curious minds.
          </p>
        </div>

        {/* Search */}
        <form
          role="search"
          className="mx-auto mt-9 flex max-w-xl items-center gap-2 rounded-full border border-ink/10 bg-white p-2 shadow-card"
          onSubmit={(e) => e.preventDefault()}
        >
          <span className="pl-3 text-moss">
            <Search size={20} />
          </span>
          <label htmlFor="site-search" className="sr-only">
            Search books, authors or topics
          </label>
          <input
            id="site-search"
            type="search"
            placeholder="Search books, authors or topics"
            className="min-w-0 flex-1 bg-transparent font-sans text-[15px] font-semibold text-ink placeholder:text-ink/40 focus:outline-none"
          />
          <button
            type="submit"
            className="btn-primary shrink-0 !rounded-full"
          >
            Search
          </button>
        </form>

        {/* Filter chips */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {discoveryFilters.map((chip) => {
            const Icon = chipIcons[chip.id] ?? ChevronDown;
            const isActive = active === chip.id;
            return (
              <button
                key={chip.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActive(chip.id)}
                className={cn("chip", isActive && "chip-active")}
              >
                <Icon size={15} />
                {chip.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}