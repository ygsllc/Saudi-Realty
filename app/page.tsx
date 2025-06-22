import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { AIDiscoveryModes } from "@/components/ai-discovery-modes"
import { FeaturedProperties } from "@/components/featured-properties"
import { Vision2030Section } from "@/components/vision-2030-section"
import { StatsSection } from "@/components/stats-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <AIDiscoveryModes />
        <StatsSection />
        <FeaturedProperties />
        <Vision2030Section />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  )
}
