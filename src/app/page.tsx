import {
  CtaSection,
  EcosystemSection,
  FaqSection,
  FeaturesSection,
  HeroSection,
  ProblemSection,
  ScrollToTop,
  SocialProofSection,
  SolutionSection,
  TestimonialsSection,
} from "./_landing"

export default function PropertyXLanding() {
  return (
    <div className="min-h-screen">
      <ScrollToTop />
      <HeroSection />
      <SocialProofSection />
      <ProblemSection />
      <SolutionSection />
      <FeaturesSection />
      <EcosystemSection />
      <TestimonialsSection />
      <FaqSection />
      <CtaSection />
    </div>
  )
}
