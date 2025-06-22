"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

export function StatsSection() {
  const [stats, setStats] = useState({
    properties: 0,
    investors: 0,
    projects: 0,
    value: 0,
  })

  useEffect(() => {
    // Animate counters
    const targets = {
      properties: 50000,
      investors: 25000,
      projects: 12,
      value: 75,
    }

    const duration = 2000
    const steps = 60
    const stepDuration = duration / steps

    let step = 0
    const timer = setInterval(() => {
      step++
      const progress = step / steps

      setStats({
        properties: Math.floor(targets.properties * progress),
        investors: Math.floor(targets.investors * progress),
        projects: Math.floor(targets.projects * progress),
        value: Math.floor(targets.value * progress),
      })

      if (step >= steps) {
        clearInterval(timer)
        setStats(targets)
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Transforming Saudi Arabia's Real Estate Market</h2>
          <p className="text-xl text-muted-foreground font-arabic">نحول سوق العقارات في المملكة العربية السعودية</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl md:text-4xl font-bold text-[var(--saudi-green)] mb-2">
                {stats.properties.toLocaleString()}+
              </div>
              <div className="text-sm text-muted-foreground">Properties Listed</div>
              <div className="text-xs font-arabic text-muted-foreground mt-1">عقار مدرج</div>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl md:text-4xl font-bold text-[var(--saudi-green)] mb-2">
                {stats.investors.toLocaleString()}+
              </div>
              <div className="text-sm text-muted-foreground">Active Investors</div>
              <div className="text-xs font-arabic text-muted-foreground mt-1">مستثمر نشط</div>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl md:text-4xl font-bold text-[var(--saudi-green)] mb-2">{stats.projects}</div>
              <div className="text-sm text-muted-foreground">Mega-Projects</div>
              <div className="text-xs font-arabic text-muted-foreground mt-1">مشروع ضخم</div>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-3xl md:text-4xl font-bold text-[var(--saudi-green)] mb-2">${stats.value}B+</div>
              <div className="text-sm text-muted-foreground">Market Value</div>
              <div className="text-xs font-arabic text-muted-foreground mt-1">قيمة السوق</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
