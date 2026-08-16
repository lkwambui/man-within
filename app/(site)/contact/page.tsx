"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Instagram, Twitter, Facebook, Youtube } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      <PageHeader
        title="Get in touch"
        copy="We would love to hear from you. Questions, feedback, partnership enquiries, or just a note about a good book."
      />

      <section className="bg-ivory pb-16 lg:pb-24">
        <div className="container-site">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div>
              <h2 className="font-display text-xl font-extrabold tracking-tight text-ink">
                Send us a message
              </h2>
              {submitted ? (
                <div className="mt-8 rounded-card border border-forest/20 bg-forest/5 p-8 text-center">
                  <p className="font-display text-xl font-bold text-forest">
                    Message sent
                  </p>
                  <p className="mt-2 font-sans text-sm text-ink/60">
                    Thank you for reaching out. We will get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="font-sans text-sm font-extrabold text-ink/70"
                      >
                        Name <span className="text-burgundy">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        className="mt-1.5 w-full rounded-card border border-ink/15 bg-white px-4 py-3 font-sans text-sm text-ink placeholder:text-moss focus:border-forest focus:outline-none"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="font-sans text-sm font-extrabold text-ink/70"
                      >
                        Email <span className="text-burgundy">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        className="mt-1.5 w-full rounded-card border border-ink/15 bg-white px-4 py-3 font-sans text-sm text-ink placeholder:text-moss focus:border-forest focus:outline-none"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="font-sans text-sm font-extrabold text-ink/70"
                    >
                      Subject <span className="text-burgundy">*</span>
                    </label>
                    <select
                      id="subject"
                      required
                      className="mt-1.5 w-full rounded-card border border-ink/15 bg-white px-4 py-3 font-sans text-sm font-semibold text-ink focus:border-forest focus:outline-none"
                    >
                      <option value="">Select a topic</option>
                      <option value="order">Order enquiry</option>
                      <option value="general">General enquiry</option>
                      <option value="press">Press and media</option>
                      <option value="partnership">Partnership</option>
                      <option value="suggestion">Book suggestion</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="font-sans text-sm font-extrabold text-ink/70"
                    >
                      Message <span className="text-burgundy">*</span>
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={6}
                      className="mt-1.5 w-full rounded-card border border-ink/15 bg-white px-4 py-3 font-sans text-sm text-ink placeholder:text-moss focus:border-forest focus:outline-none"
                      placeholder="Tell us what is on your mind..."
                    />
                  </div>
                  <Button type="submit" variant="primary">
                    Send message
                  </Button>
                </form>
              )}
            </div>

            <div>
              <h2 className="font-display text-xl font-extrabold tracking-tight text-ink">
                Contact details
              </h2>
              <div className="mt-6 space-y-5">
                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sand text-forest">
                    <Mail size={18} />
                  </span>
                  <div>
                    <p className="font-sans text-sm font-extrabold text-ink">Email</p>
                    <a
                      href="mailto:hello@manwithin.co.ke"
                      className="font-sans text-sm font-semibold text-forest transition-colors hover:text-burgundy"
                    >
                      hello@manwithin.co.ke
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sand text-forest">
                    <Phone size={18} />
                  </span>
                  <div>
                    <p className="font-sans text-sm font-extrabold text-ink">Phone</p>
                    <a
                      href="tel:+254700000000"
                      className="font-sans text-sm font-semibold text-forest transition-colors hover:text-burgundy"
                    >
                      +254 700 000 000
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sand text-forest">
                    <MapPin size={18} />
                  </span>
                  <div>
                    <p className="font-sans text-sm font-extrabold text-ink">Location</p>
                    <p className="font-sans text-sm font-semibold text-ink/60">
                      Nairobi, Kenya
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <p className="font-sans text-sm font-extrabold text-ink/70">Follow us</p>
                <div className="mt-3 flex items-center gap-3">
                  {[
                    { icon: Instagram, label: "Instagram" },
                    { icon: Twitter, label: "Twitter" },
                    { icon: Facebook, label: "Facebook" },
                    { icon: Youtube, label: "YouTube" },
                  ].map(({ icon: Icon, label }) => (
                    <a
                      key={label}
                      href="#"
                      aria-label={label}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-sand text-forest transition-colors duration-200 hover:bg-forest hover:text-ivory"
                    >
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </div>

              <div className="mt-10 rounded-card bg-sand/50 p-6">
                <p className="font-sans text-sm font-extrabold tracking-[0.1em] text-burgundy uppercase">
                  Bookshop hours
                </p>
                <div className="mt-3 space-y-1.5">
                  <p className="font-sans text-sm text-ink/70">Monday to Friday: 9am to 6pm</p>
                  <p className="font-sans text-sm text-ink/70">Saturday: 10am to 4pm</p>
                  <p className="font-sans text-sm text-ink/70">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}