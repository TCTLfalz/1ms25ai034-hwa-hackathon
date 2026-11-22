import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Gift, Sparkle } from "@/components/ui/Icons";
import { FREE_SHIPPING_THRESHOLD, formatMoney } from "@/lib/products";
import heroImage from "@/images/hero.png";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-sand/70 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-52 top-64 h-[420px] w-[420px] rounded-full bg-sage/10 blur-3xl"
      />

      <div className="container-page relative grid items-center gap-14 pb-20 pt-12 sm:pt-16 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10 lg:pb-28">
        <div className="max-w-xl">
          <span className="eyebrow">
            <Sparkle className="h-3.5 w-3.5" />
            A new category of dog enrichment
          </span>

          <h1 className="mt-6 text-balance font-display text-[2.9rem] font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-[4.35rem]">
            Let their{" "}
            <span className="relative inline-block italic text-clay">
              nose
              <svg
                className="absolute -bottom-2 left-0 h-3 w-full text-clay/45"
                viewBox="0 0 200 12"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M2 8.5C40 3.5 76 2.5 112 5.5c30 2.5 56 3 86-1.5"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
            lead the way.
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted sm:text-xl">
            Nosy Paws turns your home into a scent trail your dog can solve.
            Wireless pods, app-timed hunts, and a reward that only unlocks when
            they follow the trail.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/#shop" className="btn btn-primary">
              Shop Now <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/#how-it-works" className="btn btn-secondary">
              See how it works
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-muted">
            <span className="inline-flex items-center gap-1.5">
              <Check className="h-4 w-4 text-sage" />
              Free shipping over {formatMoney(FREE_SHIPPING_THRESHOLD)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check className="h-4 w-4 text-sage" />
              30-day happy-nose guarantee
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check className="h-4 w-4 text-sage" />
              Vet-reviewed scents
            </span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[540px] lg:max-w-none">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2.75rem] border border-ink/10 bg-sand shadow-soft sm:aspect-[16/10]">
            <Image
              src={heroImage}
              alt="A golden retriever sniffing a Nosy Paws scent pod in a sunlit living room"
              fill
              priority
              sizes="(min-width: 1024px) 46vw, (min-width: 640px) 90vw, 100vw"
              className="object-cover"
            />

            <div className="absolute left-4 top-4 flex items-center gap-2.5 rounded-2xl border border-ink/10 bg-white/90 px-3.5 py-2.5 shadow-card backdrop-blur sm:left-5 sm:top-5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sage opacity-60 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-sage" />
              </span>
              <div>
                <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-muted">
                  Trail Logic
                </p>
                <p className="text-xs font-bold text-ink">Hunt in progress</p>
              </div>
            </div>

            <div className="absolute right-4 top-4 flex items-center gap-2 rounded-2xl border border-ink/10 bg-white/90 px-3 py-2 shadow-card backdrop-blur sm:right-5 sm:top-5">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-sage-light text-sage">
                <Check className="h-3.5 w-3.5" />
              </span>
              <div>
                <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-muted">
                  Pod 3
                </p>
                <p className="text-xs font-bold text-ink">Reached</p>
              </div>
            </div>

            <div className="absolute bottom-4 right-4 flex items-center gap-2.5 rounded-2xl border border-ink/10 bg-white/90 px-3.5 py-2.5 shadow-card backdrop-blur sm:bottom-5 sm:right-5">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-clay/10 text-clay">
                <Gift className="h-4 w-4" />
              </span>
              <div>
                <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-muted">
                  Trail complete
                </p>
                <p className="text-xs font-bold text-ink">Treat unlocked</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
