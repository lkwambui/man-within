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
    <section className="border-b border-ink/5 bg-white">
      <div className="container-site py-20 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="meta-xs text-burgundy">Find your next great read</p>
          <h2 className="display-lg mt-3">
            Stories, ideas and books worth your time.
          </h2>
          <p className="body-lg mt-4 text-ink/60">
            Explore books selected for curious minds, from Kenya and beyond.
          </p>
        </div>

        {/* Search */}
        <form
          role="search"
          className="mx-auto flex flex-col sm:flex-row items-stretch gap-2 rounded-2xl border border-ink/10 bg-ivory/60 p-2 shadow-card"
          onSubmit={(e) => e.preventDefault()}
        >
          <span className="pl-3 text-moss flex items-center">
            <Search size={22} />
          </span>
          <label htmlFor="site-search" className="sr-only">
            Search books, authors or topics
          </label>
          <input
            id="site-search"
            type="search"
            placeholder="Search books, authors or topics…"
            className="min-w-0 flex-1 bg-transparent font-sans text-[16px] font-semibold text-ink placeholder:text-ink/40 focus:outline-none"
          />
          <button
            type="submit"
            className="btn-primary rounded-xl px-6 py-3.5 sm:px-8"
          >
            Search
          </button>
        </form>

        <div className="mt-9 flex gap-2.5 overflow-x-auto overscroll-contain scrollbar-hide pb-2">
            {discoveryFilters.map((chip) => {
            const Icon = chipIcons[chip.id] ?? ChevronDown;
            const isActive = active === chip.id;
            return (
              <button
                key={chip.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActive(chip.id)}
                className={cn("chip shrink-0 px-5 py-2.5", isActive && "chip-active !text-ivory")}
              >
                <Icon size={16} />
                {chip.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}