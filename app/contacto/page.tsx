"use client"

import type React from "react"

import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Mail,
  Phone,
  MapPin,
  Send,
  User,
  MessageSquare,
  Clock,
  Facebook,
  Instagram,
  Youtube,
  Headphones,
  Music,
  Flame,
  Zap,
} from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    asunto: "",
    mensaje: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      asunto: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simular envío del formulario
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setSubmitMessage("¡Mensaje enviado exitosamente! Te contactaremos pronto.")
    setFormData({
      nombre: "",
      email: "",
      telefono: "",
      asunto: "",
      mensaje: "",
    })
    setIsSubmitting(false)

    // Limpiar mensaje después de 5 segundos
    setTimeout(() => setSubmitMessage(""), 5000)
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      info: "info@comunidadmetal.cl",
      description: "Respuesta en 24 horas",
    },
    {
      icon: Phone,
      title: "Teléfono",
      info: "+56 9 1234 5678",
      description: "Lun - Vie: 9:00 - 18:00",
    },
    {
      icon: MapPin,
      title: "Ubicación",
      info: "Santiago, Chile",
      description: "Región Metropolitana",
    },
    {
      icon: Clock,
      title: "Horario",
      info: "24/7 Online",
      description: "Radio siempre activa",
    },
  ]

  const socialLinks = [
    {
      platform: "Instagram",
      handle: "@Comunidad_metal_chile",
      icon: Instagram,
      color: "from-pink-500 to-purple-600",
      url: "#",
    },
    {
      platform: "Facebook",
      handle: "Comunidad Metal",
      icon: Facebook,
      color: "from-blue-600 to-blue-700",
      url: "#",
    },
    {
      platform: "YouTube",
      handle: "Comunidad Metal Chile",
      icon: Youtube,
      color: "from-red-600 to-red-700",
      url: "#",
    },
    {
      platform: "Spotify",
      handle: "Comunidad Metal Chile",
      icon: Headphones,
      color: "from-green-500 to-green-600",
      url: "#",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-b from-black via-red-950/20 to-black overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.1),transparent_50%)]"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500">
              CONTACTO
            </h1>

            <div className="max-w-4xl mx-auto">
              <p className="text-2xl md:text-3xl text-gray-300 leading-relaxed mb-8">
                ¿Tienes una consulta, sugerencia o quieres ser parte de
                <span className="text-red-400 font-bold"> Comunidad Metal</span>? ¡Escríbenos!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="relative py-16 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {contactInfo.map((item, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-gray-900 to-black border-2 border-red-800 hover:border-red-500 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25 group"
              >
                <CardContent className="p-6 text-center">
                  <div className="bg-red-600 p-3 rounded-full w-14 h-14 mx-auto mb-4 group-hover:bg-red-500 transition-colors">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <div className="text-red-400 font-bold mb-1">{item.info}</div>
                  <div className="text-gray-400 text-sm">{item.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="relative py-32 bg-gradient-to-b from-gray-900 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(220,38,38,0.1),transparent_70%)]"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
            {/* Contact Form */}
            <div>
              <Card className="bg-gradient-to-br from-gray-900 to-black border-2 border-red-800/50">
                <CardContent className="p-8">
                  <div className="mb-8">
                    <h2 className="text-3xl font-black text-red-500 mb-4">ENVÍANOS UN MENSAJE</h2>
                    <p className="text-gray-300 text-lg">
                      Completa el formulario y nos pondremos en contacto contigo lo antes posible.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Nombre */}
                    <div>
                      <label htmlFor="nombre" className="block text-sm font-bold text-gray-300 mb-2">
                        <User className="w-4 h-4 inline mr-2" />
                        Nombre Completo *
                      </label>
                      <Input
                        id="nombre"
                        name="nombre"
                        type="text"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        placeholder="Tu nombre completo"
                        className="bg-gray-800 border-red-800/50 text-white placeholder-gray-500 focus:border-red-500"
                        required
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-bold text-gray-300 mb-2">
                        <Mail className="w-4 h-4 inline mr-2" />
                        Email *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="tu@email.com"
                        className="bg-gray-800 border-red-800/50 text-white placeholder-gray-500 focus:border-red-500"
                        required
                      />
                    </div>

                    {/* Teléfono */}
                    <div>
                      <label htmlFor="telefono" className="block text-sm font-bold text-gray-300 mb-2">
                        <Phone className="w-4 h-4 inline mr-2" />
                        Teléfono (Opcional)
                      </label>
                      <Input
                        id="telefono"
                        name="telefono"
                        type="tel"
                        value={formData.telefono}
                        onChange={handleInputChange}
                        placeholder="+56 9 1234 5678"
                        className="bg-gray-800 border-red-800/50 text-white placeholder-gray-500 focus:border-red-500"
                      />
                    </div>

                    {/* Asunto */}
                    <div>
                      <label htmlFor="asunto" className="block text-sm font-bold text-gray-300 mb-2">
                        <MessageSquare className="w-4 h-4 inline mr-2" />
                        Asunto *
                      </label>
                      <Select value={formData.asunto} onValueChange={handleSelectChange} required>
                        <SelectTrigger className="bg-gray-800 border-red-800/50 text-white">
                          <SelectValue placeholder="Selecciona un asunto" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-red-800/50">
                          <SelectItem value="consulta-general">Consulta General</SelectItem>
                          <SelectItem value="colaboracion">Colaboración</SelectItem>
                          <SelectItem value="banda-promocion">Promoción de Banda</SelectItem>
                          <SelectItem value="evento">Evento</SelectItem>
                          <SelectItem value="tienda">Tienda Online</SelectItem>
                          <SelectItem value="radio">Radio</SelectItem>
                          <SelectItem value="soporte-tecnico">Soporte Técnico</SelectItem>
                          <SelectItem value="otro">Otro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Mensaje */}
                    <div>
                      <label htmlFor="mensaje" className="block text-sm font-bold text-gray-300 mb-2">
                        Mensaje *
                      </label>
                      <Textarea
                        id="mensaje"
                        name="mensaje"
                        value={formData.mensaje}
                        onChange={handleInputChange}
                        placeholder="Escribe tu mensaje aquí..."
                        rows={6}
                        className="bg-gray-800 border-red-800/50 text-white placeholder-gray-500 focus:border-red-500 resize-none"
                        required
                      />
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-lg py-4 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          ENVIAR MENSAJE
                        </>
                      )}
                    </Button>

                    {/* Success Message */}
                    {submitMessage && (
                      <div className="bg-green-900/30 border border-green-600 rounded-lg p-4 text-green-400 text-center font-bold">
                        {submitMessage}
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Image Section */}
            <div className="flex flex-col space-y-8">
              {/* Placeholder para imagen */}
              <Card className="bg-gradient-to-br from-gray-900 to-black border-2 border-red-800/50 overflow-hidden">
                <CardContent className="p-0 py-24">
                  <div className="relative">
                    {/* Aquí puedes colocar tu imagen */}
                    <div className="aspect-square bg-gradient-to-br from-red-950/50 to-black flex items-center justify-center min-h-[400px]">
                      <div className="text-center">
                        <Image
                          src="/images/guitarra.png"
                          alt="Placeholder"
                          width={300}
                          height={300}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-32 bg-gradient-to-b from-black to-gray-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(220,38,38,0.1),transparent_70%)]"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500">
              PREGUNTAS FRECUENTES
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Encuentra respuestas rápidas a las consultas más comunes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                question: "¿Cómo puedo promocionar mi banda?",
                answer:
                  "Envíanos tu material a través del formulario seleccionando 'Promoción de Banda'. Revisamos todas las propuestas y contactamos a las bandas seleccionadas.",
              },
              {
                question: "¿Puedo colaborar con Comunidad Metal?",
                answer:
                  "¡Por supuesto! Siempre buscamos colaboradores apasionados por el metal. Contáctanos con tu propuesta y experiencia.",
              },
              {
                question: "¿Cómo funciona la radio online?",
                answer:
                  "Nuestra radio transmite 24/7 con lo mejor del metal chileno e internacional. Puedes escucharla desde cualquier dispositivo.",
              },
              {
                question: "¿Hacen envíos a todo Chile?",
                answer:
                  "Sí, realizamos envíos a todo el territorio nacional. Los envíos son gratuitos en compras sobre $30.000.",
              },
            ].map((faq, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-gray-900 to-black border border-red-800/30 hover:border-red-500 transition-all duration-300"
              >
                <CardContent className="p-6">
                  <h4 className="text-lg font-bold text-red-400 mb-3">{faq.question}</h4>
                  <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
