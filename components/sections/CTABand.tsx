import Link from "next/link";
import { ArrowRight, Paw } from "@/components/ui/Icons";

export default function CTABand() {
  return (
    <section className="relative overflow-hidden bg-clay text-white">
      <Paw
        aria-hidden="true"
        className="pointer-events-none absolute -left-6 top-10 h-24 w-24 rotate-[-18deg] text-white/10"
      />
      <Paw
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-4 right-8 h-20 w-20 rotate-12 text-white/10"
      />
      <div className="container-page relative py-16 text-center sm:py-20">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-white/70">
          Kits from $149
        </p>
        <h2 className="mx-auto mt-3 max-w-2xl text-balance text-4xl font-semibold leading-tight sm:text-5xl">
          Give them a trail worth following.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/80">
          Free shipping over $75, a 30-day happy-nose guarantee, and a brand-new
          hunt every time the app opens.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/#shop" className="btn btn-light">
            Shop Now <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/#how-it-works"
            className="btn border border-white/30 text-white hover:bg-white/10"
          >
            How it works
          </Link>
        </div>
      </div>
    </section>
  );
}
