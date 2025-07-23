"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingCart, Heart, Share2, Star, Truck, Shield, RotateCcw, Plus, Minus, Check } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function ProductoDetalle({ params }: { params: { id: string } }) {
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [cartItems, setCartItems] = useState(0)

  // Mock product data - in real app, fetch based on params.id
  const product = {
    id: 1,
    name: "Camiseta Comunidad Metal Edición Limitada",
    price: 15990,
    originalPrice: 19990,
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    description:
      "Camiseta oficial de algodón 100% con diseño exclusivo bordado. Perfecta para los verdaderos amantes del metal.",
    longDescription:
      "Esta camiseta representa la esencia de la Comunidad Metal. Fabricada con algodón premium 100%, cuenta con un diseño exclusivo que refleja la pasión por el metal chileno. El logo está bordado con hilos de alta calidad que garantizan durabilidad y resistencia al lavado.",
    category: "camisetas",
    rating: 5,
    reviews: 24,
    isNew: true,
    discount: 20,
    inStock: true,
    stock: 15,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Negro", "Rojo Oscuro", "Gris"],
    features: [
      "100% Algodón premium",
      "Diseño bordado de alta calidad",
      "Corte regular unisex",
      "Resistente al lavado",
      "Edición limitada numerada",
    ],
    specifications: {
      Material: "100% Algodón",
      Peso: "180 GSM",
      Corte: "Regular Fit",
      Cuello: "Redondo",
      Manga: "Corta",
      Cuidado: "Lavar a máquina 30°C",
    },
  }

  const reviews = [
    {
      id: 1,
      user: "MetalHead_CL",
      rating: 5,
      date: "15 Dic 2024",
      comment: "Excelente calidad, el bordado se ve increíble. Definitivamente vale la pena.",
      verified: true,
    },
    {
      id: 2,
      user: "RockFan88",
      rating: 5,
      date: "10 Dic 2024",
      comment: "La tela es muy suave y el diseño está perfecto. Llegó súper rápido.",
      verified: true,
    },
    {
      id: 3,
      user: "MetalChile",
      rating: 4,
      date: "5 Dic 2024",
      comment: "Muy buena camiseta, aunque me hubiera gustado que tuviera más colores disponibles.",
      verified: false,
    },
  ]

  const relatedProducts = [
    {
      id: 2,
      name: "Gorra Snapback Metal Chile",
      price: 12990,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.8,
    },
    {
      id: 4,
      name: "Parche Bordado Logo Oficial",
      price: 5990,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.7,
    },
    {
      id: 5,
      name: "Sudadera Con Capucha Metal",
      price: 29990,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.6,
    },
  ]

  const addToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert("Por favor selecciona talla y color")
      return
    }
    setCartItems((prev) => prev + quantity)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <Header cartItems={cartItems} />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-2xl border border-red-800/30">
              <Image
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-96 lg:h-[500px] object-cover"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col space-y-2">
                {product.isNew && <Badge className="bg-green-600 text-white font-bold">NUEVO</Badge>}
                {product.discount && <Badge className="bg-red-600 text-white font-bold">-{product.discount}%</Badge>}
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative overflow-hidden rounded-lg border-2 transition-all duration-300 ${
                    selectedImage === index ? "border-red-500" : "border-red-800/30 hover:border-red-600"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    width={150}
                    height={150}
                    className="w-full h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-black text-white mb-4">{product.name}</h1>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating) ? "text-yellow-500 fill-current" : "text-gray-600"
                      }`}
                    />
                  ))}
                  <span className="text-gray-400 ml-2">({product.reviews} reseñas)</span>
                </div>
                <Badge className="bg-green-600 text-white">En Stock ({product.stock} disponibles)</Badge>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-red-500">${product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">${product.originalPrice.toLocaleString()}</span>
                )}
                {product.discount && (
                  <Badge className="bg-red-600 text-white text-lg px-3 py-1">
                    Ahorra ${(product.originalPrice! - product.price).toLocaleString()}
                  </Badge>
                )}
              </div>

              <p className="text-gray-300 text-lg leading-relaxed">{product.description}</p>
            </div>

            {/* Product Options */}
            <div className="space-y-6">
              {/* Size Selection */}
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-3">
                  Talla {selectedSize && <span className="text-red-500">- {selectedSize}</span>}
                </label>
                <div className="grid grid-cols-5 gap-3">
                  {product.sizes.map((size) => (
                    <Button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      variant={selectedSize === size ? "default" : "outline"}
                      className={`${
                        selectedSize === size
                          ? "bg-red-600 hover:bg-red-700 text-white"
                          : "border-red-600 text-red-400 hover:bg-red-600 hover:text-white bg-transparent"
                      }`}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-3">
                  Color {selectedColor && <span className="text-red-500">- {selectedColor}</span>}
                </label>
                <div className="flex space-x-3">
                  {product.colors.map((color) => (
                    <Button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      variant={selectedColor === color ? "default" : "outline"}
                      className={`${
                        selectedColor === color
                          ? "bg-red-600 hover:bg-red-700 text-white"
                          : "border-red-600 text-red-400 hover:bg-red-600 hover:text-white bg-transparent"
                      }`}
                    >
                      {color}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-3">Cantidad</label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-red-600 rounded-lg">
                    <Button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      variant="ghost"
                      size="sm"
                      className="text-red-400 hover:text-white hover:bg-red-600"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="px-4 py-2 font-bold text-white">{quantity}</span>
                    <Button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      variant="ghost"
                      size="sm"
                      className="text-red-400 hover:text-white hover:bg-red-600"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <span className="text-gray-400">Máximo {product.stock} unidades</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button
                onClick={addToCart}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-lg py-4"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                AGREGAR AL CARRITO - ${(product.price * quantity).toLocaleString()}
              </Button>

              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  className="flex-1 border-red-600 text-red-400 hover:bg-red-600 hover:text-white bg-transparent"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Favoritos
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-red-600 text-red-400 hover:bg-red-600 hover:text-white bg-transparent"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Compartir
                </Button>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="bg-gradient-to-r from-red-950/30 to-transparent p-6 rounded-xl border border-red-800/30">
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-3">
                  <Truck className="w-5 h-5 text-red-500" />
                  <span className="text-gray-300">Envío gratis en compras sobre $30.000</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-red-500" />
                  <span className="text-gray-300">Compra 100% segura y protegida</span>
                </div>
                <div className="flex items-center space-x-3">
                  <RotateCcw className="w-5 h-5 text-red-500" />
                  <span className="text-gray-300">30 días para cambios y devoluciones</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="description" className="mb-16">
          <TabsList className="grid w-full grid-cols-3 bg-gray-900 border border-red-800/30">
            <TabsTrigger value="description" className="data-[state=active]:bg-red-600">
              Descripción
            </TabsTrigger>
            <TabsTrigger value="specifications" className="data-[state=active]:bg-red-600">
              Especificaciones
            </TabsTrigger>
            <TabsTrigger value="reviews" className="data-[state=active]:bg-red-600">
              Reseñas ({product.reviews})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <Card className="bg-gradient-to-br from-gray-900 to-black border border-red-800/30">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-red-500 mb-6">Descripción del Producto</h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">{product.longDescription}</p>

                <h4 className="text-xl font-bold text-white mb-4">Características Destacadas:</h4>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3 text-gray-300">
                      <Check className="w-5 h-5 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specifications" className="mt-6">
            <Card className="bg-gradient-to-br from-gray-900 to-black border border-red-800/30">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-red-500 mb-6">Especificaciones Técnicas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center py-3 border-b border-red-800/30">
                      <span className="font-bold text-gray-300">{key}:</span>
                      <span className="text-white">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <Card className="bg-gradient-to-br from-gray-900 to-black border border-red-800/30">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold text-red-500">Reseñas de Clientes</h3>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(product.rating) ? "text-yellow-500 fill-current" : "text-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-white font-bold">{product.rating}/5</span>
                    <span className="text-gray-400">({product.reviews} reseñas)</span>
                  </div>
                </div>

                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-red-800/30 pb-6">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <span className="font-bold text-white">{review.user}</span>
                          {review.verified && (
                            <Badge className="bg-green-600 text-white text-xs">Compra Verificada</Badge>
                          )}
                        </div>
                        <span className="text-gray-400 text-sm">{review.date}</span>
                      </div>

                      <div className="flex items-center space-x-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating ? "text-yellow-500 fill-current" : "text-gray-600"
                            }`}
                          />
                        ))}
                      </div>

                      <p className="text-gray-300">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        <div>
          <h3 className="text-3xl font-bold text-red-500 mb-8 text-center">PRODUCTOS RELACIONADOS</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProducts.map((relatedProduct) => (
              <Card
                key={relatedProduct.id}
                className="bg-gradient-to-br from-gray-900 to-black border border-red-800/30 hover:border-red-500 transition-all duration-300 transform hover:scale-105"
              >
                <CardContent className="p-0">
                  <Image
                    src={relatedProduct.image || "/placeholder.svg"}
                    alt={relatedProduct.name}
                    width={300}
                    height={300}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="p-6">
                    <h4 className="font-bold text-white mb-2">{relatedProduct.name}</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-red-500 font-bold text-lg">${relatedProduct.price.toLocaleString()}</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-gray-400">{relatedProduct.rating}</span>
                      </div>
                    </div>
                    <Link href={`/producto/${relatedProduct.id}`}>
                      <Button className="w-full mt-4 bg-red-600 hover:bg-red-700">Ver Producto</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
