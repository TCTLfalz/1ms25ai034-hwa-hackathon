import type { ReactNode, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Svg({
  children,
  className,
  ...props
}: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      {children}
    </svg>
  );
}

export function Paw(props: IconProps) {
  return (
    <Svg {...props} fill="currentColor" stroke="none">
      <ellipse cx="12" cy="15.6" rx="4.6" ry="3.7" />
      <ellipse cx="5.6" cy="11.4" rx="2" ry="2.6" transform="rotate(-20 5.6 11.4)" />
      <ellipse cx="9.6" cy="7.6" rx="2" ry="2.7" transform="rotate(-7 9.6 7.6)" />
      <ellipse cx="14.4" cy="7.6" rx="2" ry="2.7" transform="rotate(7 14.4 7.6)" />
      <ellipse cx="18.4" cy="11.4" rx="2" ry="2.6" transform="rotate(20 18.4 11.4)" />
    </Svg>
  );
}

export function Bag(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M6 8h12l-1 12H7L6 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </Svg>
  );
}

export function Menu(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Svg>
  );
}

export function Close(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </Svg>
  );
}

export function ArrowRight(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 12h16" />
      <path d="m14 6 6 6-6 6" />
    </Svg>
  );
}

export function Check(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m5 12 4.5 4.5L19 7" />
    </Svg>
  );
}

export function Plus(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 5v14M5 12h14" />
    </Svg>
  );
}

export function Minus(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M5 12h14" />
    </Svg>
  );
}

export function Trash(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 7h16" />
      <path d="M9 7V5h6v2" />
      <path d="M6 7l1 13h10l1-13" />
      <path d="M10 11v5M14 11v5" />
    </Svg>
  );
}

export function Clock(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </Svg>
  );
}

export function Repeat(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m17 3 3 3-3 3" />
      <path d="M20 6H8a5 5 0 0 0-5 5" />
      <path d="m7 21-3-3 3-3" />
      <path d="M4 18h12a5 5 0 0 0 5-5" />
    </Svg>
  );
}

export function Nose(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 3.5c3.7 0 6.2 2.4 6.2 5.5 0 2.6-2 4.6-4.6 4.6h-3.2c-2.6 0-4.6-2-4.6-4.6 0-3.1 2.5-5.5 6.2-5.5Z" />
      <path d="M9.5 16.5c.7 1.6 1.5 2.7 2.5 3.7 1-1 1.8-2.1 2.5-3.7" />
      <circle cx="9.7" cy="8.8" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="14.3" cy="8.8" r="0.9" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function PodIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M6 13c0-4 2.7-6.5 6-6.5s6 2.5 6 6.5-2.5 7-6 7-6-3-6-7Z" />
      <path d="M8 6.5h8" />
      <circle cx="12" cy="14" r="1.4" />
    </Svg>
  );
}

export function Cartridge(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="9" y="3" width="6" height="18" rx="3" />
      <path d="M9 8.5h6" />
    </Svg>
  );
}

export function Phone(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
      <path d="M10.5 5.5h3" />
    </Svg>
  );
}

export function Sliders(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 7h10M18 7h2M4 17h4M12 17h8" />
      <circle cx="16" cy="7" r="2" />
      <circle cx="10" cy="17" r="2" />
    </Svg>
  );
}

export function Gift(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3.5" y="8.5" width="17" height="4" rx="1" />
      <path d="M5 12.5V21h14v-8.5" />
      <path d="M12 8.5V21" />
      <path d="M12 8.5C10.8 5.5 8 4 6.8 5.4c-1.3 1.5.7 3.1 5.2 3.1Z" />
      <path d="M12 8.5c1.2-3 4-4.5 5.2-3.1 1.3 1.5-.7 3.1-5.2 3.1Z" />
    </Svg>
  );
}

export function Radar(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 12l6-6" />
    </Svg>
  );
}

export function Battery(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3" y="7" width="16" height="10" rx="2.5" />
      <path d="M21 10v4" />
      <path d="M6 10.5v3" />
    </Svg>
  );
}

export function Sparkle(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 3.5 13.7 9l5.5 1.7-5.5 1.8L12 18l-1.7-5.5L4.8 10.7 10.3 9 12 3.5Z" />
      <path d="M18.5 16.5 19 18l1.5.5-1.5.5-.5 1.5-.5-1.5L16.5 19l1.5-.5.5-2Z" />
    </Svg>
  );
}

export function Truck(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3 7h11v9H3z" />
      <path d="M14 10h4l3 3v3h-7z" />
      <circle cx="7" cy="18" r="1.7" />
      <circle cx="17.5" cy="18" r="1.7" />
    </Svg>
  );
}

export function Shield(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 3l7 3v6c0 4.2-3 7.4-7 9-4-1.6-7-4.8-7-9V6l7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </Svg>
  );
}

export function Star(props: IconProps) {
  return (
    <Svg {...props} fill="currentColor" stroke="none">
      <path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8L3.5 9.7l5.9-.8L12 3.5Z" />
    </Svg>
  );
}

export function Mail(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7 8 6 8-6" />
    </Svg>
  );
}

export function ChevronDown(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m6 9 6 6 6-6" />
    </Svg>
  );
}

export function MapPin(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </Svg>
  );
}

export function Calendar(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3.5" y="5" width="17" height="16" rx="2.5" />
      <path d="M8 3v4M16 3v4M3.5 10h17" />
    </Svg>
  );
}

export function Chart(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
    </Svg>
  );
}

export function Home(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m3 11 9-8 9 8" />
      <path d="M5 10v10h14V10" />
    </Svg>
  );
}

export function Settings(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1" />
    </Svg>
  );
}

export function Instagram(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function TikTok(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M14 4v9.5a3.5 3.5 0 1 1-3-3.46" />
      <path d="M14 4c.4 2.4 2 4.1 4.5 4.4" />
    </Svg>
  );
}

export function YouTube(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="m10.5 9.5 5 2.5-5 2.5v-5Z" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function Lock(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="5" y="10.5" width="14" height="10" rx="2.5" />
      <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" />
    </Svg>
  );
}

export function CreditCard(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <path d="M2.5 9.5h19" />
      <path d="M6 15h4" />
    </Svg>
  );
}
