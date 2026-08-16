import type { Book } from "@/lib/data";
import { BookCard } from "@/components/books/BookCard";

export function BookGrid({
  books,
  className,
}: {
  books: Book[];
  className?: string;
}) {
  return (
    <div
      className={`grid grid-cols-2 gap-x-5 gap-y-9 sm:grid-cols-3 lg:grid-cols-4 ${className ?? ""}`}
    >
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}