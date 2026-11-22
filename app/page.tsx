import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import HowItWorks from "@/components/sections/HowItWorks";
import Features from "@/components/sections/Features";
import AppPreview from "@/components/sections/AppPreview";
import Shop from "@/components/sections/Shop";
import FAQ from "@/components/sections/FAQ";
import CTABand from "@/components/sections/CTABand";
import Reveal from "@/components/ui/Reveal";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Reveal>
        <Problem />
      </Reveal>
      <Reveal>
        <HowItWorks />
      </Reveal>
      <Reveal>
        <Features />
      </Reveal>
      <Reveal>
        <AppPreview />
      </Reveal>
      <Reveal>
        <Shop />
      </Reveal>
      <Reveal>
        <FAQ />
      </Reveal>
      <Reveal>
        <CTABand />
      </Reveal>
    </>
  );
}
