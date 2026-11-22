import { Paw } from "@/components/ui/Icons";

export default function Logo({
  tone = "dark",
  className = "",
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-clay text-cream shadow-sm">
        <Paw className="h-5 w-5" />
      </span>
      <span
        className={`font-display text-[1.35rem] font-semibold leading-none tracking-tight ${
          tone === "light" ? "text-cream" : "text-ink"
        }`}
      >
        nosy paws
      </span>
    </span>
  );
}
