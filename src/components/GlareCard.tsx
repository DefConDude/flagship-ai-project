"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Interactive card wrapper — innovationdecoded.com signature interaction.
 *
 * On pointer move it:
 *  - sets the `--glare-x` / `--glare-y` CSS vars so the `.glare-card` spotlight
 *    (defined in globals.css) follows the cursor, and
 *  - applies a subtle 3D tilt toward the pointer.
 *
 * On hover the `.glare-card` ::after sweeps a cream "sheen" across once.
 * Honours prefers-reduced-motion (no tilt / no var updates).
 */
export function GlareCard({
  children,
  className,
  tilt = 6,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  /** max tilt in degrees */
  tilt?: number;
  as?: keyof React.JSX.IntrinsicElements;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function handleMove(e: React.PointerEvent) {
    const el = ref.current;
    if (!el || reduce) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1
    el.style.setProperty("--glare-x", `${px * 100}%`);
    el.style.setProperty("--glare-y", `${py * 100}%`);
    const rx = (0.5 - py) * tilt * 2;
    const ry = (px - 0.5) * tilt * 2;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
  }

  function reset() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
    el.style.removeProperty("--glare-x");
    el.style.removeProperty("--glare-y");
  }

  const Component = Tag as React.ElementType;

  return (
    <Component
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      className={cn("glare-card", className)}
    >
      {children}
    </Component>
  );
}
