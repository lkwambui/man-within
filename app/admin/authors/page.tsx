"use client";

import { useState } from "react";
import { authors } from "@/lib/data";
import type { Author } from "@/lib/data";
import { PageHeader } from "@/components/ui/PageHeader";
import { AuthorCard } from "@/components/authors/AuthorCard";
import { Button } from "@/components/ui/Button";
import { SmartImage } from "@/components/ui/SmartImage";

export default function AdminAuthorsPage() {
  const [search, setSearch] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);

  const filtered = authors.filter((a) =>
    !search.trim() || a.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <PageHeader
        title="Authors"
        copy="Manage author profiles and information."
        className="bg-white"
      />

      <section className="border-b border-ink/5 bg-white py-6">
        <div className="container-site">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search authors..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-card border border-ink/15 bg-ivory px-4 py-3 font-sans text-sm placeholder:text-moss focus:border-forest focus:outline-none"
              />
            </div>
            <Button variant="primary" href="#">
              Add author
            </Button>
          </div>
        </div>
      </section>

      {selectedAuthor && (
        <section className="border-b border-ink/10 bg-sand/30 py-8">
          <div className="container-site">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-6">
                <div className="h-20 w-20 overflow-hidden rounded-xl shadow-soft">
                  <SmartImage
                    src={selectedAuthor.image}
                    alt={selectedAuthor.imageAlt}
                    className="h-20 w-20"
                  />
                </div>
                <div>
                  <h3 className="font-display text-lg font-extrabold text-ink">
                    {selectedAuthor.name}
                  </h3>
                  <p className="font-sans text-sm text-ink/60">
                    {selectedAuthor.role}
                  </p>
                  <p className="mt-2 font-sans text-xs text-ink/50 line-clamp-2">
                    {selectedAuthor.bio}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedAuthor(null)}
                className="rounded-full bg-burgundy px-5 py-2 font-sans text-xs font-extrabold uppercase text-ivory"
              >
                Close
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSelectedAuthor(null);
              }}
              className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
            >
              <div className="sm:col-span-2">
                <label className="font-sans text-sm font-extrabold text-ink/70">Bio</label>
                <textarea
                  rows={3}
                  defaultValue={selectedAuthor.bio}
                  className="mt-1.5 w-full rounded-card border border-ink/15 bg-white px-4 py-3 font-sans text-sm focus:border-forest focus:outline-none"
                />
              </div>
              <div>
                <label className="font-sans text-sm font-extrabold text-ink/70">Role</label>
                <input
                  type="text"
                  defaultValue={selectedAuthor.role}
                  className="mt-1.5 w-full rounded-card border border-ink/15 bg-white px-4 py-3 font-sans text-sm focus:border-forest focus:outline-none"
                />
              </div>
              <div>
                <label className="font-sans text-sm font-extrabold text-ink/70">Location</label>
                <input
                  type="text"
                  defaultValue={selectedAuthor.location}
                  className="mt-1.5 w-full rounded-card border border-ink/15 bg-white px-4 py-3 font-sans text-sm focus:border-forest focus:outline-none"
                />
              </div>
              <div className="sm:col-span-2">
                <Button type="submit" variant="primary">
                  Save changes
                </Button>
              </div>
            </form>
          </div>
        </section>
      )}

      <section className="bg-ivory/50 py-8">
        <div className="container-site">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {filtered.map((author) => (
              <div
                key={author.slug}
                onClick={() => setSelectedAuthor(author)}
                className="cursor-pointer rounded-card bg-white p-4 shadow-card transition-shadow duration-300 hover:shadow-lift"
              >
                <div className="overflow-hidden rounded-xl">
                  <SmartImage
                    src={author.image}
                    alt={author.imageAlt}
                    className="aspect-square w-full"
                  />
                </div>
                <h3 className="mt-3 font-display text-sm font-extrabold tracking-tight text-ink">
                  {author.name}
                </h3>
                <p className="mt-0.5 font-sans text-[11px] text-ink/50">
                  {author.role}
                </p>
                <p className="mt-1 font-sans text-[11px] text-ink/40">
                  {author.location}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}