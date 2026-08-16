"use client";

import { useState } from "react";
import Link from "next/link";
import { Trash2, BookOpen, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/store";
import { PageHeader } from "@/components/ui/PageHeader";
import { BookCover } from "@/components/books/BookCover";
import { QtySelector } from "@/components/ui/QtySelector";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export default function CartPage() {
  const { items, remove, updateQty, subtotal, count } = useCart();

  const shipping = subtotal >= 3000 ? 0 : 300;
  const total = subtotal + shipping;

  if (count === 0) {
    return (
      <div>
        <PageHeader title="Your bag" copy="The books you are planning to read." />
        <section className="bg-ivory pb-16 lg:pb-24">
          <div className="container-site">
            <EmptyState
              icon={<BookOpen size={28} />}
              title="Your bag is empty"
              copy="Looks like you have not added any books yet. Explore the bookstore and find something worth staying with."
              action={
                <Button href="/books" className="mt-2">
                  Browse books
                </Button>
              }
            />
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Your bag"
        copy={`${count} ${count === 1 ? "item" : "items"} in your bag`}
      />

      <section className="bg-ivory pb-16 lg:pb-24">
        <div className="container-site">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px] lg:gap-14">
            <div>
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.book.id}
                    className="flex gap-5 rounded-card border border-ink/10 bg-white p-5 shadow-card transition-shadow duration-300 hover:shadow-lift"
                  >
                    <Link
                      href={`/books/${item.book.slug}`}
                      className="shrink-0"
                      aria-label={`View ${item.book.title}`}
                    >
                      <BookCover
                        book={item.book}
                        className="aspect-[2/3] w-20 sm:w-24"
                      />
                    </Link>
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <Link
                            href={`/books/${item.book.slug}`}
                            className="font-display text-base font-bold tracking-tight text-ink transition-colors hover:text-forest"
                          >
                            {item.book.title}
                          </Link>
                          <p className="mt-1 font-sans text-sm font-semibold text-ink/60">
                            {item.book.author}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => remove(item.book.id)}
                          aria-label={`Remove ${item.book.title} from bag`}
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-ink/30 transition-colors duration-200 hover:bg-sand hover:text-burgundy"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                        <QtySelector
                          qty={item.qty}
                          onChange={(q) => updateQty(item.book.id, q)}
                        />
                        <p className="font-sans text-sm font-extrabold text-forest">
                          KES {(item.book.priceNumber * item.qty).toLocaleString()}
                        </p>
                      </div>
                      {item.book.stock <= 0 && (
                        <p className="mt-1.5 font-sans text-xs font-bold text-burgundy">
                          Currently out of stock
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Link
                  href="/books"
                  className="inline-flex items-center gap-2 font-sans text-sm font-bold text-forest transition-colors hover:text-burgundy"
                >
                  <ArrowRight size={16} className="rotate-180" aria-hidden="true" />
                  Continue shopping
                </Link>
              </div>
            </div>

            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-card border border-ink/10 bg-white p-7 shadow-card">
                <h2 className="font-display text-lg font-extrabold tracking-tight text-ink">
                  Order summary
                </h2>
                <div className="mt-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-sm text-ink/60">Subtotal</span>
                    <span className="font-sans text-sm font-extrabold text-ink">
                      KES {subtotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-sm text-ink/60">Shipping</span>
                    <span className="font-sans text-sm font-extrabold text-forest">
                      {shipping === 0 ? "Free" : `KES ${shipping}`}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="font-sans text-xs text-ink/40">
                      Free shipping on orders over KES 3,000
                    </p>
                  )}
                  <div className="border-t border-ink/10 pt-3">
                    <div className="flex items-center justify-between">
                      <span className="font-sans text-sm font-extrabold text-ink">Total</span>
                      <span className="font-display text-xl font-extrabold text-forest">
                        KES {total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
                <Button href="/checkout" variant="primary" className="mt-6 w-full">
                  Proceed to checkout
                </Button>
                <p className="mt-3 text-center font-sans text-xs text-ink/40">
                  Taxes and delivery options calculated at checkout
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}