"use client";

import { content } from "@/data/content";
import { DarkBand, Scribble } from "../Brand";
import { Button } from "../ui/Button";
import { HeroCanvas } from "../HeroCanvas";
import { Icon } from "../Icon";
import { StatCounter } from "../StatCounter";

export function Hero() {
  const { hero } = content;

  return (
    <DarkBand id="hero">

      <div className="mx-auto grid max-w-6xl items-center gap-6 px-4 pb-16 pt-16 sm:px-6 lg:min-h-[640px] lg:grid-cols-[1.1fr_1fr] lg:py-20">
        <div className="relative z-10">
          <p className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-sm font-medium backdrop-blur">
            <span className="size-2 animate-pulse rounded-full bg-turquoise" aria-hidden="true" />
            {hero.badge}
          </p>

          <h1
            className="mt-5 animate-fade-up text-5xl font-bold tracking-tight sm:text-7xl"
            style={{ animationDelay: "120ms" }}
          >
            {hero.titleLine} <Scribble>{hero.titleHighlight}.</Scribble>
          </h1>

          <p
            className="mt-7 max-w-xl animate-fade-up text-lg text-white/80"
            style={{ animationDelay: "240ms" }}
          >
            {hero.subtitle}
          </p>

          <div
            className="mt-8 flex animate-fade-up flex-wrap gap-3"
            style={{ animationDelay: "360ms" }}
          >
            <Button asChild size="lg">
              <a href="#timeline">
                See our journey
                <Icon name="arrow" className="h-5 w-5 -rotate-90" />
              </a>
            </Button>
            <Button asChild variant="accent" size="lg">
              <a href="#architecture">How it works</a>
            </Button>
          </div>

          <ul
            className="mt-8 flex animate-fade-up flex-wrap gap-x-6 gap-y-2 text-sm text-white/70"
            style={{ animationDelay: "420ms" }}
          >
            <li>✦ Banker always decides</li>
            <li>✦ Real credit data</li>
            <li>✦ Every call traced</li>
          </ul>

          <div
            className="mt-10 flex animate-fade-up flex-wrap gap-x-12 gap-y-6 border-t border-white/15 pt-8"
            style={{ animationDelay: "480ms" }}
          >
            {hero.stats.map((s) => (
              <div key={s.label}>
                <div className="font-heading text-4xl font-bold sm:text-5xl">
                  {typeof s.target === "number" ? (
                    <StatCounter target={s.target} prefix={s.prefix} suffix={s.suffix} />
                  ) : (
                    <>
                      {s.prefix}
                      {s.value}
                      {s.suffix}
                    </>
                  )}
                </div>
                <div className="mt-1.5 text-sm text-white/70">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* The orb and its data sources get their own column, stacked below on small screens */}
        <div className="relative h-80 sm:h-[420px] lg:h-[560px]">
          <HeroCanvas forceDark />
        </div>
      </div>
    </DarkBand>
  );
}
