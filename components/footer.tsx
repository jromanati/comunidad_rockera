"use client"

import type React from "react"

import { useState } from "react"
import { Mail, MapPin, Phone, Flame, Music, Zap, Facebook, Instagram, Youtube } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function Footer() {
  const [email, setEmail] = useState("")

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log("Newsletter subscription:", email)
    setEmail("")
  }

  return (
    <footer id="contacto" className="relative bg-gradient-to-b from-gray-900 to-black border-t border-red-800/50 py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(220,38,38,0.1),transparent_70%)]"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <Image
              src="/images/logo-comunidad-metal.png"
              alt="Comunidad Metal Logo"
              width={200}
              height={60}
              className="h-16 w-auto mb-6 drop-shadow-2xl"
            />
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              La plataforma líder de la música metalera en Chile.
            </p>
            <div className="flex space-x-4">
              <div className="bg-red-600 p-2 rounded-full">
                <Flame className="w-5 h-5 text-white" />
              </div>
              <div className="bg-yellow-600 p-2 rounded-full">
                <Music className="w-5 h-5 text-black" />
              </div>
              <div className="bg-red-600 p-2 rounded-full">
                <Zap className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          <div>
            <h5 className="font-black text-red-500 mb-6 text-xl">CONTACTO</h5>
            <div className="space-y-4 text-gray-400">
              <div className="flex items-center space-x-3 hover:text-red-400 transition-colors cursor-pointer">
                <Mail className="w-5 h-5" />
                <span className="text-lg">info@comunidadmetal.cl</span>
              </div>
              <div className="flex items-center space-x-3 hover:text-red-400 transition-colors cursor-pointer">
                <Phone className="w-5 h-5" />
                <span className="text-lg">+56 9 1234 5678</span>
              </div>
              <div className="flex items-center space-x-3 hover:text-red-400 transition-colors cursor-pointer">
                <MapPin className="w-5 h-5" />
                <span className="text-lg">Santiago, Chile</span>
              </div>
            </div>
          </div>

          <div>
            <h5 className="font-black text-red-500 mb-6 text-xl">ENLACES</h5>
            <div className="space-y-3">
              {[
                { name: "Términos y Condiciones", href: "#" },
                { name: "Política de Privacidad", href: "#" },
                { name: "FAQ", href: "#" },
                { name: "Soporte", href: "#" },
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-gray-400 hover:text-red-400 transition-colors text-lg font-bold"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h5 className="font-black text-red-500 mb-6 text-xl">REDES SOCIALES</h5>
            <p className="text-gray-400 mb-6 text-lg">
              Síguenos en nuestras redes sociales para estar al día con el metal chileno.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-blue-600 hover:bg-blue-700 p-3 rounded-full transition-all duration-300 transform hover:scale-110"
              >
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a
                href="#"
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 p-3 rounded-full transition-all duration-300 transform hover:scale-110"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a
                href="#"
                className="bg-red-600 hover:bg-red-700 p-3 rounded-full transition-all duration-300 transform hover:scale-110"
              >
                <Youtube className="w-5 h-5 text-white" />
              </a>
              <a
                href="#"
                className="bg-green-500 hover:bg-green-600 p-3 rounded-full transition-all duration-300 transform hover:scale-110"
              >
                <Music className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-red-800/50 mt-12 pt-8 text-center">
          <p className="text-gray-400 text-lg">
            © 2025 Comunidad Metal. Todos los derechos reservados. |
            <span className="text-red-500 font-bold"> La Comunidad la hacemos todos.</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
