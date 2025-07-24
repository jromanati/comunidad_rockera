"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ShoppingCart,
  Facebook,
  Youtube,
  Instagram,
  ExternalLink,
  Music,
  Calendar,
  Star,
  Flame,
  Zap,
  Eye,
  Play,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function ComunidadMetal() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [cartItems, setCartItems] = useState(0)
  useEffect(() => {
    const video = videoRef.current
    const handleEnded = () => {
      setTimeout(() => {
        if (video) {
          video.currentTime = 0
          video.play()
        }
      }, 5000) // espera 5 segundos después de terminar
    }
    if (video) {
      video.addEventListener("ended", handleEnded)
    }
  }, [])

  const featuredProducts = [
    {
      id: 1,
      name: "Anillo Demona Mort",
      price: 15990,
      originalPrice: 19990,
      image: "/images/stock/anillo.jpg?height=400&width=400",
      description: "Anillo de acero inoxidable con grabado Demona Mort, talla ajustable",
      category: "anillos",
      rating: 5,
      reviews: 24,
      isNew: true,
      discount: 20,
      inStock: true,
      sizes: ["S", "M", "L", "XL", "XXL"],
    },
    {
      id: 2,
      name: "Gorro Snapback Metal Chile",
      price: 12990,
      image: "/images/stock/gorro.jpg?height=400&width=400",
      description: "Gorro bordada con logo metálico en relieve, ajustable",
      category: "gorros",
      rating: 4.8,
      reviews: 18,
      isFeatured: true,
      inStock: true,
      colors: ["Negro", "Rojo", "Gris"],
    },    
    {
      id: 6,
      name: "Aros de Metal Fundido",
      price: 3990,
      image: "/images/stock/aros.jpg?height=400&width=400",
      description: "Aros de metal fundido con diseño exclusivo, ligeros y resistentes",
      category: "accesorios",
      rating: 4.5,
      reviews: 28,
      inStock: true,
      material: "Aleación de zinc",
    },
  ]

  const news = [
    {
      id: 1,
      title: "Festival Metal Chileno 2024: La Cita Más Esperada",
      description:
        "Se confirman 15 bandas nacionales e internacionales para el evento más grande del año. Prepárate para una experiencia única.",
      image: "/placeholder.svg?height=300&width=500",
      date: "15 Dic 2024",
      category: "Eventos",
      featured: true,
    },
    {
      id: 2,
      title: "Fuego Eterno: La Nueva Sensación del Metal Nacional",
      description:
        "Esta banda emergente está revolucionando la escena con su sonido único que mezcla death metal con elementos folklóricos.",
      image: "/placeholder.svg?height=300&width=500",
      date: "10 Dic 2024",
      category: "Bandas",
    },
    {
      id: 3,
      title: "Entrevista Exclusiva: El Futuro del Metal en Chile",
      description: "Conversamos con los pioneros y las nuevas promesas sobre hacia dónde se dirige el metal chileno.",
      image: "/placeholder.svg?height=300&width=500",
      date: "5 Dic 2024",
      category: "Entrevistas",
    },
  ]

  const addToCart = (productId: number) => {
    setCartItems((prev) => prev + 1)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-red-950/20 to-black"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.1),transparent_50%)]"></div>
        <div className="absolute top-0 left-0 w-full h-full
         opacity-5 bg-cover bg-center"></div>
      </div>

      {/* Header - Sticky */}
      <Header />

      {/* Hero Section - Rediseñado con video más grande */}
      <section id="home" className="relative  flex items-center justify-center overflow-hidden py-16">
        {/* Animated Background Elements */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center ">
            <div className="lg:col-span-2 text-left">
              {/* Animated Title - Más pequeño */}
              <div className="mb-6">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-black mb-3 text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-500 to-red-600 drop-shadow-2xl animate-pulse">
                  BIENVENIDOS
                </h1>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-black mb-4 text-white drop-shadow-2xl">
                  A LA COMUNIDAD
                </h2>
                <div className="relative">
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-yellow-500 drop-shadow-2xl">
                    METAL
                  </h3>
                  <div className="absolute inset-0 text-3xl md:text-4xl lg:text-5xl font-black text-red-500/20 blur-sm">
                    METAL
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3 mb-6">
                <p className="text-lg md:text-xl font-bold text-gray-300">
                  La comunidad la hacemos todos!!
                </p>
              </div>
            </div>

            {/* Right Side - Video Section (Más grande) */}
            <div className="lg:col-span-3 flex items-center justify-center">
              <div className="relative w-full max-w-4xl">
                <div className="relative bg-gradient-to-br from-gray-900 to-black border-2 border-red-800 rounded-3xl overflow-hidden shadow-2xl shadow-red-500/25">
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    src="/videos/video2.mp4?height=400&width=800"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"></div>
                  <div className="absolute top-6 left-6 hidden md:block">
                    <Badge className="bg-red-600 text-white font-bold animate-pulse text-lg px-4 py-2">🔴 LIVE</Badge>
                  </div>
                </div>
                <div className="absolute -top-6 -left-6 w-12 h-12 border-l-4 border-t-4 border-red-500 rounded-tl-lg"></div>
                <div className="absolute -top-6 -right-6 w-12 h-12 border-r-4 border-t-4 border-red-500 rounded-tr-lg"></div>
                <div className="absolute -bottom-6 -left-6 w-12 h-12 border-l-4 border-b-4 border-red-500 rounded-bl-lg"></div>
                <div className="absolute -bottom-6 -right-6 w-12 h-12 border-r-4 border-b-4 border-red-500 rounded-br-lg"></div>
                <div className="absolute -inset-4 bg-gradient-to-r from-red-600/20 via-transparent to-red-600/20 rounded-3xl blur-xl -z-10"></div>
                <div className="absolute -inset-8 bg-gradient-to-r from-yellow-600/10 via-transparent to-yellow-600/10 rounded-3xl blur-2xl -z-20"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section id="productos-destacados" className="relative py-32 bg-gradient-to-b from-gray-900 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.1),transparent_70%)]"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h3 className="text-5xl md:text-6xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500">
              PRODUCTOS DESTACADOS
            </h3>
            <p className="text-2xl text-gray-300 font-bold mb-8">Los favoritos de la comunidad metalera</p>
            <Link href="/tienda">
              <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-lg px-8 py-4">
                <Eye className="w-5 h-5 mr-2" />
                Ver Toda la Tienda
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {featuredProducts.map((product) => (
              <Card
                key={product.id}
                className="bg-gradient-to-br from-gray-900 to-black border-2 border-red-800 hover:border-red-500 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25 group"
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={400}
                      height={400}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col space-y-2">
                      {product.isNew && <Badge className="bg-green-600 text-white font-bold">NUEVO</Badge>}
                      {product.isFeatured && <Badge className="bg-yellow-600 text-black font-bold">DESTACADO</Badge>}
                      {product.isLimited && <Badge className="bg-red-600 text-white font-bold">LIMITADO</Badge>}
                      {product.discount && (
                        <Badge className="bg-red-600 text-white font-bold">-{product.discount}%</Badge>
                      )}
                    </div>

                    {/* Quick View Button */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Link href={`/producto/${product.id}`}>
                        <Button className="bg-red-600 hover:bg-red-700 text-white font-bold">
                          <Eye className="w-4 h-4 mr-2" />
                          Ver Detalles
                        </Button>
                      </Link>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating) ? "text-yellow-500 fill-current" : "text-gray-600"
                            }`}
                          />
                        ))}
                        <span className="text-sm text-gray-400 ml-2">({product.reviews})</span>
                      </div>
                    </div>

                    <h4 className="font-bold text-white mb-3 text-lg group-hover:text-red-400 transition-colors">
                      {product.name}
                    </h4>
                    <p className="text-gray-400 text-sm mb-4">{product.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-red-500 font-bold text-xl">${product.price.toLocaleString()}</span>
                        {product.originalPrice && (
                          <span className="text-gray-500 line-through text-sm">
                            ${product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <Button
                        onClick={() => addToCart(product.id)}
                        className="bg-red-600 hover:bg-red-700 transform hover:scale-105 transition-all duration-300"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Agregar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media Section - Mejorada */}
      <section className="relative py-32 bg-gradient-to-b from-black to-gray-900 overflow-hidden">
        {/* Imagen de fondo alineada a la izquierda */}
        <img
          src="/images/mujer1.png"
          alt="rockera"
          className="absolute left-0 top-12 h-full w-auto max-w-none object-left object-cover opacity-30 pointer-events-none select-none  z-10 hidden md:block"
          style={{
            zIndex: 1,
            WebkitMaskImage: "linear-gradient(to left, transparent 0%, black 30%)",
            maskImage: "linear-gradient(to left, transparent 0%, black 30%)"
          }}
        />
        <img
          src="/images/rockero_cantantdo.png"
          alt="rockero"
          className="absolute right-0 top-12 h-full w-auto max-w-none object-left object-cover opacity-30 pointer-events-none select-none "
          style={{
            zIndex: 1,
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 30%)",
            maskImage: "linear-gradient(to right, transparent 0%, black 30%)"
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(220,38,38,0.1),transparent_70%)]"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h3 className="text-5xl md:text-6xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500">
              SÍGUENOS
            </h3>
            <p className="text-2xl text-gray-300 font-bold">
              Mantente conectado con la comunidad metalera más grande de Chile
            </p>
          </div>

          <div className="flex justify-center space-x-12">
            {[
              { icon: Facebook, name: "Facebook", followers: "25K" },
              { icon: Youtube, name: "YouTube", followers: "15K" },
              { icon: Instagram, name: "Instagram", followers: "30K" },
            ].map((social, index) => (
              <Link key={social.name} href="#" className="group">
                <div className="relative">
                  <div className="bg-gradient-to-br from-red-950 to-black p-8 rounded-2xl border-2 border-red-600 group-hover:border-red-400 group-hover:bg-gradient-to-br group-hover:from-red-600 group-hover:to-red-700 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-3">
                    <social.icon className="w-12 h-12 text-red-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="text-center mt-4">
                    <div className="font-bold text-white group-hover:text-red-400 transition-colors">{social.name}</div>
                    <div className="text-red-500 font-bold">{social.followers}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* News Section - Mejorada 
      <section id="noticias" className="relative py-32 bg-gradient-to-b from-black to-gray-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(220,38,38,0.1),transparent_70%)]"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h3 className="text-5xl md:text-6xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500">
              ÚLTIMAS NOTICIAS
            </h3>
            <p className="text-2xl text-gray-300 font-bold">Mantente al día con la escena metalera chilena</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {news.map((article, index) => (
              <Card
                key={article.id}
                className={`${
                  index === 0 ? "lg:col-span-2 lg:row-span-2" : ""
                } bg-gradient-to-br from-gray-900 to-black border-2 border-red-800 hover:border-red-500 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25 group overflow-hidden`}
              >
                <CardContent className="p-0 h-full">
                  <div className="relative overflow-hidden">
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      width={500}
                      height={300}
                      className={`w-full ${index === 0 ? "h-80" : "h-48"} object-cover group-hover:scale-110 transition-transform duration-500`}
                    />

                    <div className="absolute top-4 left-4">
                      <Badge className={`${article.featured ? "bg-red-600" : "bg-gray-800"} text-white font-bold`}>
                        {article.category}
                      </Badge>
                    </div>

                    <div className="absolute bottom-4 right-4">
                      <Badge className="bg-black/70 text-white">{article.date}</Badge>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col justify-between h-full">
                    <div>
                      <h4
                        className={`font-bold text-white mb-4 group-hover:text-red-400 transition-colors ${
                          index === 0 ? "text-2xl" : "text-lg"
                        }`}
                      >
                        {article.title}
                      </h4>
                      <p className={`text-gray-400 mb-6 ${index === 0 ? "text-lg" : "text-sm"}`}>
                        {article.description}
                      </p>
                    </div>

                    <Button
                      variant="outline"
                      className="border-red-600 text-red-500 hover:bg-red-600 hover:text-white bg-transparent self-start transform hover:scale-105 transition-all duration-300"
                    >
                      Leer más
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      */}

      {/* Footer */}
      <Footer />
    </div>
  )
}
