import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { CartProvider, WishlistProvider } from "@/lib/store";

const display = localFont({
  src: "./fonts/baloo2.woff2",
  variable: "--font-display",
  weight: "400 800",
  display: "swap",
});

const sans = localFont({
  src: "./fonts/nunito.woff2",
  variable: "--font-sans",
  weight: "400 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Man Within: Books. Ideas. Stories.",
  description:
    "A Kenyan bookstore and editorial platform. Explore remarkable books, thoughtful ideas, and stories from Kenya and beyond.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
  },
};

export const viewport = "width=device-width, initial-scale=1, maximum-scale=5";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="min-h-screen bg-ivory" suppressHydrationWarning>
        <WishlistProvider>
          <CartProvider>{children}</CartProvider>
        </WishlistProvider>
      </body>
    </html>
  );
}