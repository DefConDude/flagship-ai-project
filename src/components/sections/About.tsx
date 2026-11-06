import { content } from "@/data/content";
import { GlareCard } from "../GlareCard";
import { Icon } from "../Icon";
import { Reveal } from "../Reveal";
import { SectionHeading } from "../SectionHeading";

export function About() {
  const { about } = content;

  return (
    <section id="about" className="relative">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <SectionHeading
          tag={about.tag}
          heading={about.heading}
          description={about.description}
          highlight="Credit Assist"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {about.cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 90}>
              <GlareCard as="article" className="gradient-frame group h-full rounded-3xl">
                <div className="gradient-frame-inner h-full p-7">
                  <div className="flex items-center justify-between">
                    <span className="grid size-11 place-items-center rounded-full bg-navy text-white dark:bg-turquoise dark:text-navy">
                      <Icon name={card.icon} className="h-5 w-5" />
                    </span>
                    <span className="font-heading text-sm font-bold text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-5 text-xl font-semibold">{card.title}</h3>
                  <p className="mt-2 text-muted">{card.body}</p>
                </div>
              </GlareCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
