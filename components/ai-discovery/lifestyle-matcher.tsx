"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, Heart, MapPin, Bed, Bath, Square, School, Car, Trees, Home, Shield, Wifi } from "lucide-react"
import { getResidentialProperties, formatPrice, type Property } from "@/lib/property-utils"

interface LifestylePreference {
  id: string
  label: string
  icon: any
  category: "family" | "convenience" | "luxury"
}

const lifestylePreferences: LifestylePreference[] = [
  { id: "schools", label: "Near Schools", icon: School, category: "family" },
  { id: "parks", label: "Near Parks", icon: Trees, category: "family" },
  { id: "parking", label: "Parking Available", icon: Car, category: "convenience" },
  { id: "security", label: "Gated Community", icon: Shield, category: "luxury" },
  { id: "smart", label: "Smart Home Ready", icon: Wifi, category: "luxury" },
  { id: "family", label: "Family-Friendly", icon: Home, category: "family" },
]

export function LifestyleMatcher() {
  const [isMatching, setIsMatching] = useState(false)
  const [results, setResults] = useState<Property[]>([])
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([])

  const handleMatch = async () => {
    setIsMatching(true)
    setResults([])

    // Simulate AI lifestyle matching delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Get residential properties and simulate lifestyle matching
    const allProperties = getResidentialProperties()

    const scoredProperties = allProperties.map((property) => ({
      ...property,
      lifestyleScore: calculateLifestyleScore(property, selectedPreferences),
      matchedPreferences: getMatchedPreferences(property, selectedPreferences),
    }))

    // Sort by lifestyle score and take top results
    const topProperties = scoredProperties
      .filter((p) => (p as any).lifestyleScore > 0)
      .sort((a, b) => (b as any).lifestyleScore - (a as any).lifestyleScore)
      .slice(0, 6)

    setResults(topProperties)
    setIsMatching(false)
  }

  const calculateLifestyleScore = (property: Property, preferences: string[]): number => {
    if (preferences.length === 0) return 0

    let score = 0
    const maxScore = preferences.length * 20

    // Simulate lifestyle matching based on property characteristics
    preferences.forEach((pref) => {
      switch (pref) {
        case "schools":
          // Simulate: properties in certain areas are near schools
          if (
            property.location.includes("الملقا") ||
            property.location.includes("المنار") ||
            property.location.includes("السلامة")
          ) {
            score += 20
          }
          break
        case "parks":
          // Simulate: larger properties or certain areas have parks nearby
          if (property.area > 200 || property.location.includes("الزهراء") || property.location.includes("الواحة")) {
            score += 20
          }
          break
        case "parking":
          // Simulate: villas and larger apartments have parking
          if (property.title.includes("فيلا") || property.area > 150) {
            score += 20
          }
          break
        case "security":
          // Simulate: higher-priced properties in premium areas have security
          if (
            property.price_sar > 800000 ||
            property.location.includes("المنار") ||
            property.location.includes("الملقا")
          ) {
            score += 20
          }
          break
        case "smart":
          // Simulate: newer, expensive properties are smart home ready
          if (property.price_sar > 1000000 || property.title.includes("جديد") || property.title.includes("مودرن")) {
            score += 20
          }
          break
        case "family":
          // Simulate: properties with 3+ bedrooms are family-friendly
          if (property.rooms >= 3) {
            score += 20
          }
          break
      }
    })

    return Math.round((score / maxScore) * 100)
  }

  const getMatchedPreferences = (property: Property, preferences: string[]): string[] => {
    const matched: string[] = []

    preferences.forEach((pref) => {
      const prefObj = lifestylePreferences.find((p) => p.id === pref)
      if (!prefObj) return

      let isMatched = false
      switch (pref) {
        case "schools":
          if (
            property.location.includes("الملقا") ||
            property.location.includes("المنار") ||
            property.location.includes("السلامة")
          ) {
            isMatched = true
          }
          break
        case "parks":
          if (property.area > 200 || property.location.includes("الزهراء") || property.location.includes("الواحة")) {
            isMatched = true
          }
          break
        case "parking":
          if (property.title.includes("فيلا") || property.area > 150) {
            isMatched = true
          }
          break
        case "security":
          if (
            property.price_sar > 800000 ||
            property.location.includes("المنار") ||
            property.location.includes("الملقا")
          ) {
            isMatched = true
          }
          break
        case "smart":
          if (property.price_sar > 1000000 || property.title.includes("جديد") || property.title.includes("مودرن")) {
            isMatched = true
          }
          break
        case "family":
          if (property.rooms >= 3) {
            isMatched = true
          }
          break
      }

      if (isMatched) {
        matched.push(prefObj.label)
      }
    })

    return matched
  }

  const togglePreference = (preferenceId: string) => {
    setSelectedPreferences((prev) =>
      prev.includes(preferenceId) ? prev.filter((id) => id !== preferenceId) : [...prev, preferenceId],
    )
  }

  const getPreferencesByCategory = (category: string) => {
    return lifestylePreferences.filter((pref) => pref.category === category)
  }

  return (
    <div className="space-y-6">
      {/* Lifestyle Preferences */}
      <div className="space-y-6">
        <div>
          <Label className="text-lg font-semibold mb-4 block text-green-800">👨‍👩‍👧‍👦 Family & Community</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {getPreferencesByCategory("family").map((pref) => {
              const IconComponent = pref.icon
              return (
                <div
                  key={pref.id}
                  className={`flex items-center space-x-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedPreferences.includes(pref.id)
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 hover:border-green-300"
                  }`}
                  onClick={() => togglePreference(pref.id)}
                >
                  <Checkbox checked={selectedPreferences.includes(pref.id)} readOnly />
                  <IconComponent className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">{pref.label}</span>
                </div>
              )
            })}
          </div>
        </div>

        <div>
          <Label className="text-lg font-semibold mb-4 block text-blue-800">🚗 Convenience & Accessibility</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {getPreferencesByCategory("convenience").map((pref) => {
              const IconComponent = pref.icon
              return (
                <div
                  key={pref.id}
                  className={`flex items-center space-x-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedPreferences.includes(pref.id)
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                  onClick={() => togglePreference(pref.id)}
                >
                  <Checkbox checked={selectedPreferences.includes(pref.id)} readOnly />
                  <IconComponent className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">{pref.label}</span>
                </div>
              )
            })}
          </div>
        </div>

        <div>
          <Label className="text-lg font-semibold mb-4 block text-purple-800">✨ Luxury & Modern Living</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {getPreferencesByCategory("luxury").map((pref) => {
              const IconComponent = pref.icon
              return (
                <div
                  key={pref.id}
                  className={`flex items-center space-x-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedPreferences.includes(pref.id)
                      ? "border-purple-500 bg-purple-50"
                      : "border-gray-200 hover:border-purple-300"
                  }`}
                  onClick={() => togglePreference(pref.id)}
                >
                  <Checkbox checked={selectedPreferences.includes(pref.id)} readOnly />
                  <IconComponent className="h-4 w-4 text-purple-600" />
                  <span className="text-sm font-medium">{pref.label}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Match Button */}
      <div className="text-center">
        <Button
          onClick={handleMatch}
          disabled={isMatching || selectedPreferences.length === 0}
          className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-3 text-lg"
        >
          {isMatching ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              AI Matching Your Lifestyle...
            </>
          ) : (
            <>
              <Heart className="mr-2 h-5 w-5" />
              Find My Perfect Home ({selectedPreferences.length} preferences)
            </>
          )}
        </Button>
      </div>

      {/* AI Matching Progress */}
      {isMatching && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-6">
            <div className="space-y-3">
              <div className="flex items-center text-green-700">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span className="text-sm font-medium">Analyzing lifestyle preferences...</span>
              </div>
              <div className="flex items-center text-green-700">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span className="text-sm font-medium">Matching properties to your needs...</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-green-900">❤️ Your Lifestyle Matches</h3>
            <Badge className="bg-green-100 text-green-800">{results.length} Perfect Matches Found</Badge>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((property, index) => (
              <Card key={property.external_id} className="hover:shadow-lg transition-shadow border-green-200">
                <div className="relative">
                  <img
                    src={property.cover_photo || "/placeholder.svg?height=200&width=300"}
                    alt={property.title}
                    className="w-full h-32 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                      <Heart className="h-3 w-3 mr-1" />
                      {(property as any).lifestyleScore}% Match
                    </Badge>
                  </div>
                  <div className="absolute top-2 right-2">
                    {index === 0 && <Badge className="bg-pink-500 text-white">❤️ Perfect Match</Badge>}
                    {index === 1 && <Badge className="bg-green-500 text-white">🏡 Great Fit</Badge>}
                    {index === 2 && <Badge className="bg-blue-500 text-white">✨ Lifestyle Ready</Badge>}
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
                      <span className="font-bold text-green-700">{formatPrice(property.price_sar)}</span>
                    </div>

                    {/* Matched Preferences */}
                    <div className="space-y-1">
                      <span className="text-xs text-muted-foreground">Lifestyle Features:</span>
                      <div className="flex flex-wrap gap-1">
                        {(property as any).matchedPreferences.slice(0, 3).map((pref: string, idx: number) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="text-xs bg-green-50 text-green-700 border-green-200"
                          >
                            {pref}
                          </Badge>
                        ))}
                        {(property as any).matchedPreferences.length > 3 && (
                          <Badge variant="outline" className="text-xs bg-gray-50">
                            +{(property as any).matchedPreferences.length - 3} more
                          </Badge>
                        )}
                      </div>
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
