import { content } from "@/data/content";
import { cn } from "@/lib/utils";
import { Icon } from "../Icon";
import { Reveal } from "../Reveal";
import { SectionHeading } from "../SectionHeading";

const dotByState: Record<string, { icon: string; cls: string }> = {
  completed: {
    icon: "check",
    cls: "bg-navy text-white dark:bg-turquoise dark:text-navy",
  },
  current: {
    icon: "code",
    cls: "bg-gradient-to-br from-purple to-azure text-white shadow-lg shadow-purple/30",
  },
  future: {
    icon: "dot",
    cls: "glass text-purple-400",
  },
};

export function Timeline() {
  const { timeline } = content;

  return (
    <section id="timeline" className="relative">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <SectionHeading
          tag={timeline.tag}
          heading={timeline.heading}
          description={timeline.description}
        />

        <div className="relative">
          {/* Spine */}
          <svg
            aria-hidden="true"
            className="absolute left-[19px] top-0 h-full w-0.5 text-purple md:left-1/2 md:-translate-x-1/2"
            preserveAspectRatio="none"
            viewBox="0 0 2 100"
          >
            <line
              x1="1"
              y1="0"
              x2="1"
              y2="100"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="6 6"
              vectorEffect="non-scaling-stroke"
              className="dash-flow"
            />
          </svg>

          <ol className="space-y-10">
            {timeline.items.map((item, i) => {
              const dot = dotByState[item.state];
              const side = i % 2 === 0;
              return (
                <li
                  key={item.title}
                  className={cn(
                    "relative pl-14 md:w-1/2 md:pl-0",
                    side
                      ? "md:pr-12 md:text-right"
                      : "md:ml-auto md:pl-12",
                  )}
                >
                  {/* Dot */}
                  <span
                    className={cn(
                      "absolute top-1 z-10 grid h-10 w-10 place-items-center rounded-full ring-8 ring-[color:var(--background)]",
                      dot.cls,
                      "left-0 md:left-auto",
                      side ? "md:-right-5" : "md:-left-5",
                    )}
                  >
                    {item.state === "current" && (
                      <span className="absolute inset-0 animate-pulse-ring rounded-full bg-purple-500/50" />
                    )}
                    <Icon name={dot.icon} className="h-5 w-5" />
                  </span>

                  <Reveal delay={60}>
                    <div
                      className={cn(
                        "glass rounded-3xl p-6 transition-transform duration-300 hover:-translate-y-1",
                        item.state === "current" && "note-card",
                      )}
                    >
                      <span className="inline-block rounded-full bg-purple-500/15 px-3 py-1 text-xs font-semibold text-purple-300">
                        {item.date}
                      </span>
                      <h3 className="mt-3 text-xl font-semibold">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        {item.body}
                      </p>
                      <div
                        className={cn(
                          "mt-4 flex flex-wrap gap-2",
                          side && "md:justify-end",
                        )}
                      >
                        {item.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-[color:var(--surface-border)] px-2.5 py-1 text-[11px] font-medium text-muted"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      {item.state === "current" && (
                        <div
                          className={cn(
                            "mt-4 inline-flex items-center gap-2 rounded-full bg-turquoise-500/15 px-3 py-1.5 text-xs font-semibold text-turquoise-300",
                            side && "md:ml-auto",
                          )}
                        >
                          <span className="h-2 w-2 animate-pulse rounded-full bg-turquoise-400" />
                          INT Environment Live &amp; Green
                        </div>
                      )}
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
