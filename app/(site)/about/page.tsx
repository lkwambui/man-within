import { BookOpen, Globe2, Users, Heart, BookMarked, Sparkles } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-forest py-20 lg:py-28">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full border-[16px] border-ivory/10" aria-hidden="true" />
        <div className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full border-[12px] border-burgundy/30" aria-hidden="true" />
        <div className="relative container-site">
          <p className="font-sans text-sm font-extrabold uppercase tracking-[0.14em] text-burgundy">
            Our story
          </p>
          <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ivory sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1]">
            Born in Kenya.
            <br />
            <span className="text-sand">Open to the world.</span>
          </h1>
          <p className="mt-6 max-w-xl font-sans text-lg leading-relaxed text-ivory/70">
            Man Within exists to help people discover exceptional books and ideas.
            We believe in the power of reading to change how a person thinks, feels, and shows up in the world.
          </p>
        </div>
      </section>

      <section className="bg-ivory py-16 lg:py-24">
        <div className="container-site">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="font-sans text-sm font-extrabold uppercase tracking-[0.14em] text-burgundy">
                Our story
              </p>
              <h2 className="mt-3 font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                A bookstore with a point of view
              </h2>
              <div className="mt-6 space-y-4">
                <p className="font-sans text-[15px] leading-[1.75] text-ink/70">
                  Man Within was born in Nairobi, from a simple belief: a bookstore should be more than a shop. It should be a doorway. A place where a reader can find not just books, but the right next book.
                </p>
                <p className="font-sans text-[15px] leading-[1.75] text-ink/70">
                  We started small, with a shelf of well-chosen titles and a feeling that the Kenyan reading public deserved better than whatever happened to be on offer. Better curation. Better ideas. A better story about what books can do.
                </p>
                <p className="font-sans text-[15px] leading-[1.75] text-ink/70">
                  Today we ship across Kenya and beyond, but the conviction has not changed: the right book at the right time is a quiet revolution, and we want to be part of that revolution for every reader who finds us.
                </p>
              </div>
            </div>
            <div className="overflow-hidden rounded-card bg-sand/60 shadow-soft">
              <img
                src="/images/list-kenya.jpg"
                alt="A person browsing shelves in a library"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-sand/40 py-16 lg:py-24">
        <div className="container-site">
          <p className="font-sans text-sm font-extrabold uppercase tracking-[0.14em] text-burgundy text-center">
            What we believe
          </p>
          <h2 className="mt-3 font-display text-2xl font-extrabold tracking-tight text-ink text-center sm:text-3xl">
            Reading changes the room you are in
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: BookOpen, title: "The Slow Technology", text: "In a world of speed, the book is the slow technology that lets a thought settle, grow, and change the person who holds it." },
              { icon: Users, title: "Community of Curious Minds", text: "We are building a community of readers who believe that ideas deserve attention, and that reading is a practice, not just a habit." },
              { icon: Globe2, title: "Kenyan Roots, Global Reach", text: "Based in Nairobi, serving readers everywhere. African stories told with the urgency of the present moment." },
              { icon: Heart, title: "Stories That Matter", text: "Not every book deserves attention, but the ones that do deserve to be found. Our job is to find them for you." },
              { icon: BookMarked, title: "Lifelong Reading", text: "The book that found you at the right time stays with you. We help readers find those books, again and again." },
              { icon: Sparkles, title: "Quiet Ambition", text: "We are not loud. We are not the biggest. We are the bookstore that makes the bold bet on your patience." },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-card bg-white p-7 shadow-card transition-shadow duration-300 hover:shadow-lift">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-forest text-ivory">
                  <Icon size={20} />
                </span>
                <h3 className="mt-4 font-display text-lg font-extrabold tracking-tight text-ink">
                  {title}
                </h3>
                <p className="mt-2 font-sans text-[15px] leading-relaxed text-ink/60">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory py-16 lg:py-24">
        <div className="container-site">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="overflow-hidden rounded-card shadow-card">
              <img
                src="/images/author-owuor.jpg"
                alt="Contemporary Kenyan literature"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div>
              <p className="font-sans text-sm font-extrabold uppercase tracking-[0.14em] text-burgundy">
                Our Kenyan roots
              </p>
              <h2 className="mt-3 font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                Rooted in Kenyan letters
              </h2>
              <div className="mt-6 space-y-4">
                <p className="font-sans text-[15px] leading-[1.75] text-ink/70">
                  Kenya has one of the richest literary traditions in Africa. From Ngũgĩ to Owuor, from Binyavanga to the new generation taking shape today, this country has always understood the power of the story.
                </p>
                <p className="font-sans text-[15px] leading-[1.75] text-ink/70">
                  We founded Man Within in Nairobi for this reason: to build a bookstore that honours that tradition. Not as nostalgia, but as a living practice. A place where a young reader in Kiambu can meet the same books that shaped a generation.
                </p>
                <p className="font-sans text-[15px] leading-[1.75] text-ink/70">
                  Every order we dispatch from Nairobi, every event we host, every conversation we publish in the journal is an act of stake in the local reading culture. We want a country where the question is not whether people read, but what they are reading.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-sand/40 py-16 lg:py-24">
        <div className="container-site">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="font-sans text-sm font-extrabold uppercase tracking-[0.14em] text-burgundy">
                Our global vision
              </p>
              <h2 className="mt-3 font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                A Kenyan reading for everywhere
              </h2>
              <div className="mt-6 space-y-4">
                <p className="font-sans text-[15px] leading-[1.75] text-ink/70">
                  A reader in London sends books home. A student in New York discovers Ngũgĩ through a recommendation on the site. A diaspora family in Toronto orders a copy of Kintu for their daughter who has never been to Uganda.
                </p>
                <p className="font-sans text-[15px] leading-[1.75] text-ink/70">
                  These are not exceptions. These are the pattern. Man Within was built for the Kenyan reader living everywhere, and for the global reader curious about Africa. Both are welcome. Both belong.
                </p>
                <p className="font-sans text-[15px] leading-[1.75] text-ink/70">
                  We are not trying to go global in the sense of losing our point of origin. We are trying to be exactly what we are: a Kenyan bookstore that happens to reach every address that has an internet connection and a curious mind.
                </p>
              </div>
            </div>
            <div className="overflow-hidden rounded-card shadow-card">
              <img
                src="/images/col-think.jpg"
                alt="Quiet library reading room"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ivory py-16 lg:py-24">
        <div className="container-site">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-sans text-sm font-extrabold uppercase tracking-[0.14em] text-burgundy">
              Our community
            </p>
            <h2 className="mt-3 font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
              Built by readers, for readers
            </h2>
            <p className="mt-6 font-sans text-[15px] leading-[1.75] text-ink/70">
              Every book on this shelf was chosen by people who read obsessively, argue about covers, and believe a good recommendation is a genuine act of care. Our community is made of readers, writers, booksellers, and the curious people who arrived at our door looking for something they could not name and found it anyway.
            </p>
            <p className="mt-4 font-sans text-[15px] leading-[1.75] text-ink/70">
              The journal is where we go on about it. The reading lists are where we pass it on. The shelves are where we hold the proof. Join us. There is a seat in the library with your name on it.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}