import type { ProductAccent } from "@/lib/products";

const ACCENT_HEX: Record<ProductAccent, string> = {
  clay: "#C05F3C",
  sage: "#7C8A6D",
  honey: "#D9A441",
};

export function PodArt({
  accent = "clay",
  className = "",
}: {
  accent?: ProductAccent;
  className?: string;
}) {
  const hex = ACCENT_HEX[accent];

  return (
    <svg viewBox="0 0 240 240" className={className} aria-hidden="true">
      <ellipse cx="120" cy="209" rx="66" ry="11" fill="#2A211A" opacity="0.1" />
      <path
        d="M48 122c0-36 27-60 72-60s72 24 72 60c0 38-28 64-72 64s-72-26-72-64Z"
        fill="#FBF5EA"
        stroke="#E3D5C1"
        strokeWidth="2.5"
      />
      <path
        d="M72 118c3-22 21-36 46-38"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="7"
        strokeLinecap="round"
        opacity="0.75"
      />
      <rect x="62" y="46" width="116" height="46" rx="23" fill={hex} />
      <rect
        x="76"
        y="56"
        width="88"
        height="11"
        rx="5.5"
        fill="#FFFFFF"
        opacity="0.22"
      />
      <circle cx="120" cy="77" r="3.2" fill="#FFFFFF" opacity="0.55" />
      <circle cx="120" cy="154" r="16" fill={hex} opacity="0.16" />
      <circle cx="120" cy="154" r="5.5" fill={hex} />
      <path
        d="M110 190h20"
        stroke="#E3D5C1"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CartridgeArt({
  accent = "honey",
  className = "",
}: {
  accent?: ProductAccent;
  className?: string;
}) {
  const hex = ACCENT_HEX[accent];

  return (
    <svg viewBox="0 0 120 140" className={className} aria-hidden="true">
      <rect
        x="40"
        y="14"
        width="40"
        height="112"
        rx="20"
        fill="#FBF5EA"
        stroke="#E3D5C1"
        strokeWidth="2"
      />
      <path d="M40 34a20 20 0 0 1 20-20h0a20 20 0 0 1 20 20v14H40V34Z" fill={hex} />
      <rect x="48" y="58" width="24" height="26" rx="6" fill={hex} opacity="0.18" />
      <path
        d="M52 71h16"
        stroke={hex}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="60" cy="104" r="3" fill={hex} />
    </svg>
  );
}

const PAW_MARKS = [
  { x: 110, y: 575, r: -18 },
  { x: 175, y: 520, r: 22 },
  { x: 250, y: 470, r: -12 },
  { x: 330, y: 410, r: 25 },
  { x: 385, y: 330, r: -6 },
  { x: 420, y: 250, r: 18 },
];

export function PawTrail({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 560 700" className={className} aria-hidden="true" fill="none">
      <path
        d="M92 596C210 560 166 470 286 432c96-30 128-104 128-206"
        stroke="#C05F3C"
        strokeOpacity="0.35"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="2 14"
      />
      {PAW_MARKS.map((mark) => (
        <g
          key={`${mark.x}-${mark.y}`}
          transform={`translate(${mark.x} ${mark.y}) rotate(${mark.r}) scale(0.9)`}
          fill="#C05F3C"
          opacity="0.38"
        >
          <ellipse cx="12" cy="15.6" rx="4.6" ry="3.7" />
          <ellipse cx="5.6" cy="11.4" rx="2" ry="2.6" transform="rotate(-20 5.6 11.4)" />
          <ellipse cx="9.6" cy="7.6" rx="2" ry="2.7" transform="rotate(-7 9.6 7.6)" />
          <ellipse cx="14.4" cy="7.6" rx="2" ry="2.7" transform="rotate(7 14.4 7.6)" />
          <ellipse cx="18.4" cy="11.4" rx="2" ry="2.6" transform="rotate(20 18.4 11.4)" />
        </g>
      ))}
    </svg>
  );
}
