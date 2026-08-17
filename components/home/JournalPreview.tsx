import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { articles } from "@/lib/data";
import { ArticleCard } from "@/components/journal/ArticleCard";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function JournalPreview() {
  const [featured, ...rest] = articles;

  return (
    <section id="journal" className="bg-white">
      <div className="container-site py-20 lg:py-28">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            kicker="The Journal"
            title="Ideas worth reading beyond the page"
            copy="Thoughtful articles, perspectives, recommendations and stories from our community of readers and writers."
          />
          <Link
            href="/journal"
            className="group mb-1 inline-flex shrink-0 items-center gap-2 font-sans text-sm font-extrabold text-burgundy transition-colors hover:text-burgundy-dark"
          >
            View all articles
            <ArrowRight size={17} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-10 grid gap-7 lg:grid-cols-2">
          <ArticleCard article={featured} featured />
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {rest.slice(0, 2).map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <Button href="/journal" variant="primary" className="group">
            Explore the Journal
            <ArrowRight
              size={17}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Button>
        </div>
      </div>
    </section>
  );
}