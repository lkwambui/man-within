import { Suspense } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import SearchFormClient from "./search-form";
import SearchResults from "./search-results";
import { Search } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Search | Man Within",
  description: "Search books, authors, articles, and collections.",
};

export default function SearchPage() {
  return (
    <div>
      <PageHeader
        title="Search"
        copy="Search books, authors, articles, and collections across the entire site."
      />

      <section className="bg-ivory pb-10">
        <div className="container-site">
          <Suspense
            fallback={
              <div className="relative max-w-2xl">
                <div className="h-14 w-full animate-pulse rounded-card bg-sand/60" />
              </div>
            }
          >
            <SearchFormClient />
          </Suspense>
        </div>
      </section>

      <Suspense
        fallback={
          <div className="bg-ivory py-20 text-center font-sans text-sm text-ink/40">
            Searching...
          </div>
        }
      >
        <SearchResults />
      </Suspense>
    </div>
  );
}