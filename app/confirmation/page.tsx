"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import MiniArt from "@/components/cart/MiniArt";
import {
  ArrowRight,
  Check,
  CreditCard,
  Mail,
  MapPin,
} from "@/components/ui/Icons";
import { formatMoney } from "@/lib/products";
import {
  estimatedDelivery,
  formatOrderDate,
  type Order,
} from "@/lib/orders";

const NEXT_STEPS = [
  {
    title: "A receipt is on its way",
    copy: "We've emailed your order details. Tracking follows as soon as your kit leaves the studio.",
  },
  {
    title: "Your kit ships in 1–2 days",
    copy: "Orders leave Monday to Friday. You'll get a tracking link by email.",
  },
  {
    title: "Build your first trail",
    copy: "Download the Nosy Paws app, add your dog, and follow the quick-start guide in the box.",
  },
];

export default function ConfirmationPage() {
  const [order, setOrder] = useState<Order | null>(null);
  const [orderId, setOrderId] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id") ?? "";
    setOrderId(id);

    let found: Order | null = null;
    try {
      const raw = window.localStorage.getItem("nosypaws.lastOrder");
      if (raw) {
        const parsed = JSON.parse(raw) as Order;
        if (
          parsed &&
          typeof parsed.id === "string" &&
          (!id || parsed.id === id)
        ) {
          found = parsed;
        }
      }
    } catch {
      // Fall back to the order number in the URL.
    }

    setOrder(found);
    setLoaded(true);
  }, []);

  if (!loaded) {
    return (
      <section className="section-pad bg-cream">
        <div className="container-page">
          <div className="mx-auto h-16 w-16 animate-pulse rounded-full bg-sand/70" />
          <div className="mx-auto mt-6 h-10 w-72 animate-pulse rounded-full bg-sand/70" />
          <div className="mx-auto mt-10 grid max-w-5xl gap-6 lg:grid-cols-2">
            <div className="h-80 animate-pulse rounded-3xl bg-sand/60" />
            <div className="h-80 animate-pulse rounded-3xl bg-sand/60" />
          </div>
        </div>
      </section>
    );
  }

  const displayId = order?.id ?? orderId;

  return (
    <section className="section-pad bg-cream">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-sage-light text-sage">
            <Check className="h-8 w-8" />
          </span>
          <div className="mt-6">
            <span className="eyebrow">Order confirmed</span>
          </div>
          <h1 className="mt-4 text-balance text-4xl font-semibold sm:text-5xl">
            You&apos;re all set
            {order?.customer?.firstName
              ? `, ${order.customer.firstName}`
              : ""}
            .
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-muted">
            Order{" "}
            <span className="font-bold text-ink">
              {displayId || "confirmed"}
            </span>{" "}
            is confirmed
            {order?.customer?.email ? (
              <>
                {" "}
                — a receipt is on its way to{" "}
                <span className="font-semibold text-ink">
                  {order.customer.email}
                </span>
              </>
            ) : (
              "."
            )}
          </p>
          {order && (
            <p className="mt-1 text-sm text-muted">
              Placed {formatOrderDate(order.createdAt)} &middot; Estimated
              delivery {estimatedDelivery(order.createdAt)}
            </p>
          )}
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-ink/10 bg-white/80 p-6 shadow-card">
            <h2 className="font-display text-xl font-semibold">
              Order summary
            </h2>

            {order ? (
              <>
                <div className="mt-4 space-y-3">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="h-14 w-14 flex-none rounded-xl border border-ink/10 bg-sand/60 p-1">
                        <MiniArt id={item.id} />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold">{item.name}</p>
                        <p className="text-[11px] text-muted">
                          Qty {item.qty}
                        </p>
                      </div>
                      <p className="text-xs font-bold">
                        {formatMoney(item.lineTotal)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 space-y-1.5 border-t border-ink/10 pt-4 text-sm">
                  <div className="flex justify-between text-muted">
                    <span>Subtotal</span>
                    <span className="font-semibold text-ink">
                      {formatMoney(order.subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between text-muted">
                    <span>Shipping</span>
                    <span className="font-semibold text-ink">
                      {order.shipping === 0
                        ? "Free"
                        : formatMoney(order.shipping)}
                    </span>
                  </div>
                  <div className="mt-2 flex justify-between border-t border-ink/10 pt-3 text-base font-bold">
                    <span>Total</span>
                    <span>{formatMoney(order.total)}</span>
                  </div>
                </div>

                {order.shippingAddress && (
                  <div className="mt-5 rounded-2xl bg-sand/40 p-4">
                    <p className="flex items-center gap-2 text-xs font-bold">
                      <MapPin className="h-4 w-4 text-clay" />
                      Shipping to
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-muted">
                      {order.shippingAddress.address1}
                      {order.shippingAddress.address2
                        ? `, ${order.shippingAddress.address2}`
                        : ""}
                      <br />
                      {order.shippingAddress.city},{" "}
                      {order.shippingAddress.state}{" "}
                      {order.shippingAddress.zip}
                      <br />
                      {order.shippingAddress.country}
                    </p>
                  </div>
                )}

                {order.payment && (
                  <p className="mt-3 flex items-center gap-2 text-[11px] text-muted">
                    <CreditCard className="h-3.5 w-3.5" />
                    Card ending in {order.payment.last4} &middot; demo payment
                  </p>
                )}
              </>
            ) : (
              <p className="mt-3 text-sm leading-relaxed text-muted">
                We couldn&apos;t load the full order details on this device, but
                your order number is{" "}
                <span className="font-bold text-ink">
                  {displayId || "confirmed"}
                </span>
                . Check your email for the receipt.
              </p>
            )}
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-ink/10 bg-white/80 p-6 shadow-card">
              <h2 className="font-display text-xl font-semibold">
                What happens next
              </h2>
              <ol className="mt-4 space-y-4">
                {NEXT_STEPS.map((step, index) => (
                  <li key={step.title} className="flex gap-3">
                    <span className="grid h-7 w-7 flex-none place-items-center rounded-full bg-clay/10 text-xs font-bold text-clay">
                      {index + 1}
                    </span>
                    <div>
                      <p className="text-sm font-bold">{step.title}</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-muted">
                        {step.copy}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-3xl bg-ink p-6 text-cream">
              <p className="flex items-center gap-2 text-sm font-bold">
                <Mail className="h-4 w-4 text-[#F0A07E]" />
                Questions?
              </p>
              <p className="mt-1 text-xs leading-relaxed text-cream/60">
                Reply to your confirmation email or write to
                hello@nosypaws.com. We reply within one business day.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/" className="btn btn-primary flex-1">
                Back to home <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/#shop" className="btn btn-secondary flex-1">
                Shop refills
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
