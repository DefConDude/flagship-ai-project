"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { content } from "@/data/content";
import { cn } from "@/lib/utils";
import { Icon } from "../Icon";
import { Reveal } from "../Reveal";
import { SectionHeading } from "../SectionHeading";

/*
 * Lessons Learned — mirrors the lessons deck: a "Nine themes at a glance"
 * overview (tiles) plus a detail panel per theme (What happened → Lesson).
 * The tiles are an accessible tablist: click, or use arrow keys / Home / End.
 * The detail panel is a navy band in both themes, so its text uses the
 * on-navy shades (white, pastel turquoise/azure).
 */
export function Lessons() {
  const { lessons } = content;
  const items = lessons.items;
  const [active, setActive] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const current = items[active];

  const select = (i: number, focus = false) => {
    const next = (i + items.length) % items.length;
    setActive(next);
    if (focus) tabRefs.current[next]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const keys: Record<string, number> = {
      ArrowRight: i + 1,
      ArrowDown: i + 1,
      ArrowLeft: i - 1,
      ArrowUp: i - 1,
      Home: 0,
      End: items.length - 1,
    };
    if (e.key in keys) {
      e.preventDefault();
      select(keys[e.key], true);
    }
  };

  return (
    <section id="lessons" className="relative">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <SectionHeading
          tag={lessons.tag}
          heading={lessons.heading}
          description={lessons.description}
        />

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          {/* Overview: nine themes at a glance */}
          <Reveal>
            <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-[0.16em] text-muted">
              Nine themes at a glance
            </h3>
            <div
              role="tablist"
              aria-label="Lessons learned themes"
              aria-orientation="horizontal"
              className="grid grid-cols-2 gap-3 sm:grid-cols-3"
            >
              {items.map((item, i) => {
                const selected = i === active;
                return (
                  <button
                    key={item.num}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`lesson-tab-${item.num}`}
                    aria-selected={selected}
                    aria-controls="lesson-panel"
                    tabIndex={selected ? 0 : -1}
                    onClick={() => select(i)}
                    onKeyDown={(e) => onKeyDown(e, i)}
                    className={cn(
                      "flex h-full flex-col items-start gap-2 rounded-2xl border p-4 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--background)]",
                      selected
                        ? "border-purple-600 bg-purple-600 text-white shadow-glow-sm"
                        : "border-[color:var(--border)] bg-surface-muted hover:-translate-y-0.5 hover:border-purple",
                    )}
                  >
                    <span
                      className={cn(
                        "grid size-8 place-items-center rounded-full font-heading text-sm font-bold",
                        selected
                          ? "bg-white text-purple-700"
                          : "bg-navy text-white dark:bg-turquoise dark:text-navy",
                      )}
                    >
                      {item.num}
                    </span>
                    <span className="text-sm font-semibold leading-snug">
                      {item.title}
                    </span>
                    <span
                      className={cn(
                        "hidden text-xs leading-snug sm:block",
                        selected ? "text-white" : "text-muted",
                      )}
                    >
                      {item.summary}
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* Detail: what happened -> lesson */}
          <div className="lg:sticky lg:top-24">
            <div
              id="lesson-panel"
              role="tabpanel"
              aria-labelledby={`lesson-tab-${current.num}`}
              className="navy-band note-card rounded-3xl p-7 sm:p-8"
            >
              {/* key re-mounts the content so each theme fades in */}
              <div key={current.num} className="animate-fade-up">
                <div className="flex items-center gap-4">
                  <span className="grid size-14 shrink-0 place-items-center rounded-full bg-azure font-heading text-2xl font-bold text-white">
                    {current.num}
                  </span>
                  <h3 className="text-2xl font-bold leading-tight text-white sm:text-3xl">
                    {current.title}
                  </h3>
                </div>
                <span className="mt-4 block h-1 w-24 rounded-full bg-azure" aria-hidden="true" />

                <h4 className="mt-6 font-heading text-sm font-semibold uppercase tracking-[0.14em] text-azure-200">
                  What happened
                </h4>
                <ul className="mt-3 space-y-2.5">
                  {current.happened.map((h) => (
                    <li key={h} className="flex gap-2.5 text-sm leading-relaxed text-white/85">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-azure-200" aria-hidden="true" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7 border-l-4 border-turquoise pl-4">
                  <h4 className="font-heading text-sm font-semibold uppercase tracking-[0.14em] text-turquoise-200">
                    Lesson
                  </h4>
                  <p className="mt-2 text-base leading-relaxed text-white">
                    {current.lesson}
                  </p>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between gap-3 border-t border-white/15 pt-5">
                <button
                  type="button"
                  onClick={() => select(active - 1)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3.5 py-1.5 text-sm font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise"
                >
                  <Icon name="arrow" className="h-4 w-4 rotate-90" strokeWidth={2} />
                  Previous
                </button>
                <span className="text-xs font-medium text-white/70" aria-live="polite">
                  {active + 1} / {items.length}
                </span>
                <button
                  type="button"
                  onClick={() => select(active + 1)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3.5 py-1.5 text-sm font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise"
                >
                  Next
                  <Icon name="arrow" className="h-4 w-4 -rotate-90" strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
