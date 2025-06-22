import { Navigation } from "@/components/navigation"
import { IslamicFinanceCalculator } from "@/components/islamic-finance-calculator"
import { Footer } from "@/components/footer"

export default function FinancePage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="py-12">
        <IslamicFinanceCalculator />
      </main>
      <Footer />
    </div>
  )
}
