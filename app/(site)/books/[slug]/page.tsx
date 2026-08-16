import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getBookBySlug,
  booksByAuthor,
  books,
  getAuthorBySlug,
} from "@/lib/data";
import Link from "next/link";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { BookCover } from "@/components/books/BookCover";
import { Rating } from "@/components/ui/Rating";
import { QtySelector } from "@/components/ui/QtySelector";
import { AddToBagButton } from "@/components/ui/AddToBagButton";
import { Button } from "@/components/ui/Button";
import { BookCarousel } from "@/components/books/BookCarousel";
import BookTabsClient from "./BookTabsClient";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const book = getBookBySlug(slug);
  if (!book) return { title: "Book not found" };
  return {
    title: `${book.title} by ${book.author} | Man Within`,
    description: book.description,
  };
}

export default async function BookDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const book = getBookBySlug(slug);

  if (!book) {
    notFound();
  }

  const author = getAuthorBySlug(book.authorSlug);
  const authorLink = `/authors/${book.authorSlug}`;

  const sameAuthorBooks = booksByAuthor(book.authorSlug).filter(
    (b) => b.slug !== book.slug,
  );

  const relatedBooks = books
    .filter(
      (b) =>
        b.slug !== book.slug &&
        b.categorySlugs.some((c) => book.categorySlugs.includes(c)),
    )
    .slice(0, 8);

  const breadcrumbs: Crumb[] = [
    { label: "Books", href: "/books" },
    { label: book.category, href: `/books?category=${book.categorySlugs[0]}` },
    { label: book.title },
  ];

  return (
    <>
      <section className="bg-ivory">
        <div className="container-site py-6">
          <Breadcrumbs items={breadcrumbs} />
        </div>
      </section>

      <section className="bg-ivory pb-10">
        <div className="container-site">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="flex justify-center lg:justify-start">
              <div className="w-full max-w-[380px]">
                <BookCover book={book} className="aspect-[2/3] rounded-card shadow-card" />
              </div>
            </div>
            <BookDetails book={book} author={author} authorLink={authorLink} />
          </div>
        </div>
      </section>

      <BookTabsClient book={book} author={author} />

      {sameAuthorBooks.length > 0 && (
        <section className="bg-ivory py-12 lg:py-16">
          <div className="container-site">
            <p className="font-display text-2xl font-extrabold tracking-tight text-ink">
              More from this author
            </p>
            <div className="mt-6">
              <BookCarousel books={sameAuthorBooks} />
            </div>
          </div>
        </section>
      )}

      {relatedBooks.length > 0 && (
        <section className="bg-ivory pb-16 lg:pb-24">
          <div className="container-site">
            <p className="font-display text-2xl font-extrabold tracking-tight text-ink">
              You may also like
            </p>
            <div className="mt-6">
              <BookCarousel books={relatedBooks} />
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function BookDetails({
  book,
  author,
  authorLink,
}: {
  book: NonNullable<ReturnType<typeof getBookBySlug>>;
  author: ReturnType<typeof getAuthorBySlug>;
  authorLink: string;
}) {
  return (
    <div>
      <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-[2.75rem]">
        {book.title}
      </h1>
      <div className="mt-3">
        <Link
          href={authorLink}
          className="font-sans text-base font-extrabold text-forest underline decoration-forest/30 underline-offset-4 transition-colors hover:text-forest/70"
        >
          {book.author}
        </Link>
      </div>
      <div className="mt-3">
        <Rating rating={book.rating} reviews={book.reviews} />
      </div>
      <div className="mt-6">
        <p className="font-display text-3xl font-extrabold tracking-tight text-forest">
          {book.price}
        </p>
      </div>
      <div className="mt-2">
        <p
          className={`font-sans text-sm font-semibold ${
            book.stock > 0 ? "text-forest" : "text-burgundy"
          }`}
        >
          {book.stock > 0
            ? `In stock (${book.stock} copies)`
            : "Currently out of stock"}
        </p>
      </div>
      <div className="mt-6 flex flex-col gap-3">
        <QtySelector qty={1} onChange={() => {}} />
        <AddToBagButton book={book} size="lg" />
        <Button variant="accent" href={`/checkout?book=${book.id}`} className="w-full">
          Buy now
        </Button>
      </div>
    </div>
  );
}