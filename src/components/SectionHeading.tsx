"use client";

import * as Label from "@radix-ui/react-label";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

/**
 * Shared section header, AGENCY style: left-aligned eyebrow, big bold heading,
 * muted intro. Pass `center` for the occasional centred block.
 */
export function SectionHeading({
  tag,
  heading,
  description,
  highlight,
  center = false,
}: {
  tag: string;
  heading: string;
  description?: string;
  /** optional substring of `heading` to render as gradient text */
  highlight?: string;
  center?: boolean;
}) {
  const parts =
    highlight && heading.includes(highlight)
      ? heading.split(highlight)
      : null;

  return (
    <Reveal className={cn("mb-12 max-w-3xl", center && "mx-auto text-center")}>
      <Label.Root className="section-tag">{tag}</Label.Root>
      <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-5xl">
        {parts ? (
          <>
            {parts[0]}
            <span className="gradient-text">{highlight}</span>
            {parts[1]}
          </>
        ) : (
          heading
        )}
      </h2>
      {description && (
        <p className="mt-4 max-w-2xl text-lg text-muted">{description}</p>
      )}
    </Reveal>
  );
}
