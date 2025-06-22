"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, TrendingUp, MapPin, Bed, Bath, Square, Star } from "lucide-react"
import { getResidentialProperties, formatPrice, getPropertyTypeFromTitle, type Property } from "@/lib/property-utils"

const exampleProfiles = [
  "Looking for stable rental income from apartments in urban areas",
  "Prefer luxury villas in major cities with long-term ROI",
  "Interested in affordable, fast-growing suburbs for appreciation",
]

interface MatchedProperty extends Property {
  matchScore: number
  justification: string
}

export function InvestorMatch() {
  const [profile, setProfile] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState<MatchedProperty[]>([])

  const handleAnalyzeProfile = async () => {
    if (!profile.trim()) return

    setIsAnalyzing(true)
    setResults([])

    // Simulate AI analysis delay
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Get properties and analyze against investor profile
    const allProperties = getResidentialProperties()
    const analyzedProperties = analyzeInvestorProfile(profile, allProperties)

    setResults(analyzedProperties.slice(0, 3))
    setIsAnalyzing(false)
  }

  const analyzeInvestorProfile = (profile: string, properties: Property[]): MatchedProperty[] => {
    const lowerProfile = profile.toLowerCase()

    return properties
      .map((property) => {
        let score = 0
        let justification = ""

        // Analyze profile keywords and match to properties
        if (lowerProfile.includes("rental") || lowerProfile.includes("income")) {
          // Rental income focus
          if (property.purpose === "for-sale" && property.rooms >= 2) {
            score += 30
            justification = "Strong rental potential with multiple bedrooms"
          }
          if (property.location.includes("الرياض") || property.location.includes("جدة")) {
            score += 20
            justification += justification ? " in high-demand urban area" : "Located in high-demand rental market"
          }
        }

        if (lowerProfile.includes("luxury") || lowerProfile.includes("premium")) {
          // Luxury focus
          if (property.price_sar > 1000000) {
            score += 25
            justification = "Premium property with luxury market appeal"
          }
          if (property.title.includes("فيلا") || property.area > 200) {
            score += 20
            justification += justification ? " and spacious layout" : "Spacious luxury property"
          }
        }

        if (lowerProfile.includes("affordable") || lowerProfile.includes("budget")) {
          // Affordable focus
          if (property.price_sar < 800000) {
            score += 30
            justification = "Affordable entry point with growth potential"
          }
          if (property.area > 120) {
            score += 15
            justification += justification ? " and good value per sqm" : "Good value for money"
          }
        }

        if (lowerProfile.includes("apartment") || lowerProfile.includes("شقة")) {
          // Apartment preference
          if (property.title.includes("شقة")) {
            score += 25
            justification = "Matches your apartment investment preference"
          }
        }

        if (lowerProfile.includes("villa") || lowerProfile.includes("فيلا")) {
          // Villa preference
          if (property.title.includes("فيلا")) {
            score += 25
            justification = "Matches your villa investment preference"
          }
        }

        if (lowerProfile.includes("stable") || lowerProfile.includes("low-risk")) {
          // Stable investment focus
          if (property.is_verified) {
            score += 15
            justification += justification ? " from verified agency" : "Verified property reduces investment risk"
          }
          if (property.location.includes("الرياض")) {
            score += 10
            justification += justification ? " in stable Riyadh market" : "Located in stable capital market"
          }
        }

        if (lowerProfile.includes("appreciation") || lowerProfile.includes("growth")) {
          // Growth focus
          if (property.location.includes("شمال") || property.location.includes("شرق")) {
            score += 20
            justification = "Located in developing area with growth potential"
          }
          if (property.price_sar < 1000000 && property.area > 150) {
            score += 15
            justification += justification ? " and undervalued per sqm" : "Undervalued with appreciation potential"
          }
        }

        // Location scoring
        if (lowerProfile.includes("urban") || lowerProfile.includes("city")) {
          if (property.location.includes("الرياض") || property.location.includes("جدة")) {
            score += 15
            justification += justification ? " in major urban center" : "Prime urban location"
          }
        }

        // Add base score for all properties
        score += Math.random() * 20

        // Ensure justification exists
        if (!justification) {
          justification = "Matches your investment criteria based on location and property characteristics"
        }

        return {
          ...property,
          matchScore: Math.min(Math.round(score), 95),
          justification,
        }
      })
      .sort((a, b) => b.matchScore - a.matchScore)
  }

  const handleExampleClick = (example: string) => {
    setProfile(example)
  }

  return (
    <div className="space-y-6">
      {/* Profile Input */}
      <div className="space-y-4">
        <Textarea
          placeholder="Describe your investment style, goals, and preferences... (max 500 characters)"
          value={profile}
          onChange={(e) => setProfile(e.target.value.slice(0, 500))}
          className="min-h-[120px] text-base border-2 border-blue-200 focus:border-blue-500"
        />
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <span>Be specific about your investment goals and preferences</span>
          <span>{profile.length}/500</span>
        </div>
      </div>

      {/* Analyze Button */}
      <div className="text-center">
        <Button
          onClick={handleAnalyzeProfile}
          disabled={isAnalyzing || !profile.trim()}
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 text-lg"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Analyzing Profile...
            </>
          ) : (
            <>
              <TrendingUp className="mr-2 h-5 w-5" />
              Analyze Profile
            </>
          )}
        </Button>
      </div>

      {/* Example Profiles */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-blue-800">Try these example profiles:</p>
        <div className="grid gap-3">
          {exampleProfiles.map((example, index) => (
            <Button
              key={index}
              variant="outline"
              onClick={() => handleExampleClick(example)}
              className="justify-start text-left h-auto p-4 border-blue-200 hover:border-blue-400 hover:bg-blue-50"
            >
              <span className="text-sm">{example}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* AI Analysis Progress */}
      {isAnalyzing && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <div className="space-y-3">
              <div className="flex items-center text-blue-700">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span className="text-sm font-medium">Analyzing your investment profile...</span>
              </div>
              <div className="flex items-center text-blue-700">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span className="text-sm font-medium">Matching properties to your goals...</span>
              </div>
              <div className="flex items-center text-blue-700">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span className="text-sm font-medium">Calculating investment potential...</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-blue-900">🎯 Your Investment Matches</h3>
            <Badge className="bg-blue-100 text-blue-800">{results.length} Properties Found</Badge>
          </div>

          <div className="grid gap-6">
            {results.map((property, index) => (
              <Card key={property.external_id} className="hover:shadow-lg transition-shadow border-blue-200">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="relative">
                    <img
                      src={property.cover_photo || "/placeholder.svg?height=200&width=300"}
                      alt={property.title}
                      className="w-full h-48 md:h-full object-cover rounded-l-lg"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                        <Star className="h-3 w-3 mr-1" />
                        {property.matchScore}% Match
                      </Badge>
                    </div>
                    <div className="absolute top-2 right-2">
                      {index === 0 && <Badge className="bg-yellow-500 text-white">🏆 Top Match</Badge>}
                      {index === 1 && <Badge className="bg-green-500 text-white">💎 Great Fit</Badge>}
                      {index === 2 && <Badge className="bg-blue-500 text-white">📈 Good Option</Badge>}
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
                        <span className="text-2xl font-bold text-blue-700">{formatPrice(property.price_sar)}</span>
                        <Badge variant="outline">{getPropertyTypeFromTitle(property.title)}</Badge>
                      </div>

                      {/* AI Justification */}
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-sm text-blue-800">
                          <strong>Why this matches your profile:</strong> {property.justification}
                        </p>
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
