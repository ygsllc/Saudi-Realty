import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageCircle, Mic, Brain, Globe, Zap } from "lucide-react"

export default function AIConcierge() {
  const features = [
    {
      icon: MessageCircle,
      title: "Natural Language Search",
      description: "Ask questions in Arabic or English and get instant property recommendations",
      example: "Find me a 4-bedroom villa in NEOM under 3 million SAR",
    },
    {
      icon: Mic,
      title: "Voice Commands",
      description: "Use voice search in both Arabic and English for hands-free property discovery",
      example: "أريد شقة في مشروع البحر الأحمر",
    },
    {
      icon: Brain,
      title: "Smart Recommendations",
      description: "AI learns your preferences and suggests properties that match your lifestyle",
      example: "Based on your searches, here are similar properties...",
    },
    {
      icon: Globe,
      title: "Vision 2030 Insights",
      description: "Get expert guidance on mega-project investments and future developments",
      example: "Tell me about investment opportunities in Qiddiya",
    },
  ]

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="py-20 saudi-gradient text-white">
          <div className="container mx-auto px-4 text-center">
            <Badge className="mb-6 bg-white/20 text-white border-white/30">
              <Zap className="h-3 w-3 mr-1" />
              AI-Powered Assistant
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Meet Your AI Real Estate Concierge</h1>
            <p className="text-xl font-arabic mb-4 opacity-90">مساعدك الذكي للعقارات في المملكة العربية السعودية</p>
            <p className="text-lg opacity-80 max-w-2xl mx-auto mb-8">
              Experience the future of property search with our advanced AI assistant that understands Arabic and
              English, knows Vision 2030 projects, and provides personalized recommendations.
            </p>
            <Button size="lg" className="bg-white text-[var(--saudi-green)] hover:bg-gray-100">
              Start Chatting Now
              <MessageCircle className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">AI Concierge Capabilities</h2>
              <p className="text-xl text-muted-foreground">Powered by advanced AI to understand your property needs</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <Card key={index} className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="p-2 rounded-lg bg-[var(--saudi-green)]/10">
                          <IconComponent className="h-6 w-6 text-[var(--saudi-green)]" />
                        </div>
                        <CardTitle className="text-xl">{feature.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{feature.description}</p>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-600 italic">"{feature.example}"</p>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Interactive Demo Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Try the AI Concierge</h2>
                <p className="text-muted-foreground">
                  Click the chat widget in the bottom right corner to start your conversation
                </p>
              </div>

              <Card className="p-8">
                <div className="text-center space-y-6">
                  <div className="w-24 h-24 mx-auto rounded-full saudi-gradient flex items-center justify-center">
                    <MessageCircle className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">Ready to Help You Find Your Perfect Property</h3>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Our AI concierge is available 24/7 to answer your questions about properties, Vision 2030 projects,
                    Islamic financing, and more. Start a conversation now!
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    <Badge variant="outline">Arabic Support</Badge>
                    <Badge variant="outline">English Support</Badge>
                    <Badge variant="outline">Voice Commands</Badge>
                    <Badge variant="outline">24/7 Available</Badge>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
