import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Bed, Bath, Square, MapPin } from "lucide-react"
import { getResidentialProperties, getPropertyTypeFromTitle, formatPrice } from "@/lib/property-utils"

export function FeaturedProperties() {
  const allProperties = getResidentialProperties()
  const featured = allProperties.filter((p) => p.is_verified || p.price_sar > 1000000).slice(0, 3)

  return (
    <section className="py-16 bg-white">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold">Featured Properties</h2>
            <p className="text-lg font-arabic text-muted-foreground mt-2">العقارات المميزة</p>
          </div>
          <Link href="/properties">
            <Button variant="outline" className="bg-white text-[var(--saudi-green)] border-[var(--saudi-green)]">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {featured.map((property) => (
            <Card key={property.external_id} className="group overflow-hidden hover:shadow-xl transition">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={property.cover_photo || "/placeholder.svg?height=300&width=400"}
                  alt={property.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform"
                />
                <Badge className="absolute top-4 left-4 bg-[var(--saudi-green)] text-white">
                  {formatPrice(property.price_sar)}
                </Badge>
                <Badge variant="outline" className="absolute top-4 right-4 bg-white/90">
                  {getPropertyTypeFromTitle(property.title)}
                </Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-lg line-clamp-2 h-14">{property.title}</CardTitle>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm line-clamp-1">{property.location.split(" • ").slice(1, 3).join(" • ")}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  {property.rooms > 0 && (
                    <div className="flex items-center">
                      <Bed className="h-4 w-4 mr-1" />
                      <span>{property.rooms}</span>
                    </div>
                  )}
                  {property.baths > 0 && (
                    <div className="flex items-center">
                      <Bath className="h-4 w-4 mr-1" />
                      <span>{property.baths}</span>
                    </div>
                  )}
                  <div className="flex items-center">
                    <Square className="h-4 w-4 mr-1" />
                    <span>{property.area}m²</span>
                  </div>
                </div>
                <Button className="w-full">View Details</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
