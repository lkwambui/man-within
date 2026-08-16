import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getArticleBySlug,
  articles,
  booksByIds,
  getArticleBySlug as getArticle,
} from "@/lib/data";
import Link from "next/link";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { ArticleMeta } from "@/components/journal/ArticleBody";
import { ArticleBody } from "@/components/journal/ArticleBody";
import { BookGrid } from "@/components/books/BookGrid";
import { ArticleCard } from "@/components/journal/ArticleCard";
import { SmartImage } from "@/components/ui/SmartImage";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Article not found" };
  return {
    title: `${article.title} | Man Within Journal`,
    description: article.excerpt,
  };
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return (
      <div className="bg-ivory">
        <div className="container-site py-16 lg:py-24">
          <EmptyState
            title="Article not found"
            copy="The article you are looking for does not exist or has been removed."
            action={
              <Button href="/journal" variant="outline" className="mt-2">
                Browse the Journal
              </Button>
            }
          />
        </div>
      </div>
    );
  }

  const relatedBooks = booksByIds(article.relatedBookIds);

  const sameCategoryArticles = articles
    .filter((a) => a.category === article.category && a.slug !== article.slug)
    .slice(0, 3);

  const titleTruncated = article.title.length > 50
    ? article.title.slice(0, 47) + "..."
    : article.title;

  const breadcrumbs: Crumb[] = [
    { label: "Journal", href: "/journal" },
    { label: article.category, href: `/journal?category=${article.category}` },
    { label: titleTruncated },
  ];

  return (
    <div>
      <section className="bg-ivory">
        <div className="container-site py-6">
          <Breadcrumbs items={breadcrumbs} />
        </div>
      </section>

      <article className="bg-ivory pb-12">
        <div className="container-site">
          <div className="max-w-3xl">
            <span className="font-sans text-xs font-extrabold uppercase tracking-[0.14em] text-burgundy">
              {article.category}
            </span>
            <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
              {article.title}
            </h1>
            {article.subtitle && (
              <p className="mt-3 font-sans text-lg leading-relaxed text-ink/60">
                {article.subtitle}
              </p>
            )}
            <div className="mt-5">
              <ArticleMeta
                category={article.category}
                author={article.author}
                authorSlug={article.authorSlug}
                date={article.date}
                readTime={article.readTime}
              />
            </div>
          </div>
        </div>
      </article>

      <div className="bg-ivory pb-10">
        <div className="container-site">
          <div className="overflow-hidden rounded-card shadow-card">
            <SmartImage
              src={article.image}
              alt={article.imageAlt}
              className="aspect-[21/9] w-full"
              sizes="(min-width: 768px) 900px, 100vw"
            />
          </div>
        </div>
      </div>

      <section className="bg-ivory pb-16 lg:pb-24">
        <div className="container-site">
          <div className="mx-auto max-w-2xl">
            <ArticleBody blocks={article.content} />

            {sameCategoryArticles.length > 0 && (
              <div className="mt-16 border-t border-ink/10 pt-12">
                <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink">
                  Continue Reading
                </h2>
                <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
                  {sameCategoryArticles.map((a) => (
                    <ArticleCard key={a.id} article={a} />
                  ))}
                </div>
              </div>
            )}

            {relatedBooks.length > 0 && (
              <div className="mt-16 border-t border-ink/10 pt-12">
                <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink">
                  Books mentioned in this article
                </h2>
                <div className="mt-8">
                  <BookGrid books={relatedBooks} />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}