import { content } from "@/data/content";
import { cn } from "@/lib/utils";
import { Icon } from "../Icon";
import { Reveal } from "../Reveal";
import { SectionHeading } from "../SectionHeading";

// Solid accent fills for the big impact numbers (mirrors the ROI deck blocks).
// Stops are the deeper shades so white text clears WCAG AA (4.5:1) everywhere
// on the gradient — the bright 500 shades (esp. turquoise) fail with white.
const accentFill: Record<string, string> = {
  turquoise: "from-turquoise-700 to-turquoise-900",
  azure: "from-azure-600 to-azure-800",
  purple: "from-purple-600 to-purple-800",
  plum: "from-plum-600 to-plum-800",
};

export function Impact() {
  const { impact } = content;
  const t = impact.turnaround;

  return (
    <section id="impact" className="relative py-28">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading
          tag={impact.tag}
          heading={impact.heading}
          description={impact.description}
        />

        {/* Headline: ~72 hrs -> <10 min */}
        <Reveal>
          <div className="grid items-stretch gap-4 md:grid-cols-[1fr_auto_1fr]">
            <div className="rounded-3xl border border-[color:var(--border)] bg-surface-muted p-8">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                {t.beforeLabel}
              </span>
              <div className="mt-3 font-heading text-6xl font-bold tracking-tight text-muted line-through decoration-2 sm:text-7xl">
                {t.before}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {t.beforeCaption}
              </p>
            </div>

            <div className="flex items-center justify-center" aria-hidden="true">
              <span className="grid size-14 place-items-center rounded-full bg-turquoise text-navy shadow-glow-turquoise">
                {/* the base icon points down (stacked on mobile); turn it right when side-by-side */}
                <Icon name="arrow" className="h-7 w-7 md:-rotate-90" strokeWidth={2.2} />
              </span>
            </div>

            <div className="navy-band rounded-3xl p-8">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-turquoise">
                {t.afterLabel}
              </span>
              <div className="mt-3 font-heading text-6xl font-bold tracking-tight text-turquoise sm:text-7xl">
                {t.after}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-white/80">
                {t.afterCaption}
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {impact.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 80}>
              <div
                className={cn(
                  "h-full rounded-2xl bg-gradient-to-br p-7 text-white shadow-glow-sm transition-transform duration-300 hover:-translate-y-1",
                  accentFill[s.accent],
                )}
              >
                <div className="font-heading text-4xl font-bold sm:text-5xl">
                  {s.value}
                </div>
                <div className="mt-3 text-sm font-semibold">{s.label}</div>
                {s.sub && (
                  <div className="mt-1 text-xs text-white/90">{s.sub}</div>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        {impact.footnote && (
          <Reveal className="mt-8">
            <p className="text-center text-xs italic text-muted">
              {impact.footnote}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
