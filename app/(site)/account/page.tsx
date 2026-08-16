"use client";

import { useState } from "react";
import Link from "next/link";
import {
  User,
  Package,
  Heart,
  BookOpen,
  BookMarked,
  MapPin,
  Settings,
  LogOut,
} from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";

type TabId =
  | "profile"
  | "orders"
  | "wishlist"
  | "reading-lists"
  | "saved"
  | "addresses"
  | "settings";

const tabs: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "orders", label: "Orders", icon: Package },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "reading-lists", label: "Reading lists", icon: BookOpen },
  { id: "saved", label: "Saved articles", icon: BookMarked },
  { id: "addresses", label: "Addresses", icon: MapPin },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<TabId>("profile");

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="space-y-5">
            <h3 className="font-display text-lg font-extrabold tracking-tight text-ink">
              Your profile
            </h3>
            <div className="rounded-card border border-ink/10 bg-white p-6 shadow-card">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="account-name"
                    className="font-sans text-sm font-extrabold text-ink/70"
                  >
                    Name
                  </label>
                  <input
                    id="account-name"
                    type="text"
                    defaultValue="Grace Wambui"
                    className="mt-1.5 w-full rounded-card border border-ink/15 bg-ivory px-4 py-3 font-sans text-sm text-ink focus:border-forest focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="account-email"
                    className="font-sans text-sm font-extrabold text-ink/70"
                  >
                    Email
                  </label>
                  <input
                    id="account-email"
                    type="email"
                    defaultValue="grace@example.com"
                    className="mt-1.5 w-full rounded-card border border-ink/15 bg-ivory px-4 py-3 font-sans text-sm text-ink focus:border-forest focus:outline-none"
                  />
                </div>
                <Button variant="primary">Save changes</Button>
              </div>
            </div>
          </div>
        );
      case "orders":
        return (
          <EmptyState
            title="No orders yet"
            copy="Your order history will appear here once you make your first purchase."
            action={
              <Button href="/books" variant="outline" className="mt-2">
                Browse books
              </Button>
            }
          />
        );
      case "wishlist":
        return (
          <EmptyState
            icon={<Heart size={24} />}
            title="Your reading list is waiting"
            copy="Save books here when you find something you want to remember."
            action={
              <Button href="/wishlist" variant="outline" className="mt-2">
                View wishlist
              </Button>
            }
          />
        );
      case "reading-lists":
        return (
          <EmptyState
            icon={<BookOpen size={24} />}
            title="No reading lists yet"
            copy="Start building your reading lists by saving articles and books you love."
          />
        );
      case "saved":
        return (
          <EmptyState
            icon={<BookMarked size={24} />}
            title="No saved articles"
            copy="Articles you save for later reading will appear in this section."
          />
        );
      case "addresses":
        return (
          <EmptyState
            icon={<MapPin size={24} />}
            title="No saved addresses"
            copy="Add a delivery address to make checkout faster."
          />
        );
      case "settings":
        return (
          <div className="space-y-5">
            <h3 className="font-display text-lg font-extrabold tracking-tight text-ink">
              Account settings
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-card border border-ink/10 bg-white p-4 shadow-card">
                <div>
                  <p className="font-sans text-sm font-extrabold text-ink">
                    Email notifications
                  </p>
                  <p className="font-sans text-xs text-ink/50">
                    Receive updates about new arrivals and the journal
                  </p>
                </div>
                <span className="font-sans text-xs font-bold text-forest">On</span>
              </div>
              <div className="flex items-center justify-between rounded-card border border-ink/10 bg-white p-4 shadow-card">
                <div>
                  <p className="font-sans text-sm font-extrabold text-ink">
                    Order notifications
                  </p>
                  <p className="font-sans text-xs text-ink/50">
                    Get updates on your order status
                  </p>
                </div>
                <span className="font-sans text-xs font-bold text-forest">On</span>
              </div>
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-burgundy/10 px-6 py-3 font-sans text-sm font-extrabold text-burgundy transition-colors hover:bg-burgundy hover:text-ivory"
              >
                <LogOut size={16} />
                Sign out
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <PageHeader title="My account" copy="Manage your profile, orders, wishlist and more." />

      <section className="bg-ivory pb-16 lg:pb-24">
        <div className="container-site">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr] lg:gap-12">
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="mb-6">
                <p className="font-display text-lg font-extrabold text-ink">
                  Hello, Grace
                </p>
                <p className="font-sans text-sm text-ink/50">grace@example.com</p>
              </div>
              <nav aria-label="Account navigation">
                <ul className="space-y-1">
                  {tabs.map((tab) => (
                    <li key={tab.id}>
                      <button
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 font-sans text-sm font-bold transition-all duration-200 ${
                          activeTab === tab.id
                            ? "bg-forest text-ivory shadow-soft"
                            : "text-ink/70 hover:bg-sand hover:text-forest"
                        }`}
                      >
                        <span
                          className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                            activeTab === tab.id
                              ? "bg-ivory/15 text-ivory"
                              : "bg-sand/60 text-moss"
                          }`}
                        >
                          <tab.icon size={16} />
                        </span>
                        {tab.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
            <div>{renderContent()}</div>
          </div>
        </div>
      </section>
    </div>
  );
}