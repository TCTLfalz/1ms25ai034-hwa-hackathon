"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <p className="rounded-2xl border border-sage/30 bg-sage/10 px-5 py-4 text-sm font-semibold text-sage">
        You&apos;re on the list. Happy sniffing.
      </p>
    );
  }

  return (
    <form
      className="flex flex-col gap-2 sm:flex-row"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        placeholder="you@example.com"
        className="w-full rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm text-cream placeholder:text-cream/40 focus:border-cream/40 focus:outline-none focus:ring-2 focus:ring-cream/20"
      />
      <button type="submit" className="btn btn-light whitespace-nowrap">
        Join the pack
      </button>
    </form>
  );
}
