"use client";

import { BookMarked, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { NAV_LINKS } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/lib/store";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-ink/5 bg-ivory/95 backdrop-blur">
      <div className="container-site flex h-[80px] items-center justify-between gap-8">
        {/* Brand */}
        <Link
          href="/"
          aria-label="Man Within home"
          className="flex shrink-0 items-center gap-2.5"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest text-ivory">
            <BookMarked size={20} />
          </span>
          <span className="font-display text-xl font-extrabold tracking-tight text-forest">
            MAN&nbsp;WITHIN
          </span>
        </Link>

        {/* Center nav */}
        <nav aria-label="Main navigation" className="hidden lg:block">
          <ul className="flex items-center gap-7 xl:gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="font-sans text-[15px] font-bold text-ink/70 transition-colors duration-200 hover:text-burgundy"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/search"
            aria-label="Search"
            className="flex h-11 w-11 items-center justify-center rounded-full text-ink/70 transition-colors duration-200 hover:bg-sand hover:text-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy/60"
          >
            <Search size={20} />
          </Link>
          <Link
            href="/account"
            aria-label="Account"
            className="flex h-11 w-11 items-center justify-center rounded-full text-ink/70 transition-colors duration-200 hover:bg-sand hover:text-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy/60 hidden md:flex"
          >
            <User size={20} />
          </Link>
          <Link
            href="/wishlist"
            aria-label="Wishlist"
            className="hidden h-11 w-11 items-center justify-center rounded-full text-ink/70 transition-colors duration-200 hover:bg-sand hover:text-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy/60 lg:flex"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.5 0-2.9.5-4.1 1.4A10.5 10.5 0 0 0 8 4.5 5.5 5.5 0 0 0 2.5 9c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
          </Link>
          <Link
            href="/cart"
            aria-label={`Shopping bag, ${count} ${count === 1 ? "item" : "items"}`}
            className="relative flex h-11 w-11 items-center justify-center rounded-full text-ink/70 transition-colors duration-200 hover:bg-sand hover:text-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy/60"
          >
            <ShoppingBag size={20} />
            {count > 0 ? (
              <span className="absolute right-1.5 top-1.5 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-burgundy font-sans text-[10px] font-extrabold text-ivory">
                {count}
              </span>
            ) : null}
          </Link>

          <div className="ml-3 hidden md:block">
            <Button href="/books" variant="outline" className="!px-4 !py-2 !text-sm">Shop Books</Button>
          </div>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-full text-ink/70 transition-colors duration-200 hover:bg-sand hover:text-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy/60 lg:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open ? (
        <div className="border-t border-ink/5 bg-ivory lg:hidden">
          <nav aria-label="Mobile navigation" className="container-site py-6">
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3.5 font-display text-lg font-bold text-ink/80 transition-colors hover:bg-sand hover:text-forest"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-5 px-4 pb-3">
              <Button href="/books" variant="primary" className="w-full py-3.5 !rounded-full">Shop Books</Button>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}