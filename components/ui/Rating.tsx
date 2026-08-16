import { Star } from "lucide-react";

export function Rating({
  rating,
  reviews,
  className,
}: {
  rating: number;
  reviews?: number;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-1.5 ${className ?? ""}`}>
      <span className="flex items-center gap-0.5">
        <Star size={14} className="fill-burgundy text-burgundy" />
        <span className="font-sans text-sm font-bold text-ink">{rating.toFixed(1)}</span>
      </span>
      {reviews !== undefined ? (
        <span className="font-sans text-xs text-ink/40">({reviews.toLocaleString()})</span>
      ) : null}
    </span>
  );
}