"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { useCart } from "@/components/cart/CartProvider";
import { Bag, Close, Menu } from "@/components/ui/Icons";

const LINKS = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "Features", href: "/#features" },
  { label: "The app", href: "/#app" },
  { label: "Shop", href: "/#shop" },
  { label: "FAQ", href: "/#faq" },
];

export default function Header() {
  const { hydrated, count, openCart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-cream/85 backdrop-blur-md">
      <div className="container-page flex h-[72px] items-center justify-between gap-4">
        <Link href="/" aria-label="Nosy Paws home" className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-muted transition hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={openCart}
            aria-label={
              hydrated && count > 0
                ? `Open cart, ${count} item${count === 1 ? "" : "s"}`
                : "Open cart"
            }
            className="relative grid h-11 w-11 place-items-center rounded-full border border-ink/10 bg-white/70 text-ink transition hover:border-ink/25 hover:bg-white"
          >
            <Bag className="h-5 w-5" />
            {hydrated && count > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-clay px-1 text-[10px] font-extrabold text-white">
                {count}
              </span>
            )}
          </button>

          <Link
            href="/#shop"
            className="btn btn-primary hidden px-5 py-3 sm:inline-flex"
          >
            Shop kits
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
            className="grid h-11 w-11 place-items-center rounded-full border border-ink/10 bg-white/70 text-ink transition hover:border-ink/25 lg:hidden"
          >
            {mobileOpen ? (
              <Close className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div id="mobile-menu" className="border-t border-ink/10 bg-cream lg:hidden">
          <nav
            className="container-page flex flex-col gap-1 py-4"
            aria-label="Mobile"
          >
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-semibold text-ink transition hover:bg-sand/60"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#shop"
              onClick={() => setMobileOpen(false)}
              className="btn btn-primary mt-2 w-full"
            >
              Shop kits
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
