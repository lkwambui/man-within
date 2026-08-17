import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { Author } from "@/lib/data";
import {
  categories,
  categoryBySlug,
  booksByCategory,
  authors,
  relatedAuthorsByBook,
} from "@/lib/data";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { PageHeader } from "@/components/ui/PageHeader";
import { BookGrid } from "@/components/books/BookGrid";
import { BookCarousel } from "@/components/books/BookCarousel";
import { AuthorCard } from "@/components/authors/AuthorCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = categoryBySlug(slug);
  if (!category) return { title: "Category not found" };
  return {
    title: `${category.title} | Man Within`,
    description: category.description,
  };
}

export default async function CategoryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const category = categoryBySlug(slug);

  if (!category) {
    return (
      <div className="bg-ivory">
        <div className="container-site py-16 lg:py-24">
          <EmptyState
            title="Category not found"
            copy="The category you are looking for does not exist or has been removed."
            action={
              <Button href="/categories" variant="outline" className="mt-2">
                Browse all categories
              </Button>
            }
          />
        </div>
      </div>
    );
  }

  const categoryBooks = booksByCategory(slug);
  const featuredBooks = categoryBooks.slice(0, 4);

  const uniqueAuthorSlugs = [
    ...new Set(
      featuredBooks.flatMap((book) =>
        relatedAuthorsByBook(book).map((a) => a.slug),
      ),
    ),
  ];

  const categoryAuthors: Author[] = uniqueAuthorSlugs
    .map((slug) => authors.find((a) => a.slug === slug))
    .filter((a): a is Author => a !== undefined);

  const breadcrumbs: Crumb[] = [
    { label: "Home", href: "/" },
    { label: "Categories", href: "/categories" },
    { label: category.title },
  ];

  return (
    <div>
      <section className="bg-ivory">
        <div className="container-site py-6">
          <Breadcrumbs items={breadcrumbs} />
        </div>
      </section>

      <PageHeader
        title={category.title}
        copy={category.description}
        align="left"
      />

      <section className="bg-ivory pb-12">
        <div className="container-site">
          {featuredBooks.length > 0 && (
            <div>
              <p className="font-display text-xl font-extrabold tracking-tight text-ink">
                Featured
              </p>
              <div className="mt-6">
                <BookCarousel books={featuredBooks} />
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="bg-ivory pb-12">
        <div className="container-site">
          <p className="font-display text-xl font-extrabold tracking-tight text-ink">
            All books in this category
          </p>
          <div className="mt-6">
            <BookGrid books={categoryBooks} />
          </div>
        </div>
      </section>

      {categoryAuthors.length > 0 && (
        <section className="bg-ivory pb-16 lg:pb-24">
          <div className="container-site">
            <p className="font-display text-xl font-extrabold tracking-tight text-ink">
              Related authors
            </p>
            <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {categoryAuthors.map((author) => (
                <AuthorCard key={author.slug} author={author} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}