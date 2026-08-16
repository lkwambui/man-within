import { ArrowRight, Clock } from "lucide-react";
import Link from "next/link";
import type { Article } from "@/lib/data";
import { SmartImage } from "@/components/ui/SmartImage";

export function ArticleCard({
  article,
  featured = false,
}: {
  article: Article;
  featured?: boolean;
}) {
  if (featured) {
    return (
      <article className="group grid overflow-hidden rounded-card bg-white shadow-card transition-shadow duration-300 hover:shadow-lift lg:grid-cols-2">
        <div className="relative overflow-hidden">
          <SmartImage
            src={article.image}
            alt={article.imageAlt}
            className="h-64 w-full lg:h-full"
            imgClassName="transition-transform duration-500 group-hover:scale-[1.04]"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
        <div className="flex flex-col justify-center p-7 lg:p-10">
          <p className="font-sans text-xs font-extrabold uppercase tracking-[0.14em] text-burgundy">
            {article.category}
          </p>
          <h3 className="mt-3 font-display text-2xl font-extrabold leading-snug tracking-tight text-ink sm:text-3xl">
            {article.title}
          </h3>
          <p className="mt-3 font-sans text-[15px] leading-relaxed text-ink/60">
            {article.excerpt}
          </p>
          <div className="mt-5 flex items-center gap-3 font-sans text-sm font-semibold text-ink/50">
            <span>{article.author}</span>
            <span className="h-1 w-1 rounded-full bg-ink/30" aria-hidden="true" />
            <span className="inline-flex items-center gap-1.5">
              <Clock size={14} />
              {article.readTime}
            </span>
          </div>
          <Link
            href="#"
            className="mt-6 inline-flex w-fit items-center gap-2 font-sans text-sm font-extrabold text-forest transition-colors duration-200 hover:text-burgundy"
          >
            Read article
            <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-card bg-white shadow-card transition-shadow duration-300 hover:shadow-lift">
      <div className="relative overflow-hidden">
        <SmartImage
          src={article.image}
          alt={article.imageAlt}
          className="aspect-[16/10] w-full"
          imgClassName="transition-transform duration-500 group-hover:scale-[1.05]"
          sizes="(min-width: 768px) 33vw, 100vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="font-sans text-xs font-extrabold uppercase tracking-[0.14em] text-burgundy">
          {article.category}
        </p>
        <h3 className="mt-2 font-display text-xl font-extrabold leading-snug tracking-tight text-ink transition-colors duration-200 group-hover:text-forest">
          {article.title}
        </h3>
        <p className="mt-2 line-clamp-2 font-sans text-[15px] leading-relaxed text-ink/60">
          {article.excerpt}
        </p>
        <div className="mt-auto flex items-center gap-3 pt-5 font-sans text-sm font-semibold text-ink/50">
          <span>{article.author}</span>
          <span className="h-1 w-1 rounded-full bg-ink/30" aria-hidden="true" />
          <span className="inline-flex items-center gap-1.5">
            <Clock size={14} />
            {article.readTime}
          </span>
        </div>
      </div>
    </article>
  );
}