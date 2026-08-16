import { PageHeader } from "@/components/ui/PageHeader";
import { CategoryCard } from "@/components/categories/CategoryCard";
import { categories } from "@/lib/data";

export default function CategoriesPage() {
  return (
    <div>
      <PageHeader
        title="Explore by category"
        copy="Browse books by subject, theme or region."
      />
      <section className="bg-ivory pb-16 lg:pb-24">
        <div className="container-site">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}