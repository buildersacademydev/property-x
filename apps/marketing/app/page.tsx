import Waitlist from "@/components/waitlist";
import WaitlistDialog from "@/components/waitlist-dialog";
import { CtaSection } from "./_landing/cta-section";
import { EcosystemSection } from "./_landing/ecosystem";
import { FaqSection } from "./_landing/faq-section";
import { FeaturesSection } from "./_landing/features-section";
import { HeroSection } from "./_landing/hero-section";
import { ProblemSection } from "./_landing/problem-section";
import { ScrollToTop } from "./_landing/scroll-to-top";
import { SocialProofSection } from "./_landing/social-proof-section";
import { SolutionSection } from "./_landing/solution-section";
import { TestimonialsSection } from "./_landing/testimonials-section";

export default function PropertyXLanding() {
  return (
    <div className="min-h-screen">
      {/* <ScrollToTop /> */}
      <HeroSection />
      <SocialProofSection />
      <ProblemSection />
      <SolutionSection />
      <FeaturesSection />
      <EcosystemSection />
      <TestimonialsSection />
      <FaqSection />
      <CtaSection />
      {/* <Waitlist /> */}
      <WaitlistDialog />
    </div>
  )
}
