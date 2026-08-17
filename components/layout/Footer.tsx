import Link from "next/link";
import {
  BookMarked,
  Facebook,
  Instagram,
  Mail,
  Twitter,
  Youtube,
} from "lucide-react";

const columns = [
  {
    heading: "Shop",
    links: [
      { label: "All Books", href: "/books" },
      { label: "New Arrivals", href: "/books" },
      { label: "Bestsellers", href: "/books" },
      { label: "Categories", href: "/categories" },
      { label: "Collections", href: "/collections" },
      { label: "Reading Lists", href: "/reading-lists" },
    ],
  },
  {
    heading: "Journal",
    links: [
      { label: "Articles", href: "/journal" },
      { label: "Essays", href: "/journal" },
      { label: "Book Reviews", href: "/journal" },
      { label: "Authors", href: "/authors" },
      { label: "Reading Lists", href: "/reading-lists" },
    ],
  },
  {
    heading: "From Man Within",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Shipping", href: "/faq" },
      { label: "Returns", href: "/faq" },
      { label: "FAQ", href: "/faq" },
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
    <footer className="bg-forest text-ivory">
      <div className="container-site py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link href="/" aria-label="Man Within home" className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ivory/10 text-ivory">
                <BookMarked size={20} />
              </span>
              <span className="font-display text-xl font-extrabold tracking-tight">
                MAN&nbsp;WITHIN
              </span>
            </Link>
            <p className="mt-5 max-w-xs font-sans text-[15px] leading-relaxed text-ivory/55">
              A Kenyan bookstore and editorial platform for remarkable books, thoughtful ideas and stories worth staying with.
            </p>

            <div className="mt-7 flex items-center gap-2.5">
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
              <a
                href="mailto:hello@manwithin.co.ke"
                aria-label="Email us"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-ivory/10 text-ivory/80 transition-colors duration-200 hover:bg-burgundy hover:text-ivory ml-1"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h3 className="meta-xs text-ivory/50">
                {col.heading}
              </h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-sans text-[15px] font-semibold text-ivory/65 transition-colors duration-200 hover:text-ivory"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-ivory/10 pt-8 sm:flex-row sm:items-center">
          <p className="font-sans text-sm font-semibold text-ivory/55">
            Based in Kenya. Reading everywhere.
          </p>
          <p className="font-sans text-sm font-semibold text-ivory/55">
            Man Within {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}