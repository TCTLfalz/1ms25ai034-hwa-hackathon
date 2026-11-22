"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import MiniArt from "@/components/cart/MiniArt";
import QuantityStepper from "@/components/ui/QuantityStepper";
import {
  ArrowRight,
  Bag,
  Close,
  Lock,
} from "@/components/ui/Icons";
import {
  formatMoney,
  getProduct,
  FREE_SHIPPING_THRESHOLD,
} from "@/lib/products";

export default function CartDrawer() {
  const {
    isOpen,
    closeCart,
    lines,
    count,
    subtotal,
    shipping,
    total,
    setQty,
    removeItem,
    hydrated,
  } = useCart();

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCart();
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Close cart"
        onClick={closeCart}
        className="absolute inset-0 h-full w-full cursor-default bg-ink/40 backdrop-blur-[2px] animate-fade-in"
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cream shadow-2xl animate-slide-in"
      >
        <div className="flex items-center justify-between border-b border-ink/10 px-5 py-5">
          <div>
            <p className="font-display text-2xl font-semibold">Your cart</p>
            <p className="text-xs text-muted">
              {count === 0
                ? "Nothing in here yet"
                : `${count} item${count === 1 ? "" : "s"}`}
            </p>
          </div>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="grid h-10 w-10 place-items-center rounded-full border border-ink/10 bg-white text-ink transition hover:border-ink/25"
          >
            <Close className="h-5 w-5" />
          </button>
        </div>

        {!hydrated ? (
          <div className="flex-1 p-5">
            <div className="h-24 animate-pulse rounded-2xl bg-sand/70" />
          </div>
        ) : lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-sand">
              <Bag className="h-7 w-7 text-clay" />
            </div>
            <p className="font-display text-xl">Your cart is empty</p>
            <p className="text-sm text-muted">
              Every good hunt starts with a kit.
            </p>
            <Link
              href="/#shop"
              onClick={closeCart}
              className="btn btn-primary mt-2"
            >
              Browse kits
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-5 overflow-y-auto p-5">
              {lines.map((line) => {
                const product = getProduct(line.id);
                if (!product) return null;

                return (
                  <div key={line.id} className="flex gap-3">
                    <div className="h-20 w-20 flex-none rounded-2xl border border-ink/10 bg-sand/60 p-1.5">
                      <MiniArt id={line.id} />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between gap-2">
                        <p className="text-sm font-bold">{product.name}</p>
                        <p className="text-sm font-semibold">
                          {formatMoney(product.price * line.qty)}
                        </p>
                      </div>
                      <p className="text-xs text-muted">
                        {formatMoney(product.price)} each
                      </p>
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <QuantityStepper
                          value={line.qty}
                          onChange={(value) => setQty(line.id, value)}
                          label={`${product.name} quantity`}
                        />
                        <button
                          type="button"
                          onClick={() => removeItem(line.id)}
                          className="text-xs font-semibold text-muted transition hover:text-clay-dark"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-ink/10 p-5">
              <div className="space-y-1.5 text-sm">
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
                  <p className="text-[11px] text-clay-dark">
                    Add {formatMoney(remaining)} more for free shipping.
                  </p>
                )}
                <div className="mt-3 flex justify-between border-t border-ink/10 pt-3 text-base font-bold">
                  <span>Total</span>
                  <span>{formatMoney(total)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                onClick={closeCart}
                className="btn btn-primary mt-4 w-full"
              >
                Checkout <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/cart"
                onClick={closeCart}
                className="btn btn-secondary mt-2 w-full"
              >
                View cart
              </Link>
              <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-muted">
                <Lock className="h-3.5 w-3.5" />
                Demo checkout — no real payment taken
              </p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
