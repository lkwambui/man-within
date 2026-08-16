"use client";

import Link from "next/link";
import { adminNav } from "@/lib/data";
import { BookMarked } from "lucide-react";

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-ink/[0.03]">
      <div className="flex">
        <aside className="hidden w-64 shrink-0 border-r border-ink/10 bg-forest lg:sticky lg:top-0 lg:h-screen">
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