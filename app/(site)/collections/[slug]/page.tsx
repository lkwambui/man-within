import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  collections,
  getCollectionBySlug,
  booksByIds,
  authors,
  getAuthorBySlug,
  books,
  articles,
} from "@/lib/data";
import type { Author } from "@/lib/data";
import Link from "next/link";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { PageHeader } from "@/components/ui/PageHeader";
import { BookGrid } from "@/components/books/BookGrid";
import { AuthorCard } from "@/components/authors/AuthorCard";
import { SmartImage } from "@/components/ui/SmartImage";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) return { title: "Collection not found" };
  return {
    title: `${collection.title} | Man Within`,
    description: collection.description,
  };
}

export default async function CollectionDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);

  if (!collection) {
    return (
      <div className="bg-ivory">
        <div className="container-site py-16 lg:py-24">
          <EmptyState
            title="Collection not found"
            copy="The collection you are looking for does not exist or has been removed."
            action={
              <Button href="/collections" variant="outline" className="mt-2">
                Browse all collections
              </Button>
            }
          />
        </div>
      </div>
    );
  }

  const collectionBooks = booksByIds(collection.bookIds);

  const relatedAuthorSlugs = collectionBooks
    .map((b) => b.authorSlug)
    .filter((slug, i, arr) => arr.indexOf(slug) === i);

  const relatedAuthors = relatedAuthorSlugs
    .map((slug) => authors.find((a) => a.slug === slug))
    .filter((a): a is Author => Boolean(a));

  const relatedArticles = articles
    .filter((a) =>
      collectionBooks.some((b) => a.relatedBookIds.includes(b.id)),
    )
    .slice(0, 3);

  const breadcrumbs: Crumb[] = [
    { label: "Home", href: "/" },
    { label: "Collections", href: "/collections" },
    { label: collection.title },
  ];

  return (
    <div>
      <section className="bg-ivory">
        <div className="container-site py-6">
          <Breadcrumbs items={breadcrumbs} />
        </div>
      </section>

      <section className="relative bg-forest">
        <div className="absolute inset-0">
          <SmartImage
            src={collection.image}
            alt={collection.imageAlt}
            className="h-full w-full object-cover opacity-40"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-forest/70" />
        </div>
        <div className="relative container-site py-14 lg:py-20">
          <div className="max-w-2xl">
            <span
              className={`inline-flex rounded-full px-4 py-1.5 font-sans text-xs font-extrabold uppercase tracking-[0.1em] text-ivory backdrop-blur-sm ${
                collection.accent === "burgundy"
                  ? "bg-burgundy"
                  : collection.accent === "sand"
                    ? "bg-sand text-forest"
                    : "bg-forest"
              }`}
            >
              {collection.bookIds.length} books
            </span>
            <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ivory sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
              {collection.title}
            </h1>
            <p className="mt-4 font-sans text-lg leading-relaxed text-ivory/80">
              {collection.description}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-ivory py-12 lg:py-16">
        <div className="container-site">
          <p className="font-display text-xl font-extrabold tracking-tight text-ink">
            Books in this collection
          </p>
          <div className="mt-8">
            <BookGrid books={collectionBooks} />
          </div>
        </div>
      </section>

      {relatedAuthors.length > 0 && (
        <section className="bg-sand/40 py-12 lg:py-16">
          <div className="container-site">
            <p className="font-display text-xl font-extrabold tracking-tight text-ink">
              Related authors
            </p>
            <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
              {relatedAuthors.map((author) => (
                <AuthorCard key={author.slug} author={author} />
              ))}
            </div>
          </div>
        </section>
      )}

      {relatedArticles.length > 0 && (
        <section className="bg-ivory py-12 lg:py-16">
          <div className="container-site">
            <p className="font-display text-xl font-extrabold tracking-tight text-ink">
              Related articles
            </p>
            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
              {relatedArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/journal/${article.slug}`}
                  className="group block overflow-hidden rounded-card bg-white shadow-card transition-shadow duration-300 hover:shadow-lift"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.imageAlt}
                      className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <span className="font-sans text-xs font-extrabold uppercase tracking-[0.14em] text-burgundy">
                      {article.category}
                    </span>
                    <h3 className="mt-2 font-display text-lg font-extrabold tracking-tight text-ink transition-colors group-hover:text-forest">
                      {article.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}