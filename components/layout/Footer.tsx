import {
  BookMarked,
  Facebook,
  Instagram,
  Mail,
  Twitter,
  Youtube,
} from "lucide-react";
import Link from "next/link";

const columns = [
  {
    heading: "Shop",
    links: [
      { label: "Books", href: "/books" },
      { label: "Categories", href: "/categories" },
      { label: "Bestsellers", href: "/books?filter=bestsellers" },
      { label: "New Releases", href: "/books?filter=new" },
      { label: "Collections", href: "/collections" },
      { label: "Reading Lists", href: "/reading-lists" },
    ],
  },
  {
    heading: "Journal",
    links: [
      { label: "Essays", href: "/journal" },
      { label: "Book Reviews", href: "/journal" },
      { label: "Interviews", href: "/journal" },
      { label: "Ideas", href: "/journal" },
      { label: "Authors", href: "/authors" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "FAQ", href: "/faq" },
      { label: "Shipping & Returns", href: "/faq" },
      { label: "Terms", href: "/faq" },
    ],
  },
];

const socials = [
  { label: "Instagram", icon: Instagram },
  { label: "Twitter", icon: Twitter },
  { label: "Facebook", icon: Facebook },
  { label: "YouTube", icon: Youtube },
];

export function Footer() {
  return (
    <footer id="about" className="bg-forest text-ivory">
      <div className="container-site py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link href="/" aria-label="Man Within home" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-ivory/10 text-ivory">
                <BookMarked size={18} />
              </span>
              <span className="font-display text-xl font-extrabold tracking-tight">
                MAN&nbsp;WITHIN
              </span>
            </Link>
            <p className="mt-4 font-sans text-sm font-semibold text-ivory/60">
              Books. Ideas. Stories.
            </p>
            <p className="mt-3 max-w-xs font-sans text-sm leading-relaxed text-ivory/50">
              A Kenyan bookstore and editorial platform for remarkable books,
              thoughtful ideas and stories worth staying with.
            </p>

            <div className="mt-6 flex items-center gap-2">
              {socials.map(({ label, icon: Icon }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-ivory/10 text-ivory/80 transition-colors duration-200 hover:bg-burgundy hover:text-ivory"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h3 className="font-sans text-sm font-extrabold uppercase tracking-[0.12em] text-ivory/50">
                {col.heading}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-sans text-[15px] font-semibold text-ivory/70 transition-colors duration-200 hover:text-ivory"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-ivory/10 pt-7 sm:flex-row sm:items-center">
          <p className="font-sans text-sm font-semibold text-ivory/60">
            Based in Kenya. Reading everywhere.
          </p>
          <a
            href="mailto:hello@manwithin.co.ke"
            className="flex items-center gap-2 font-sans text-sm font-semibold text-ivory/60 transition-colors duration-200 hover:text-ivory"
          >
            <Mail size={16} />
            hello@manwithin.co.ke
          </a>
        </div>
      </div>
    </footer>
  );
}