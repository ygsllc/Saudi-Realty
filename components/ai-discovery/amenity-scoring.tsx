"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Loader2, Sliders, MapPin, Bed, Bath, Square, Award } from "lucide-react"
import { filterProperties, formatPrice, getPropertyTypeFromTitle, type Property } from "@/lib/property-utils"

interface ScoredProperty extends Property {
  matchScore: number
  scoreBreakdown: {
    location: number
    size: number
    price: number
    amenities: number
    type: number
  }
}

interface Filters {
  bedrooms: number[]
  priceRange: number[]
  sizeRange: number[]
  propertyType: string
  city: string
  amenities: {
    furnished: boolean
    balcony: boolean
    parking: boolean
    elevator: boolean
  }
}

export function AmenityScoring() {
  const [isScoring, setIsScoring] = useState(false)
  const [results, setResults] = useState<ScoredProperty[]>([])
  const [filters, setFilters] = useState<Filters>({
    bedrooms: [2, 4],
    priceRange: [200000, 1500000],
    sizeRange: [80, 300],
    propertyType: "all",
    city: "all",
    amenities: {
      furnished: false,
      balcony: false,
      parking: false,
      elevator: false,
    },
  })

  const handleScoreAndMatch = async () => {
    setIsScoring(true)
    setResults([])

    // Simulate AI scoring delay
    await new Promise((resolve) => setTimeout(resolve, 2500))

    // Filter and score properties
    const scoredProperties = scoreProperties(filters)
    setResults(scoredProperties.slice(0, 3))
    setIsScoring(false)
  }

  const scoreProperties = (filters: Filters): ScoredProperty[] => {
    // First filter properties based on basic criteria
    const filteredProperties = filterProperties({
      minRooms: filters.bedrooms[0],
      maxRooms: filters.bedrooms[1],
      minPrice: filters.priceRange[0],
      maxPrice: filters.priceRange[1],
      minArea: filters.sizeRange[0],
      maxArea: filters.sizeRange[1],
      city: filters.city !== "all" ? filters.city : undefined,
      category: "سكني", // Only residential
    })

    // Score each property
    return filteredProperties
      .map((property) => {
        const scoreBreakdown = {
          location: calculateLocationScore(property, filters),
          size: calculateSizeScore(property, filters),
          price: calculatePriceScore(property, filters),
          amenities: calculateAmenityScore(property, filters),
          type: calculateTypeScore(property, filters),
        }

        const totalScore = Math.round(
          (scoreBreakdown.location +
            scoreBreakdown.size +
            scoreBreakdown.price +
            scoreBreakdown.amenities +
            scoreBreakdown.type) /
            5,
        )

        return {
          ...property,
          matchScore: Math.min(totalScore, 100),
          scoreBreakdown,
        }
      })
      .sort((a, b) => b.matchScore - a.matchScore)
  }

  const calculateLocationScore = (property: Property, filters: Filters): number => {
    let score = 50 // Base score

    // Premium locations get higher scores
    if (property.location.includes("الملقا") || property.location.includes("المنار")) {
      score += 30
    } else if (property.location.includes("الرياض") || property.location.includes("جدة")) {
      score += 20
    }

    // City preference match
    if (filters.city !== "all" && property.location.includes(filters.city)) {
      score += 20
    }

    return Math.min(score, 100)
  }

  const calculateSizeScore = (property: Property, filters: Filters): number => {
    const idealSize = (filters.sizeRange[0] + filters.sizeRange[1]) / 2
    const sizeDiff = Math.abs(property.area - idealSize)
    const maxDiff = Math.max(idealSize - filters.sizeRange[0], filters.sizeRange[1] - idealSize)

    return Math.max(20, 100 - (sizeDiff / maxDiff) * 80)
  }

  const calculatePriceScore = (property: Property, filters: Filters): number => {
    const idealPrice = (filters.priceRange[0] + filters.priceRange[1]) / 2
    const priceDiff = Math.abs(property.price_sar - idealPrice)
    const maxDiff = Math.max(idealPrice - filters.priceRange[0], filters.priceRange[1] - idealPrice)

    return Math.max(20, 100 - (priceDiff / maxDiff) * 80)
  }

  const calculateAmenityScore = (property: Property, filters: Filters): number => {
    let score = 50 // Base score
    let matchedAmenities = 0
    let totalSelectedAmenities = 0

    Object.entries(filters.amenities).forEach(([amenity, selected]) => {
      if (selected) {
        totalSelectedAmenities++

        // Simulate amenity matching based on property characteristics
        let hasAmenity = false
        switch (amenity) {
          case "furnished":
            hasAmenity = property.furnishing_status === "furnished"
            break
          case "balcony":
            hasAmenity = property.area > 100 || property.title.includes("بلكونة")
            break
          case "parking":
            hasAmenity = property.title.includes("فيلا") || property.area > 150
            break
          case "elevator":
            hasAmenity = property.title.includes("عمارة") || property.price_sar > 800000
            break
        }

        if (hasAmenity) {
          matchedAmenities++
        }
      }
    })

    if (totalSelectedAmenities > 0) {
      score = (matchedAmenities / totalSelectedAmenities) * 100
    }

    return score
  }

  const calculateTypeScore = (property: Property, filters: Filters): number => {
    if (filters.propertyType === "all") return 80

    const propertyTypeFromTitle = getPropertyTypeFromTitle(property.title).toLowerCase()
    const selectedType = filters.propertyType.toLowerCase()

    if (
      (selectedType === "apartment" && propertyTypeFromTitle.includes("apartment")) ||
      (selectedType === "villa" && propertyTypeFromTitle.includes("villa")) ||
      (selectedType === "floor" && propertyTypeFromTitle.includes("floor"))
    ) {
      return 100
    }

    return 30
  }

  const updateFilters = (key: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const updateAmenity = (amenity: string, value: boolean) => {
    setFilters((prev) => ({
      ...prev,
      amenities: {
        ...prev.amenities,
        [amenity]: value,
      },
    }))
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div>
            <Label className="text-sm font-semibold mb-3 block">Bedrooms</Label>
            <Slider
              value={filters.bedrooms}
              onValueChange={(value) => updateFilters("bedrooms", value)}
              max={10}
              min={0}
              step={1}
              className="mb-2"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{filters.bedrooms[0]} bedrooms</span>
              <span>{filters.bedrooms[1]} bedrooms</span>
            </div>
          </div>

          <div>
            <Label className="text-sm font-semibold mb-3 block">Price Range (SAR)</Label>
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => updateFilters("priceRange", value)}
              max={2000000}
              min={0}
              step={50000}
              className="mb-2"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{filters.priceRange[0].toLocaleString()} SAR</span>
              <span>{filters.priceRange[1].toLocaleString()} SAR</span>
            </div>
          </div>

          <div>
            <Label className="text-sm font-semibold mb-3 block">Size (m²)</Label>
            <Slider
              value={filters.sizeRange}
              onValueChange={(value) => updateFilters("sizeRange", value)}
              max={500}
              min={50}
              step={10}
              className="mb-2"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{filters.sizeRange[0]}m²</span>
              <span>{filters.sizeRange[1]}m²</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <Label className="text-sm font-semibold mb-3 block">Property Type</Label>
            <Select value={filters.propertyType} onValueChange={(value) => updateFilters("propertyType", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="villa">Villa</SelectItem>
                <SelectItem value="floor">Floor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-semibold mb-3 block">City</Label>
            <Select value={filters.city} onValueChange={(value) => updateFilters("city", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cities</SelectItem>
                <SelectItem value="الرياض">Riyadh</SelectItem>
                <SelectItem value="جدة">Jeddah</SelectItem>
                <SelectItem value="المدينة المنورة">Medina</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-semibold mb-3 block">Extra Amenities</Label>
            <div className="space-y-3">
              {Object.entries(filters.amenities).map(([amenity, value]) => (
                <div key={amenity} className="flex items-center justify-between">
                  <Label className="text-sm capitalize">{amenity}</Label>
                  <Switch checked={value} onCheckedChange={(checked) => updateAmenity(amenity, checked)} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Score Button */}
      <div className="text-center">
        <Button
          onClick={handleScoreAndMatch}
          disabled={isScoring}
          className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-3 text-lg"
        >
          {isScoring ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Scoring & Matching...
            </>
          ) : (
            <>
              <Sliders className="mr-2 h-5 w-5" />
              Score & Match
            </>
          )}
        </Button>
      </div>

      {/* AI Scoring Progress */}
      {isScoring && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-6">
            <div className="space-y-3">
              <div className="flex items-center text-green-700">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span className="text-sm font-medium">Analyzing your preferences...</span>
              </div>
              <div className="flex items-center text-green-700">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span className="text-sm font-medium">Scoring properties against criteria...</span>
              </div>
              <div className="flex items-center text-green-700">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span className="text-sm font-medium">Ranking best matches...</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-green-900">🏆 AI-Scored Matches</h3>
            <Badge className="bg-green-100 text-green-800">{results.length} Top Matches</Badge>
          </div>

          <div className="grid gap-6">
            {results.map((property, index) => (
              <Card key={property.external_id} className="hover:shadow-lg transition-shadow border-green-200">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="relative">
                    <img
                      src={property.cover_photo || "/placeholder.svg?height=200&width=300"}
                      alt={property.title}
                      className="w-full h-48 md:h-full object-cover rounded-l-lg"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-gradient-to-r from-green-600 to-green-700 text-white text-lg px-3 py-1">
                        <Award className="h-4 w-4 mr-1" />
                        {property.matchScore}/100
                      </Badge>
                    </div>
                    <div className="absolute top-2 right-2">
                      {index === 0 && <Badge className="bg-yellow-500 text-white">🥇 Best Match</Badge>}
                      {index === 1 && <Badge className="bg-gray-400 text-white">🥈 Great Score</Badge>}
                      {index === 2 && <Badge className="bg-orange-500 text-white">🥉 Good Fit</Badge>}
                    </div>
                  </div>

                  <div className="md:col-span-2 p-4">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-lg line-clamp-2">{property.title}</h4>

                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">{property.location.split(" • ").slice(1).join(" • ")}</span>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        {property.rooms > 0 && (
                          <div className="flex items-center">
                            <Bed className="h-4 w-4 mr-1" />
                            <span>{property.rooms} beds</span>
                          </div>
                        )}
                        {property.baths > 0 && (
                          <div className="flex items-center">
                            <Bath className="h-4 w-4 mr-1" />
                            <span>{property.baths} baths</span>
                          </div>
                        )}
                        <div className="flex items-center">
                          <Square className="h-4 w-4 mr-1" />
                          <span>{property.area}m²</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-green-700">{formatPrice(property.price_sar)}</span>
                        <Badge variant="outline">{getPropertyTypeFromTitle(property.title)}</Badge>
                      </div>

                      {/* Score Breakdown */}
                      <div className="bg-green-50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-green-800 mb-2">AI Score Breakdown:</p>
                        <div className="grid grid-cols-5 gap-2 text-xs">
                          <div className="text-center">
                            <div className="font-medium">{property.scoreBreakdown.location}</div>
                            <div className="text-muted-foreground">Location</div>
                          </div>
                          <div className="text-center">
                            <div className="font-medium">{property.scoreBreakdown.size}</div>
                            <div className="text-muted-foreground">Size</div>
                          </div>
                          <div className="text-center">
                            <div className="font-medium">{property.scoreBreakdown.price}</div>
                            <div className="text-muted-foreground">Price</div>
                          </div>
                          <div className="text-center">
                            <div className="font-medium">{property.scoreBreakdown.amenities}</div>
                            <div className="text-muted-foreground">Amenities</div>
                          </div>
                          <div className="text-center">
                            <div className="font-medium">{property.scoreBreakdown.type}</div>
                            <div className="text-muted-foreground">Type</div>
                          </div>
                        </div>
                      </div>

                      <Button className="w-full md:w-auto">View Property Details</Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
