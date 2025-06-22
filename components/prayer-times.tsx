"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function PrayerTimes() {
  const [currentPrayer, setCurrentPrayer] = useState<string>("")
  const [nextPrayer, setNextPrayer] = useState<string>("")
  const [timeToNext, setTimeToNext] = useState<string>("")

  useEffect(() => {
    // Simulated prayer times for Riyadh
    const prayerTimes = {
      Fajr: "05:30",
      Dhuhr: "12:15",
      Asr: "15:45",
      Maghrib: "18:20",
      Isha: "19:50",
    }

    const updatePrayerInfo = () => {
      const now = new Date()
      const currentTime = now.getHours() * 60 + now.getMinutes()

      // Simple logic to determine current and next prayer
      if (currentTime < 330) {
        // Before Fajr
        setCurrentPrayer("Isha")
        setNextPrayer("Fajr")
        setTimeToNext("2h 15m")
      } else if (currentTime < 735) {
        // Before Dhuhr
        setCurrentPrayer("Fajr")
        setNextPrayer("Dhuhr")
        setTimeToNext("4h 30m")
      } else {
        setCurrentPrayer("Dhuhr")
        setNextPrayer("Asr")
        setTimeToNext("3h 30m")
      }
    }

    updatePrayerInfo()
    const interval = setInterval(updatePrayerInfo, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="hidden lg:flex items-center space-x-2 text-sm">
      <Clock className="h-4 w-4 text-muted-foreground" />
      <Badge variant="outline" className="text-xs">
        Next: {nextPrayer} in {timeToNext}
      </Badge>
    </div>
  )
}
