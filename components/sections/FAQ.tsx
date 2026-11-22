import { Mail, Plus } from "@/components/ui/Icons";

const FAQS = [
  {
    q: "Does my dog need to be food-motivated?",
    a: "Not at all. Nosy Paws is built around scent, not snacks. Enrichment-only mode gives scent-driven dogs a full hunt with no food at all, and toy-pop mode ends with a favourite toy instead. Treat mode is there for dogs who like a little payoff.",
  },
  {
    q: "What if my dog ignores it at first?",
    a: "That's normal for the first session or two. Start with two pods, a short trail, and the strongest scent in the pack. Reward any interest in the pod, then let the app guide you to a longer trail. Most dogs are following a full sequence within three short sessions — and the quick-start guide walks you through it.",
  },
  {
    q: "How many pods do I need?",
    a: "Three pods are ideal for apartments and single-floor homes. Five give you longer, more varied trails across multiple rooms. You can start with three and add pods later — the app scales every hunt to the hardware you have.",
  },
  {
    q: "Is it safe to leave my dog unsupervised?",
    a: "The pods are cordless, chew-resistant, and use sealed cartridges, so there's nothing to spill or plug in. We still recommend starting with supervised sessions and keeping hunts to 10–15 minutes. Pods are enrichment tools, not chew toys — if one gets damaged, remove it and contact us.",
  },
  {
    q: "How long do cartridges and batteries last?",
    a: "A cartridge stays fresh for roughly 4–6 weeks of regular hunts, and the app tells you when it's running low. Pods recharge on the USB-C dock in about two hours and last around 30 days of daily sessions.",
  },
  {
    q: "Can more than one dog use it?",
    a: "Yes. Add a profile for each dog and run hunts one at a time so the sensors can track the right nose. The app keeps separate history, difficulty, and reward settings for every dog.",
  },
  {
    q: "What scents are included?",
    a: "Every kit starts with Chicken & Herb, Peanut Butter, and Cedar Trail. Refill packs include all three. Cartridges are sealed and vet-reviewed, and seasonal scents are on the way.",
  },
  {
    q: "What if it isn't a fit?",
    a: "You have 30 days to try it. If your dog isn't into it, contact us for a return or exchange and we'll make it right. The hardware is also covered by a one-year warranty.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="section-pad scroll-mt-24 bg-cream">
      <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <span className="eyebrow">FAQ</span>
          <h2 className="mt-5 text-balance text-4xl font-semibold leading-tight sm:text-5xl">
            Good questions, honest answers.
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
            Everything you need to know before your first trail. Still
            wondering about something? We&apos;re happy to help.
          </p>

          <div className="mt-8 rounded-3xl bg-ink p-7 text-cream">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-clay/20 text-[#F0A07E]">
              <Mail className="h-5 w-5" />
            </span>
            <p className="mt-4 font-display text-xl font-semibold">
              Still curious?
            </p>
            <p className="mt-1 text-sm leading-relaxed text-cream/55">
              Talk to a real human about your dog, your home, or which kit
              makes sense.
            </p>
            <a
              href="mailto:hello@nosypaws.com"
              className="btn btn-light mt-5 w-full"
            >
              hello@nosypaws.com
            </a>
            <p className="mt-2 text-center text-[11px] text-cream/40">
              We reply within one business day.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, index) => (
            <details
              key={faq.q}
              open={index === 0}
              className="group rounded-2xl border border-ink/10 bg-white/70 px-5 transition open:border-ink/15 open:bg-white open:shadow-card"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-sm font-bold sm:text-base [&::-webkit-details-marker]:hidden">
                {faq.q}
                <span className="grid h-7 w-7 flex-none place-items-center rounded-full border border-ink/15 text-ink transition group-open:rotate-45 group-open:border-clay group-open:text-clay">
                  <Plus className="h-4 w-4" />
                </span>
              </summary>
              <p className="pb-5 pr-8 text-sm leading-relaxed text-muted">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
