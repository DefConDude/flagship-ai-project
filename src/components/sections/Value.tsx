import { content } from "@/data/content";
import { GlareCard } from "../GlareCard";
import { Icon } from "../Icon";
import { Reveal } from "../Reveal";
import { SectionHeading } from "../SectionHeading";

export function Value() {
  const { value } = content;

  return (
    <section id="value" className="relative py-28">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading
          tag={value.tag}
          heading={value.heading}
          description={value.description}
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {value.items.map((item, i) => (
            <Reveal key={item.title} delay={(i % 3) * 80}>
              <GlareCard
                as="article"
                className="group glass h-full rounded-2xl p-7 hover:border-purple-400/50 hover:shadow-glow"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-brand text-white shadow-glow-sm transition-transform duration-300 group-hover:scale-110">
                    <Icon name={item.icon} className="h-6 w-6" />
                  </span>
                  {item.badge && (
                    <span className="rounded-full border border-[color:var(--surface-border)] px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-purple-300">
                      {item.badge}
                    </span>
                  )}
                </div>
                <h3 className="mt-5 font-heading text-lg font-semibold">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.body}
                </p>
              </GlareCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
