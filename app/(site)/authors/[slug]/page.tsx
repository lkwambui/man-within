import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  authors,
  getAuthorBySlug,
  booksByAuthor,
  articlesByAuthor,
  relatedAuthorsByBook,
} from "@/lib/data";
import type { Author } from "@/lib/data";
import Link from "next/link";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { SmartImage } from "@/components/ui/SmartImage";
import { BookCarousel } from "@/components/books/BookCarousel";
import { ArticleCard } from "@/components/journal/ArticleCard";
import { AuthorCard } from "@/components/authors/AuthorCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return authors.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);
  if (!author) return { title: "Author not found" };
  return {
    title: `${author.name} | Man Within`,
    description: author.bio.slice(0, 160),
  };
}

export default async function AuthorDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);

  if (!author) {
    return (
      <div className="bg-ivory">
        <div className="container-site py-16 lg:py-24">
          <EmptyState
            title="Author not found"
            copy="The author you are looking for does not exist or has been removed."
            action={
              <Button href="/authors" variant="outline" className="mt-2">
                Browse all authors
              </Button>
            }
          />
        </div>
      </div>
    );
  }

  const authorBooks = booksByAuthor(slug);
  const authorArticles = articlesByAuthor(slug);

  const relatedAuthors = (() => {
    if (authorBooks.length === 0) return [];
    const related = relatedAuthorsByBook(authorBooks[0]);
    return related.filter((a: Author) => a.slug !== slug).slice(0, 4);
  })();

  const breadcrumbs: Crumb[] = [
    { label: "Home", href: "/" },
    { label: "Authors", href: "/authors" },
    { label: author.name },
  ];

  return (
    <div>
      <section className="bg-ivory">
        <div className="container-site py-6">
          <Breadcrumbs items={breadcrumbs} />
        </div>
      </section>

      <section className="bg-ivory pb-12 lg:pb-16">
        <div className="container-site">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[280px_1fr] lg:gap-14">
            <div className="flex justify-center lg:justify-start">
              <div className="w-full max-w-[280px]">
                <div className="overflow-hidden rounded-card shadow-card">
                  <SmartImage
                    src={author.image}
                    alt={author.imageAlt}
                    className="aspect-[3/4] w-full"
                    sizes="(min-width: 768px) 280px, 50vw"
                  />
                </div>
              </div>
            </div>
            <div>
              <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-[2.75rem]">
                {author.name}
              </h1>
              <p className="mt-2 font-sans text-base font-extrabold text-burgundy">
                {author.role}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <span className="font-sans text-sm font-semibold text-ink/60">
                  {author.location}
                </span>
                <span className="h-1 w-1 rounded-full bg-ink/30" aria-hidden="true" />
                <span className="font-sans text-sm font-semibold text-ink/60">
                  {authorBooks.length} books
                </span>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {author.genres.map((genre) => (
                  <span
                    key={genre}
                    className="rounded-full bg-sand px-3.5 py-1.5 font-sans text-xs font-extrabold uppercase tracking-[0.1em] text-ink/70"
                  >
                    {genre}
                  </span>
                ))}
              </div>
              <p className="mt-6 max-w-2xl font-sans text-[15px] leading-[1.75] text-ink/70">
                {author.bio}
              </p>
              <div className="mt-6">
                <p className="font-sans text-sm font-semibold text-ink/40">
                  Share
                </p>
                <div className="mt-2 flex items-center gap-3 text-sm font-semibold text-ink/40">
                  <span>Instagram</span>
                  <span className="h-1 w-1 rounded-full bg-ink/20" aria-hidden="true" />
                  <span>Twitter</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {authorBooks.length > 0 && (
        <section className="bg-ivory py-12 lg:py-16">
          <div className="container-site">
            <p className="font-display text-2xl font-extrabold tracking-tight text-ink">
              Books by {author.name.split(" ")[0]}
            </p>
            <div className="mt-6">
              <BookCarousel books={authorBooks} />
            </div>
          </div>
        </section>
      )}

      {authorArticles.length > 0 && (
        <section className="bg-sand/40 py-12 lg:py-16">
          <div className="container-site">
            <p className="font-display text-2xl font-extrabold tracking-tight text-ink">
              Articles about {author.name.split(" ")[0]}
            </p>
            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {authorArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}

      {relatedAuthors.length > 0 && (
        <section className="bg-ivory py-12 lg:py-16">
          <div className="container-site">
            <p className="font-display text-2xl font-extrabold tracking-tight text-ink">
              Related authors
            </p>
            <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
              {relatedAuthors.map((a: Author) => (
                <AuthorCard key={a.slug} author={a} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}