import Link from "next/link";
import Logo from "@/components/ui/Logo";
import NewsletterForm from "@/components/layout/NewsletterForm";
import { Instagram, TikTok, YouTube } from "@/components/ui/Icons";

const SHOP_LINKS = [
  { label: "Starter Kit", href: "/#shop" },
  { label: "Pro Kit", href: "/#shop" },
  { label: "Scent Refills", href: "/#shop" },
  { label: "How it works", href: "/#how-it-works" },
];

const LEARN_LINKS = [
  { label: "Features", href: "/#features" },
  { label: "The app", href: "/#app" },
  { label: "FAQ", href: "/#faq" },
  { label: "Why scent?", href: "/#problem" },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="border-b border-white/10">
        <div className="container-page grid gap-6 py-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h3 className="font-display text-2xl font-semibold">
              Sniff out what&apos;s new.
            </h3>
            <p className="mt-1 text-sm text-cream/55">
              Product drops, scent guides, and the occasional very good dog
              photo.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </div>

      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.8fr_0.9fr]">
        <div>
          <Logo tone="light" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/55">
            An indoor scent-foraging system that turns your home into a fresh
            trail for your dog&apos;s nose.
          </p>
          <div className="mt-6 flex gap-2">
            <a
              href="#"
              aria-label="Nosy Paws on Instagram"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-cream/70 transition hover:border-cream/40 hover:text-cream"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="#"
              aria-label="Nosy Paws on TikTok"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-cream/70 transition hover:border-cream/40 hover:text-cream"
            >
              <TikTok className="h-5 w-5" />
            </a>
            <a
              href="#"
              aria-label="Nosy Paws on YouTube"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-cream/70 transition hover:border-cream/40 hover:text-cream"
            >
              <YouTube className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-cream/40">
            Shop
          </p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {SHOP_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-cream/65 transition hover:text-cream"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-cream/40">
            Learn
          </p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {LEARN_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-cream/65 transition hover:text-cream"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-cream/40">
            Support
          </p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <a
                href="mailto:hello@nosypaws.com"
                className="text-cream/65 transition hover:text-cream"
              >
                hello@nosypaws.com
              </a>
            </li>
            <li>
              <a href="#" className="text-cream/65 transition hover:text-cream">
                Shipping &amp; returns
              </a>
            </li>
            <li>
              <a href="#" className="text-cream/65 transition hover:text-cream">
                Warranty
              </a>
            </li>
            <li>
              <a href="#" className="text-cream/65 transition hover:text-cream">
                Contact us
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-3 py-6 text-xs text-cream/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} Nosy Paws. Made for curious
            noses.
          </p>
          <div className="flex gap-5">
            <a href="#" className="transition hover:text-cream">
              Privacy
            </a>
            <a href="#" className="transition hover:text-cream">
              Terms
            </a>
            <a href="#" className="transition hover:text-cream">
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
