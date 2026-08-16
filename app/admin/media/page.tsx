import { books, articles, categories, collections, authors, readingLists } from "@/lib/data";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";

const imageGroups = [
  {
    label: "Book covers",
    images: [
      ...books.map((b) => ({ src: b.cover, alt: b.title, name: b.title })),
    ].slice(0, 12),
  },
  {
    label: "Article images",
    images: [
      ...articles.map((a) => ({ src: a.image, alt: a.title, name: a.title })),
    ],
  },
  {
    label: "Collection images",
    images: [
      ...collections.map((c) => ({ src: c.image, alt: c.title, name: c.title })),
    ],
  },
  {
    label: "Category images",
    images: [
      ...categories.map((c) => ({ src: c.image, alt: c.title, name: c.title })),
    ],
  },
  {
    label: "Author portraits",
    images: authors
      .filter((a) => a.image)
      .map((a) => ({ src: a.image, alt: a.name, name: a.name })),
  },
  {
    label: "Reading list images",
    images: [
      ...readingLists.map((r) => ({ src: r.image, alt: r.title, name: r.title })),
    ],
  },
];

export default function AdminMediaPage() {
  return (
    <div>
      <PageHeader
        title="Media library"
        copy="Manage images for books, articles, collections, and authors."
        className="bg-white"
      />

      <section className="border-b border-ink/5 bg-white py-6">
        <div className="container-site flex items-center justify-between">
          <p className="font-sans text-sm text-ink/50">
            {imageGroups.reduce((sum, g) => sum + g.images.length, 0)} files
          </p>
          <Button variant="outline">Upload new</Button>
        </div>
      </section>

      <section className="bg-ivory/50 py-8 lg:pb-16">
        <div className="container-site space-y-10">
          {imageGroups.map((group) => (
            <div key={group.label}>
              <h2 className="font-display text-sm font-extrabold uppercase tracking-[0.12em] text-ink/50">
                {group.label}
              </h2>
              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {group.images.map((img, i) => (
                  <div
                    key={i}
                    className="group relative aspect-square overflow-hidden rounded-xl bg-sand/50 shadow-soft"
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent px-3 py-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      <p className="truncate font-sans text-[10px] font-bold text-ivory">
                        {img.name}
                      </p>
                    </div>
                  </div>
                ))}
                {group.images.length === 0 && (
                  <div className="col-span-full py-8 text-center">
                    <p className="font-sans text-sm text-ink/35">No images in this category yet.</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}