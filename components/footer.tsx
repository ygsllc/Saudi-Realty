import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ChurchIcon as Mosque } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg saudi-gradient flex items-center justify-center">
                <span className="text-white font-bold text-sm">SR</span>
              </div>
              <span className="font-bold text-xl">Saudi Realty</span>
            </div>
            <p className="text-gray-300 text-sm">
              Saudi Arabia's first AI-native real estate platform, transforming property discovery and investment across
              the Kingdom.
            </p>
            <p className="text-sm font-arabic text-gray-300">أول منصة عقارية ذكية في المملكة العربية السعودية</p>
            <div className="flex items-center space-x-2">
              <Badge className="bg-[var(--saudi-green)] text-white">
                <Mosque className="h-3 w-3 mr-1" />
                Shariah Compliant
              </Badge>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <div className="space-y-2 text-sm">
              <Link href="/properties" className="block text-gray-300 hover:text-white transition-colors">
                Properties
              </Link>
              <Link href="/vision-2030" className="block text-gray-300 hover:text-white transition-colors">
                Vision 2030
              </Link>
              <Link href="/mega-projects" className="block text-gray-300 hover:text-white transition-colors">
                Mega Projects
              </Link>
              <Link href="/finance" className="block text-gray-300 hover:text-white transition-colors">
                Islamic Finance
              </Link>
              <Link href="/ai-concierge" className="block text-gray-300 hover:text-white transition-colors">
                AI Concierge
              </Link>
            </div>
          </div>

          {/* Mega Projects */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Vision 2030 Projects</h3>
            <div className="space-y-2 text-sm">
              <Link href="/mega-projects/neom" className="block text-gray-300 hover:text-white transition-colors">
                NEOM
              </Link>
              <Link href="/mega-projects/red-sea" className="block text-gray-300 hover:text-white transition-colors">
                Red Sea Project
              </Link>
              <Link href="/mega-projects/qiddiya" className="block text-gray-300 hover:text-white transition-colors">
                Qiddiya
              </Link>
              <Link href="/mega-projects/diriyah" className="block text-gray-300 hover:text-white transition-colors">
                Diriyah Gate
              </Link>
              <Link href="/investor-zone" className="block text-gray-300 hover:text-white transition-colors">
                Investor Zone
              </Link>
            </div>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Stay Connected</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2 text-gray-300">
                <Phone className="h-4 w-4" />
                <span>+966 11 123 4567</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Mail className="h-4 w-4" />
                <span>info@saudirealty.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <MapPin className="h-4 w-4" />
                <span>Riyadh, Saudi Arabia</span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-gray-300">Subscribe to our newsletter</p>
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter your email"
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                />
                <Button className="saudi-gradient">Subscribe</Button>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-gray-700" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-300">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <span>© 2024 Saudi Realty. All rights reserved.</span>
            <Badge variant="outline" className="border-gray-600 text-gray-300">
              REGA Licensed
            </Badge>
          </div>
          <div className="flex space-x-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/compliance" className="hover:text-white transition-colors">
              REGA Compliance
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
