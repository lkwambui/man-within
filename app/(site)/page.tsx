import { Hero } from "@/components/home/Hero";
import { Discovery } from "@/components/home/Discovery";
import { FeaturedBooks } from "@/components/home/FeaturedBooks";
import { NewArrivals } from "@/components/home/NewArrivals";
import { Collections } from "@/components/home/Collections";
import { JournalPreview } from "@/components/home/JournalPreview";
import { Newsletter } from "@/components/home/Newsletter";
import { ReadingLists } from "@/components/home/ReadingLists";
import { AuthorsPreview } from "@/components/home/AuthorsPreview";

export default function Home() {
  return (
    <>
      <Hero />
      <Discovery />
      <FeaturedBooks />
      <NewArrivals />
      <Collections />
      <JournalPreview />
      <Newsletter />
      <ReadingLists />
      <AuthorsPreview />
    </>
  );
}