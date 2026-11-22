import Link from "next/link";
import {
  ArrowRight,
  Clock,
  Nose,
  Repeat,
} from "@/components/ui/Icons";

const PROBLEMS = [
  {
    icon: Clock,
    title: "Solved in minutes",
    copy: "Puzzle feeders and treat dispensers reward the same trick until your dog masters it. After that, the challenge is gone.",
  },
  {
    icon: Repeat,
    title: "Repetition breeds boredom",
    copy: "Same shape. Same motion. Same reward. Dogs are wired to explore, not to run the same drill twice.",
  },
  {
    icon: Nose,
    title: "The nose is left out",
    copy: "A dog's sense of smell is tens of thousands of times sharper than ours — yet most toys barely use it.",
  },
];

export default function Problem() {
  return (
    <section id="problem" className="section-pad scroll-mt-24 bg-cream">
      <div className="container-page">
        <div className="max-w-2xl">
          <span className="eyebrow">Why toys lose</span>
          <h2 className="mt-5 text-balance text-4xl font-semibold leading-tight sm:text-5xl">
            Most enrichment toys are solved — then ignored.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            A busy dog is a happy dog. But the toys we give them are built
            around food and repetition, not around the sense they trust most.
            The result is a five-minute thrill, then a toy under the sofa.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {PROBLEMS.map(({ icon: Icon, title, copy }) => (
            <article
              key={title}
              className="rounded-3xl border border-ink/10 bg-white/70 p-7 shadow-card backdrop-blur-sm"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-clay/10 text-clay">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{copy}</p>
            </article>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-5 rounded-3xl border border-clay/15 bg-clay/[0.06] p-6 sm:p-7 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <span className="hidden h-11 w-11 flex-none place-items-center rounded-full bg-white text-clay sm:grid">
              <Nose className="h-5 w-5" />
            </span>
            <p className="max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
              <strong className="font-bold text-ink">
                The nose is the missing piece.
              </strong>{" "}
              Nosy Paws is built around search, not snacks — so the challenge
              stays interesting long after the first hunt.
            </p>
          </div>
          <Link
            href="/#how-it-works"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-clay-dark transition hover:gap-3"
          >
            How Trail Logic works <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
