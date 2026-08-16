import Link from "next/link";
import { SmartImage } from "@/components/ui/SmartImage";
import type { ArticleBlock } from "@/lib/data";

export function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="prose-man-within space-y-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "p":
            return (
              <p key={i} className="font-sans text-[17px] leading-[1.75] text-ink/75">
                {block.text}
              </p>
            );
          case "h2":
            return (
              <h2
                key={i}
                className="mt-10 font-display text-2xl font-extrabold tracking-tight text-ink first:mt-0"
              >
                {block.text}
              </h2>
            );
          case "quote":
            return (
              <blockquote
                key={i}
                className="border-l-4 border-burgundy py-2 pl-6 font-display text-xl font-bold italic leading-snug text-forest"
              >
                {block.text}
              </blockquote>
            );
          case "image":
            return (
              <figure key={i} className="my-8 overflow-hidden rounded-card">
                <SmartImage
                  src={block.src}
                  alt={block.alt}
                  className="aspect-[16/10] w-full"
                  sizes="(min-width: 768px) 720px, 100vw"
                />
                {block.caption ? (
                  <figcaption className="mt-3 font-sans text-sm text-ink/50">
                    {block.caption}
                  </figcaption>
                ) : null}
              </figure>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

export function ArticleMeta({
  category,
  author,
  authorSlug,
  date,
  readTime,
}: {
  category: string;
  author: string;
  authorSlug?: string;
  date: string;
  readTime: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3 font-sans text-sm font-semibold text-ink/50">
      <span className="font-extrabold uppercase tracking-[0.12em] text-burgundy">
        {category}
      </span>
      <span className="h-1 w-1 rounded-full bg-ink/30" aria-hidden="true" />
      {authorSlug ? (
        <Link href={`/authors/${authorSlug}`} className="transition-colors hover:text-forest">
          {author}
        </Link>
      ) : (
        <span>{author}</span>
      )}
      <span className="h-1 w-1 rounded-full bg-ink/30" aria-hidden="true" />
      <span>{date}</span>
      <span className="h-1 w-1 rounded-full bg-ink/30" aria-hidden="true" />
      <span>{readTime}</span>
    </div>
  );
}
