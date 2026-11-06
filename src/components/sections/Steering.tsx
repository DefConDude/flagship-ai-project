import { content } from "@/data/content";
import { cn } from "@/lib/utils";
import { Icon } from "../Icon";
import { Reveal } from "../Reveal";
import { SectionHeading } from "../SectionHeading";

const accentBadge: Record<string, string> = {
  azure: "bg-azure-500/15 text-azure-300 border-azure-400/30",
  purple: "bg-purple-500/15 text-purple-300 border-purple-400/30",
  plum: "bg-plum-500/15 text-plum-300 dark:text-plum-200 border-plum-400/30",
  turquoise: "bg-turquoise-500/15 text-turquoise-300 border-turquoise-400/30",
};

export function Steering() {
  const { steering } = content;

  return (
    <section id="steering" className="relative bg-surface-muted">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <SectionHeading
          tag={steering.tag}
          heading={steering.heading}
          description={steering.description}
        />

        <Reveal className="mb-12 max-w-3xl">
          <p className="text-base leading-relaxed text-muted">
            Steering files are markdown documents that live in{" "}
            <code className="rounded bg-purple-500/15 px-1.5 py-0.5 font-mono text-sm text-purple-300">
              .kiro/steering/
            </code>{" "}
            and automatically inject project context into every AI session.
            Think of them as the agent&apos;s institutional memory — always
            present, always accurate, never needing a &ldquo;quick
            refresher&rdquo; meeting.
          </p>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-3">
          {steering.tiers.map((tier, i) => {
            const feature = i === 0 || i === steering.tiers.length - 1;
            return (
            <Reveal
              key={tier.tier}
              delay={i * 90}
              className={cn("h-full", feature && "md:col-span-2")}
            >
              <article
                className={cn(
                  "relative h-full overflow-hidden rounded-3xl p-8 transition-transform duration-300 hover:-translate-y-1",
                  feature ? "navy-band on-navy grain" : "glass",
                )}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      "rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider",
                      accentBadge[tier.accent],
                    )}
                  >
                    {tier.tier}
                  </span>
                </div>
                <h3 className="mt-4 text-2xl font-semibold">
                  {tier.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{tier.description}</p>

                <ul className="mt-5 space-y-2">
                  {tier.files.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2.5 text-sm text-muted"
                    >
                      <Icon
                        name="contract"
                        className="h-4 w-4 shrink-0 text-purple-400"
                      />
                      <span className="font-mono text-[13px]">{f}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-6 border-t border-[color:var(--surface-border)] pt-4 text-sm leading-relaxed text-muted">
                  <span className="font-semibold text-[color:var(--text)]">
                    Purpose:{" "}
                  </span>
                  {tier.purpose}
                </p>
              </article>
            </Reveal>
            );
          })}
        </div>

        <div className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-4">
          {steering.stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 70}
              className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--background)] px-4 py-7 text-center"
            >
              <div className="font-heading text-4xl font-bold gradient-text">
                {s.value}
              </div>
              <div className="mt-2 text-xs font-medium uppercase tracking-wider text-muted">
                {s.label}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mx-auto mt-14 max-w-3xl">
          <blockquote className="note-card -rotate-1 rounded-3xl p-8 text-center text-lg font-medium italic leading-relaxed">
            <span className="gradient-text">&ldquo;</span>
            {steering.quote}
            <span className="gradient-text">&rdquo;</span>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
