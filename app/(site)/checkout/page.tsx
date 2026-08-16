"use client";

import { useState } from "react";
import Link from "next/link";
import { CreditCard } from "lucide-react";
import { useCart } from "@/lib/store";
import { PageHeader } from "@/components/ui/PageHeader";
import { BookCover } from "@/components/books/BookCover";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { BookOpen } from "lucide-react";

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<"mpesa" | "card" | "bank">("mpesa");
  const [step, setStep] = useState(1);

  const shipping = subtotal >= 3000 ? 0 : 300;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div>
        <PageHeader title="Checkout" copy="Complete your purchase." />
        <section className="bg-ivory pb-16">
          <div className="container-site">
            <EmptyState
              icon={<BookOpen size={28} />}
              title="Your bag is empty"
              copy="Add some books before checking out."
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
      <PageHeader title="Checkout" copy={`${items.length} ${items.length === 1 ? "item" : "items"} in your order`} />

      <section className="bg-ivory pb-16 lg:pb-24">
        <div className="container-site">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px] lg:gap-14">
            <div className="space-y-8">
              <div className="rounded-card border border-ink/10 bg-white p-7 shadow-card">
                <h2 className="font-display text-lg font-extrabold tracking-tight text-ink">
                  Contact Information
                </h2>
                <div className="mt-5">
                  <label
                    htmlFor="checkout-email"
                    className="font-sans text-sm font-extrabold text-ink/70"
                  >
                    Email <span className="text-burgundy">*</span>
                  </label>
                  <input
                    id="checkout-email"
                    type="email"
                    required
                    className="mt-1.5 w-full rounded-card border border-ink/15 bg-ivory px-4 py-3 font-sans text-sm text-ink placeholder:text-moss focus:border-forest focus:outline-none"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="rounded-card border border-ink/10 bg-white p-7 shadow-card">
                <h2 className="font-display text-lg font-extrabold tracking-tight text-ink">
                  Delivery Information
                </h2>
                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="fullname"
                      className="font-sans text-sm font-extrabold text-ink/70"
                    >
                      Full name <span className="text-burgundy">*</span>
                    </label>
                    <input
                      id="fullname"
                      type="text"
                      required
                      className="mt-1.5 w-full rounded-card border border-ink/15 bg-ivory px-4 py-3 font-sans text-sm text-ink placeholder:text-moss focus:border-forest focus:outline-none"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="font-sans text-sm font-extrabold text-ink/70"
                    >
                      Phone number <span className="text-burgundy">*</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      required
                      className="mt-1.5 w-full rounded-card border border-ink/15 bg-ivory px-4 py-3 font-sans text-sm text-ink placeholder:text-moss focus:border-forest focus:outline-none"
                      placeholder="+254 700 000 000"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="address"
                      className="font-sans text-sm font-extrabold text-ink/70"
                    >
                      Delivery address <span className="text-burgundy">*</span>
                    </label>
                    <input
                      id="address"
                      type="text"
                      required
                      className="mt-1.5 w-full rounded-card border border-ink/15 bg-ivory px-4 py-3 font-sans text-sm text-ink placeholder:text-moss focus:border-forest focus:outline-none"
                      placeholder="Street address, city, estate"
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-card border border-ink/10 bg-white p-7 shadow-card">
                <h2 className="font-display text-lg font-extrabold tracking-tight text-ink">
                  Payment Method
                </h2>
                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {([
                    { value: "mpesa" as const, label: "M-Pesa" },
                    { value: "card" as const, label: "Card" },
                    { value: "bank" as const, label: "Bank Transfer" },
                  ]).map(({ value, label }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setPaymentMethod(value)}
                      className={`flex items-center justify-center gap-2 rounded-xl border-2 px-4 py-3.5 font-sans text-sm font-bold transition-all duration-200 ${
                        paymentMethod === value
                          ? "border-forest bg-forest/5 text-forest"
                          : "border-ink/15 bg-ivory text-ink/70 hover:border-forest/50"
                      }`}
                    >
                      <CreditCard size={16} aria-hidden="true" />
                      {label}
                    </button>
                  ))}
                </div>

                {paymentMethod === "mpesa" && (
                  <div className="mt-4 rounded-card bg-sand/40 p-4">
                    <p className="font-sans text-sm text-ink/70">
                      You will receive an M-Pesa prompt on your phone at checkout. Please ensure your phone number is correct.
                    </p>
                  </div>
                )}

                {paymentMethod === "card" && (
                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="card-number"
                        className="font-sans text-sm font-extrabold text-ink/70"
                      >
                        Card number
                      </label>
                      <input
                        id="card-number"
                        type="text"
                        className="mt-1.5 w-full rounded-card border border-ink/15 bg-ivory px-4 py-3 font-sans text-sm placeholder:text-moss focus:border-forest focus:outline-none"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="card-exp"
                        className="font-sans text-sm font-extrabold text-ink/70"
                      >
                        Expiry
                      </label>
                      <input
                        id="card-exp"
                        type="text"
                        className="mt-1.5 w-full rounded-card border border-ink/15 bg-ivory px-4 py-3 font-sans text-sm placeholder:text-moss focus:border-forest focus:outline-none"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="card-cvc"
                        className="font-sans text-sm font-extrabold text-ink/70"
                      >
                        CVC
                      </label>
                      <input
                        id="card-cvc"
                        type="text"
                        className="mt-1.5 w-full rounded-card border border-ink/15 bg-ivory px-4 py-3 font-sans text-sm placeholder:text-moss focus:border-forest focus:outline-none"
                        placeholder="123"
                      />
                    </div>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => {
                  clear();
                  alert("Order placed successfully. This is a demo checkout.");
                }}
                className="btn-primary w-full py-4 text-base"
              >
                Place order
              </button>
            </div>

            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-card border border-ink/10 bg-white p-7 shadow-card">
                <h2 className="font-display text-lg font-extrabold tracking-tight text-ink">
                  Order summary
                </h2>
                <div className="mt-4 space-y-3">
                  {items.map((item) => (
                    <div key={item.book.id} className="flex items-center gap-3">
                      <div className="shrink-0">
                        <BookCover
                          book={item.book}
                          className="aspect-[2/3] w-10 rounded-soft"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="truncate font-sans text-sm font-semibold text-ink">
                          {item.book.title}
                        </p>
                        <p className="font-sans text-xs text-ink/50">
                          Qty: {item.qty}
                        </p>
                      </div>
                      <p className="shrink-0 font-sans text-sm font-extrabold text-ink">
                        KES {(item.book.priceNumber * item.qty).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 space-y-3 border-t border-ink/10 pt-4">
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
                  <div className="border-t border-ink/10 pt-3">
                    <div className="flex items-center justify-between">
                      <span className="font-sans text-sm font-extrabold text-ink">Total</span>
                      <span className="font-display text-xl font-extrabold text-forest">
                        KES {total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}