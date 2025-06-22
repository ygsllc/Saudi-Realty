"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, TrendingUp, Sliders, MessageSquare } from "lucide-react"
import { InvestorMatch } from "@/components/ai-discovery/investor-match"
import { AmenityScoring } from "@/components/ai-discovery/amenity-scoring"
import { NaturalSearch } from "@/components/ai-discovery/natural-search"

export function AIDiscoveryModes() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-green-600 text-white border-0">
            <Brain className="h-3 w-3 mr-1" />
            AI-Powered Discovery
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Discover Properties with AI
          </h2>
          <p className="text-xl font-arabic text-muted-foreground mb-4">اكتشف العقارات بالذكاء الاصطناعي</p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Experience the future of property discovery with our AI-native platform. Choose your preferred discovery
            mode and let artificial intelligence find your perfect match.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="investor" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 h-auto p-2 bg-white shadow-lg rounded-xl">
              <TabsTrigger
                value="investor"
                className="flex flex-col items-center p-4 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-700 data-[state=active]:text-white rounded-lg transition-all"
              >
                <TrendingUp className="h-6 w-6 mb-2" />
                <span className="font-semibold">Investor Match</span>
                <span className="text-xs opacity-80">Profile-Based Discovery</span>
              </TabsTrigger>
              <TabsTrigger
                value="amenity"
                className="flex flex-col items-center p-4 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-green-700 data-[state=active]:text-white rounded-lg transition-all"
              >
                <Sliders className="h-6 w-6 mb-2" />
                <span className="font-semibold">Amenity Scoring</span>
                <span className="text-xs opacity-80">Filter & Score Matches</span>
              </TabsTrigger>
              <TabsTrigger
                value="natural"
                className="flex flex-col items-center p-4 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-purple-700 data-[state=active]:text-white rounded-lg transition-all"
              >
                <MessageSquare className="h-6 w-6 mb-2" />
                <span className="font-semibold">Natural Search</span>
                <span className="text-xs opacity-80">Describe Your Needs</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="investor" className="mt-0">
              <Card className="border-0 shadow-2xl bg-gradient-to-br from-blue-50 to-white">
                <CardHeader className="text-center pb-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className="p-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                      <TrendingUp className="h-8 w-8" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-bold text-blue-900">Describe Yourself as an Investor</CardTitle>
                  <p className="text-blue-700">
                    Tell us about your investment style and goals, and our AI will find matching properties
                  </p>
                </CardHeader>
                <CardContent>
                  <InvestorMatch />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="amenity" className="mt-0">
              <Card className="border-0 shadow-2xl bg-gradient-to-br from-green-50 to-white">
                <CardHeader className="text-center pb-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className="p-3 rounded-full bg-gradient-to-r from-green-600 to-green-700 text-white">
                      <Sliders className="h-8 w-8" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-bold text-green-900">Filter by What Matters Most</CardTitle>
                  <p className="text-green-700">Set your preferences and get AI-scored property matches</p>
                </CardHeader>
                <CardContent>
                  <AmenityScoring />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="natural" className="mt-0">
              <Card className="border-0 shadow-2xl bg-gradient-to-br from-purple-50 to-white">
                <CardHeader className="text-center pb-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className="p-3 rounded-full bg-gradient-to-r from-purple-600 to-purple-700 text-white">
                      <MessageSquare className="h-8 w-8" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-bold text-purple-900">Describe Your Ideal Property</CardTitle>
                  <p className="text-purple-700">Use natural language to describe what you're looking for</p>
                </CardHeader>
                <CardContent>
                  <NaturalSearch />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
