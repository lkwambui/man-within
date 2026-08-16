"use client";

import { useState } from "react";
import { articles, journalCategories } from "@/lib/data";
import type { Article } from "@/lib/data";
import { PageHeader } from "@/components/ui/PageHeader";
import { ArticleCard } from "@/components/journal/ArticleCard";

export default function JournalPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? articles
      : articles.filter((a: Article) => a.category === activeCategory);

  const [featured, ...rest] = filtered;

  return (
    <div>
      <PageHeader
        title="The Man Within Journal"
        copy="Essays, conversations, reviews, and ideas worth spending time with."
      />

      <section className="bg-ivory">
        <div className="container-site pb-8">
          <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide">
            {journalCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 rounded-full px-5 py-2.5 font-sans text-sm font-extrabold transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-forest text-ivory"
                    : "bg-white text-ink/70 border border-ink/15 hover:border-forest hover:text-forest"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory pb-16 lg:pb-24">
        <div className="container-site">
          {filtered.length === 0 ? (
            <div className="py-16 text-center">
              <p className="font-display text-xl font-bold text-ink/60">
                No articles found in this category
              </p>
              <p className="mt-2 font-sans text-sm text-ink/40">
                Try selecting a different category to explore.
              </p>
            </div>
          ) : (
            <div className="space-y-10">
              {featured && (
                <ArticleCard article={featured} featured />
              )}
              {rest.length > 0 && (
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  {rest.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}