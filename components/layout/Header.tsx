"use client";

import { BookMarked, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { NAV_LINKS } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/lib/store";

export function Header() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-ink/5 bg-ivory/95 backdrop-blur">
      <div className="container-site flex h-[72px] items-center justify-between gap-6">
        {/* Brand */}
        <Link
          href="/"
          aria-label="Man Within home"
          className="flex shrink-0 items-center gap-2.5"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-forest text-ivory">
            <BookMarked size={18} />
          </span>
          <span className="font-display text-xl font-extrabold tracking-tight text-forest">
            MAN&nbsp;WITHIN
          </span>
        </Link>

        {/* Center nav */}
        <nav aria-label="Main navigation" className="hidden xl:block">
          <ul className="flex items-center gap-6 2xl:gap-7">
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
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Link
            href="/search"
            aria-label="Search"
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink/70 transition-colors duration-200 hover:bg-sand hover:text-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy/60"
          >
            <Search size={19} />
          </Link>
          <Link
            href="/account"
            aria-label="Account"
            className="hidden h-10 w-10 items-center justify-center rounded-full text-ink/70 transition-colors duration-200 hover:bg-sand hover:text-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy/60 sm:flex"
          >
            <User size={19} />
          </Link>
          <Link
            href="/cart"
            aria-label={`Shopping bag, ${count} ${count === 1 ? "item" : "items"}`}
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-ink/70 transition-colors duration-200 hover:bg-sand hover:text-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy/60"
          >
            <ShoppingBag size={19} />
            {count > 0 ? (
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-burgundy font-sans text-[10px] font-extrabold text-ivory">
                {count}
              </span>
            ) : null}
          </Link>

          <div className="ml-2 hidden md:block">
            <Button href="/books">Shop Now</Button>
          </div>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink/70 transition-colors duration-200 hover:bg-sand hover:text-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy/60 xl:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open ? (
        <div className="border-t border-ink/5 bg-ivory xl:hidden">
          <nav aria-label="Mobile navigation" className="container-site py-4">
            <ul className="flex flex-col">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-3 py-3 font-display text-lg font-bold text-ink/80 transition-colors hover:bg-sand hover:text-forest"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 px-3 pb-2">
              <Button href="/books" className="w-full">
                Shop Now
              </Button>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}