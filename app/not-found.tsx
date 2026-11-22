import Link from "next/link";
import { ArrowRight, Nose } from "@/components/ui/Icons";

export default function NotFound() {
  return (
    <section className="section-pad bg-cream">
      <div className="container-page">
        <div className="mx-auto max-w-xl rounded-3xl border border-ink/10 bg-white/70 p-10 text-center shadow-card">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-sand text-clay">
            <Nose className="h-7 w-7" />
          </span>
          <h1 className="mt-5 font-display text-3xl font-semibold">
            This trail went cold.
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            We couldn&apos;t find that page. Let&apos;s get you back to the good
            smells.
          </p>
          <Link href="/" className="btn btn-primary mt-6">
            Back to home <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
