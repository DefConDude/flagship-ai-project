import { content, type Endpoint } from "@/data/content";
import { cn } from "@/lib/utils";
import { GlareCard } from "../GlareCard";
import { Icon } from "../Icon";
import { Reveal } from "../Reveal";
import { SectionHeading } from "../SectionHeading";

// Badge styling per endpoint kind. Explicit light/dark text shades keep the
// labels readable on both backgrounds.
const kindBadge: Record<Endpoint["kind"], { label: string; cls: string }> = {
  inbound: {
    label: "Inbound",
    cls: "bg-turquoise/15 text-turquoise-700 dark:text-turquoise-300",
  },
  outbound: {
    label: "Outbound",
    cls: "bg-azure/15 text-azure-600 dark:text-azure-300",
  },
  consumed: {
    label: "Consumed",
    cls: "bg-purple/15 text-purple-600 dark:text-purple-300",
  },
  ops: {
    label: "Operational",
    cls: "bg-navy/10 text-[color:var(--text)] dark:bg-white/10",
  },
};

export function Architecture() {
  const { architecture } = content;

  return (
    <section id="architecture" className="relative bg-surface-muted">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <SectionHeading
          tag={architecture.tag}
          heading={architecture.heading}
          description={architecture.description}
        />

        <div className="space-y-10">
          {architecture.flows.map((flow, fi) => (
            <Reveal key={flow.number} delay={fi * 60}>
              <GlareCard className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--background)] p-7" tilt={2}>
                <div className="relative z-[3] mb-6 flex items-start gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-purple-600 to-azure-600 font-heading text-lg font-bold text-white">
                    {flow.number}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold">
                      {flow.title}
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-muted">
                      {flow.description}
                    </p>
                  </div>
                </div>

                <div className="relative z-[3] flex flex-wrap items-stretch gap-3">
                  {flow.nodes.map((node, ni) => (
                    <div key={node.title} className="flex items-stretch gap-3">
                      <div
                        className={cn(
                          "flex w-40 flex-col items-center rounded-2xl border p-4 text-center transition-all duration-300 hover:-translate-y-1",
                          node.highlight
                            ? "navy-band border-transparent"
                            : "border-[color:var(--border)] bg-surface-muted",
                        )}
                      >
                        <span
                          className={cn(
                            "grid h-11 w-11 place-items-center rounded-xl",
                            node.highlight
                              ? "bg-turquoise text-navy"
                              : "bg-navy text-white dark:bg-turquoise dark:text-navy",
                          )}
                        >
                          <Icon name={node.icon} className="h-6 w-6" />
                        </span>
                        <h4 className="mt-3 text-sm font-semibold">
                          {node.title}
                        </h4>
                        <p className="mt-1 text-[11px] leading-snug text-muted">
                          {node.caption}
                        </p>
                      </div>

                      {ni < flow.nodes.length - 1 && (
                        <span className="flex items-center text-purple-400">
                          <Icon
                            name="arrow"
                            className="h-5 w-5 -rotate-90"
                            strokeWidth={2}
                          />
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </GlareCard>
            </Reveal>
          ))}
        </div>

        {/* AI models */}
        <Reveal className="mt-16">
          <h3 className="font-heading text-2xl font-semibold">AI Models</h3>
          <p className="mt-2 max-w-3xl text-sm text-muted">
            {architecture.modelsIntro}
          </p>
        </Reveal>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {architecture.models.map((m, i) => (
            <Reveal key={m.label} delay={i * 70}>
              <GlareCard
                as="article"
                className="flex h-full flex-col rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)] p-6"
                tilt={3}
              >
                <span className="relative z-[3] w-fit rounded-full bg-navy px-2.5 py-0.5 font-mono text-[11px] text-white dark:bg-turquoise dark:text-navy">
                  {m.label}
                </span>
                <h4 className="relative z-[3] mt-4 font-heading text-xl font-semibold">
                  {m.model}
                </h4>
                <span className="relative z-[3] font-mono text-xs text-muted">
                  {m.deployment}
                </span>
                <p className="relative z-[3] mt-3 text-sm leading-relaxed">
                  {m.purpose}
                </p>
                <p className="relative z-[3] mt-auto border-t border-[color:var(--border)] pt-3 text-xs leading-relaxed text-muted">
                  <span className="font-semibold text-[color:var(--text)]">Why: </span>
                  {m.why}
                </p>
              </GlareCard>
            </Reveal>
          ))}
        </div>

        {/* API endpoints */}
        <Reveal className="mt-16">
          <h3 className="font-heading text-2xl font-semibold">API Endpoints</h3>
          <p className="mt-2 max-w-3xl text-sm text-muted">
            {architecture.endpointsIntro}
          </p>
        </Reveal>
        <Reveal className="mt-6">
          <ul className="divide-y divide-[color:var(--border)] overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)]">
            {architecture.endpoints.map((ep) => {
              const badge = kindBadge[ep.kind];
              return (
                <li
                  key={ep.path}
                  className="grid gap-3 p-5 md:grid-cols-[7.5rem_minmax(0,1.25fr)_minmax(0,1fr)] md:items-start"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-md bg-navy px-2 py-0.5 font-mono text-[11px] font-bold text-white dark:bg-white dark:text-navy">
                      {ep.method}
                    </span>
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                        badge.cls,
                      )}
                    >
                      {badge.label}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <code className="block break-all font-mono text-sm font-semibold">
                      {ep.path}
                    </code>
                    <span className="mt-1 block text-xs text-muted">
                      {ep.direction}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted">
                    {ep.purpose}
                  </p>
                </li>
              );
            })}
          </ul>
        </Reveal>
        <Reveal className="mt-5">
          <p className="flex items-start gap-3 rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)] p-5 text-sm leading-relaxed">
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-turquoise text-navy">
              <Icon name="shield" className="h-5 w-5" />
            </span>
            <span>{architecture.endpointsNote}</span>
          </p>
        </Reveal>

        {/* Tech stack */}
        <Reveal className="mt-14">
          <h3 className="font-heading text-2xl font-semibold">Tech Stack</h3>
          <div className="mt-6 flex flex-wrap gap-3">
            {architecture.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-[color:var(--border)] bg-[color:var(--background)] px-4 py-2 text-sm font-medium transition-transform duration-300 hover:-translate-y-0.5"
              >
                {tech}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
