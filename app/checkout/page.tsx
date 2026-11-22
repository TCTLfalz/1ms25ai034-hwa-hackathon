"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart/CartProvider";
import MiniArt from "@/components/cart/MiniArt";
import { ArrowRight, Lock, Shield } from "@/components/ui/Icons";
import {
  FREE_SHIPPING_THRESHOLD,
  formatMoney,
  getProduct,
} from "@/lib/products";
import type { Order } from "@/lib/orders";

type FormState = {
  email: string;
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
};

const EMPTY_FORM: FormState = {
  email: "",
  firstName: "",
  lastName: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  zip: "",
  cardName: "",
  cardNumber: "",
  expiry: "",
  cvc: "",
};

function Field({
  label,
  htmlFor,
  error,
  children,
  className = "",
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-xs font-bold text-ink"
      >
        {label}
      </label>
      {children}
      {error && (
        <p
          id={`${htmlFor}-error`}
          className="mt-1 text-[11px] font-semibold text-red-700"
        >
          {error}
        </p>
      )}
    </div>
  );
}

function validate(form: FormState): Record<string, string> {
  const next: Record<string, string> = {};

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    next.email = "Enter a valid email address.";
  }
  if (!form.firstName.trim()) next.firstName = "First name is required.";
  if (!form.lastName.trim()) next.lastName = "Last name is required.";
  if (!form.address1.trim()) next.address1 = "Street address is required.";
  if (!form.city.trim()) next.city = "City is required.";
  if (!form.state.trim()) next.state = "State is required.";
  if (!/^\d{6}$/.test(form.zip.trim())) {
    next.zip = "Enter a valid 6-digit PIN code.";
  }
  if (!form.cardName.trim()) next.cardName = "Name on card is required.";

  const digits = form.cardNumber.replace(/\D/g, "");
  if (digits.length < 13 || digits.length > 19) {
    next.cardNumber = "Enter a valid card number (13–19 digits).";
  }

  const expiryMatch = /^(\d{2})\/(\d{2})$/.exec(form.expiry);
  if (!expiryMatch) {
    next.expiry = "Use MM/YY.";
  } else {
    const month = Number(expiryMatch[1]);
    const year = 2000 + Number(expiryMatch[2]);
    const expiryDate = new Date(year, month, 1);
    if (month < 1 || month > 12) {
      next.expiry = "Use MM/YY.";
    } else if (expiryDate <= new Date()) {
      next.expiry = "Use a future expiry date.";
    }
  }

  if (!/^\d{3,4}$/.test(form.cvc)) {
    next.cvc = "3–4 digits.";
  }

  return next;
}

