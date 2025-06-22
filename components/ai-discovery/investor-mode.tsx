"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, TrendingUp, MapPin, Bed, Bath, Square, Star } from "lucide-react"
import { filterProperties, formatPrice, type Property } from "@/lib/property-utils"

export function InvestorMode() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState<Property[]>([])
  const [budget, setBudget] = useState([500000, 3000000])
  const [expectedROI, setExpectedROI] = useState([8, 15])
  const [propertyType, setPropertyType] = useState("all")
  const [location, setLocation] = useState("all")

  const handleAnalyze = async () => {
    setIsAnalyzing(true)
    setResults([])

    // Simulate AI analysis delay
    await new Promise((resolve) => setTimeout(resolve, 2500))

    // Filter properties based on investment criteria
    const filtered = filterProperties({
      purpose: "for-sale",
      minPrice: budget[0],
      maxPrice: budget[1],
      city: location !== "all" ? location : undefined,
    })

    // Simulate AI scoring and ranking
    const scoredProperties = filtered.map((property) => ({
      ...property,
      aiScore: calculateAIScore(property, expectedROI),
    }))

    // Sort by AI score and take top results
    const topProperties = scoredProperties.sort((a, b) => b.aiScore - a.aiScore).slice(0, 6)

    setResults(topProperties)
    setIsAnalyzing(false)
  }

  const calculateAIScore = (property: Property, roiRange: number[]): number => {
    let score = 0

    // Price-to-area ratio (lower is better for investment)
    const pricePerSqm = property.price_sar / property.area
    if (pricePerSqm < 5000) score += 30
    else if (pricePerSqm < 8000) score += 20
    else score += 10

    // Location scoring
    if (property.location.includes("الرياض")) score += 25 // Riyadh premium
    if (property.location.includes("جدة")) score += 20 // Jeddah
    if (property.location.includes("المدينة")) score += 15 // Medina

    // Property size (larger properties often better for investment)
    if (property.area > 300) score += 20
    else if (property.area > 150) score += 15
    else score += 10

    // Verification bonus
    if (property.is_verified) score += 10

    // Agency reputation (simulate)
    if (property.agency && property.agency.length > 10) score += 5

    // Add some randomness to simulate complex AI analysis
    score += Math.random() * 10

    return Math.min(Math.round(score), 95) // Cap at 95%
  }

  return (
    <div className="space-y-6">
      {/* Investment Criteria */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-semibold mb-3 block">Budget Range (SAR)</Label>
            <Slider value={budget} onValueChange={setBudget} max={5000000} min={100000} step={50000} className="mb-2" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{budget[0].toLocaleString()} SAR</span>
              <span>{budget[1].toLocaleString()} SAR</span>
            </div>
          </div>

          <div>
            <Label className="text-sm font-semibold mb-3 block">Expected ROI (%)</Label>
            <Slider value={expectedROI} onValueChange={setExpectedROI} max={25} min={5} step={1} className="mb-2" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{expectedROI[0]}% annually</span>
              <span>{expectedROI[1]}% annually</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label className="text-sm font-semibold mb-3 block">Property Type</Label>
            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Property Types</SelectItem>
                <SelectItem value="villa">Villas</SelectItem>
                <SelectItem value="apartment">Apartments</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-semibold mb-3 block">Location Preference</Label>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="الرياض">Riyadh</SelectItem>
                <SelectItem value="جدة">Jeddah</SelectItem>
                <SelectItem value="المدينة المنورة">Medina</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Analyze Button */}
      <div className="text-center">
        <Button
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 text-lg"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              AI Analyzing Investment Opportunities...
            </>
          ) : (
            <>
              <TrendingUp className="mr-2 h-5 w-5" />
              Find Smart Investments
            </>
          )}
        </Button>
      </div>

      {/* AI Analysis Progress */}
      {isAnalyzing && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <div className="space-y-3">
              <div className="flex items-center text-blue-700">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span className="text-sm font-medium">Analyzing market data...</span>
              </div>
              <div className="flex items-center text-blue-700">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span className="text-sm font-medium">Calculating ROI potential...</span>
              </div>
              <div className="flex items-center text-blue-700">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span className="text-sm font-medium">Ranking investment opportunities...</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-blue-900">🧠 AI Investment Recommendations</h3>
            <Badge className="bg-blue-100 text-blue-800">{results.length} Smart Picks Found</Badge>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((property, index) => (
              <Card key={property.external_id} className="hover:shadow-lg transition-shadow border-blue-200">
                <div className="relative">
                  <img
                    src={property.cover_photo || "/placeholder.svg?height=200&width=300"}
                    alt={property.title}
                    className="w-full h-32 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                      <Star className="h-3 w-3 mr-1" />
                      {(property as any).aiScore}% Match
                    </Badge>
                  </div>
                  <div className="absolute top-2 right-2">
                    {index === 0 && <Badge className="bg-yellow-500 text-white">🧠 Smart Pick</Badge>}
                    {index === 1 && <Badge className="bg-green-500 text-white">📈 Investment Ready</Badge>}
                    {index === 2 && <Badge className="bg-purple-500 text-white">💎 High Potential</Badge>}
                  </div>
                </div>

                <CardContent className="p-4">
                  <h4 className="font-semibold text-sm line-clamp-2 mb-2">{property.title}</h4>
                  <div className="flex items-center text-xs text-muted-foreground mb-2">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span className="line-clamp-1">{property.location.split(" • ").slice(1, 3).join(" • ")}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs mb-3">
                    {property.rooms > 0 && (
                      <div className="flex items-center">
                        <Bed className="h-3 w-3 mr-1" />
                        <span>{property.rooms}</span>
                      </div>
                    )}
                    {property.baths > 0 && (
                      <div className="flex items-center">
                        <Bath className="h-3 w-3 mr-1" />
                        <span>{property.baths}</span>
                      </div>
                    )}
                    <div className="flex items-center">
                      <Square className="h-3 w-3 mr-1" />
                      <span>{property.area}m²</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Price:</span>
                      <span className="font-bold text-blue-700">{formatPrice(property.price_sar)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Est. ROI:</span>
                      <span className="font-bold text-green-600">
                        {Math.round(8 + ((property as any).aiScore / 100) * 7)}% annually
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Price/m²:</span>
                      <span className="text-xs">
                        {Math.round(property.price_sar / property.area).toLocaleString()} SAR
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
