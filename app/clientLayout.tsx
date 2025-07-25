"use client"

import type React from "react"
import { useState } from "react"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RadioModal } from "@/components/radio-modal"


export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [isRadioOpen, setIsRadioOpen] = useState(false)
  const [cartItems, setCartItems] = useState(0)
  const addToCart = (productId: number) => {
    setCartItems((prev) => prev + 1)
  }

  return (
    <html lang="es">
      <head>
        <title>Comunidad Metal - La Comunidad la hacemos todos</title>
        <meta name="description" content="La plataforma líder de la música metalera en Chile" />
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body className="min-h-screen bg-black text-white">
        
        <Header onRadioOpen={() => setIsRadioOpen(true)} cartItems={cartItems.length} />
        <main className="flex-1">{children}</main>
        <Footer />

        {/* Radio Modal Global - Presente en todas las páginas */}
        <RadioModal isOpen={isRadioOpen} onClose={() => setIsRadioOpen(false)} />
      </body>
    </html>
  )
}
