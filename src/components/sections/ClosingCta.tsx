import type { CSSProperties } from "react";
import { DarkBand, Sticker } from "../Brand";
import { Reveal } from "../Reveal";
import { Button } from "../ui/Button";

/** Navy closing band with the floating sticker, like the AGENCY contact CTA. */
export function ClosingCta() {
  return (
    <DarkBand>
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-10 px-4 py-20 sm:px-6 md:flex-row md:items-center">
        <Reveal className="grid justify-items-start gap-4">
          <h2 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-5xl">
            72 hours of digging, down to under ten minutes.
          </h2>
          <p className="max-w-xl text-lg text-white/80">
            One Opportunity, one request, one banker-reviewed report. The agent
            does the legwork. The banker still makes the call.
          </p>
          <div className="mt-2 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href="#status">See where we are →</a>
            </Button>
            <Button asChild variant="inverse" size="lg">
              <a href="#team">Meet the team</a>
            </Button>
          </div>
        </Reveal>
        <div className="float-tilt hidden md:block" style={{ "--r": "8deg" } as CSSProperties}>
          <Sticker label="MVP1" ring="credit assist · ai agent · commercial banking · " />
        </div>
      </div>
    </DarkBand>
  );
}
