import { content, type GovPhase, type GovStep } from "@/data/content";
import { cn } from "@/lib/utils";
import { DarkBand } from "../Brand";
import { Icon } from "../Icon";
import { Reveal } from "../Reveal";
import { SectionHeading } from "../SectionHeading";

/*
 * Governance Journey — the end-to-end governance flow as a navy band.
 * Colour key follows the source diagram's meaning, mapped to the site palette:
 *   process  -> white dot      decision -> azure diamond
 *   artefact -> plum chip/box  people   -> turquoise chip
 * Text shades are pastel (-100/-200) because the band is navy in both themes.
 */

function Marker({ kind }: { kind: GovStep["kind"] }) {
  return (
    <span
      className="absolute left-0 top-0 grid size-8 place-items-center"
      aria-hidden="true"
    >
      {kind === "decision" ? (
        <span className="size-4 rotate-45 rounded-[3px] bg-azure shadow-glow-azure" />
      ) : kind === "artefact" ? (
        <span className="grid size-6 place-items-center rounded-md bg-plum-400 text-white">
          <Icon name="contract" className="h-3.5 w-3.5" strokeWidth={2} />
        </span>
      ) : (
        <span className="size-3.5 rounded-full bg-white ring-4 ring-white/15" />
      )}
    </span>
  );
}

function Outcome({ value }: { value: string }) {
  const yes = value.toLowerCase() === "yes";
  return (
    <span
      className={cn(
        "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
        yes ? "bg-turquoise text-navy" : "bg-plum-600 text-white",
      )}
    >
      {value}
    </span>
  );
}

function Step({ step }: { step: GovStep }) {
  return (
    <li className="relative min-h-8 pl-11">
      <Marker kind={step.kind} />

      <div className="flex flex-wrap items-center gap-2 pt-1.5">
        <h4 className="text-sm font-semibold leading-snug text-white">
          {step.title}
        </h4>
        {step.outcome && <Outcome value={step.outcome} />}
      </div>

      {step.notes.map((n) => (
        <p key={n} className="mt-1 text-xs leading-relaxed text-white/75">
          {n}
        </p>
      ))}

      {step.points.length > 0 && (
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {step.points.map((p) => (
            <li
              key={p}
              className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] text-white/85"
            >
              {p}
            </li>
          ))}
        </ul>
      )}

      {step.options.length > 0 && (
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {step.options.map((o) => (
            <div
              key={o.name}
              className={cn(
                "rounded-2xl border p-3",
                o.chosen
                  ? "border-turquoise bg-turquoise/10"
                  : "border-white/15 bg-white/5",
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-heading text-sm font-semibold text-white">
                  {o.name}
                </span>
                <span
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                    o.chosen
                      ? "bg-turquoise text-navy"
                      : "bg-white/10 text-white/70",
                  )}
                >
                  {o.chosen && <Icon name="check" className="h-3 w-3" strokeWidth={2.5} />}
                  {o.chosen ? "Chosen" : "Not chosen"}
                </span>
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-white/75">
                {o.note}
              </p>
              {o.points.length > 0 && (
                <ul className="mt-2 flex flex-wrap gap-1">
                  {o.points.map((p) => (
                    <li
                      key={p}
                      className="rounded-md bg-white/10 px-1.5 py-0.5 font-mono text-[10px] text-white/80"
                    >
                      {p}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {(step.artefacts.length > 0 || step.people.length > 0) && (
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {step.artefacts.map((a) => (
            <li
              key={`a-${a}`}
              className="inline-flex items-center gap-1 rounded-md border border-plum-300/40 bg-plum-500/25 px-2 py-0.5 text-[11px] text-plum-100"
            >
              <Icon name="contract" className="h-3 w-3" strokeWidth={2} />
              {a}
            </li>
          ))}
          {step.people.map((p) => (
            <li
              key={`p-${p}`}
              className="rounded-full border border-turquoise-300/40 bg-turquoise-500/20 px-2 py-0.5 text-[11px] text-turquoise-100"
            >
              {p}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

function Phase({ phase, delay }: { phase: GovPhase; delay: number }) {
  return (
    <Reveal delay={delay}>
      <div className="rounded-3xl border border-white/15 bg-white/5 p-6 sm:p-7">
        <div className="flex items-start gap-4">
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-purple-600 to-azure-600 font-heading font-bold text-white">
            {phase.number}
          </span>
          <div>
            <h3 className="text-xl font-semibold text-white">{phase.title}</h3>
            <p className="mt-1 text-sm text-white/75">{phase.summary}</p>
          </div>
        </div>

        <ol className="relative mt-6 space-y-5">
          {/* rail behind the markers */}
          <span
            className="absolute bottom-3 left-[15.5px] top-3 w-px bg-white/15"
            aria-hidden="true"
          />
          {phase.steps.map((s) => (
            <Step key={s.title} step={s} />
          ))}
        </ol>
      </div>
    </Reveal>
  );
}

const legend = [
  { label: "Process", swatch: <span className="size-3 rounded-full bg-white" /> },
  { label: "Decision", swatch: <span className="size-3 rotate-45 rounded-[2px] bg-azure" /> },
  { label: "People", swatch: <span className="h-3 w-5 rounded-full bg-turquoise" /> },
  { label: "Artefact", swatch: <span className="size-3 rounded-[3px] bg-plum-400" /> },
];

export function Governance() {
  const { governance } = content;
  const [first, second, ...rest] = governance.phases;

  return (
    <DarkBand id="governance">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <SectionHeading
          tag={governance.tag}
          heading={governance.heading}
          description={governance.description}
        />

        <Reveal>
          <ul className="mb-8 flex flex-wrap gap-x-6 gap-y-2 text-xs font-medium text-white/80">
            {legend.map((l) => (
              <li key={l.label} className="flex items-center gap-2">
                {l.swatch}
                {l.label}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Mirrors the source diagram: phases 01 + 02 on the left, the gates on the right */}
        <div className="grid items-start gap-6 lg:grid-cols-2">
          <div className="space-y-6">
            {first && <Phase phase={first} delay={0} />}
            {second && <Phase phase={second} delay={80} />}
          </div>
          <div className="space-y-6">
            {rest.map((p, i) => (
              <Phase key={p.number} phase={p} delay={160 + i * 80} />
            ))}
          </div>
        </div>
      </div>
    </DarkBand>
  );
}
