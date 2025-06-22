import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { MapPin, Calendar, DollarSign, Users, Waves, Palmtree, Fish, Plane } from "lucide-react"

export default function RedSeaPage() {
  const keyFeatures = [
    {
      icon: Waves,
      title: "Pristine Beaches",
      description: "200km of unspoiled coastline and crystal-clear waters",
    },
    {
      icon: Fish,
      title: "Marine Life",
      description: "World-class diving with vibrant coral reefs",
    },
    {
      icon: Palmtree,
      title: "Luxury Resorts",
      description: "50+ luxury hotels and resorts",
    },
    {
      icon: Plane,
      title: "International Airport",
      description: "Direct flights from major global cities",
    },
  ]

  const investmentOpportunities = [
    {
      title: "Beachfront Villas",
      description: "Luxury waterfront properties with private beaches",
      priceRange: "3M - 25M SAR",
      roi: "15-22% annually",
    },
    {
      title: "Resort Apartments",
      description: "Serviced apartments in 5-star resort complexes",
      priceRange: "800K - 5M SAR",
      roi: "12-18% annually",
    },
    {
      title: "Commercial Properties",
      description: "Retail and hospitality investment opportunities",
      priceRange: "2M - 20M SAR",
      roi: "18-28% annually",
    },
  ]

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-blue-900 to-teal-700 text-white overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/placeholder.svg?height=600&width=1200&text=Red+Sea+Project+Saudi+Arabia+luxury+resort+pristine+beaches+coral+reefs+tourism"
              alt="Red Sea Project luxury resort in Saudi Arabia"
              className="w-full h-full object-cover opacity-30"
            />
          </div>
          <div className="relative container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30">
                <Waves className="h-3 w-3 mr-1" />
                Vision 2030 Mega-Project
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold mb-6">Red Sea Project</h1>
              <p className="text-2xl font-arabic mb-4 opacity-90">مشروع البحر الأحمر</p>
              <p className="text-xl opacity-80 max-w-3xl mx-auto mb-8">
                The world's most ambitious regenerative tourism project, spanning 28,000 square kilometers of pristine
                land and sea. A luxury destination that will redefine hospitality and set new standards for sustainable
                development.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100">
                  Explore Properties
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-blue-900 transition-all duration-300"
                >
                  Investment Guide
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Project Stats */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              <Card className="text-center">
                <CardContent className="p-6">
                  <DollarSign className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-blue-600 mb-2">$28B</div>
                  <div className="text-sm text-muted-foreground">Total Investment</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-blue-600 mb-2">1M</div>
                  <div className="text-sm text-muted-foreground">Annual Visitors</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-blue-600 mb-2">28,000</div>
                  <div className="text-sm text-muted-foreground">Square Kilometers</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <Calendar className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-blue-600 mb-2">2030</div>
                  <div className="text-sm text-muted-foreground">Phase 1 Completion</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Progress Tracker */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Development Progress</h2>
              <Card>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="font-semibold">Overall Progress</span>
                        <span className="text-blue-600">42%</span>
                      </div>
                      <Progress value={42} className="h-3" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="font-semibold">Infrastructure</span>
                        <span className="text-blue-600">55%</span>
                      </div>
                      <Progress value={55} className="h-3" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="font-semibold">Resort Development</span>
                        <span className="text-blue-600">38%</span>
                      </div>
                      <Progress value={38} className="h-3" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="font-semibold">Airport Construction</span>
                        <span className="text-blue-600">65%</span>
                      </div>
                      <Progress value={65} className="h-3" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {keyFeatures.map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <Card key={index} className="text-center h-full">
                    <CardContent className="p-6">
                      <IconComponent className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                      <h3 className="font-semibold mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Investment Opportunities */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Investment Opportunities</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {investmentOpportunities.map((opportunity, index) => (
                <Card key={index} className="h-full">
                  <CardHeader>
                    <CardTitle>{opportunity.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{opportunity.description}</p>
                    <Separator className="my-4" />
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Price Range:</span>
                        <span className="font-semibold">{opportunity.priceRange}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Expected ROI:</span>
                        <span className="font-semibold text-blue-600">{opportunity.roi}</span>
                      </div>
                    </div>
                    <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white">View Properties</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
