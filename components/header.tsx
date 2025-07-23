"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { ShoppingCart, Play, Radio, Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { RadioModal } from "@/components/radio-modal"

interface HeaderProps {
  cartItems?: number
}

export function Header({ cartItems = 0 }: HeaderProps) {
  const [isRadioOpen, setIsRadioOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      <header className="relative z-50 bg-gradient-to-r from-black/95 via-red-950/30 to-black/95 backdrop-blur-md border-b border-red-800/50 sticky top-0">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Image
                  src="/images/logo-comunidad-metal.png"
                  alt="Comunidad Metal Logo"
                  width={200}
                  height={60}
                  className="h-32 w-auto drop-shadow-2xl cursor-pointer"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="text-white hover:text-red-400 transition-all duration-300 font-bold text-lg hover:drop-shadow-lg"
              >
                Home
              </Link>
              <Link
                href="/tienda"
                className="text-white hover:text-red-400 transition-all duration-300 font-bold text-lg hover:drop-shadow-lg"
              >
                Tienda
              </Link>
              <Link
                href="/quienes-somos"
                className="text-white hover:text-red-400 transition-all duration-300 font-bold text-lg hover:drop-shadow-lg"
              >
                Quiénes Somos
              </Link>
              <Link
                href="/contacto"
                className="text-white hover:text-red-400 transition-all duration-300 font-bold text-lg hover:drop-shadow-lg"
              >
                Contacto
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              {/* Radio Button */}
              

              {/* Cart Button */}
              <Link href="/carrito">
                <Button
                  variant="outline"
                  className="relative border-red-600 text-red-400 hover:bg-red-600 hover:text-white bg-transparent hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300"
                >
                  <ShoppingCart className="w-4 h-4" />
                  {cartItems > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-red-600 text-white text-xs animate-pulse">
                      {cartItems}
                    </Badge>
                  )}
                </Button>
              </Link>

              {/* Mobile Menu Button */}
              <Button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                variant="ghost"
                className="md:hidden text-white hover:text-red-400"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-red-800/50">
              <nav className="flex flex-col space-y-4 mt-4">
                <Link
                  href="/"
                  className="text-white hover:text-red-400 transition-all duration-300 font-bold text-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/tienda"
                  className="text-white hover:text-red-400 transition-all duration-300 font-bold text-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Tienda
                </Link>
                <Button
                  onClick={() => {
                    setIsRadioOpen(true)
                    setIsMobileMenuOpen(false)
                  }}
                  variant="ghost"
                  className="text-white hover:text-red-400 font-bold text-lg justify-start p-0"
                >
                  <Radio className="w-5 h-5 mr-2" />
                  Radio Online
                </Button>
                <Link
                  href="/quienes-somos"
                  className="text-white hover:text-red-400 transition-all duration-300 font-bold text-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Quiénes Somos
                </Link>
                <Link
                  href="/contacto"
                  className="text-white hover:text-red-400 transition-all duration-300 font-bold text-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contacto
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Radio Modal */}
      <RadioModal isOpen={isRadioOpen} onClose={() => setIsRadioOpen(false)} />
    </>
  )
}
