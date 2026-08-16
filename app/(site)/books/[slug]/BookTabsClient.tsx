"use client";

import { useState } from "react";
import Link from "next/link";

export default function BookTabsClient({
  book,
  author,
}: {
  book: NonNullable<ReturnType<typeof import("@/lib/data").getBookBySlug>>;
  author: ReturnType<typeof import("@/lib/data").getAuthorBySlug>;
}) {
  const [activeTab, setActiveTab] =
    useState<"description" | "about-author">("description");

  const tabs: { id: "description" | "about-author"; label: string }[] = [
    { id: "description", label: "Description" },
    { id: "about-author", label: "About the Author" },
  ];

  return (
    <section className="bg-ivory pb-16 lg:pb-24">
      <div className="container-site">
        <div className="rounded-card bg-white shadow-card">
          <div className="flex border-b border-ink/10">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-sans text-sm font-extrabold transition-colors duration-200 ${
                  activeTab === tab.id
                    ? "border-b-2 border-forest text-forest"
                    : "text-ink/50 hover:text-ink"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="p-6 sm:p-8">
            {activeTab === "description" ? (
              <p className="font-sans text-[15px] leading-relaxed text-ink/70">
                {book.description}
              </p>
            ) : author ? (
              <div>
                <p className="font-display text-lg font-extrabold text-ink">
                  {author.name}
                </p>
                <p className="mt-1 font-sans text-sm font-semibold text-ink/50">
                  {author.role}
                </p>
                <p className="mt-4 font-sans text-[15px] leading-relaxed text-ink/70">
                  {author.bio}
                </p>
              </div>
            ) : (
<p className="font-sans text-[15px] leading-relaxed text-ink/50">
                  A biography for {book.author} will be published soon. In the meantime, we recommend exploring this author's other works on our site.
                </p>
            )}
          </div>
        </div>

        <div className="mt-8 rounded-card bg-white shadow-card p-6 sm:p-8">
          <h3 className="font-display text-xl font-extrabold tracking-tight text-ink">
            Book Details
          </h3>
          <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <DetailRow label="ISBN" value={book.id} />
            <DetailRow label="Publisher" value={book.publisher} />
            <DetailRow label="Publication Year" value={book.pubDate} />
            <DetailRow label="Pages" value={String(book.pages)} />
            <DetailRow label="Format" value={book.format} />
            <DetailRow label="Language" value={book.language} />
          </dl>
        </div>
      </div>
    </section>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="font-sans text-xs font-extrabold uppercase tracking-[0.1em] text-moss">
        {label}
      </dt>
      <dd className="font-sans text-sm font-semibold text-ink">{value}</dd>
    </div>
  );
}