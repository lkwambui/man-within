"use client";

import { useState } from "react";
import { articles } from "@/lib/data";
import type { Article } from "@/lib/data";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

type TabId = "all" | "published" | "draft" | "scheduled";

export default function AdminArticlesPage() {
  const [activeTab, setActiveTab] = useState<TabId>("all");
  const [search, setSearch] = useState("");

  const tabs: { id: TabId; label: string }[] = [
    { id: "all", label: "All" },
    { id: "published", label: "Published" },
    { id: "draft", label: "Drafts" },
    { id: "scheduled", label: "Scheduled" },
  ];

  const filtered = articles.filter((article: Article) => {
    const matchesSearch =
      !search.trim() ||
      article.title.toLowerCase().includes(search.toLowerCase());
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "published") return matchesSearch && article.popular;
    if (activeTab === "draft") return matchesSearch && !article.popular;
    return matchesSearch;
  });

  const articleCount = {
    all: articles.length,
    published: articles.filter((a) => a.popular).length,
    draft: articles.filter((a) => !a.popular).length,
    scheduled: 0,
  };

  return (
    <div>
      <PageHeader
        title="Articles"
        copy="Manage the editorial content on the journal."
        className="bg-white"
      />

      <section className="border-b border-ink/5 bg-white py-6">
        <div className="container-site">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              {tabs.map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveTab(id)}
                  className={`shrink-0 rounded-full px-4 py-2 font-sans text-sm font-extrabold transition-all duration-200 ${
                    activeTab === id
                      ? "bg-forest text-ivory"
                      : "bg-sand/60 text-ink/70 hover:bg-sand"
                  }`}
                >
                  {label}
                  <span
                    className={`ml-1.5 rounded-full px-1.5 py-0.5 font-sans text-[11px] ${
                      activeTab === id ? "bg-ivory/20 text-ivory" : "bg-white text-ink/50"
                    }`}
                  >
                    {articleCount[id]}
                  </span>
                </button>
              ))}
            </div>
            <Button variant="primary" href="#">
              Create article
            </Button>
          </div>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full max-w-md rounded-card border border-ink/15 bg-ivory px-4 py-3 font-sans text-sm placeholder:text-moss focus:border-forest focus:outline-none"
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-6">
        <div className="container-site">
          {filtered.length === 0 ? (
            <div className="py-12 text-center">
              <p className="font-display text-lg font-bold text-ink/50">
                No articles found
              </p>
              <p className="mt-2 font-sans text-sm text-ink/35">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-ink/8">
              {filtered.map((article) => (
                <div
                  key={article.id}
                  className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2.5">
                      <h3 className="font-display text-base font-extrabold tracking-tight text-ink">
                        {article.title}
                      </h3>
                      <Badge
                        tone={article.popular ? "forest" : "sand"}
                      >
                        {article.popular ? "Published" : "Draft"}
                      </Badge>
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-2.5 font-sans text-xs text-ink/50">
                      <span>{article.category}</span>
                      <span className="h-1 w-1 rounded-full bg-ink/20" aria-hidden="true" />
                      <span>{article.author}</span>
                      <span className="h-1 w-1 rounded-full bg-ink/20" aria-hidden="true" />
                      <span>{article.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="rounded-lg px-3.5 py-1.5 font-sans text-xs font-bold text-forest hover:bg-sand"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="rounded-lg px-3.5 py-1.5 font-sans text-xs font-bold text-burgundy hover:bg-burgundy/10"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}