"use client";

import { BookMarked, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { adminNav } from "@/lib/data";

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-ink/[0.03]">
      {/* Mobile top bar */}
      <div className="flex h-14 items-center justify-between border-b border-ink/10 bg-forest px-4 lg:hidden">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ivory/15 text-ivory">
            <BookMarked size={16} />
          </span>
          <span className="font-display text-sm font-extrabold tracking-tight text-ivory">
            MAN WITHIN
          </span>
          <span className="font-sans text-[10px] font-extrabold uppercase tracking-widest text-ivory/50">
            Admin
          </span>
        </Link>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-ivory/80 transition-colors hover:bg-ivory/10"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-72 bg-forest shadow-2xl overflow-y-auto">
            <div className="flex h-16 items-center gap-2.5 border-b border-ivory/10 px-5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ivory/15 text-ivory">
                <BookMarked size={16} />
              </span>
              <span className="font-display text-sm font-extrabold tracking-tight text-ivory">
                MAN WITHIN
              </span>
              <span className="font-sans text-[10px] font-extrabold uppercase tracking-widest text-ivory/50">
                Admin
              </span>
            </div>
            <nav aria-label="Mobile admin navigation" className="py-4 px-3">
              <ul className="space-y-0.5">
                {adminNav.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center rounded-xl px-4 py-3.5 font-sans text-base font-semibold text-ivory/80 transition-colors hover:bg-ivory/10 hover:text-ivory"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>
      )}

      <div className="flex">
        <aside className="hidden lg:block w-64 shrink-0 border-r border-ink/10 bg-forest lg:sticky lg:top-0 lg:h-screen">
          <div className="flex h-16 items-center gap-2.5 border-b border-ivory/10 px-6">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ivory/15 text-ivory">
              <BookMarked size={16} />
            </span>
            <span className="font-display text-sm font-extrabold tracking-tight text-ivory">
              MAN WITHIN
            </span>
            <span className="font-sans text-[10px] font-extrabold uppercase tracking-widest text-ivory/50">
              Admin
            </span>
          </div>
          <nav aria-label="Admin navigation" className="py-4 px-3">
            <ul className="space-y-0.5">
              {adminNav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center rounded-xl px-3.5 py-2.5 font-sans text-sm font-semibold text-ivory/70 transition-colors hover:bg-ivory/10 hover:text-ivory"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}