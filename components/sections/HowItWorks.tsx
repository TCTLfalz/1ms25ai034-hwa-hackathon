import { Fragment } from "react";
import {
  Check,
  Gift,
  Nose,
  PodIcon,
  Sliders,
} from "@/components/ui/Icons";

const STEPS = [
  {
    n: "01",
    icon: PodIcon,
    title: "Place the pods",
    copy: "Set three to five wireless pods around the house — wherever your dog already loves to sniff.",
  },
  {
    n: "02",
    icon: Sliders,
    title: "Set the trail",
    copy: "Choose a length and difficulty in the app. Trail Logic builds a fresh, randomized scent sequence.",
  },
  {
    n: "03",
    icon: Nose,
    title: "Let the hunt begin",
    copy: "Each pod releases a quiet puff of scent and senses the moment your dog arrives. No buttons, no bells.",
  },
  {
    n: "04",
    icon: Gift,
    title: "Reward the find",
    copy: "Reach the final pod in the right order and the reward unlocks: a treat, a toy-pop, or pure enrichment.",
  },
];

const TRAIL = ["A", "C", "B", "D"];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-24 bg-ink text-cream"
    >
      <div className="container-page section-pad">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow-dark">
            <Nose className="h-3.5 w-3.5" />
            How it works
          </span>
          <h2 className="mt-5 text-balance text-4xl font-semibold leading-tight text-cream sm:text-5xl">
            Four steps. A brand-new trail every time.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-cream/55">
            No training required. Set it up once, then let the app handle the
            surprise.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {STEPS.map(({ n, icon: Icon, title, copy }) => (
            <article
              key={n}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6"
            >
              <span className="pointer-events-none absolute right-5 top-3 font-display text-5xl font-semibold text-white/[0.07]">
                {n}
              </span>
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-clay/20 text-[#F0A07E]">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-xl font-semibold text-cream">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/55">
                {copy}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-6 grid gap-8 rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 sm:p-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <span className="eyebrow-dark">Trail Logic</span>
            <h3 className="mt-4 text-3xl font-semibold leading-tight text-cream sm:text-4xl">
              The challenge is the route, not the reward.
            </h3>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-cream/60 sm:text-base">
              Trail Logic is the sequencing engine behind every hunt. Pods only
              count when your dog reaches them in the right order — so the
              challenge is the route, not the treat. Every hunt is different,
              and the app adapts as your dog gets faster.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-cream/70">
              {[
                "Randomized pod order — no pattern to memorize",
                "Motion and proximity sensors detect each arrival",
                "Difficulty adapts as your dog improves",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full bg-sage/20 text-sage">
                    <Check className="h-3 w-3" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-ink/60 p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-cream/45">
                Today&apos;s trail
              </p>
              <span className="rounded-full bg-sage/15 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-sage">
                4 pods
              </span>
            </div>

            <div className="mt-6 flex items-center gap-1.5">
              {TRAIL.map((letter, index) => (
                <Fragment key={letter}>
                  {index > 0 && (
                    <div className="h-px flex-1 border-t border-dashed border-cream/25" />
                  )}
                  <div className="flex flex-col items-center gap-1.5">
                    <span
                      className={`grid h-10 w-10 place-items-center rounded-full border text-xs font-extrabold ${
                        index < TRAIL.length - 1
                          ? "border-sage/40 bg-sage/15 text-sage"
                          : "border-clay/50 bg-clay/20 text-[#F0A07E]"
                      }`}
                    >
                      {letter}
                    </span>
                    {index < TRAIL.length - 1 ? (
                      <Check className="h-3 w-3 text-sage" />
                    ) : (
                      <Gift className="h-3 w-3 text-[#F0A07E]" />
                    )}
                  </div>
                </Fragment>
              ))}
            </div>

            <p className="mt-5 text-[11px] leading-relaxed text-cream/45">
              Correct sequence{" "}
              <span className="font-bold text-cream/75">&rarr;</span> final pod
              unlocks the reward.
            </p>
            <div className="mt-4 rounded-xl bg-white/5 px-3 py-2.5 text-[10px] leading-relaxed text-cream/40">
              Next hunt:{" "}
              <span className="font-bold text-cream/70">D &rarr; A &rarr; C &rarr; B</span>{" "}
              — never the same route twice.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
