"use client";

import { useEffect, useRef, useState } from "react";
import { content, mvp1Progress } from "@/data/content";
import { cn } from "@/lib/utils";
import { Icon } from "../Icon";
import { Reveal } from "../Reveal";
import { SectionHeading } from "../SectionHeading";

const toneRing: Record<string, string> = {
  green: "border-t-4 border-t-turquoise",
  blue: "border-t-4 border-t-azure",
  yellow: "border-t-4 border-t-amber-400",
};

const toneDot: Record<string, string> = {
  green: "bg-turquoise-400",
  blue: "bg-azure-400",
  yellow: "bg-amber-400",
};

const stateIcon: Record<string, { name: string; cls: string; spin?: boolean }> =
  {
    done: { name: "check", cls: "text-turquoise-400" },
    "in-progress": { name: "spinner", cls: "text-purple-400", spin: true },
    pending: { name: "dot", cls: "text-muted" },
  };

function ProgressBar({ target }: { target: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setWidth(target);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div
      ref={ref}
      className="relative h-10 w-full overflow-hidden rounded-full bg-[color:var(--border)]"
    >
      <div
        className="flex h-full items-center justify-end rounded-full bg-gradient-to-r from-purple to-turquoise px-4 text-sm font-bold text-white transition-[width] duration-[1600ms] ease-out"
        style={{ width: `${width}%` }}
      >
        {width}%
      </div>
    </div>
  );
}

export function Status() {
  const { status } = content;
  const progress = mvp1Progress(status.items);

  return (
    <section id="status" className="relative">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <SectionHeading
          tag={status.tag}
          heading={status.heading}
          description={status.description}
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {status.cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 80}>
              <div
                className={cn(
                  "glass h-full rounded-3xl p-6",
                  toneRing[card.tone],
                )}
              >
                <span className="flex items-center gap-2">
                  <span
                    className={cn(
                      "h-2.5 w-2.5 animate-pulse rounded-full",
                      toneDot[card.tone],
                    )}
                  />
                  <h3 className="font-heading text-lg font-semibold">
                    {card.title}
                  </h3>
                </span>
                <p className="mt-3 text-sm text-muted">{card.value}</p>
                <span className="mt-4 block text-xs uppercase tracking-wider text-muted">
                  {card.env}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14">
          <div className="gradient-frame rounded-3xl">
            <div className="gradient-frame-inner p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-heading text-xl font-semibold">MVP1 Progress</h3>
              <p className="text-sm text-muted">
                {progress.done} of {progress.total} items done · {progress.inProgress} in progress ·{" "}
                {progress.total - progress.done - progress.inProgress} still to start
              </p>
            </div>
            <div className="mt-5">
              <ProgressBar target={progress.percent} />
            </div>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {status.items.map((item) => {
                const si = stateIcon[item.state];

                // Items with a breakdown (e.g. per-event unit tests) take the
                // full row and list their children as a nested checklist.
                if (item.subitems.length > 0) {
                  const done = item.subitems.filter((s) => s.state === "done").length;
                  return (
                    <li
                      key={item.label}
                      className="rounded-2xl border border-[color:var(--border)] bg-surface-muted p-5 sm:col-span-2 lg:col-span-3"
                    >
                      <div className="flex flex-wrap items-center gap-3 text-sm">
                        <Icon
                          name={si.name}
                          className={cn("h-5 w-5 shrink-0", si.cls, si.spin && "animate-spin")}
                        />
                        <span
                          className={cn(
                            "font-semibold",
                            item.state === "pending" ? "text-muted" : "text-[color:var(--text)]",
                          )}
                        >
                          {item.label}
                        </span>
                        <span className="ml-auto rounded-full border border-[color:var(--border)] px-2.5 py-0.5 text-xs font-medium text-muted">
                          {done} / {item.subitems.length} events tested
                        </span>
                      </div>
                      <ol className="mt-4 grid gap-x-6 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-3">
                        {item.subitems.map((sub) => {
                          const ss = stateIcon[sub.state];
                          return (
                            <li key={sub.num} className="flex items-center gap-2.5 text-sm">
                              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-navy font-heading text-[11px] font-bold text-white dark:bg-turquoise dark:text-navy">
                                {sub.num}
                              </span>
                              <span
                                className={cn(
                                  "min-w-0 flex-1",
                                  sub.state === "pending" ? "text-muted" : "text-[color:var(--text)]",
                                )}
                              >
                                {sub.label}
                              </span>
                              <Icon
                                name={ss.name}
                                className={cn("h-4 w-4 shrink-0", ss.cls, ss.spin && "animate-spin")}
                              />
                              <span className="sr-only">{sub.state}</span>
                            </li>
                          );
                        })}
                      </ol>
                    </li>
                  );
                }

                return (
                  <li
                    key={item.label}
                    className="flex items-center gap-3 text-sm"
                  >
                    <Icon
                      name={si.name}
                      className={cn(
                        "h-5 w-5 shrink-0",
                        si.cls,
                        si.spin && "animate-spin",
                      )}
                    />
                    <span
                      className={cn(
                        item.state === "pending"
                          ? "text-muted"
                          : "text-[color:var(--text)]",
                      )}
                    >
                      {item.label}
                    </span>
                  </li>
                );
              })}
            </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
