"use client";

import { useState } from "react";
import { faqs } from "@/lib/data";
import { PageHeader } from "@/components/ui/PageHeader";
import { Accordion } from "@/components/ui/Accordion";

export default function FaqPage() {
  const categories = faqs.map((f) => f.category);
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const activeFaq = faqs.find((f) => f.category === activeCategory);

  return (
    <div>
      <PageHeader
        title="Frequently asked questions"
        copy="Answers to the most common questions about orders, shipping, returns, payments, books and more."
      />

      <section className="bg-ivory pb-16 lg:pb-24">
        <div className="container-site">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[260px_1fr]">
            <nav aria-label="FAQ categories" className="lg:sticky lg:top-24 lg:self-start">
              <ul className="flex flex-wrap gap-2 lg:flex-col">
                {categories.map((category) => (
                  <li key={category}>
                    <button
                      type="button"
                      onClick={() => setActiveCategory(category)}
                      className={`shrink-0 rounded-full px-5 py-2.5 font-sans text-sm font-extrabold transition-all duration-200 lg:w-full lg:text-left lg:rounded-xl lg:px-5 lg:py-3 ${
                        activeCategory === category
                          ? "bg-forest text-ivory shadow-soft"
                          : "bg-white text-ink/70 border border-ink/15 hover:border-forest hover:text-forest"
                      }`}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h2 className="font-display text-xl font-extrabold tracking-tight text-ink lg:hidden mb-4">
                {activeFaq?.category}
              </h2>
              <div className="mt-6">
                <Accordion items={activeFaq?.items ?? []} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}