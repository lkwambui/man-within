import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  readingLists,
  getReadingListBySlug,
  booksByIds,
  getBookBySlug,
  articles,
} from "@/lib/data";
import Link from "next/link";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { PageHeader } from "@/components/ui/PageHeader";
import { BookCover } from "@/components/books/BookCover";
import { WishlistButton } from "@/components/ui/WishlistButton";
import { AddToBagButton } from "@/components/ui/AddToBagButton";
import { SmartImage } from "@/components/ui/SmartImage";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return readingLists.map((rl) => ({ slug: rl.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const list = getReadingListBySlug(slug);
  if (!list) return { title: "Reading list not found" };
  return {
    title: `${list.title} | Man Within Reading Lists`,
    description: list.description,
  };
}

export default async function ReadingListDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const list = getReadingListBySlug(slug);

  if (!list) {
    return (
      <div className="bg-ivory">
        <div className="container-site py-16 lg:py-24">
          <EmptyState
            title="Reading list not found"
            copy="The list you are looking for does not exist or has been removed."
            action={
              <Button href="/reading-lists" variant="outline" className="mt-2">
                Browse all lists
              </Button>
            }
          />
        </div>
      </div>
    );
  }

  const listBooks = booksByIds(list.bookIds);

  const breadcrumbs: Crumb[] = [
    { label: "Home", href: "/" },
    { label: "Reading lists", href: "/reading-lists" },
    { label: list.title },
  ];

  return (
    <div>
      <section className="bg-ivory">
        <div className="container-site py-6">
          <Breadcrumbs items={breadcrumbs} />
        </div>
      </section>

      <section className="bg-ivory pb-10">
        <div className="container-site">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px] lg:gap-12">
            <div>
              <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-[2.75rem]">
                {list.title}
              </h1>
              <p className="mt-3 font-sans text-base leading-relaxed text-ink/60">
                {list.description}
              </p>
              <p className="mt-2 font-sans text-sm font-bold text-burgundy">
                Curated by {list.curator}
              </p>
            </div>
            <div className="overflow-hidden rounded-card shadow-card">
              <SmartImage
                src={list.image}
                alt={list.imageAlt}
                className="aspect-[4/3] w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ivory pb-12">
        <div className="container-site">
          <div className="space-y-4">
            {listBooks.map((book, index) => (
              <div
                key={book.id}
                className="flex gap-5 rounded-card border border-ink/10 bg-white p-5 shadow-card transition-shadow duration-300 hover:shadow-lift"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest font-display text-lg font-extrabold text-ivory">
                  {index + 1}
                </span>
                <Link
                  href={`/books/${book.slug}`}
                  className="shrink-0"
                  aria-label={`View ${book.title}`}
                >
                  <BookCover book={book} className="aspect-[2/3] w-20 sm:w-24" />
                </Link>
                <div className="flex flex-1 flex-col">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <Link
                        href={`/books/${book.slug}`}
                        className="font-display text-lg font-bold tracking-tight text-ink transition-colors hover:text-forest"
                      >
                        {book.title}
                      </Link>
                      <p className="mt-1 font-sans text-sm font-semibold text-ink/60">
                        {book.author}
                      </p>
                      <p className="mt-2 font-sans text-[13px] leading-relaxed text-ink/50 line-clamp-2">
                        {book.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 sm:flex-col sm:items-end">
                      <p className="font-sans text-sm font-extrabold text-forest">
                        {book.price}
                      </p>
                      <p className="font-sans text-xs font-semibold text-ink/40">
                        {book.stock > 0 ? `${book.stock} in stock` : "Out of stock"}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <AddToBagButton book={book} size="md" className="w-auto" />
                    <WishlistButton book={book} className="!h-8 !w-8" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}