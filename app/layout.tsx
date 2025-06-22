import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter, Noto_Sans_Arabic } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { ChatWidget } from "@/components/chat-widget"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const notoArabic = Noto_Sans_Arabic({ subsets: ["arabic"], variable: "--font-arabic" })

export const metadata: Metadata = {
  title: "Saudi Realty | منصة العقارات السعودية",
  description: "Saudi Arabia's first AI-native real estate platform | أول منصة عقارية ذكية في المملكة العربية السعودية",
  keywords: "Saudi Arabia real estate, Vision 2030, NEOM, Islamic finance, عقارات السعودية",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" dir="ltr" className={`${inter.variable} ${notoArabic.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <ChatWidget />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
