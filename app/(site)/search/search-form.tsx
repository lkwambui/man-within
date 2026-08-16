"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

export default function SearchFormClient() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(initialQuery);
  const [submitted, setSubmitted] = useState(Boolean(initialQuery));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(Boolean(query.trim()));
      }}
      className="relative max-w-2xl"
    >
      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-moss"
        aria-hidden="true"
      />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a book, author, topic..."
        className="w-full rounded-card border border-ink/15 bg-white py-4 pl-12 pr-4 font-sans text-sm text-ink placeholder:text-moss focus:border-forest focus:outline-none"
      />
    </form>
  );
}