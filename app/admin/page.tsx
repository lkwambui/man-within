import { books, articles, authors, bestsellers } from "@/lib/data";
import { adminNav } from "@/lib/data";
import { PageHeader } from "@/components/ui/PageHeader";
import { BookCard } from "@/components/books/BookCard";
import { ArticleCard } from "@/components/journal/ArticleCard";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { TrendingUp, BookOpen, Users, Package, FileText, AlertTriangle } from "lucide-react";

export default function AdminDashboard() {
  const lowStockBooks = books.filter((b) => b.stock < 15);
  const totalRevenue = books.reduce((sum, b) => sum + b.priceNumber, 0);
  const totalStock = books.reduce((sum, b) => sum + b.stock, 0);
  const publishedArticles = articles.length;

  const stats = [
    { label: "Revenue catalog value", value: `KES ${(totalRevenue / 1000).toFixed(0)}k`, icon: TrendingUp },
    { label: "Total books", value: books.length.toString(), icon: BookOpen },
    { label: "Authors", value: authors.length.toString(), icon: Users },
    { label: "Published articles", value: publishedArticles.toString(), icon: FileText },
    { label: "Total inventory", value: totalStock.toString(), icon: Package },
    { label: "Low stock alerts", value: lowStockBooks.length.toString(), icon: AlertTriangle },
  ];

  return (
    <div>
      <PageHeader title="Dashboard" copy="Overview of your bookstore and editorial platform." />

      <section className="bg-ivory/50 py-8 lg:pb-16">
        <div className="container-site">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {adminNav.slice(0, 6).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="shrink-0 rounded-full bg-white px-4 py-2 font-sans text-sm font-semibold text-ink/70 shadow-soft transition-colors hover:text-forest"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <Button href="/admin/books">Add book</Button>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {stats.map(({ label, value, icon: Icon }) => (
              <div
                key={label}
                className="rounded-card border border-ink/8 bg-white p-5 shadow-card"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-forest/10 text-forest">
                  <Icon size={17} />
                </span>
                <p className="mt-3 font-display text-xl font-extrabold text-ink">
                  {value}
                </p>
                <p className="mt-0.5 font-sans text-[11px] font-bold uppercase tracking-[0.1em] text-ink/50">
                  {label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg font-extrabold tracking-tight text-ink">
                  Popular books this month
                </h2>
                <Link
                  href="/admin/books"
                  className="font-sans text-sm font-bold text-forest hover:text-burgundy"
                >
                  View all
                </Link>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-5 sm:grid-cols-4">
                {bestsellers.slice(0, 4).map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-display text-lg font-extrabold tracking-tight text-ink">
                Recent articles
              </h2>
              <div className="mt-5 space-y-4">
                {articles.slice(0, 4).map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </div>
          </div>

          {lowStockBooks.length > 0 && (
            <div className="mt-10">
              <h2 className="font-display text-lg font-extrabold tracking-tight text-burgundy">
                Low stock alerts
              </h2>
              <p className="mt-1 font-sans text-sm text-ink/50">
                {lowStockBooks.length} books below the minimum stock threshold
              </p>
              <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {lowStockBooks.map((book) => (
                  <div
                    key={book.id}
                    className="rounded-card border border-burgundy/20 bg-burgundy/5 p-4 shadow-soft"
                  >
                    <p className="font-display text-sm font-bold text-ink">
                      {book.title}
                    </p>
                    <p className="mt-1 font-sans text-xs text-ink/60">
                      {book.author}
                    </p>
                    <p className="mt-2 font-sans text-xs font-extrabold text-burgundy">
                      {book.stock} in stock
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}