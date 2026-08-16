import { authors } from "@/lib/data";
import { AuthorCard } from "@/components/authors/AuthorCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function AuthorsPreview() {
  return (
    <section id="authors" className="bg-forest text-ivory">
      <div className="container-site py-16 lg:py-24">
        <SectionHeading
          kicker="The writers"
          title="Voices from Kenya"
          copy="Meet writers shaping stories and ideas from Kenya and beyond."
          tone="dark"
        />

        <div className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {authors.map((author) => (
            <AuthorCard key={author.id} author={author} />
          ))}
        </div>
      </div>
    </section>
  );
}