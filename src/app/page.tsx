import { content } from "@/data/content";
import { Marquee } from "@/components/Brand";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Value } from "@/components/sections/Value";
import { Impact } from "@/components/sections/Impact";
import { Steering } from "@/components/sections/Steering";
import { Timeline } from "@/components/sections/Timeline";
import { Governance } from "@/components/sections/Governance";
import { Architecture } from "@/components/sections/Architecture";
import { Lessons } from "@/components/sections/Lessons";
import { Team } from "@/components/sections/Team";
import { Status } from "@/components/sections/Status";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main" className="flex-1">
        <Hero />
        <Marquee items={content.architecture.techStack} />
        <About />
        <Value />
        <Impact />
        <Steering />
        <Timeline />
        <Governance />
        <Architecture />
        <Lessons />
        <Team />
        <Status />
        <ClosingCta />
      </main>
      <Footer />
    </>
  );
}
