import {
  Cartridge,
  Gift,
  Phone,
  PodIcon,
  Radar,
  Sliders,
} from "@/components/ui/Icons";

const FEATURES = [
  {
    icon: PodIcon,
    tone: "clay",
    title: "Wireless scent pods",
    copy: "Palm-sized, rechargeable, and quietly connected. One charge covers a month of daily hunts.",
  },
  {
    icon: Cartridge,
    tone: "sage",
    title: "Sealed scent cartridges",
    copy: "Swappable cartridges keep scent fresh, your hands clean, and the routine completely mess-free.",
  },
  {
    icon: Sliders,
    tone: "honey",
    title: "Trail Logic sequencing",
    copy: "Every hunt gets a randomized route, adjustable pod count, and timing that keeps the challenge alive.",
  },
  {
    icon: Gift,
    tone: "clay",
    title: "Three reward modes",
    copy: "Finish with a treat, a toy-pop, or nothing but the satisfaction of the find. Match your dog's motivation.",
  },
  {
    icon: Radar,
    tone: "sage",
    title: "Arrival sensing",
    copy: "Motion and proximity sensors know the moment your dog reaches each pod — no wearables, no buttons.",
  },
  {
    icon: Phone,
    tone: "honey",
    title: "One app, every hunt",
    copy: "Schedule sessions, scale difficulty, and see exactly how engaged your dog was — from anywhere in the house.",
  },
];

const TONES: Record<string, string> = {
  clay: "bg-clay/10 text-clay",
  sage: "bg-sage/15 text-[#5C6A4E]",
  honey: "bg-honey/15 text-[#946914]",
};

const STATS = [
  { value: "30+ days", label: "Per pod charge" },
  { value: "50 ft", label: "Home range" },
  { value: "USB-C", label: "2-hour charge" },
  { value: "3–5", label: "Pods per trail" },
];

export default function Features() {
  return (
    <section id="features" className="section-pad scroll-mt-24 bg-cream">
      <div className="container-page">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <span className="eyebrow">Built for noses</span>
            <h2 className="mt-5 text-balance text-4xl font-semibold leading-tight sm:text-5xl">
              Everything a good hunt needs.
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-muted">
            Hardware that disappears into your home. Software that keeps the
            challenge moving. No screens for your dog, no extra work for you.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, tone, title, copy }) => (
            <article
              key={title}
              className="group rounded-3xl border border-ink/10 bg-white/70 p-7 shadow-card backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-clay/25 hover:bg-white"
            >
              <span
                className={`grid h-14 w-14 place-items-center rounded-2xl ${TONES[tone]}`}
              >
                <Icon className="h-7 w-7" />
              </span>
              <h3 className="mt-5 text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{copy}</p>
            </article>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-6 rounded-3xl border border-ink/10 bg-white/60 p-6 sm:grid-cols-4 sm:p-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-2xl font-semibold sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.12em] text-muted">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
