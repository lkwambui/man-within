import { cn } from "@/lib/utils";

type BadgeTone = "forest" | "burgundy" | "sand" | "ivory" | "outline";

const toneStyles: Record<BadgeTone, string> = {
  forest: "bg-forest text-ivory",
  burgundy: "bg-burgundy text-ivory",
  sand: "bg-sand text-forest",
  ivory: "bg-ivory text-forest",
  outline: "border border-ink/15 bg-transparent text-ink/70",
};

export function Badge({
  children,
  tone = "forest",
  className,
}: {
  children: React.ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-3 py-1 font-sans text-xs font-extrabold",
        toneStyles[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}