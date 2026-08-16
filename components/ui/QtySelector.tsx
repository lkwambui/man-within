"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function QtySelector({
  qty,
  onChange,
  size = "md",
  className,
}: {
  qty: number;
  onChange: (qty: number) => void;
  size?: "sm" | "md";
  className?: string;
}) {
  const btn =
    "flex items-center justify-center text-ink/60 transition-colors hover:bg-sand hover:text-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy/50";
  const btnSize = size === "sm" ? "h-8 w-8" : "h-10 w-10";
  const textSize = size === "sm" ? "text-sm" : "text-base";

  return (
    <div
      className={cn(
        "inline-flex items-center overflow-hidden rounded-full border border-ink/15 bg-white",
        className,
      )}
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(qty - 1)}
        className={cn(btn, btnSize)}
      >
        <Minus size={size === "sm" ? 13 : 15} />
      </button>
      <span
        aria-live="polite"
        className={cn("min-w-9 text-center font-sans font-extrabold text-ink", textSize)}
      >
        {qty}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(qty + 1)}
        className={cn(btn, btnSize)}
      >
        <Plus size={size === "sm" ? 13 : 15} />
      </button>
    </div>
  );
}