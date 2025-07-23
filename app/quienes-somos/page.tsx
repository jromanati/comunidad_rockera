"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Music,
  Users,
  Heart,
  Flame,
  Zap,
  Facebook,
  Instagram,
  Youtube,
  ExternalLink,
  Mail,
  Radio,
  Headphones,
  Mic,
  Volume2,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function QuienesSomosPage() {
  const teamMembers = [
    {
      name: "Alex Rodriguez",
      role: "Fundador & Director",
      description: "Metalero desde los 90s, creador de la comunidad",
      image: "/placeholder.svg?height=300&width=300",
      specialty: "Death Metal",
    },
    {
      name: "Maria Gonzalez",
      role: "Community Manager",
      description: "Encargada de redes sociales y contenido",
      image: "/placeholder.svg?height=300&width=300",
      specialty: "Black Metal",
    },
    {
      name: "Carlos Mendez",
      role: "DJ & Locutor",
      description: "Voz oficial de Radio Comunidad Metal",
      image: "/placeholder.svg?height=300&width=300",
      specialty: "Thrash Metal",
    },
    {
      name: "Sofia Torres",
      role: "Diseñadora",
      description: "Creadora del contenido visual y merchandising",
      image: "/placeholder.svg?height=300&width=300",
      specialty: "Progressive Metal",
    },
  ]

  const achievements = [
    {
      icon: Users,
      number: "50K+",
      label: "Seguidores",
      description: "En todas nuestras plataformas",
    },
    {
      icon: Music,
      number: "500+",
      label: "Bandas Promovidas",
      description: "Artistas chilenos difundidos",
    },
    {
      icon: Radio,
      number: "24/7",
      label: "Radio Online",
      description: "Música metal sin parar",
    },
    {
      icon: Heart,
      number: "5",
      label: "Años",
      description: "Construyendo comunidad",
    },
  ]

  const socialLinks = [
    {
      platform: "Instagram",
      handle: "@Comunidad_metal_chile",
      icon: Instagram,
      color: "from-pink-500 to-purple-600",
      followers: "30K",
    },
    {
      platform: "Facebook",
      handle: "Comunidad Metal",
      icon: Facebook,
      color: "from-blue-600 to-blue-700",
      followers: "25K",
    },
    {
      platform: "YouTube",
      handle: "Comunidad Metal Chile",
      icon: Youtube,
      color: "from-red-600 to-red-700",
      followers: "15K",
    },
    {
      platform: "Spotify",
      handle: "Comunidad Metal Chile",
      icon: Headphones,
      color: "from-green-500 to-green-600",
      followers: "10K",
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
              QUIÉNES SOMOS
            </h1>

            <div className="max-w-4xl mx-auto">
              <p className="text-2xl md:text-3xl text-gray-300 leading-relaxed mb-8">
                Somos una plataforma apasionada por la música metalera, dedicada a promover y difundir la
                <span className="text-red-400 font-bold"> escena metalera en Chile</span>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative py-32 bg-gradient-to-b from-black to-gray-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(220,38,38,0.1),transparent_70%)]"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500">
                NUESTRA MISIÓN
              </h2>

              <div className="space-y-6">
                <div className="bg-gradient-to-r from-red-950/50 to-transparent p-6 rounded-2xl border border-red-800/30">
                  <p className="text-xl text-gray-300 leading-relaxed">
                    Con presencia en Facebook, YouTube, TikTok e Instagram, nos esforzamos por crear un espacio donde
                    los amantes del metal puedan conectarse, compartir y disfrutar de la música que les apasiona.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-red-950/50 to-transparent p-6 rounded-2xl border border-red-800/30">
                  <p className="text-xl text-gray-300 leading-relaxed">
                    Creemos en el poder de la música para unir personas y construir una comunidad sólida que trascienda
                    fronteras y géneros dentro del metal.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-8">
              {/* Placeholder para imagen */}
              <Card className="bg-gradient-to-br from-gray-900 to-black border-2 border-red-800/50 overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative">
                    {/* Aquí puedes colocar tu imagen */}
                    <div className="aspect-square bg-gradient-to-br from-red-950/50 to-black flex items-center justify-center ">
                      <div className="text-center">
                        <Image
                          src="/images/quienes_somos.png"
                          alt="Placeholder"
                          width={300}
                          height={300}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Overlay decorativo */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                    <div className="absolute top-6 left-6">
                      <Badge className="bg-red-600 text-white font-bold">COMUNIDAD METAL</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="relative py-32 bg-gradient-to-b from-gray-900 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(220,38,38,0.1),transparent_70%)]"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500">
              NUESTROS LOGROS
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Cinco años construyendo la comunidad metalera más grande de Chile
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {achievements.map((achievement, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-gray-900 to-black border-2 border-red-800 hover:border-red-500 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25 group"
              >
                <CardContent className="p-8 text-center">
                  <div className="bg-red-600 p-4 rounded-full w-16 h-16 mx-auto mb-6 group-hover:bg-red-500 transition-colors">
                    <achievement.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-black text-red-500 mb-2">{achievement.number}</div>
                  <div className="text-xl font-bold text-white mb-2">{achievement.label}</div>
                  <div className="text-gray-400">{achievement.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative py-32 bg-gradient-to-b from-black to-gray-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.1),transparent_70%)]"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500">
              NUESTRO EQUIPO
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Conoce a las personas apasionadas que hacen posible Comunidad Metal
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-gray-900 to-black border-2 border-red-800 hover:border-red-500 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25 group overflow-hidden"
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={300}
                      height={300}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-red-600 text-white font-bold">{member.specialty}</Badge>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                      {member.name}
                    </h3>
                    <div className="text-red-500 font-bold mb-3">{member.role}</div>
                    <p className="text-gray-400 text-sm">{member.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


      {/* Contact Section */}
      <section className="relative py-32 bg-gradient-to-b from-black to-gray-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.1),transparent_70%)]"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Card className="bg-gradient-to-br from-red-950/50 to-black border-2 border-red-600/50 p-12">
              <CardContent className="p-0">
                <div className="mb-8">
                  <Volume2 className="w-16 h-16 text-red-500 mx-auto mb-6" />
                  <h2 className="text-3xl md:text-4xl font-black mb-6 text-white">¡ÚNETE A LA COMUNIDAD!</h2>
                  <p className="text-xl text-gray-300 leading-relaxed mb-8">
                    ¿Eres músico, fan del metal o simplemente quieres ser parte de algo grande? Te invitamos a unirte a
                    nuestra comunidad y ayudarnos a seguir creciendo.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="text-2xl font-bold text-red-400 mb-4">Se despide cordialmente,</div>
                  <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500">
                    EQUIPO COMUNIDAD METAL
                  </div>

                  <div className="flex justify-center space-x-4 mt-8">
                    <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-lg px-8 py-4">
                      <Mail className="w-5 h-5 mr-2" />
                      Contáctanos
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
