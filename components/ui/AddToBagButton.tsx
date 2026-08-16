"use client";

import { Check, ShoppingBag } from "lucide-react";
import { useState } from "react";
import type { Book } from "@/lib/data";
import { useCart } from "@/lib/store";
import { cn } from "@/lib/utils";

export function AddToBagButton({
  book,
  qty = 1,
  size = "md",
  className,
}: {
  book: Book;
  qty?: number;
  size?: "md" | "lg";
  className?: string;
}) {
  const { add, has } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const inBag = has(book.id);

  const handleClick = () => {
    add(book, qty);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1600);
  };

  const sizeClasses = size === "lg" ? "px-8 py-4 text-base" : "px-6 py-3 text-sm";

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={book.stock <= 0}
      className={cn(
        "btn inline-flex w-full items-center justify-center gap-2",
        sizeClasses,
        inBag || justAdded ? "bg-forest text-ivory" : "bg-burgundy text-ivory",
        className,
      )}
    >
      {inBag || justAdded ? (
        <>
          <Check size={18} />
          In your bag
        </>
      ) : (
        <>
          <ShoppingBag size={18} />
          Add to bag
        </>
      )}
    </button>
  );
}