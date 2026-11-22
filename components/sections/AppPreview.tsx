import {
  Calendar,
  Chart,
  Check,
  Clock,
  Gift,
  Home,
  Minus,
  Nose,
  Paw,
  Phone,
  Plus,
  Settings,
  Sparkle,
} from "@/components/ui/Icons";

type Tab = "home" | "hunts" | "stats" | "settings";

const TABS: { id: Tab; label: string; icon: typeof Home }[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "hunts", label: "Hunts", icon: Paw },
  { id: "stats", label: "Stats", icon: Chart },
  { id: "settings", label: "Settings", icon: Settings },
];

function TabBar({ active }: { active: Tab }) {
  return (
    <div className="grid grid-cols-4 border-t border-ink/10 bg-white/70 px-2 py-2">
      {TABS.map(({ id, label, icon: Icon }) => (
        <div
          key={id}
          className={`flex flex-col items-center gap-1 text-[8px] font-bold ${
            active === id ? "text-clay" : "text-muted/60"
          }`}
        >
          <Icon className="h-3.5 w-3.5" />
          {label}
        </div>
      ))}
    </div>
  );
}

function PhoneFrame({
  active,
  children,
  className = "",
}: {
  active: Tab;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative mx-auto w-full max-w-[290px] rounded-[2.7rem] border-[7px] border-ink bg-ink shadow-soft ${className}`}
    >
      <div className="absolute left-1/2 top-[9px] z-20 h-[22px] w-[86px] -translate-x-1/2 rounded-full bg-ink" />
      <div className="relative overflow-hidden rounded-[2.15rem] bg-[#FBF7F1]">
        <div className="flex items-center justify-between px-5 pt-3 text-[9px] font-bold text-ink">
          <span>9:41</span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-3 rounded-[2px] border border-ink/50" />
            <span className="h-2 w-2 rounded-full bg-ink/60" />
          </span>
        </div>
        <div className="flex min-h-[428px] flex-col px-4 pb-4 pt-4">
          {children}
        </div>
        <TabBar active={active} />
      </div>
    </div>
  );
}

function ScheduleScreen() {
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[8px] font-extrabold uppercase tracking-[0.16em] text-muted">
            New hunt
          </p>
          <h3 className="mt-0.5 font-display text-xl font-semibold leading-tight">
            Good evening, Sam
          </h3>
        </div>
        <span className="grid h-8 w-8 place-items-center rounded-full bg-clay text-cream">
          <Paw className="h-4 w-4" />
        </span>
      </div>

      <div className="mt-4 rounded-2xl border border-ink/10 bg-white p-3">
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-sand text-clay">
            <Paw className="h-4 w-4" />
          </span>
          <div>
            <p className="text-[10px] font-bold">Milo</p>
            <p className="text-[9px] text-muted">Border collie · 4 yrs</p>
          </div>
          <span className="ml-auto rounded-full bg-sage-light px-2 py-1 text-[8px] font-bold text-sage">
            Ready
          </span>
        </div>
      </div>

      <div className="mt-2.5 rounded-2xl border border-ink/10 bg-white p-3">
        <div className="flex items-center justify-between">
          <p className="text-[8px] font-extrabold uppercase tracking-[0.14em] text-muted">
            Start time
          </p>
          <Calendar className="h-3.5 w-3.5 text-muted" />
        </div>
        <p className="mt-1 font-display text-lg leading-none">5:30 PM</p>
        <p className="mt-1 text-[9px] text-muted">Today · 4 pods</p>
      </div>

      <div className="mt-2.5 rounded-2xl border border-ink/10 bg-white p-3">
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-[8px] font-extrabold uppercase tracking-[0.14em] text-muted">
              Difficulty
            </p>
            <p className="text-[11px] font-bold">Balanced</p>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-sand p-1 text-[8px] font-bold">
            <span className="rounded-full px-2 py-1 text-muted">Gentle</span>
            <span className="rounded-full bg-white px-2 py-1 shadow-sm">
              Balanced
            </span>
            <span className="rounded-full px-2 py-1 text-muted">Challenge</span>
          </div>
        </div>
      </div>

      <div className="mt-2.5 flex items-center justify-between rounded-2xl border border-ink/10 bg-white p-3">
        <div>
          <p className="text-[8px] font-extrabold uppercase tracking-[0.14em] text-muted">
            Pods
          </p>
          <p className="text-[11px] font-bold">4 of 5 active</p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="grid h-6 w-6 place-items-center rounded-full border border-ink/15 text-muted">
            <Minus className="h-3 w-3" />
          </span>
          <span className="grid h-6 w-6 place-items-center rounded-full bg-ink text-cream">
            <Plus className="h-3 w-3" />
          </span>
        </div>
      </div>

      <button
        type="button"
        tabIndex={-1}
        className="mt-3 w-full rounded-full bg-clay py-2.5 text-[11px] font-bold text-white"
      >
        Start hunt
      </button>
      <p className="mt-2 text-center text-[8px] text-muted">
        All pods charged and ready
      </p>
    </>
  );
}

const REWARDS = [
  {
    icon: Gift,
    title: "Treat",
    copy: "A treat drops from the final pod.",
    selected: true,
  },
  {
    icon: Sparkle,
    title: "Toy-pop",
    copy: "A favourite toy pops up to end the hunt.",
    selected: false,
  },
  {
    icon: Nose,
    title: "Enrichment only",
    copy: "No reward — just the satisfaction of the find.",
    selected: false,
  },
];

function RewardScreen() {
  return (
    <>
      <p className="text-[8px] font-extrabold uppercase tracking-[0.16em] text-muted">
        Reward mode
      </p>
      <h3 className="mt-1 font-display text-xl font-semibold leading-tight">
        How should the trail end?
      </h3>

      <div className="mt-4 space-y-2">
        {REWARDS.map(({ icon: Icon, title, copy, selected }) => (
          <div
            key={title}
            className={`flex items-center gap-2.5 rounded-2xl border p-3 ${
              selected
                ? "border-clay bg-clay/[0.06]"
                : "border-ink/10 bg-white"
            }`}
          >
            <span
              className={`grid h-8 w-8 flex-none place-items-center rounded-full ${
                selected ? "bg-clay text-white" : "bg-sand text-clay"
              }`}
            >
              <Icon className="h-4 w-4" />
            </span>
            <div className="flex-1">
              <p className="text-[10px] font-bold">{title}</p>
              <p className="text-[8px] leading-snug text-muted">{copy}</p>
            </div>
            <span
              className={`grid h-4 w-4 flex-none place-items-center rounded-full border ${
                selected
                  ? "border-clay bg-clay text-white"
                  : "border-ink/20"
              }`}
            >
              {selected && <Check className="h-2.5 w-2.5" />}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between rounded-2xl border border-ink/10 bg-white p-3">
        <div>
          <p className="text-[10px] font-bold">Surprise me</p>
          <p className="text-[8px] text-muted">Vary the reward between hunts</p>
        </div>
        <span className="relative h-5 w-9 rounded-full bg-clay">
          <span className="absolute right-0.5 top-0.5 h-4 w-4 rounded-full bg-white" />
        </span>
      </div>

      <button
        type="button"
        tabIndex={-1}
        className="mt-3 w-full rounded-full bg-ink py-2.5 text-[11px] font-bold text-cream"
      >
        Save reward mode
      </button>
      <p className="mt-2 text-center text-[8px] text-muted">
        You can change this before every hunt
      </p>
    </>
  );
}

const BARS = [
  { day: "M", value: 42 },
  { day: "T", value: 64 },
  { day: "W", value: 50 },
  { day: "T", value: 78 },
  { day: "F", value: 58 },
  { day: "S", value: 90 },
  { day: "S", value: 70 },
];

function HistoryScreen() {
  return (
    <>
      <p className="text-[8px] font-extrabold uppercase tracking-[0.16em] text-muted">
        This week
      </p>
      <h3 className="mt-1 font-display text-xl font-semibold leading-tight">
        Milo&apos;s engagement
      </h3>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="rounded-2xl border border-ink/10 bg-white p-3">
          <p className="font-display text-2xl leading-none">12</p>
          <p className="mt-1 text-[8px] font-semibold uppercase tracking-wide text-muted">
            Hunts
          </p>
        </div>
        <div className="rounded-2xl border border-ink/10 bg-white p-3">
          <p className="font-display text-2xl leading-none">94%</p>
          <p className="mt-1 text-[8px] font-semibold uppercase tracking-wide text-muted">
            Trail completion
          </p>
        </div>
      </div>

      <div className="mt-2.5 rounded-2xl border border-ink/10 bg-white p-3">
        <div className="flex items-center justify-between">
          <p className="text-[8px] font-extrabold uppercase tracking-[0.14em] text-muted">
            Engagement
          </p>
          <p className="text-[8px] font-bold text-sage">+18%</p>
        </div>
        <div className="mt-3 flex items-end gap-1.5">
          {BARS.map((bar, index) => (
            <div
              key={`${bar.day}-${index}`}
              className="flex flex-1 flex-col items-center gap-1"
            >
              <div className="flex h-16 w-full items-end">
                <div
                  className={`w-full rounded-t-md ${
                    index === 5 ? "bg-clay" : "bg-sand"
                  }`}
                  style={{ height: `${bar.value}%` }}
                />
              </div>
              <span className="text-[7px] font-bold text-muted">{bar.day}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-2.5 space-y-1.5">
        {[
          { name: "Evening hunt", detail: "4 pods · 6:12" },
          { name: "Morning hunt", detail: "3 pods · 4:48" },
        ].map((session) => (
          <div
            key={session.name}
            className="flex items-center gap-2 rounded-xl border border-ink/10 bg-white px-2.5 py-2"
          >
            <Check className="h-3 w-3 text-sage" />
            <div className="flex-1">
              <p className="text-[9px] font-bold">{session.name}</p>
              <p className="text-[8px] text-muted">{session.detail}</p>
            </div>
            <span className="text-[8px] font-bold text-sage">Complete</span>
          </div>
        ))}
        <div className="flex items-center gap-2 rounded-xl border border-ink/10 bg-white px-2.5 py-2">
          <Clock className="h-3 w-3 text-honey" />
          <div className="flex-1">
            <p className="text-[9px] font-bold">Lunchtime hunt</p>
            <p className="text-[8px] text-muted">5 pods · 8:05</p>
          </div>
          <span className="text-[8px] font-bold text-honey">In progress</span>
        </div>
      </div>
    </>
  );
}

const CAPTIONS = [
  {
    title: "Schedule a hunt",
    copy: "Pick a time, pod count, and difficulty in seconds.",
  },
  {
    title: "Choose the ending",
    copy: "Treat, toy-pop, or enrichment only — your call.",
  },
  {
    title: "Watch the engagement",
    copy: "See completions, pace, and how hard your dog worked.",
  },
];

export default function AppPreview() {
  return (
    <section
      id="app"
      className="section-pad relative scroll-mt-24 overflow-hidden bg-sand/40"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-24 h-96 w-96 rounded-full bg-clay/[0.07] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-sage/10 blur-3xl"
      />

      <div className="container-page relative">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">
            <Phone className="h-3.5 w-3.5" />
            The app
          </span>
          <h2 className="mt-5 text-balance text-4xl font-semibold leading-tight sm:text-5xl">
            The hunt, in your hand.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Build a trail, pick a reward, and watch your dog work. Nosy Paws
            handles the rest quietly in the background.
          </p>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-3 lg:gap-6 xl:gap-10">
          <div className="lg:mt-8">
            <PhoneFrame active="hunts">
              <ScheduleScreen />
            </PhoneFrame>
            <div className="mx-auto mt-6 max-w-[280px] text-center">
              <p className="text-sm font-bold">{CAPTIONS[0].title}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                {CAPTIONS[0].copy}
              </p>
            </div>
          </div>

          <div>
            <PhoneFrame active="home">
              <RewardScreen />
            </PhoneFrame>
            <div className="mx-auto mt-6 max-w-[280px] text-center">
              <p className="text-sm font-bold">{CAPTIONS[1].title}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                {CAPTIONS[1].copy}
              </p>
            </div>
          </div>

          <div className="lg:mt-14">
            <PhoneFrame active="stats">
              <HistoryScreen />
            </PhoneFrame>
            <div className="mx-auto mt-6 max-w-[280px] text-center">
              <p className="text-sm font-bold">{CAPTIONS[2].title}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                {CAPTIONS[2].copy}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
