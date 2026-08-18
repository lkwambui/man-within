"use client";

import { Mail, Send } from "lucide-react";
import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <section className="bg-sand">
      <div className="container-site py-16 lg:py-24">
        <div className="mx-auto max-w-2xl rounded-card bg-ivory px-6 py-12 text-center shadow-card sm:px-12">
          <p className="section-kicker">The newsletter</p>
          <h2 className="section-title mt-2">Stay curious.</h2>
          <p className="mt-3 text-lg text-ink/60">
            New books, thoughtful articles and recommendations delivered
            occasionally. Never spam, always worth it.
          </p>

          {done ? (
            <div
              role="status"
              className="mx-auto mt-8 flex max-w-sm items-center justify-center gap-2 rounded-full bg-forest px-6 py-4 font-sans text-sm font-extrabold text-ivory"
            >
              <Mail size={18} />
              You&apos;re in. See you in your inbox.
            </div>
          ) : (
            <form
              className="mx-auto mt-8 flex max-w-sm flex-col gap-3 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault();
                if (email.trim()) setDone(true);
              }}
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-full border border-ink/10 bg-white px-5 py-3 font-sans text-sm font-semibold text-ink placeholder:text-ink/40 focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/30"
              />
              <button type="submit" className="btn-primary rounded-full">
                Subscribe
                <Send size={16} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}