"use client"

import type React from "react"
import { useState } from "react"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RadioModal } from "@/components/radio-modal"
import { CartProvider } from "@/app/store/cart"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isRadioOpen, setIsRadioOpen] = useState(false)

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
        <CartProvider>
          <Header onRadioOpen={() => setIsRadioOpen(true)} />
          <main className="flex-1">{children}</main>
          <Footer />
          <RadioModal isOpen={isRadioOpen} onClose={() => setIsRadioOpen(false)} />
        </CartProvider>
      </body>
    </html>
  )
}
