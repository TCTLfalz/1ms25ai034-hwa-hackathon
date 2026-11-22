import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import HowItWorks from "@/components/sections/HowItWorks";
import Features from "@/components/sections/Features";
import AppPreview from "@/components/sections/AppPreview";
import Shop from "@/components/sections/Shop";
import FAQ from "@/components/sections/FAQ";
import CTABand from "@/components/sections/CTABand";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Problem />
      <HowItWorks />
      <Features />
      <AppPreview />
      <Shop />
      <FAQ />
      <CTABand />
    </>
  );
}
