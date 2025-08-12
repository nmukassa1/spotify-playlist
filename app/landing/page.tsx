import LandingHeader from "@/app/components/landing-header"
import HeroSection from "@/app/components/hero-section"
import FeaturesSection from "@/app/components/features-section"
import HowItWorksSection from "@/app/components/how-it-works-section"
import CTASection from "@/app/components/cta-section"
import LandingFooter from "@/app/components/landing-footer"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-spotify-black text-white">
      <LandingHeader />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />
      <LandingFooter />
    </div>
  )
}
