import { Hero } from "@/components/home/Hero";
import { Discovery } from "@/components/home/Discovery";
import { FeaturedBooks } from "@/components/home/FeaturedBooks";
import { Collections } from "@/components/home/Collections";
import { JournalPreview } from "@/components/home/JournalPreview";
import { AuthorsPreview } from "@/components/home/AuthorsPreview";
import { ReadingLists } from "@/components/home/ReadingLists";
import { Newsletter } from "@/components/home/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <Discovery />
      <FeaturedBooks />
      <Collections />
      <JournalPreview />
      <AuthorsPreview />
      <ReadingLists />
      <Newsletter />
    </>
  );
}
