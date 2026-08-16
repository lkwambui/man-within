import Image from "next/image";
import type { Author } from "@/lib/data";
import { cn } from "@/lib/utils";

export function AuthorAvatar({
  author,
  className,
}: {
  author: Author;
  className?: string;
}) {
  const initials = author.name
    .split(" ")
    .filter((part) => part && part[0] === part[0].toUpperCase())
    .slice(0, 2)
    .map((part) => part[0])
    .join("");

  if (!author.image) {
    return (
      <div
        aria-label={author.imageAlt}
        role="img"
        className={cn(
          "flex items-center justify-center bg-forest text-ivory",
          className,
        )}
      >
        <span className="font-display text-3xl font-extrabold tracking-tight">
          {initials}
        </span>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden bg-sand", className)}>
      <Image
        src={author.image}
        alt={author.imageAlt}
        width={400}
        height={400}
        className="h-full w-full object-cover"
      />
    </div>
  );
}