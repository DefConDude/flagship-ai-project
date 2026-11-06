import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Decorative building blocks that mirror the Innovation Decoded AGENCY site
 * (apps/agency/components/sections.tsx): navy bands, a scribble underline,
 * a spinning sticker and a tilted marquee strip.
 */

/** Navy band with the brand glow and grain. Always dark, in either theme. */
export function DarkBand({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("navy-band on-navy grain", className)}>
      <div className="glow absolute inset-0 -z-10" aria-hidden="true" />
      {children}
    </section>
  );
}

/** Hand-drawn turquoise underline for a word or two in a heading. */
export function Scribble({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-block whitespace-nowrap">
      {children}
      <svg
        viewBox="0 0 220 20"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="absolute -bottom-2 left-0 h-3 w-full text-turquoise sm:-bottom-3 sm:h-4"
      >
        <path
          d="M3 14 C 50 4, 110 4, 217 10 M 30 17 C 90 11, 150 12, 200 15"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

/** Round turquoise sticker with text spinning around a centre label. */
export function Sticker({
  label,
  ring,
  className,
  style,
}: {
  label: string;
  ring: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={cn(
        "relative grid size-32 place-items-center rounded-full bg-turquoise text-navy shadow-xl shadow-black/20 sm:size-36",
        className,
      )}
      style={style}
    >
      <svg viewBox="0 0 100 100" aria-hidden="true" className="spin-slower absolute inset-0">
        <defs>
          <path id="sticker-ring" d="M50 50 m -38 0 a 38 38 0 1 1 76 0 a 38 38 0 1 1 -76 0" />
        </defs>
        <text className="fill-navy text-[8.5px] font-semibold uppercase">
          {/* Stretch the text to exactly one lap of the ring (2π × 38). */}
          <textPath href="#sticker-ring" textLength="238" lengthAdjust="spacing">
            {ring}
          </textPath>
        </text>
      </svg>
      <span className="font-heading text-xl font-bold">{label}</span>
    </div>
  );
}

/** Endless tilted purple strip of words. Rendered twice so the loop is seamless. */
export function Marquee({ items }: { items: string[] }) {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center gap-8 pr-8" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li key={item} className="flex items-center gap-8 whitespace-nowrap">
          <span>{item}</span>
          <span className="text-turquoise" aria-hidden="true">
            ✦
          </span>
        </li>
      ))}
    </ul>
  );

  // The outer clip stops the tilted strip's corners from widening the page on phones.
  // The tilted (-rotate-1) strip's corners lift away from its layout box, exposing
  // wedges of the background above/below and left/right. To hide them completely:
  //  - make the bar WIDER than the viewport and nudge it left  -> covers side wedges
  //  - give it EXTRA vertical padding and pull it UP (negative top margin) so the
  //    purple bleeds over the sections above and below -> covers the top/bottom
  //    triangular wedges (the dark gap that showed at the top-left corner).
  // The outer wrapper clips the horizontal overhang so it never widens the page.
  return (
    <div className="relative z-10 -my-4 overflow-x-clip">
      <div className="-mx-[4vw] w-[108vw] -rotate-1 overflow-hidden bg-purple py-8 font-heading text-xl font-bold text-white sm:text-2xl">
        <div className="marquee flex w-max">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </div>
  );
}
