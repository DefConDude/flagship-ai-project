"use client";

import { useState } from "react";
import {
  content,
  enablersBySurname,
  teamBySurname,
  type Partner,
  type TeamMember,
} from "@/data/content";
import { cn } from "@/lib/utils";
import { GlareCard } from "../GlareCard";
import { Reveal } from "../Reveal";
import { SectionHeading } from "../SectionHeading";

// Plain <img> tags are NOT auto-prefixed with Next's basePath (unlike next/image),
// so when the site is served under a GitHub Pages sub-path we must prefix image
// URLs ourselves. Empty for a root-served build.
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function initials(name: string) {
  return name
    .replace(/\(.*?\)/g, "") // drop parentheticals like "(JD)"
    .split(" ")
    .filter((p) => /^[A-Za-z]/.test(p))
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/**
 * Circular headshot with a graceful initials fallback.
 * Shows the gradient-initials avatar if there's no image, or the image fails
 * to load (so a missing file in public/images never produces a broken image).
 */
function Avatar({
  name,
  image,
  size,
  center = true,
}: {
  name: string;
  image?: string;
  size: number;
  /** center horizontally (stacked cards) vs sit left in a flex row (partner cards) */
  center?: boolean;
}) {
  const [broken, setBroken] = useState(false);
  const px = { height: size, width: size };
  const useImage = !!image && !broken;
  return (
    <div
      className={cn("relative shrink-0", center && "mx-auto")}
      style={px}
    >
      {useImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`${BASE_PATH}/${image}`}
          alt={name}
          onError={() => setBroken(true)}
          className="relative rounded-full object-cover ring-4 ring-[color:var(--surface-muted)]"
          style={px}
        />
      ) : (
        <span
          className="relative grid place-items-center rounded-full bg-gradient-to-br from-purple to-azure font-heading font-bold text-white"
          style={{ ...px, fontSize: size * 0.3 }}
        >
          {initials(name)}
        </span>
      )}
    </div>
  );
}

function TeamCard({ member, delay }: { member: TeamMember; delay: number }) {
  return (
    <Reveal delay={delay}>
      <GlareCard
        as="article"
        className="group h-full rounded-3xl border border-[color:var(--border)] bg-[color:var(--background)] p-6 text-center"
      >
        <Avatar name={member.name} image={member.image} size={96} />
        <h3 className="mt-5 font-heading text-lg font-semibold">
          {member.name}
        </h3>
        <span className="mt-1 block text-sm text-purple-300">
          {member.role}
        </span>
        <div className="mt-4 flex flex-wrap justify-center gap-1.5">
          {member.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-[color:var(--surface-border)] px-2.5 py-0.5 text-[11px] text-muted"
            >
              {t}
            </span>
          ))}
        </div>
      </GlareCard>
    </Reveal>
  );
}

/** Section sub-divider: title + hairline rule. Only two are used on the page. */
function Divider({ title, intro }: { title: string; intro?: string }) {
  return (
    <Reveal className="mb-8">
      <div className="flex items-center gap-4">
        <h3 className="shrink-0 text-2xl font-semibold">{title}</h3>
        <span className="h-px flex-1 bg-[color:var(--border)]" aria-hidden="true" />
      </div>
      {intro && <p className="mt-3 max-w-3xl text-muted">{intro}</p>}
    </Reveal>
  );
}

function PartnerCard({ person, delay }: { person: Partner; delay: number }) {
  return (
    <Reveal delay={delay}>
      <GlareCard
        as="article"
        className="group flex h-full items-center gap-3.5 rounded-2xl border border-[color:var(--border)] bg-[color:var(--background)] p-4 text-left"
        tilt={4}
      >
        <Avatar name={person.name} image={person.image} size={48} center={false} />
        <div className="min-w-0">
          <h5 className="text-sm font-semibold leading-snug">{person.name}</h5>
          <span className="mt-0.5 block text-xs text-purple-300">
            {person.role}
          </span>
          {person.org && (
            <span className="mt-1 block text-[10px] uppercase tracking-wide text-muted">
              {person.org}
            </span>
          )}
        </div>
      </GlareCard>
    </Reveal>
  );
}

export function Team() {
  const { team } = content;

  return (
    <section id="team" className="relative bg-surface-muted">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <SectionHeading
          tag={team.tag}
          heading={team.heading}
          description={team.description}
        />

        {/* 1. Core delivery team */}
        <Divider title="Core Team" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {teamBySurname.map((member, i) => (
            <TeamCard key={member.name} member={member} delay={(i % 5) * 70} />
          ))}
        </div>

        {/* 2. Everyone else, as one group sorted by surname */}
        <div className="mt-20">
          <Divider title={team.enablersHeading} intro={team.enablersIntro} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {enablersBySurname.map((m, i) => (
              <PartnerCard key={m.name} person={m} delay={(i % 3) * 50} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
