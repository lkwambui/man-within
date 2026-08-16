"use client";

import { useState } from "react";
import { books as allBooks, categories } from "@/lib/data";
import type { Book } from "@/lib/data";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { BookCover } from "@/components/books/BookCover";

export default function AdminBooksPage() {
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = allBooks.filter(
    (b) =>
      !search.trim() ||
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase()),
  );

  const stockColor = (stock: number) => {
    if (stock < 5) return "text-burgundy bg-burgundy/10";
    if (stock < 15) return "text-amber-600 bg-amber-50";
    return "text-forest bg-forest/10";
  };

  const stockLabel = (stock: number) => {
    if (stock < 5) return "Critical";
    if (stock < 15) return "Low";
    return "Good";
  };

  return (
    <div>
      <PageHeader
        title="Books"
        copy="Manage your bookstore catalogue."
        className="bg-white"
      />
      <section className="border-b border-ink/5 bg-white py-6">
        <div className="container-site">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search by title or author..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-card border border-ink/15 bg-ivory px-4 py-3 font-sans text-sm text-ink placeholder:text-moss focus:border-forest focus:outline-none"
              />
            </div>
            <button
              type="button"
              onClick={() => setShowForm(!showForm)}
              className="btn-primary"
            >
              {showForm ? "Cancel" : "Add book"}
            </button>
          </div>
        </div>
      </section>

      {showForm && (
        <section className="border-b border-ink/5 bg-sand/30 py-8">
          <div className="container-site">
            <h3 className="font-display text-lg font-extrabold tracking-tight text-ink">
              Add new book
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowForm(false);
              }}
              className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              <div className="sm:col-span-2">
                <label className="font-sans text-sm font-extrabold text-ink/70">
                  Title
                </label>
                <input
                  type="text"
                  required
                  className="mt-1.5 w-full rounded-card border border-ink/15 bg-white px-4 py-3 font-sans text-sm focus:border-forest focus:outline-none"
                  placeholder="Book title"
                />
              </div>
              <div>
                <label className="font-sans text-sm font-extrabold text-ink/70">Author</label>
                <input
                  type="text"
                  required
                  className="mt-1.5 w-full rounded-card border border-ink/15 bg-white px-4 py-3 font-sans text-sm focus:border-forest focus:outline-none"
                  placeholder="Author name"
                />
              </div>
              <div>
                <label className="font-sans text-sm font-extrabold text-ink/70">ISBN</label>
                <input
                  type="text"
                  className="mt-1.5 w-full rounded-card border border-ink/15 bg-white px-4 py-3 font-sans text-sm focus:border-forest focus:outline-none"
                  placeholder="978-..."
                />
              </div>
              <div>
                <label className="font-sans text-sm font-extrabold text-ink/70">Category</label>
                <select
                  className="mt-1.5 w-full rounded-card border border-ink/15 bg-white px-4 py-3 font-sans text-sm font-semibold focus:border-forest focus:outline-none"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="font-sans text-sm font-extrabold text-ink/70">Price (KES)</label>
                <input
                  type="number"
                  required
                  className="mt-1.5 w-full rounded-card border border-ink/15 bg-white px-4 py-3 font-sans text-sm focus:border-forest focus:outline-none"
                  placeholder="1750"
                />
              </div>
              <div>
                <label className="font-sans text-sm font-extrabold text-ink/70">Stock</label>
                <input
                  type="number"
                  required
                  className="mt-1.5 w-full rounded-card border border-ink/15 bg-white px-4 py-3 font-sans text-sm focus:border-forest focus:outline-none"
                  placeholder="25"
                />
              </div>
              <div>
                <label className="font-sans text-sm font-extrabold text-ink/70">Publisher</label>
                <input
                  type="text"
                  className="mt-1.5 w-full rounded-card border border-ink/15 bg-white px-4 py-3 font-sans text-sm focus:border-forest focus:outline-none"
                  placeholder="Publisher name"
                />
              </div>
              <div>
                <label className="font-sans text-sm font-extrabold text-ink/70">
                  Publication year
                </label>
                <input
                  type="text"
                  className="mt-1.5 w-full rounded-card border border-ink/15 bg-white px-4 py-3 font-sans text-sm focus:border-forest focus:outline-none"
                  placeholder="2024"
                />
              </div>
              <div>
                <label className="font-sans text-sm font-extrabold text-ink/70">Format</label>
                <select
                  className="mt-1.5 w-full rounded-card border border-ink/15 bg-white px-4 py-3 font-sans text-sm font-semibold focus:border-forest focus:outline-none"
                >
                  <option>Paperback</option>
                  <option>Hardcover</option>
                  <option>Picture Book</option>
                </select>
              </div>
              <div>
                <label className="font-sans text-sm font-extrabold text-ink/70">Pages</label>
                <input
                  type="number"
                  className="mt-1.5 w-full rounded-card border border-ink/15 bg-white px-4 py-3 font-sans text-sm focus:border-forest focus:outline-none"
                  placeholder="200"
                />
              </div>
              <div>
                <label className="font-sans text-sm font-extrabold text-ink/70">Language</label>
                <input
                  type="text"
                  defaultValue="English"
                  className="mt-1.5 w-full rounded-card border border-ink/15 bg-white px-4 py-3 font-sans text-sm focus:border-forest focus:outline-none"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="font-sans text-sm font-extrabold text-ink/70">
                  Description
                </label>
                <textarea
                  rows={3}
                  className="mt-1.5 w-full rounded-card border border-ink/15 bg-white px-4 py-3 font-sans text-sm focus:border-forest focus:outline-none"
                  placeholder="Book description..."
                />
              </div>
              <div className="sm:col-span-2">
                <Button type="submit" variant="accent">
                  Save book
                </Button>
              </div>
            </form>
          </div>
        </section>
      )}

      <section className="bg-white py-8">
        <div className="container-site">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b border-ink/10">
                  <th className="pb-3 text-left font-sans text-xs font-extrabold uppercase tracking-[0.12em] text-ink/50">
                    Book
                  </th>
                  <th className="pb-3 text-left font-sans text-xs font-extrabold uppercase tracking-[0.12em] text-ink/50">
                    Author
                  </th>
                  <th className="pb-3 text-left font-sans text-xs font-extrabold uppercase tracking-[0.12em] text-ink/50">
                    Category
                  </th>
                  <th className="pb-3 text-left font-sans text-xs font-extrabold uppercase tracking-[0.12em] text-ink/50">
                    Price
                  </th>
                  <th className="pb-3 text-left font-sans text-xs font-extrabold uppercase tracking-[0.12em] text-ink/50">
                    Stock
                  </th>
                  <th className="pb-3 text-right font-sans text-xs font-extrabold uppercase tracking-[0.12em] text-ink/50">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/8">
                {filtered.map((book) => (
                  <tr key={book.id} className="transition-colors hover:bg-sand/20">
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-9 shrink-0 overflow-hidden rounded">
                          <BookCover
                            book={book}
                            className="aspect-[2/3] h-12 w-9"
                          />
                        </div>
                        <span className="font-sans text-sm font-semibold text-ink">
                          {book.title}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 font-sans text-sm text-ink/70">
                      {book.author}
                    </td>
                    <td className="py-3">
                      <span className="rounded-full bg-sand px-2.5 py-0.5 font-sans text-xs font-bold text-ink/70">
                        {book.category}
                      </span>
                    </td>
                    <td className="py-3 font-sans text-sm font-semibold text-ink">
                      {book.price}
                    </td>
                    <td className="py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 font-sans text-[11px] font-extrabold ${stockColor(book.stock)}`}
                      >
                        {book.stock} ({stockLabel(book.stock)})
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          className="rounded-lg px-3 py-1.5 font-sans text-xs font-bold text-forest hover:bg-sand"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="rounded-lg px-3 py-1.5 font-sans text-xs font-bold text-burgundy hover:bg-burgundy/10"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}