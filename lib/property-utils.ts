import propertyData from "@/data/residential.demo.json"

export interface Property {
  title: string
  location: string
  rooms: number
  baths: number
  area: number
  price_sar: number
  price_usd: number
  type: string
  purpose: "for-rent" | "for-sale"
  category: string
  cover_photo: string
  furnishing_status: string
  agency: string
  is_verified: boolean
  external_id: string
  slug: string
}

export function getAllProperties(): Property[] {
  return propertyData as Property[]
}

export function getPropertiesByPurpose(purpose: "for-rent" | "for-sale"): Property[] {
  return propertyData.filter((property) => property.purpose === purpose) as Property[]
}

export function getPropertiesByCategory(category: string): Property[] {
  return propertyData.filter((property) => property.category === category) as Property[]
}

export function getResidentialProperties(): Property[] {
  return propertyData.filter((property) => property.category === "سكني") as Property[]
}

export function getCommercialProperties(): Property[] {
  return propertyData.filter((property) => property.category === "تجاري") as Property[]
}

export function searchProperties(query: string): Property[] {
  const lowerQuery = query.toLowerCase()
  return propertyData.filter(
    (property) =>
      property.title.toLowerCase().includes(lowerQuery) || property.location.toLowerCase().includes(lowerQuery),
  ) as Property[]
}

export function filterProperties(filters: {
  purpose?: "for-rent" | "for-sale"
  category?: string
  minPrice?: number
  maxPrice?: number
  minRooms?: number
  maxRooms?: number
  minArea?: number
  maxArea?: number
  city?: string
}): Property[] {
  let filtered = propertyData as Property[]

  if (filters.purpose) {
    filtered = filtered.filter((p) => p.purpose === filters.purpose)
  }

  if (filters.category) {
    filtered = filtered.filter((p) => p.category === filters.category)
  }

  if (filters.minPrice !== undefined) {
    filtered = filtered.filter((p) => p.price_sar >= filters.minPrice!)
  }

  if (filters.maxPrice !== undefined) {
    filtered = filtered.filter((p) => p.price_sar <= filters.maxPrice!)
  }

  if (filters.minRooms !== undefined) {
    filtered = filtered.filter((p) => p.rooms >= filters.minRooms!)
  }

  if (filters.maxRooms !== undefined) {
    filtered = filtered.filter((p) => p.rooms <= filters.maxRooms!)
  }

  if (filters.minArea !== undefined) {
    filtered = filtered.filter((p) => p.area >= filters.minArea!)
  }

  if (filters.maxArea !== undefined) {
    filtered = filtered.filter((p) => p.area <= filters.maxArea!)
  }

  if (filters.city) {
    filtered = filtered.filter((p) => p.location.includes(filters.city!))
  }

  return filtered
}

export function getPropertyById(id: string): Property | undefined {
  return propertyData.find((property) => property.external_id === id) as Property | undefined
}

export function getSimilarProperties(property: Property, limit = 3): Property[] {
  return propertyData
    .filter(
      (p) =>
        p.external_id !== property.external_id &&
        p.category === property.category &&
        Math.abs(p.rooms - property.rooms) <= 1 &&
        Math.abs(p.price_sar - property.price_sar) <= property.price_sar * 0.3,
    )
    .slice(0, limit) as Property[]
}

export function getCities(): string[] {
  const cities = new Set<string>()
  propertyData.forEach((property) => {
    const locationParts = property.location.split(" • ")
    if (locationParts.length >= 2) {
      cities.add(locationParts[1])
    }
  })
  return Array.from(cities)
}

export function getNeighborhoods(city?: string): string[] {
  const neighborhoods = new Set<string>()
  propertyData.forEach((property) => {
    const locationParts = property.location.split(" • ")
    if (city && locationParts[1] !== city) return
    if (locationParts.length >= 4) {
      neighborhoods.add(locationParts[3])
    }
  })
  return Array.from(neighborhoods)
}

export function getPropertyTypeFromTitle(title: string): string {
  if (title.includes("فيلا") || title.includes("villa")) return "Villa"
  if (title.includes("شقة") || title.includes("apartment")) return "Apartment"
  if (title.includes("دور") || title.includes("floor")) return "Floor"
  if (title.includes("عمارة") || title.includes("building")) return "Building"
  if (title.includes("معرض") || title.includes("showroom")) return "Commercial"
  if (title.includes("ملحق") || title.includes("annex")) return "Annex"
  return "Property"
}

export function formatPrice(price: number, currency: "SAR" | "USD" = "SAR"): string {
  if (currency === "SAR") {
    return `${price.toLocaleString()} SAR`
  }
  return `$${price.toLocaleString()}`
}
