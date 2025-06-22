"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Search, Filter, MapPin, Bed, Bath, Square, Heart, CheckCircle } from "lucide-react"
import { useSearchParams } from "next/navigation"
import {
  getAllProperties,
  filterProperties,
  getCities,
  getPropertyTypeFromTitle,
  formatPrice,
  type Property,
} from "@/lib/property-utils"

export default function PropertiesPage() {
  const searchParams = useSearchParams()
  const typeFilter = searchParams.get("type")

  const [allProperties] = useState<Property[]>(getAllProperties())
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(allProperties)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPurpose, setSelectedPurpose] = useState<string>(typeFilter === "residential" ? "for-sale" : "all")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [priceRange, setPriceRange] = useState([0, 8000000])
  const [roomRange, setRoomRange] = useState([0, 10])
  const [selectedCity, setSelectedCity] = useState("all")

  const cities = getCities()

  useEffect(() => {
    let filtered = allProperties

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (property) =>
          property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          property.location.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Apply filters
    const filters: any = {}

    if (selectedPurpose !== "all") {
      filters.purpose = selectedPurpose
    }

    if (selectedCategory !== "all") {
      filters.category = selectedCategory
    }

    if (selectedCity !== "all") {
      filters.city = selectedCity
    }

    filters.minPrice = priceRange[0]
    filters.maxPrice = priceRange[1]
    filters.minRooms = roomRange[0]
    filters.maxRooms = roomRange[1]

    filtered = filterProperties(filters)

    setFilteredProperties(filtered)
  }, [searchQuery, selectedPurpose, selectedCategory, priceRange, roomRange, selectedCity, allProperties])

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        {/* Header */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-4">Properties in Saudi Arabia</h1>
              <p className="text-xl font-arabic text-muted-foreground mb-6">العقارات في المملكة العربية السعودية</p>
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search properties, locations, or neighborhoods..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 py-3 text-lg"
                />
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Filter className="h-5 w-5 mr-2" />
                    Filters
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Purpose</Label>
                    <Select value={selectedPurpose} onValueChange={setSelectedPurpose}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Purposes</SelectItem>
                        <SelectItem value="for-sale">For Sale</SelectItem>
                        <SelectItem value="for-rent">For Rent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Property Type</Label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="سكني">Residential</SelectItem>
                        <SelectItem value="تجاري">Commercial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>City</Label>
                    <Select value={selectedCity} onValueChange={setSelectedCity}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Cities</SelectItem>
                        {cities.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <Label>Price Range (SAR)</Label>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={8000000}
                      min={0}
                      step={50000}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{priceRange[0].toLocaleString()} SAR</span>
                      <span>{priceRange[1].toLocaleString()} SAR</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Bedrooms</Label>
                    <Slider
                      value={roomRange}
                      onValueChange={setRoomRange}
                      max={10}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{roomRange[0]} rooms</span>
                      <span>{roomRange[1]} rooms</span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Badge className="w-full justify-center bg-[var(--saudi-green)] text-white">
                      {filteredProperties.length} Properties Found
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Properties Grid */}
            <div className="lg:col-span-3">
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProperties.map((property) => (
                  <Card
                    key={property.external_id}
                    className="group hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={property.cover_photo || "/placeholder.svg?height=300&width=400"}
                        alt={property.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-[var(--saudi-green)] text-white">{formatPrice(property.price_sar)}</Badge>
                      </div>
                      <div className="absolute top-4 right-4 flex flex-col gap-2">
                        <Button size="icon" variant="ghost" className="bg-white/80 hover:bg-white h-8 w-8">
                          <Heart className="h-4 w-4" />
                        </Button>
                        {property.is_verified && (
                          <div className="bg-green-100 rounded-full p-1">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          </div>
                        )}
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <Badge variant="outline" className="bg-white/90">
                          {getPropertyTypeFromTitle(property.title)}
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 right-4">
                        <Badge
                          variant="outline"
                          className={`bg-white/90 ${property.purpose === "for-sale" ? "text-blue-600" : "text-orange-600"}`}
                        >
                          {property.purpose === "for-sale" ? "For Sale" : "For Rent"}
                        </Badge>
                      </div>
                    </div>

                    <CardHeader>
                      <CardTitle className="text-lg line-clamp-2 h-14">{property.title}</CardTitle>
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm line-clamp-1">
                          {property.location.split(" • ").slice(1).join(" • ")}
                        </span>
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

                      {property.agency && (
                        <div className="text-xs text-muted-foreground mb-3 line-clamp-1">{property.agency}</div>
                      )}

                      <Button className="w-full">View Details</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredProperties.length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold mb-2">No properties found</h3>
                  <p className="text-muted-foreground">Try adjusting your search criteria</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
