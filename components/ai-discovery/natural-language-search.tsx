"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Loader2, MessageSquare, Mic, Send, MapPin, Bed, Bath, Square, Sparkles } from "lucide-react"
import {
  searchProperties,
  filterProperties,
  formatPrice,
  getPropertyTypeFromTitle,
  type Property,
} from "@/lib/property-utils"

const sampleQueries = [
  "Show me a 3-bedroom apartment under 1M SAR in Jeddah",
  "I want a modern villa with pool in Riyadh",
  "Find investment property with high ROI in Medina",
  "أريد شقة 4 غرف في الرياض بسعر معقول",
  "فيلا فاخرة في جدة قريبة من البحر",
  "عقار استثماري في المدينة المنورة",
]

export function NaturalLanguageSearch() {
  const [isSearching, setIsSearching] = useState(false)
  const [results, setResults] = useState<Property[]>([])
  const [query, setQuery] = useState("")
  const [isListening, setIsListening] = useState(false)

  const handleSearch = async () => {
    if (!query.trim()) return

    setIsSearching(true)
    setResults([])

    // Simulate AI natural language processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Parse natural language query and search
    const searchResults = parseNaturalLanguageQuery(query)
    setResults(searchResults)
    setIsSearching(false)
  }

  const parseNaturalLanguageQuery = (query: string): Property[] => {
    const lowerQuery = query.toLowerCase()
    const filters: any = {}
    const searchTerms: string[] = []

    // Extract bedroom count
    const bedroomMatch = lowerQuery.match(/(\d+)[\s-]*(bedroom|غرف|غرفة)/i)
    if (bedroomMatch) {
      const bedrooms = Number.parseInt(bedroomMatch[1])
      filters.minRooms = bedrooms
      filters.maxRooms = bedrooms
    }

    // Extract price range
    const priceMatch =
      lowerQuery.match(/under\s+(\d+(?:\.\d+)?)\s*([mk]?)\s*(sar|riyal)/i) ||
      lowerQuery.match(/(أقل من|تحت)\s*(\d+(?:\.\d+)?)\s*(مليون|ألف)?\s*(ريال|sar)/i)
    if (priceMatch) {
      let price = Number.parseFloat(priceMatch[1] || priceMatch[2])
      const unit = priceMatch[2] || priceMatch[3]
      if (unit?.toLowerCase().includes("m") || unit?.includes("مليون")) {
        price *= 1000000
      } else if (unit?.toLowerCase().includes("k") || unit?.includes("ألف")) {
        price *= 1000
      }
      filters.maxPrice = price
    }

    // Extract cities
    if (lowerQuery.includes("riyadh") || lowerQuery.includes("الرياض")) {
      filters.city = "الرياض"
    } else if (lowerQuery.includes("jeddah") || lowerQuery.includes("جدة")) {
      filters.city = "جدة"
    } else if (lowerQuery.includes("medina") || lowerQuery.includes("المدينة")) {
      filters.city = "المدينة المنورة"
    }

    // Extract property types
    if (lowerQuery.includes("villa") || lowerQuery.includes("فيلا")) {
      searchTerms.push("فيلا")
    } else if (lowerQuery.includes("apartment") || lowerQuery.includes("شقة")) {
      searchTerms.push("شقة")
    }

    // Extract purpose
    if (lowerQuery.includes("investment") || lowerQuery.includes("استثمار")) {
      filters.purpose = "for-sale"
      filters.minPrice = 500000 // Investment properties typically higher value
    }

    // Extract features
    if (lowerQuery.includes("modern") || lowerQuery.includes("مودرن") || lowerQuery.includes("جديد")) {
      searchTerms.push("جديد")
    }

    if (lowerQuery.includes("luxury") || lowerQuery.includes("فاخر")) {
      filters.minPrice = 1000000
    }

    // Perform search
    let results: Property[] = []

    if (searchTerms.length > 0) {
      // Search by terms first
      searchTerms.forEach((term) => {
        const termResults = searchProperties(term)
        results = [...results, ...termResults]
      })
      // Remove duplicates
      results = results.filter(
        (property, index, self) => index === self.findIndex((p) => p.external_id === property.external_id),
      )
    } else {
      // Use all properties if no specific terms
      results = filterProperties({})
    }

    // Apply filters
    if (Object.keys(filters).length > 0) {
      results = filterProperties(filters)
    }

    // Score results based on query relevance
    const scoredResults = results.map((property) => ({
      ...property,
      relevanceScore: calculateRelevanceScore(property, query),
    }))

    // Sort by relevance and return top results
    return scoredResults.sort((a, b) => (b as any).relevanceScore - (a as any).relevanceScore).slice(0, 6)
  }

  const calculateRelevanceScore = (property: Property, query: string): number => {
    let score = 0
    const lowerQuery = query.toLowerCase()
    const lowerTitle = property.title.toLowerCase()
    const lowerLocation = property.location.toLowerCase()

    // Exact matches in title
    if (lowerTitle.includes(lowerQuery)) score += 50

    // Word matches
    const queryWords = lowerQuery.split(" ").filter((word) => word.length > 2)
    queryWords.forEach((word) => {
      if (lowerTitle.includes(word)) score += 10
      if (lowerLocation.includes(word)) score += 5
    })

    // Property characteristics bonus
    if (property.is_verified) score += 5
    if (property.price_sar > 1000000) score += 3 // Premium properties
    if (property.area > 200) score += 2 // Larger properties

    return score
  }

  const handleVoiceSearch = () => {
    setIsListening(true)
    // Simulate voice recognition
    setTimeout(() => {
      setIsListening(false)
      setQuery("Show me a 4-bedroom villa in Riyadh")
    }, 2000)
  }

  const handleSampleQuery = (sampleQuery: string) => {
    setQuery(sampleQuery)
  }

  return (
    <div className="space-y-6">
      {/* Natural Language Input */}
      <div className="space-y-4">
        <div className="relative">
          <Input
            placeholder="Describe what you're looking for in Arabic or English..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            className="pr-20 py-4 text-lg border-2 border-purple-200 focus:border-purple-500"
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={handleVoiceSearch}
              className={`${isListening ? "bg-red-100 text-red-600" : "text-purple-600 hover:bg-purple-100"}`}
            >
              <Mic className={`h-4 w-4 ${isListening ? "animate-pulse" : ""}`} />
            </Button>
            <Button
              size="icon"
              onClick={handleSearch}
              disabled={!query.trim() || isSearching}
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
            >
              <Send className="h-4 w-4 text-white" />
            </Button>
          </div>
        </div>

        {isListening && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-center text-red-700">
                <Mic className="mr-2 h-4 w-4 animate-pulse" />
                <span className="text-sm font-medium">🎤 Listening... Speak in Arabic or English</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Sample Queries */}
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">Try these examples:</p>
          <div className="grid md:grid-cols-2 gap-2">
            {sampleQueries.map((sampleQuery, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleSampleQuery(sampleQuery)}
                className="justify-start text-left h-auto p-3 border-purple-200 hover:border-purple-400 hover:bg-purple-50"
              >
                <MessageSquare className="h-3 w-3 mr-2 text-purple-600 flex-shrink-0" />
                <span className="text-xs line-clamp-2">{sampleQuery}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Search Button */}
      <div className="text-center">
        <Button
          onClick={handleSearch}
          disabled={isSearching || !query.trim()}
          className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-3 text-lg"
        >
          {isSearching ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              AI Understanding Your Request...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-5 w-5" />
              Search with AI
            </>
          )}
        </Button>
      </div>

      {/* AI Processing */}
      {isSearching && (
        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="p-6">
            <div className="space-y-3">
              <div className="flex items-center text-purple-700">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span className="text-sm font-medium">Processing natural language...</span>
              </div>
              <div className="flex items-center text-purple-700">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span className="text-sm font-medium">Understanding your preferences...</span>
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
            <h3 className="text-xl font-bold text-purple-900">🗣️ AI Search Results</h3>
            <Badge className="bg-purple-100 text-purple-800">{results.length} Properties Found</Badge>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((property, index) => (
              <Card key={property.external_id} className="hover:shadow-lg transition-shadow border-purple-200">
                <div className="relative">
                  <img
                    src={property.cover_photo || "/placeholder.svg?height=200&width=300"}
                    alt={property.title}
                    className="w-full h-32 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
                      <Sparkles className="h-3 w-3 mr-1" />
                      {Math.round(((property as any).relevanceScore || 0) / 10) * 10}% Match
                    </Badge>
                  </div>
                  <div className="absolute top-2 right-2">
                    {index === 0 && <Badge className="bg-yellow-500 text-white">🎯 Best Match</Badge>}
                    {index === 1 && <Badge className="bg-green-500 text-white">✨ Great Find</Badge>}
                    {index === 2 && <Badge className="bg-blue-500 text-white">🔍 AI Pick</Badge>}
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
                      <span className="font-bold text-purple-700">{formatPrice(property.price_sar)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Type:</span>
                      <Badge variant="outline" className="text-xs">
                        {getPropertyTypeFromTitle(property.title)}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
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
              Try rephrasing your search or use one of the sample queries above.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
