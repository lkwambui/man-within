import { ArrowRight } from "lucide-react";
import { articles } from "@/lib/data";
import { ArticleCard } from "@/components/journal/ArticleCard";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function JournalPreview() {
  const [featured, ...rest] = articles;

  return (
    <section id="journal" className="bg-sand">
      <div className="container-site py-16 lg:py-24">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            kicker="The editorial"
            title="The Man Within Journal"
            copy="Essays, conversations and ideas worth spending time with."
          />
        </div>

        <div className="mt-10 grid gap-6">
          <ArticleCard article={featured} featured />

          <div className="grid gap-6 md:grid-cols-3">
            {rest.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <Button href="#" variant="primary" className="group">
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