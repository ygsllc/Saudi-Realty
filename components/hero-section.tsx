"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Mic, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isListening, setIsListening] = useState(false)

  const handleVoiceSearch = () => {
    setIsListening(true)
    // Simulate voice search
    setTimeout(() => {
      setIsListening(false)
      setSearchQuery("Villa in NEOM")
    }, 2000)
  }

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center islamic-pattern">
      <div className="absolute inset-0 saudi-gradient opacity-90" />

      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-4">
            <Badge className="bg-white/20 text-white border-white/30 mb-4">🇸🇦 Powered by Vision 2030</Badge>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Discover Your Dream Property in Saudi Arabia
            </h1>
            <p className="text-xl md:text-2xl font-arabic opacity-90">
              اكتشف عقارك المثالي في المملكة العربية السعودية
            </p>
            <p className="text-lg md:text-xl opacity-80 max-w-2xl mx-auto">
              Saudi Arabia's first AI-native real estate platform connecting you to Vision 2030 mega-projects and
              premium properties across the Kingdom.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <div className="flex items-center bg-white rounded-full p-2 shadow-2xl">
                <div className="flex items-center flex-1 px-4">
                  <Search className="h-5 w-5 text-gray-400 mr-3" />
                  <Input
                    placeholder="Search properties, locations, or ask AI..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border-0 bg-transparent text-gray-900 placeholder:text-gray-500 focus-visible:ring-0"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={handleVoiceSearch}
                    className={`rounded-full ${isListening ? "bg-red-100 text-red-600" : "text-gray-600 hover:bg-gray-100"}`}
                  >
                    <Mic className={`h-4 w-4 ${isListening ? "animate-pulse" : ""}`} />
                  </Button>
                  <Button className="saudi-gradient rounded-full px-8">Search</Button>
                </div>
              </div>
              {isListening && (
                <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-red-100 text-red-600 animate-pulse">🎤 Listening...</Badge>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              <MapPin className="h-3 w-3 mr-1" />
              NEOM Properties
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              <MapPin className="h-3 w-3 mr-1" />
              Red Sea Project
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              <MapPin className="h-3 w-3 mr-1" />
              Qiddiya Entertainment
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              <MapPin className="h-3 w-3 mr-1" />
              Riyadh New Capital
            </Badge>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
              Explore Mega-Projects
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
              Islamic Finance Calculator
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
