"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, X, Send, Mic, Bed, Bath, Square, MapPin } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  searchProperties,
  filterProperties,
  getPropertyTypeFromTitle,
  formatPrice,
  type Property,
} from "@/lib/property-utils"

interface Message {
  id: string
  text: string
  sender: "user" | "ai"
  timestamp: Date
  properties?: Property[]
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "مرحباً! أنا مساعدك الذكي للعقارات في المملكة العربية السعودية. يمكنني مساعدتك في العثور على العقار المثالي.\n\nHello! I'm your AI real estate assistant for Saudi Arabia. I can help you find the perfect property.",
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response with real property search
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputValue)
      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (query: string): Message => {
    const lowerQuery = query.toLowerCase()
    let responseText = ""
    let properties: Property[] = []

    // Villa search
    if (lowerQuery.includes("villa") || lowerQuery.includes("فيلا")) {
      properties = searchProperties("فيلا").slice(0, 3)
      responseText =
        "I found some excellent villa options for you! Here are premium villas in Saudi Arabia:\n\nوجدت لك خيارات ممتازة من الفلل! إليك الفلل المميزة في المملكة:"
    }
    // Apartment search
    else if (lowerQuery.includes("apartment") || lowerQuery.includes("شقة")) {
      properties = searchProperties("شقة").slice(0, 3)
      responseText = "Here are some great apartment options I found for you:\n\nإليك خيارات رائعة من الشقق:"
    }
    // Bedroom-specific search
    else if (lowerQuery.includes("bedroom") || lowerQuery.includes("غرف") || lowerQuery.includes("غرفة")) {
      const bedroomMatch = lowerQuery.match(/(\d+)/)
      if (bedroomMatch) {
        const bedrooms = Number.parseInt(bedroomMatch[1])
        properties = filterProperties({ minRooms: bedrooms, maxRooms: bedrooms }).slice(0, 3)
        responseText = `I found ${bedrooms}-bedroom properties for you:\n\nوجدت لك عقارات بـ ${bedrooms} غرف نوم:`
      }
    }
    // City-specific search
    else if (lowerQuery.includes("riyadh") || lowerQuery.includes("الرياض")) {
      properties = filterProperties({ city: "الرياض" }).slice(0, 3)
      responseText = "Here are excellent properties in Riyadh:\n\nإليك عقارات ممتازة في الرياض:"
    } else if (lowerQuery.includes("jeddah") || lowerQuery.includes("جدة")) {
      properties = filterProperties({ city: "جدة" }).slice(0, 3)
      responseText = "Here are great properties in Jeddah:\n\nإليك عقارات رائعة في جدة:"
    }
    // Price-based search
    else if (lowerQuery.includes("million") || lowerQuery.includes("مليون")) {
      properties = filterProperties({ minPrice: 1000000 }).slice(0, 3)
      responseText = "Here are premium properties over 1 million SAR:\n\nإليك العقارات المميزة بأكثر من مليون ريال:"
    }
    // NEOM search
    else if (lowerQuery.includes("neom") || lowerQuery.includes("نيوم")) {
      responseText =
        "NEOM offers incredible investment opportunities! This $500B futuristic city features:\n\n• Zero-emission transportation\n• 100% renewable energy\n• Advanced AI integration\n• Luxury residential options\n\nCurrently, pre-launch properties are available. Would you like me to show you similar luxury properties in Tabuk region?"
    }
    // Finance search
    else if (lowerQuery.includes("finance") || lowerQuery.includes("تمويل") || lowerQuery.includes("mortgage")) {
      responseText =
        "I can help you with Islamic finance options! We partner with major Saudi banks offering:\n\n• Shariah-compliant mortgages\n• Competitive rates starting from 3.5%\n• Up to 85% financing\n• Flexible payment terms\n\nWould you like me to calculate your eligibility or show you properties within your budget?"
    }
    // Investment search
    else if (lowerQuery.includes("investment") || lowerQuery.includes("استثمار")) {
      properties = filterProperties({ purpose: "for-sale", minPrice: 500000 }).slice(0, 3)
      responseText =
        "Here are excellent investment opportunities in Saudi Arabia:\n\nإليك فرص استثمارية ممتازة في المملكة:"
    }
    // Default response
    else {
      responseText =
        "Thank you for your question! I'm here to help you find the perfect property in Saudi Arabia. You can ask me about:\n\n• Property search by type, location, or price\n• Vision 2030 mega-projects (NEOM, Red Sea, Qiddiya)\n• Islamic finance options\n• Investment opportunities\n• Market insights and trends\n\nWhat would you like to know more about?\n\nيمكنني مساعدتك في البحث عن العقارات والتمويل الإسلامي ومشاريع رؤية 2030."
    }

    return {
      id: (Date.now() + 1).toString(),
      text: responseText,
      sender: "ai",
      timestamp: new Date(),
      properties: properties.length > 0 ? properties : undefined,
    }
  }

  const quickSuggestions = [
    "Show me villas in Riyadh",
    "أظهر لي الفلل في الرياض",
    "4 bedroom apartments",
    "Properties under 1 million SAR",
    "Investment opportunities",
    "Islamic finance calculator",
  ]

  return (
    <>
      {/* Chat Toggle Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 rounded-full w-14 h-14 saudi-gradient shadow-lg hover:shadow-xl transition-all ${isOpen ? "hidden" : "flex"}`}
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </Button>

      {/* Chat Widget */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 z-50 w-96 h-[600px] shadow-2xl flex flex-col">
          <CardHeader className="saudi-gradient text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-white text-[var(--saudi-green)] text-xs font-bold">AI</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-sm">Saudi Realty AI</CardTitle>
                  <p className="text-xs opacity-90">مساعد العقارات الذكي</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === "user" ? "bg-[var(--saudi-green)] text-white" : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.text}</p>

                    {/* Property Results */}
                    {message.properties && (
                      <div className="mt-3 space-y-2">
                        {message.properties.map((property) => (
                          <div key={property.external_id} className="bg-white rounded-lg p-3 text-gray-900">
                            <img
                              src={property.cover_photo || "/placeholder.svg?height=120&width=200"}
                              alt={property.title}
                              className="w-full h-20 object-cover rounded mb-2"
                            />
                            <h4 className="font-semibold text-sm line-clamp-2 mb-1">{property.title}</h4>
                            <div className="flex items-center text-xs text-gray-600 mb-1">
                              <MapPin className="h-3 w-3 mr-1" />
                              <span className="line-clamp-1">
                                {property.location.split(" • ").slice(1, 3).join(" • ")}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
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
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-bold text-[var(--saudi-green)]">
                                {formatPrice(property.price_sar)}
                              </p>
                              <Badge variant="outline" className="text-xs">
                                {getPropertyTypeFromTitle(property.title)}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions */}
            {messages.length === 1 && (
              <div className="p-4 border-t">
                <p className="text-xs text-gray-500 mb-2">Quick suggestions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickSuggestions.map((suggestion, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="cursor-pointer hover:bg-gray-100 text-xs"
                      onClick={() => setInputValue(suggestion)}
                    >
                      {suggestion}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Ask about properties, financing, or Vision 2030..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1 text-sm"
                />
                <Button size="icon" variant="ghost">
                  <Mic className="h-4 w-4" />
                </Button>
                <Button size="icon" onClick={handleSendMessage} className="saudi-gradient">
                  <Send className="h-4 w-4 text-white" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}