export default function CheckoutPage() {
  const router = useRouter();
  const {
    lines,
    hydrated,
    subtotal,
    shipping,
    total,
    clearCart,
  } = useCart();

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function update(key: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setServerError("");
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  }

  function inputClass(key: keyof FormState) {
    return `input-base ${
      errors[key]
        ? "border-red-400 focus:border-red-500 focus:ring-red-200"
        : ""
    }`;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      document.getElementById(Object.keys(nextErrors)[0])?.focus();
      return;
    }

    if (lines.length === 0) return;

    setSubmitting(true);
    setServerError("");

    const digits = form.cardNumber.replace(/\D/g, "");

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: lines.map((line) => ({
            id: line.id,
            quantity: line.qty,
          })),
          customer: {
            email: form.email.trim(),
            firstName: form.firstName.trim(),
            lastName: form.lastName.trim(),
          },
          shipping: {
            address1: form.address1.trim(),
            address2: form.address2.trim(),
            city: form.city.trim(),
            state: form.state.trim(),
            zip: form.zip.trim(),
            country: "India",
          },
          payment: { last4: digits.slice(-4) },
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.order) {
        throw new Error(
          data?.error ||
            "We couldn't place your order. Please check your details and try again.",
        );
      }

      const order = data.order as Order;
      try {
        window.localStorage.setItem(
          "nosypaws.lastOrder",
          JSON.stringify(order),
        );
      } catch {
        // Confirmation can still render from the order number.
      }

      clearCart();
      router.push(`/confirmation?id=${encodeURIComponent(order.id)}`);
    } catch (error) {
      setServerError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
      setSubmitting(false);
    }
  }

  if (!hydrated) {
    return (
      <section className="section-pad bg-cream">
        <div className="container-page">
          <div className="h-10 w-56 animate-pulse rounded-full bg-sand/70" />
          <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="h-[540px] animate-pulse rounded-3xl bg-sand/60" />
            <div className="h-96 animate-pulse rounded-3xl bg-sand/60" />
          </div>
        </div>
      </section>
    );
  }

  if (lines.length === 0 && !submitting) {
    return (
      <section className="section-pad bg-cream">
        <div className="container-page">
          <div className="mx-auto max-w-xl rounded-3xl border border-ink/10 bg-white/70 p-10 text-center shadow-card">
            <h1 className="font-display text-3xl font-semibold">
              Nothing to check out yet
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Add a kit or a refill pack to your cart, then come back here.
            </p>
            <Link href="/#shop" className="btn btn-primary mt-6">
              Browse kits <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-pad bg-cream">
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="eyebrow">Checkout</span>
          <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">
            Almost home.
          </h1>
          <p className="mt-3 text-base leading-relaxed text-muted">
            Shipping details and a mock payment. No real charge, ever.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <section className="rounded-3xl border border-ink/10 bg-white/80 p-6 shadow-card">
              <div className="flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-clay text-sm font-bold text-white">
                  1
                </span>
                <h2 className="font-display text-xl font-semibold">Contact</h2>
              </div>
              <div className="mt-5">
                <Field
                  label="Email address"
                  htmlFor="email"
                  error={errors.email}
                >
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(event) => update("email", event.target.value)}
                    className={inputClass("email")}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                </Field>
              </div>
            </section>

            <section className="rounded-3xl border border-ink/10 bg-white/80 p-6 shadow-card">
              <div className="flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-clay text-sm font-bold text-white">
                  2
                </span>
                <h2 className="font-display text-xl font-semibold">
                  Shipping address
                </h2>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <Field
                  label="First name"
                  htmlFor="firstName"
                  error={errors.firstName}
                >
                  <input
                    id="firstName"
                    name="firstName"
                    autoComplete="given-name"
                    value={form.firstName}
                    onChange={(event) =>
                      update("firstName", event.target.value)
                    }
                    className={inputClass("firstName")}
                    aria-invalid={Boolean(errors.firstName)}
                    aria-describedby={
                      errors.firstName ? "firstName-error" : undefined
                    }
                  />
                </Field>
                <Field
                  label="Last name"
                  htmlFor="lastName"
                  error={errors.lastName}
                >
                  <input
                    id="lastName"
                    name="lastName"
                    autoComplete="family-name"
                    value={form.lastName}
                    onChange={(event) =>
                      update("lastName", event.target.value)
                    }
                    className={inputClass("lastName")}
                    aria-invalid={Boolean(errors.lastName)}
                    aria-describedby={
                      errors.lastName ? "lastName-error" : undefined
                    }
                  />
                </Field>
                <Field
                  label="Street address"
                  htmlFor="address1"
                  error={errors.address1}
                  className="sm:col-span-2"
                >
                  <input
                    id="address1"
                    name="address1"
                    autoComplete="address-line1"
                    placeholder="12, MG Road"
                    value={form.address1}
                    onChange={(event) =>
                      update("address1", event.target.value)
                    }
                    className={inputClass("address1")}
                    aria-invalid={Boolean(errors.address1)}
                    aria-describedby={
                      errors.address1 ? "address1-error" : undefined
                    }
                  />
                </Field>
                <Field
                  label="Apartment, suite, etc. (optional)"
                  htmlFor="address2"
                  className="sm:col-span-2"
                >
                  <input
                    id="address2"
                    name="address2"
                    autoComplete="address-line2"
                    value={form.address2}
                    onChange={(event) =>
                      update("address2", event.target.value)
                    }
                    className={inputClass("address2")}
                  />
                </Field>
                <Field label="City" htmlFor="city" error={errors.city}>
                  <input
                    id="city"
                    name="city"
                    autoComplete="address-level2"
                    value={form.city}
                    onChange={(event) => update("city", event.target.value)}
                    className={inputClass("city")}
                    aria-invalid={Boolean(errors.city)}
                    aria-describedby={errors.city ? "city-error" : undefined}
                  />
                </Field>
                <Field label="State" htmlFor="state" error={errors.state}>
                  <input
                    id="state"
                    name="state"
                    autoComplete="address-level1"
                    placeholder="KA"
                    value={form.state}
                    onChange={(event) => update("state", event.target.value)}
                    className={inputClass("state")}
                    aria-invalid={Boolean(errors.state)}
                    aria-describedby={errors.state ? "state-error" : undefined}
                  />
                </Field>
                <Field label="PIN code" htmlFor="zip" error={errors.zip}>
                  <input
                    id="zip"
                    name="zip"
                    autoComplete="postal-code"
                    inputMode="numeric"
                    placeholder="560001"
                    value={form.zip}
                    onChange={(event) => update("zip", event.target.value)}
                    className={inputClass("zip")}
                    aria-invalid={Boolean(errors.zip)}
                    aria-describedby={errors.zip ? "zip-error" : undefined}
                  />
                </Field>
                <Field label="Country" htmlFor="country">
                  <input
                    id="country"
                    name="country"
                    value="India"
                    readOnly
                    className="input-base bg-sand/40 text-muted"
                  />
                </Field>
              </div>
              <p className="mt-4 text-[11px] leading-relaxed text-muted">
                Standard shipping: 3–5 business days. Orders over{" "}
                {formatMoney(FREE_SHIPPING_THRESHOLD)} ship free.
              </p>
            </section>

            <section className="rounded-3xl border border-ink/10 bg-white/80 p-6 shadow-card">
              <div className="flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-clay text-sm font-bold text-white">
                  3
                </span>
                <h2 className="font-display text-xl font-semibold">Payment</h2>
              </div>

              <div className="mt-4 flex items-start gap-2 rounded-xl bg-sand/50 p-3 text-[11px] leading-relaxed text-muted">
                <Shield className="mt-0.5 h-4 w-4 flex-none text-sage" />
                Demo checkout — use any 16-digit card number. No real payment is
                processed and card details never leave your browser.
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field
                  label="Card number"
                  htmlFor="cardNumber"
                  error={errors.cardNumber}
                  className="sm:col-span-2"
                >
                  <input
                    id="cardNumber"
                    name="cardNumber"
                    autoComplete="cc-number"
                    inputMode="numeric"
                    placeholder="4242 4242 4242 4242"
                    value={form.cardNumber}
                    onChange={(event) => {
                      const digits = event.target.value
                        .replace(/\D/g, "")
                        .slice(0, 16);
                      update(
                        "cardNumber",
                        digits.replace(/(\d{4})(?=\d)/g, "$1 "),
                      );
                    }}
                    className={inputClass("cardNumber")}
                    aria-invalid={Boolean(errors.cardNumber)}
                    aria-describedby={
                      errors.cardNumber ? "cardNumber-error" : undefined
                    }
                  />
                </Field>
                <Field
                  label="Name on card"
                  htmlFor="cardName"
                  error={errors.cardName}
                  className="sm:col-span-2"
                >
                  <input
                    id="cardName"
                    name="cardName"
                    autoComplete="cc-name"
                    value={form.cardName}
                    onChange={(event) =>
                      update("cardName", event.target.value)
                    }
                    className={inputClass("cardName")}
                    aria-invalid={Boolean(errors.cardName)}
                    aria-describedby={
                      errors.cardName ? "cardName-error" : undefined
                    }
                  />
                </Field>
                <Field label="Expiry" htmlFor="expiry" error={errors.expiry}>
                  <input
                    id="expiry"
                    name="expiry"
                    autoComplete="cc-exp"
                    inputMode="numeric"
                    placeholder="MM/YY"
                    value={form.expiry}
                    onChange={(event) => {
                      const digits = event.target.value
                        .replace(/\D/g, "")
                        .slice(0, 4);
                      update(
                        "expiry",
                        digits.length > 2
                          ? `${digits.slice(0, 2)}/${digits.slice(2)}`
                          : digits,
                      );
                    }}
                    className={inputClass("expiry")}
                    aria-invalid={Boolean(errors.expiry)}
                    aria-describedby={
                      errors.expiry ? "expiry-error" : undefined
                    }
                  />
                </Field>
                <Field label="CVC" htmlFor="cvc" error={errors.cvc}>
                  <input
                    id="cvc"
                    name="cvc"
                    autoComplete="cc-csc"
                    inputMode="numeric"
                    placeholder="123"
                    value={form.cvc}
                    onChange={(event) =>
                      update(
                        "cvc",
                        event.target.value.replace(/\D/g, "").slice(0, 4),
                      )
                    }
                    className={inputClass("cvc")}
                    aria-invalid={Boolean(errors.cvc)}
                    aria-describedby={errors.cvc ? "cvc-error" : undefined}
                  />
                </Field>
              </div>
            </section>

            {serverError && (
              <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800"
              >
                {serverError}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting || lines.length === 0}
              className="btn btn-primary w-full"
            >
              {submitting ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Placing order…
                </>
              ) : (
                <>
                  Place order &middot; {formatMoney(total)}
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
            <p className="text-center text-[11px] leading-relaxed text-muted">
              By placing this order you agree to our demo terms. Nothing will be
              charged and no card data is stored.
            </p>
          </form>

          <aside className="lg:sticky lg:top-24">
            <div className="rounded-3xl border border-ink/10 bg-white/80 p-6 shadow-card">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-xl font-semibold">
                  Order summary
                </h2>
                <Link
                  href="/cart"
                  className="text-xs font-bold text-clay-dark hover:underline"
                >
                  Edit cart
                </Link>
              </div>

              <div className="mt-4 space-y-3">
                {lines.map((line) => {
                  const product = getProduct(line.id);
                  if (!product) return null;

                  return (
                    <div key={line.id} className="flex items-center gap-3">
                      <div className="relative h-14 w-14 flex-none rounded-xl border border-ink/10 bg-sand/60 p-1">
                        <MiniArt id={line.id} />
                        <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-ink px-1 text-[10px] font-bold text-cream">
                          {line.qty}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold">{product.name}</p>
                        <p className="text-[11px] text-muted">
                          Qty {line.qty}
                        </p>
                      </div>
                      <p className="text-xs font-bold">
                        {formatMoney(product.price * line.qty)}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 space-y-1.5 border-t border-ink/10 pt-4 text-sm">
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
                <div className="mt-2 flex justify-between border-t border-ink/10 pt-3 text-base font-bold">
                  <span>Total</span>
                  <span>{formatMoney(total)}</span>
                </div>
                <p className="text-[11px] text-muted">Inclusive of GST.</p>
              </div>

              <p className="mt-4 flex items-start gap-2 rounded-xl bg-sand/60 p-3 text-[11px] leading-relaxed text-muted">
                <Lock className="mt-0.5 h-3.5 w-3.5 flex-none" />
                This is a demo store. Orders are confirmed instantly and no
                payment is taken.
              </p>
            </div>
          </aside>
        </div>
      </div>

      {submitting && (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-cream/80 backdrop-blur-sm">
          <div className="flex items-center gap-3 rounded-full border border-ink/10 bg-white px-6 py-4 shadow-card">
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-clay/30 border-t-clay" />
            <p className="text-sm font-bold">Placing your order…</p>
          </div>
        </div>
      )}
    </section>
  );
}
