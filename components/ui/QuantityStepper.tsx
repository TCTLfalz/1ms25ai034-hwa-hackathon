"use client";

import { Minus, Plus } from "@/components/ui/Icons";

export default function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 20,
  label = "quantity",
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  label?: string;
}) {
  return (
    <div className="inline-flex items-center rounded-full border border-ink/15 bg-white">
      <button
        type="button"
        aria-label={`Decrease ${label}`}
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
        className="grid h-8 w-8 place-items-center rounded-full text-ink transition hover:bg-sand disabled:opacity-35"
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span
        className="w-7 text-center text-xs font-bold tabular-nums"
        aria-live="polite"
      >
        {value}
      </span>
      <button
        type="button"
        aria-label={`Increase ${label}`}
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
        className="grid h-8 w-8 place-items-center rounded-full text-ink transition hover:bg-sand disabled:opacity-35"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
