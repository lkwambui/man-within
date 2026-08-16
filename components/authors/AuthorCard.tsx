import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { Author } from "@/lib/data";
import { SmartImage } from "@/components/ui/SmartImage";

export function AuthorCard({ author }: { author: Author }) {
  return (
    <article className="group">
      <div className="relative overflow-hidden rounded-card">
        <SmartImage
          src={author.image}
          alt={author.imageAlt}
          className="aspect-[4/5] w-full"
          imgClassName="transition-transform duration-500 group-hover:scale-[1.04]"
          sizes="(min-width: 768px) 25vw, 50vw"
        />
        <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-ivory text-forest opacity-0 transition-all duration-300 group-hover:opacity-100">
          <ArrowUpRight size={17} />
        </span>
      </div>
      <h3 className="mt-4 font-display text-xl font-extrabold tracking-tight text-ivory">
        {author.name}
      </h3>
      <p className="font-sans text-sm font-bold text-ivory/60">{author.role}</p>
      <p className="mt-2 font-sans text-sm leading-relaxed text-ivory/50">{author.note}</p>
      <Link
        href="#"
        className="mt-3 inline-block font-sans text-sm font-extrabold text-ivory/80 underline decoration-ivory/30 underline-offset-4 transition-colors duration-200 hover:text-ivory"
      >
        View author
      </Link>
    </article>
  );
}