import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { MapPin, Calendar, DollarSign, Users, Zap, Building, Leaf, Globe } from "lucide-react"

export default function NEOMPage() {
  const keyFeatures = [
    {
      icon: Zap,
      title: "100% Renewable Energy",
      description: "Powered entirely by wind, solar, and hydrogen energy",
    },
    {
      icon: Building,
      title: "The Line",
      description: "170km linear city with 9 million residents",
    },
    {
      icon: Leaf,
      title: "Zero Emissions",
      description: "World's first zero-emission city",
    },
    {
      icon: Globe,
      title: "Global Hub",
      description: "Connecting Asia, Europe, and Africa",
    },
  ]

  const investmentOpportunities = [
    {
      title: "Residential Properties",
      description: "Luxury apartments and villas in The Line",
      priceRange: "1.5M - 15M SAR",
      roi: "12-18% annually",
    },
    {
      title: "Commercial Spaces",
      description: "Retail and office spaces in business districts",
      priceRange: "2M - 50M SAR",
      roi: "15-25% annually",
    },
    {
      title: "Industrial Land",
      description: "Manufacturing and logistics facilities",
      priceRange: "500K - 10M SAR",
      roi: "20-30% annually",
    },
  ]

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-gray-900 to-gray-700 text-white overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/placeholder.svg?height=600&width=1200&text=NEOM+futuristic+city+Saudi+Arabia+desert+modern+architecture+The+Line"
              alt="NEOM futuristic city in Saudi Arabia"
              className="w-full h-full object-cover opacity-30"
            />
          </div>
          <div className="relative container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30">
                <Zap className="h-3 w-3 mr-1" />
                Vision 2030 Mega-Project
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold mb-6">NEOM</h1>
              <p className="text-2xl font-arabic mb-4 opacity-90">نيوم - مستقبل الحياة</p>
              <p className="text-xl opacity-80 max-w-3xl mx-auto mb-8">
                A $500 billion cognitive city that will be home to over one million residents from around the world.
                NEOM will be a destination and a home for people who dream big and want to be part of building a new
                model for exceptional livability.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                  Explore Properties
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-gray-900 transition-all duration-300"
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
                  <DollarSign className="h-12 w-12 text-[var(--saudi-green)] mx-auto mb-4" />
                  <div className="text-3xl font-bold text-[var(--saudi-green)] mb-2">$500B</div>
                  <div className="text-sm text-muted-foreground">Total Investment</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <Users className="h-12 w-12 text-[var(--saudi-green)] mx-auto mb-4" />
                  <div className="text-3xl font-bold text-[var(--saudi-green)] mb-2">1M+</div>
                  <div className="text-sm text-muted-foreground">Future Residents</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <MapPin className="h-12 w-12 text-[var(--saudi-green)] mx-auto mb-4" />
                  <div className="text-3xl font-bold text-[var(--saudi-green)] mb-2">26,500</div>
                  <div className="text-sm text-muted-foreground">Square Kilometers</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <Calendar className="h-12 w-12 text-[var(--saudi-green)] mx-auto mb-4" />
                  <div className="text-3xl font-bold text-[var(--saudi-green)] mb-2">2030</div>
                  <div className="text-sm text-muted-foreground">Target Completion</div>
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
                        <span className="text-[var(--saudi-green)]">35%</span>
                      </div>
                      <Progress value={35} className="h-3" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="font-semibold">Infrastructure</span>
                        <span className="text-[var(--saudi-green)]">45%</span>
                      </div>
                      <Progress value={45} className="h-3" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="font-semibold">The Line Construction</span>
                        <span className="text-[var(--saudi-green)]">25%</span>
                      </div>
                      <Progress value={25} className="h-3" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="font-semibold">Residential Development</span>
                        <span className="text-[var(--saudi-green)]">30%</span>
                      </div>
                      <Progress value={30} className="h-3" />
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
                      <IconComponent className="h-12 w-12 text-[var(--saudi-green)] mx-auto mb-4" />
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
                        <span className="font-semibold text-[var(--saudi-green)]">{opportunity.roi}</span>
                      </div>
                    </div>
                    <Button className="w-full mt-4 saudi-gradient text-white">View Properties</Button>
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
