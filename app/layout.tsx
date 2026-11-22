import type { Metadata, Viewport } from "next";
import { Fraunces, Nunito_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart/CartProvider";
import CartDrawer from "@/components/cart/CartDrawer";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const siteUrl = "https://1ms25ai034-hwa-hackathon.vercel.app";
const description =
  "Nosy Paws turns your home into a scent trail your dog can solve. Wireless scent pods, app-controlled Trail Logic hunts, and a reward that unlocks when they follow the trail.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Nosy Paws — The scent-foraging system for dogs",
    template: "%s — Nosy Paws",
  },
  description,
  keywords: [
    "dog enrichment",
    "scent work for dogs",
    "scent foraging",
    "dog puzzle alternative",
    "app-controlled dog toy",
    "Nosy Paws",
  ],
  openGraph: {
    title: "Nosy Paws — The scent-foraging system for dogs",
    description,
    url: siteUrl,
    siteName: "Nosy Paws",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nosy Paws — The scent-foraging system for dogs",
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#FBF7F1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <CartProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-cream"
          >
            Skip to content
          </a>
          <div className="bg-ink text-cream">
            <p className="container-page py-2 text-center text-[11px] font-semibold tracking-wide sm:text-xs">
              Free shipping over $75 &middot; 30-day happy-nose guarantee
            </p>
          </div>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
