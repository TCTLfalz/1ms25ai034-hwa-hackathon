"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import MiniArt from "@/components/cart/MiniArt";
import QuantityStepper from "@/components/ui/QuantityStepper";
import { ArrowRight, Bag, Lock } from "@/components/ui/Icons";
import {
  formatMoney,
  getProduct,
  FREE_SHIPPING_THRESHOLD,
} from "@/lib/products";

export default function CartPage() {
  const {
    lines,
    hydrated,
    count,
    subtotal,
    shipping,
    total,
    setQty,
    removeItem,
  } = useCart();

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(
    100,
    (subtotal / FREE_SHIPPING_THRESHOLD) * 100,
  );

  return (
    <section className="section-pad bg-cream">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="eyebrow">
              <Bag className="h-3.5 w-3.5" />
              {hydrated && count > 0
                ? `${count} item${count === 1 ? "" : "s"}`
                : "Your cart"}
            </span>
            <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">
              Your cart
            </h1>
          </div>
          <Link
            href="/#shop"
            className="text-sm font-bold text-clay-dark transition hover:underline"
          >
            Continue shopping
          </Link>
        </div>

        {!hydrated ? (
          <div className="mt-10 grid gap-6 lg:grid-cols-[1.45fr_0.85fr]">
            <div className="h-72 animate-pulse rounded-3xl bg-sand/60" />
            <div className="h-72 animate-pulse rounded-3xl bg-sand/60" />
          </div>
        ) : lines.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-ink/10 bg-white/70 p-10 text-center shadow-card">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-sand">
              <Bag className="h-7 w-7 text-clay" />
            </span>
            <h2 className="mt-5 font-display text-2xl font-semibold">
              Your cart is empty
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
              Every good hunt starts with a kit. Pick a trail length and
              we&apos;ll handle the rest.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/#shop" className="btn btn-primary">
                Browse kits <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/#how-it-works" className="btn btn-secondary">
                How it works
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-10 grid gap-8 lg:grid-cols-[1.45fr_0.85fr] lg:items-start">
            <div className="rounded-3xl border border-ink/10 bg-white/70 p-5 shadow-card sm:p-6">
              {lines.map((line, index) => {
                const product = getProduct(line.id);
                if (!product) return null;

                return (
                  <div
                    key={line.id}
                    className={`flex gap-4 ${
                      index > 0 ? "mt-5 border-t border-ink/10 pt-5" : ""
                    }`}
                  >
                    <div className="h-24 w-24 flex-none rounded-2xl border border-ink/10 bg-sand/60 p-2">
                      <MiniArt id={line.id} />
                    </div>
                    <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:justify-between">
                      <div>
                        <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-clay">
                          {product.tagline}
                        </p>
                        <p className="mt-1 font-display text-xl font-semibold">
                          {product.name}
                        </p>
                        <p className="mt-1 text-xs text-muted">
                          {formatMoney(product.price)} each
                        </p>
                        <button
                          type="button"
                          onClick={() => removeItem(line.id)}
                          className="mt-2 text-xs font-semibold text-muted transition hover:text-clay-dark"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="flex items-center gap-4 sm:flex-col sm:items-end sm:justify-between">
                        <QuantityStepper
                          value={line.qty}
                          onChange={(value) => setQty(line.id, value)}
                          label={`${product.name} quantity`}
                        />
                        <p className="font-bold">
                          {formatMoney(product.price * line.qty)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <aside className="lg:sticky lg:top-24">
              <div className="rounded-3xl border border-ink/10 bg-white/80 p-6 shadow-card">
                <h2 className="font-display text-xl font-semibold">
                  Order summary
                </h2>
                <div className="mt-4 space-y-1.5 text-sm">
                  <div className="flex justify-between text-muted">
                    <span>Subtotal</span>
                    <span className="font-semibold text-ink">
                      {formatMoney(subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between text-muted">
                    <span>Shipping</span>
                    <span className="font-semibold text-ink">
                      {shipping === 0 ? "Free" : formatMoney(shipping)}
                    </span>
                  </div>
                  {remaining > 0 && (
                    <div className="pt-2">
                      <div className="h-1.5 overflow-hidden rounded-full bg-sand">
                        <div
                          className="h-full rounded-full bg-clay transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <p className="mt-1.5 text-[11px] text-clay-dark">
                        Add {formatMoney(remaining)} more for free shipping.
                      </p>
                    </div>
                  )}
                  <div className="mt-3 flex justify-between border-t border-ink/10 pt-3 text-base font-bold">
                    <span>Total</span>
                    <span>{formatMoney(total)}</span>
                  </div>
                  <p className="text-[11px] text-muted">
                    Inclusive of GST.
                  </p>
                </div>

                <Link href="/checkout" className="btn btn-primary mt-5 w-full">
                  Checkout <ArrowRight className="h-4 w-4" />
                </Link>
                <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-muted">
                  <Lock className="h-3.5 w-3.5" />
                  Demo checkout — no real payment taken
                </p>
              </div>
              <div className="mt-4 rounded-2xl border border-ink/10 bg-sand/40 p-4 text-xs leading-relaxed text-muted">
                Free shipping over {formatMoney(FREE_SHIPPING_THRESHOLD)}{" "}
                &middot; 30-day happy-nose guarantee &middot; 1-year hardware
                warranty
              </div>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}
