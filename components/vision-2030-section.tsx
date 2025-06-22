import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, TrendingUp, Building, Zap } from "lucide-react"
import Link from "next/link"

export function Vision2030Section() {
  const megaProjects = [
    {
      name: "NEOM",
      nameArabic: "نيوم",
      description: "A $500 billion futuristic city powered by renewable energy",
      investment: "$500B",
      completion: "2030",
      icon: Zap,
      image: "/placeholder.svg?height=300&width=400",
      slug: "neom",
    },
    {
      name: "Red Sea Project",
      nameArabic: "مشروع البحر الأحمر",
      description: "Luxury tourism destination with pristine beaches and coral reefs",
      investment: "$28B",
      completion: "2030",
      icon: Building,
      image: "/placeholder.svg?height=300&width=400",
      slug: "red-sea",
    },
    {
      name: "Qiddiya",
      nameArabic: "القدية",
      description: "Entertainment, sports and arts mega-project near Riyadh",
      investment: "$8B",
      completion: "2030",
      icon: TrendingUp,
      image: "/placeholder.svg?height=300&width=400",
      slug: "qiddiya",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-[var(--saudi-green)] text-white">Vision 2030 Integration</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Invest in Saudi Arabia's Future</h2>
          <p className="text-xl font-arabic text-muted-foreground mb-4">استثمر في مستقبل المملكة العربية السعودية</p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover exclusive investment opportunities in Vision 2030 mega-projects that are reshaping the Kingdom's
            landscape and creating unprecedented value for investors.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {megaProjects.map((project) => {
            const IconComponent = project.icon
            return (
              <Card key={project.slug} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 text-[var(--saudi-green)]">{project.investment}</Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 rounded-full p-2">
                      <IconComponent className="h-4 w-4 text-[var(--saudi-green)]" />
                    </div>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div>
                      <div className="text-xl font-bold">{project.name}</div>
                      <div className="text-sm font-arabic text-muted-foreground">{project.nameArabic}</div>
                    </div>
                    <Badge variant="outline">{project.completion}</Badge>
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <Link href={`/mega-projects/${project.slug}`}>
                    <Button className="w-full group">
                      Explore Opportunities
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center">
          <Link href="/vision-2030">
            <Button size="lg" className="saudi-gradient text-white">
              View All Vision 2030 Projects
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
