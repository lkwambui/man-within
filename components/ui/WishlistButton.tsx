"use client";

import { Heart } from "lucide-react";
import type { Book } from "@/lib/data";
import { useWishlist } from "@/lib/store";
import { cn } from "@/lib/utils";

export function WishlistButton({
  book,
  className,
}: {
  book: Book;
  className?: string;
}) {
  const { has, toggle } = useWishlist();
  const active = has(book.id);

  return (
    <button
      type="button"
      aria-label={
        active ? `Remove ${book.title} from wishlist` : `Add ${book.title} to wishlist`
      }
      aria-pressed={active}
      onClick={() => toggle(book.id)}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-soft backdrop-blur transition-all duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy/60",
        active ? "text-burgundy" : "text-ink/60 hover:text-burgundy",
        className,
      )}
    >
      <Heart size={17} fill={active ? "currentColor" : "none"} />
    </button>
  );
}