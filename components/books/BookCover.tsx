"use client";

import Image from "next/image";
import { useState } from "react";
import type { Book } from "@/lib/data";
import { cn } from "@/lib/utils";

/**
 * Book cover artwork. Uses the real cover image and falls back to a designed
 * Man Within cover if the image is unavailable.
 */
export function BookCover({
  book,
  className,
  priority = false,
}: {
  book: Book;
  className?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <FallbackCover book={book} className={className} />;
  }

  return (
    <div className={cn("relative overflow-hidden bg-sand", className)}>
      <Image
        src={book.cover}
        alt={`Cover of ${book.title} by ${book.author}`}
        width={500}
        height={760}
        priority={priority}
        onError={() => setFailed(true)}
        className="h-full w-full object-cover"
      />
    </div>
  );
}

function FallbackCover({ book, className }: { book: Book; className?: string }) {
  return (
    <div
      className={cn(
        "relative flex flex-col justify-between overflow-hidden bg-forest p-4",
        className,
      )}
    >
      <div className="absolute inset-0 rounded-full bg-ivory/5" aria-hidden="true" />
      <span className="font-sans text-[10px] font-extrabold uppercase tracking-[0.18em] text-ivory/70">
        Man Within
      </span>
      <div>
        <p className="font-display text-lg font-bold leading-tight text-ivory">
          {book.title}
        </p>
        <p className="mt-2 font-sans text-xs font-semibold text-ivory/70">
          {book.author}
        </p>
      </div>
      <span className="font-sans text-[10px] font-extrabold uppercase tracking-[0.18em] text-ivory/50">
        {book.category}
      </span>
    </div>
  );
}