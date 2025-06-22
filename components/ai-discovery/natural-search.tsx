"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, MessageSquare, MapPin, Bed, Bath, Square, Sparkles } from "lucide-react"
import {
  searchProperties,
  filterProperties,
  formatPrice,
  getPropertyTypeFromTitle,
  type Property,
} from "@/lib/property-utils"

const exampleQueries = [
  "Luxury villa in Jeddah with 4 bedrooms",
  "Studio apartment near Riyadh airport under 80K",
  "Large home for family with elevator and parking",
  "شقة 3 غرف في الرياض بسعر معقول",
  "فيلا فاخرة في جدة قريبة من البحر",
  "عقار استثماري في المدينة المنورة",
]

interface MatchedProperty extends Property {
  relevanceScore: number
  explanation: string
}

export function NaturalSearch() {
  const [query, setQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [results, setResults] = useState<MatchedProperty[]>([])

  const handleFindMatch = async () => {
    if (!query.trim()) return

    setIsSearching(true)
    setResults([])

    // Simulate AI natural language processing delay
    await new Promise((resolve) => setTimeout(resolve, 2500))

    // Parse natural language and find matches
    const matches = parseNaturalLanguageQuery(query)
    setResults(matches.slice(0, 3))
    setIsSearching(false)
  }

  const parseNaturalLanguageQuery = (query: string): MatchedProperty[] => {
    const lowerQuery = query.toLowerCase()
    const filters: any = {}
    const searchTerms: string[] = []
    let explanation = ""

    // Extract bedroom count
    const bedroomMatch = lowerQuery.match(/(\d+)[\s-]*(bedroom|غرف|غرفة)/i)
    if (bedroomMatch) {
      const bedrooms = Number.parseInt(bedroomMatch[1])
      filters.minRooms = bedrooms
      filters.maxRooms = bedrooms
      explanation += `${bedrooms} bedrooms, `
    }

    // Extract price constraints
    const priceMatch =
      lowerQuery.match(/under\s+(\d+(?:\.\d+)?)\s*([mk]?)\s*(sar|riyal|k)/i) ||
      lowerQuery.match(/(أقل من|تحت)\s*(\d+(?:\.\d+)?)\s*(مليون|ألف|k)?\s*(ريال|sar)/i)

    if (priceMatch) {
      let price = Number.parseFloat(priceMatch[1] || priceMatch[2])
      const unit = priceMatch[2] || priceMatch[3]
      if (unit?.toLowerCase().includes("m") || unit?.includes("مليون")) {
        price *= 1000000
      } else if (unit?.toLowerCase().includes("k") || unit?.includes("ألف")) {
        price *= 1000
      }
      filters.maxPrice = price
      explanation += `under ${price.toLocaleString()} SAR, `
    }

    // Extract cities
    if (lowerQuery.includes("riyadh") || lowerQuery.includes("الرياض")) {
      filters.city = "الرياض"
      explanation += "in Riyadh, "
    } else if (lowerQuery.includes("jeddah") || lowerQuery.includes("جدة")) {
      filters.city = "جدة"
      explanation += "in Jeddah, "
    } else if (lowerQuery.includes("medina") || lowerQuery.includes("المدينة")) {
      filters.city = "المدينة المنورة"
      explanation += "in Medina, "
    }

    // Extract property types
    if (lowerQuery.includes("villa") || lowerQuery.includes("فيلا")) {
      searchTerms.push("فيلا")
      explanation += "villa type, "
    } else if (lowerQuery.includes("apartment") || lowerQuery.includes("شقة")) {
      searchTerms.push("شقة")
      explanation += "apartment type, "
    } else if (lowerQuery.includes("studio")) {
      searchTerms.push("شقة")
      filters.maxRooms = 1
      explanation += "studio apartment, "
    }

    // Extract features and amenities
    if (lowerQuery.includes("luxury") || lowerQuery.includes("فاخر")) {
      filters.minPrice = 1000000
      explanation += "luxury features, "
    }

    if (lowerQuery.includes("large") || lowerQuery.includes("كبير")) {
      filters.minArea = 200
      explanation += "large size, "
    }

    if (lowerQuery.includes("family") || lowerQuery.includes("عائلة")) {
      filters.minRooms = 3
      explanation += "family-suitable, "
    }

    if (lowerQuery.includes("investment") || lowerQuery.includes("استثمار")) {
      filters.purpose = "for-sale"
      filters.minPrice = 500000
      explanation += "investment potential, "
    }

    // Clean up explanation
    explanation = explanation.replace(/, $/, "")

    // Perform search
    let results: Property[] = []

    if (searchTerms.length > 0) {
      searchTerms.forEach((term) => {
        const termResults = searchProperties(term)
        results = [...results, ...termResults]
      })
      // Remove duplicates
      results = results.filter(
        (property, index, self) => index === self.findIndex((p) => p.external_id === property.external_id),
      )
    } else {
      results = filterProperties({})
    }

    // Apply filters
    if (Object.keys(filters).length > 0) {
      results = filterProperties(filters)
    }

    // Score and explain results
    return results
      .map((property) => {
        const relevanceScore = calculateRelevanceScore(property, query, explanation)
        const propertyExplanation = generatePropertyExplanation(property, query, explanation)

        return {
          ...property,
          relevanceScore,
          explanation: propertyExplanation,
        }
      })
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
  }

  const calculateRelevanceScore = (property: Property, query: string, parsedCriteria: string): number => {
    let score = 0
    const lowerQuery = query.toLowerCase()
    const lowerTitle = property.title.toLowerCase()
    const lowerLocation = property.location.toLowerCase()

    // Direct text matches
    if (lowerTitle.includes(lowerQuery.slice(0, 20))) score += 40

    // Word matches
    const queryWords = lowerQuery.split(" ").filter((word) => word.length > 2)
    queryWords.forEach((word) => {
      if (lowerTitle.includes(word)) score += 8
      if (lowerLocation.includes(word)) score += 5
    })

    // Criteria matches
    if (parsedCriteria.includes("bedroom") && property.rooms > 0) score += 15
    if (parsedCriteria.includes("villa") && property.title.includes("فيلا")) score += 20
    if (parsedCriteria.includes("apartment") && property.title.includes("شقة")) score += 20
    if (parsedCriteria.includes("luxury") && property.price_sar > 1000000) score += 15
    if (parsedCriteria.includes("Riyadh") && property.location.includes("الرياض")) score += 15
    if (parsedCriteria.includes("Jeddah") && property.location.includes("جدة")) score += 15

    // Quality indicators
    if (property.is_verified) score += 10
    if (property.cover_photo) score += 5

    return Math.min(score, 100)
  }

  const generatePropertyExplanation = (property: Property, query: string, parsedCriteria: string): string => {
    const explanations: string[] = []
    const lowerQuery = query.toLowerCase()

    // Type match
    if (lowerQuery.includes("villa") && property.title.includes("فيلا")) {
      explanations.push("Matches your villa preference")
    } else if (lowerQuery.includes("apartment") && property.title.includes("شقة")) {
      explanations.push("Matches your apartment preference")
    }

    // Location match
    if (lowerQuery.includes("riyadh") && property.location.includes("الرياض")) {
      explanations.push("Located in Riyadh as requested")
    } else if (lowerQuery.includes("jeddah") && property.location.includes("جدة")) {
      explanations.push("Located in Jeddah as requested")
    }

    // Size/bedroom match
    if (property.rooms >= 3 && (lowerQuery.includes("family") || lowerQuery.includes("large"))) {
      explanations.push(`${property.rooms} bedrooms suitable for families`)
    }

    // Price match
    if (lowerQuery.includes("luxury") && property.price_sar > 1000000) {
      explanations.push("Premium pricing indicates luxury features")
    } else if (lowerQuery.includes("affordable") && property.price_sar < 800000) {
      explanations.push("Competitively priced for your budget")
    }

    // Default explanation
    if (explanations.length === 0) {
      explanations.push("Good match based on your search criteria")
    }

    return explanations.join(" and ")
  }

  const handleExampleClick = (example: string) => {
    setQuery(example)
  }

  return (
    <div className="space-y-6">
      {/* Natural Language Input */}
      <div className="space-y-4">
        <Input
          placeholder="3 bedroom apartment under 100K SAR with balcony in Riyadh"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleFindMatch()}
          className="text-base py-4 border-2 border-purple-200 focus:border-purple-500"
        />

        <div className="text-sm text-muted-foreground">
          Describe what you're looking for in Arabic or English - be as specific as possible
        </div>
      </div>

      {/* Find Match Button */}
      <div className="text-center">
        <Button
          onClick={handleFindMatch}
          disabled={isSearching || !query.trim()}
          className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-3 text-lg"
        >
          {isSearching ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Finding Match...
            </>
          ) : (
            <>
              <MessageSquare className="mr-2 h-5 w-5" />
              Find Match
            </>
          )}
        </Button>
      </div>

      {/* Example Queries */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-purple-800">Try these examples:</p>
        <div className="grid md:grid-cols-2 gap-2">
          {exampleQueries.map((example, index) => (
            <Button
              key={index}
              variant="outline"
              onClick={() => handleExampleClick(example)}
              className="justify-start text-left h-auto p-3 border-purple-200 hover:border-purple-400 hover:bg-purple-50"
            >
              <MessageSquare className="h-3 w-3 mr-2 text-purple-600 flex-shrink-0" />
              <span className="text-sm">{example}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* AI Processing */}
      {isSearching && (
        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="p-6">
            <div className="space-y-3">
              <div className="flex items-center text-purple-700">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span className="text-sm font-medium">Understanding your natural language...</span>
              </div>
              <div className="flex items-center text-purple-700">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span className="text-sm font-medium">Extracting search criteria...</span>
              </div>
              <div className="flex items-center text-purple-700">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span className="text-sm font-medium">Finding matching properties...</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-purple-900">🎯 Natural Language Matches</h3>
            <Badge className="bg-purple-100 text-purple-800">{results.length} Properties Found</Badge>
          </div>

          <div className="grid gap-6">
            {results.map((property, index) => (
              <Card key={property.external_id} className="hover:shadow-lg transition-shadow border-purple-200">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="relative">
                    <img
                      src={property.cover_photo || "/placeholder.svg?height=200&width=300"}
                      alt={property.title}
                      className="w-full h-48 md:h-full object-cover rounded-l-lg"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
                        <Sparkles className="h-3 w-3 mr-1" />
                        {property.relevanceScore}% Match
                      </Badge>
                    </div>
                    <div className="absolute top-2 right-2">
                      {index === 0 && <Badge className="bg-yellow-500 text-white">🎯 Perfect Match</Badge>}
                      {index === 1 && <Badge className="bg-green-500 text-white">✨ Great Find</Badge>}
                      {index === 2 && <Badge className="bg-blue-500 text-white">🔍 Good Match</Badge>}
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
                        <span className="text-2xl font-bold text-purple-700">{formatPrice(property.price_sar)}</span>
                        <Badge variant="outline">{getPropertyTypeFromTitle(property.title)}</Badge>
                      </div>

                      {/* AI Explanation */}
                      <div className="bg-purple-50 p-3 rounded-lg">
                        <p className="text-sm text-purple-800">
                          <strong>Why this matches:</strong> {property.explanation}
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

      {results.length === 0 && query && !isSearching && (
        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="p-6 text-center">
            <MessageSquare className="h-12 w-12 text-purple-400 mx-auto mb-4" />
            <h3 className="font-semibold text-purple-900 mb-2">No matches found</h3>
            <p className="text-purple-700 text-sm">
              Try rephrasing your search or use one of the example queries above.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
