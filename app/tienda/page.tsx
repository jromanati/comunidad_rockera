"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ShoppingCart, Search, Grid3X3, List, Star, Eye, Heart, SlidersHorizontal } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function TiendaPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("featured")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState("")
  const [cartItems, setCartItems] = useState(0)

  const categories = [
    { id: "anillos", name: "Anillos", count: 24 },
    { id: "gorros", name: "Gorros", count: 12 },
    { id: "accesorios", name: "Accesorios", count: 15 },
    { id: "instrumentos", name: "Instrumentos", count: 8 },
  ]

  const products = [
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
    {
      id: 7,
      name: "Muñequera de Cuero con Pin",
      price: 3990,
      image: "/images/stock/mun_equera.jpg?height=400&width=400",
      description: "Muñequera de cuero genuino con pin metálico, talla única",
      category: "accesorios",
      rating: 4.5,
      reviews: 28,
      inStock: true,
      colors: ["Negro", "Rojo", "Gris"],
    },
    
  ]

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category)
    const matchesPrice =
      priceRange === "" ||
      (priceRange === "0-10000" && product.price <= 10000) ||
      (priceRange === "10000-20000" && product.price > 10000 && product.price <= 20000) ||
      (priceRange === "20000-30000" && product.price > 20000 && product.price <= 30000) ||
      (priceRange === "30000+" && product.price > 30000)

    return matchesSearch && matchesCategory && matchesPrice
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "newest":
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)
      default:
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0)
    }
  })

  const addToCart = (productId: number) => {
    setCartItems((prev) => prev + 1)
  }

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header cartItems={cartItems} />

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500">
            TIENDA OFICIAL
          </h1>
          <p className="text-xl text-gray-300">Productos exclusivos para verdaderos metaleros</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
            <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl border border-red-800/30 sticky top-24">
              <h3 className="font-bold text-red-500 mb-6 text-xl flex items-center">
                <SlidersHorizontal className="w-5 h-5 mr-2" />
                FILTROS
              </h3>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-300 mb-2">Buscar</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <Input
                    type="text"
                    placeholder="Buscar productos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-gray-800 border-red-800/50 text-white"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-300 mb-3">Categorías</label>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={category.id}
                        checked={selectedCategories.includes(category.id)}
                        onCheckedChange={() => toggleCategory(category.id)}
                        className="border-red-600 data-[state=checked]:bg-red-600"
                      />
                      <label
                        htmlFor={category.id}
                        className="text-sm text-gray-300 cursor-pointer flex-1 flex justify-between"
                      >
                        <span>{category.name}</span>
                        <span className="text-red-500">({category.count})</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-300 mb-3">Rango de Precio</label>
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger className="bg-gray-800 border-red-800/50 text-white">
                    <SelectValue placeholder="Seleccionar rango" />
                  </SelectTrigger>
                  <SelectContent className="border-red-800/50">
                    <SelectItem value="all">Todos los precios</SelectItem>
                    <SelectItem value="0-10000">$0 - $10.000</SelectItem>
                    <SelectItem value="10000-20000">$10.000 - $20.000</SelectItem>
                    <SelectItem value="20000-30000">$20.000 - $30.000</SelectItem>
                    <SelectItem value="30000+">$30.000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Clear Filters */}
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategories([])
                  setPriceRange("")
                }}
                variant="outline"
                className="w-full border-red-600 text-red-400 hover:bg-red-600 hover:text-white bg-transparent"
              >
                Limpiar Filtros
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 bg-gradient-to-r from-gray-900/50 to-transparent p-4 rounded-xl border border-red-800/30">
              <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                <span className="text-gray-300">
                  Mostrando {sortedProducts.length} de {products.length} productos
                </span>
              </div>

              <div className="flex items-center space-x-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48 bg-gray-800 border-red-800/50 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="border-red-800/50">
                    <SelectItem value="featured">Destacados</SelectItem>
                    <SelectItem value="newest">Más Nuevos</SelectItem>
                    <SelectItem value="price-low">Precio: Menor a Mayor</SelectItem>
                    <SelectItem value="price-high">Precio: Mayor a Menor</SelectItem>
                    <SelectItem value="rating">Mejor Valorados</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border border-red-800/50 rounded-lg overflow-hidden">
                  <Button
                    onClick={() => setViewMode("grid")}
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    className={viewMode === "grid" ? "bg-red-600 hover:bg-red-700" : "hover:bg-gray-800"}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => setViewMode("list")}
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    className={viewMode === "list" ? "bg-red-600 hover:bg-red-700" : "hover:bg-gray-800"}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8" : "space-y-6"}>
              {sortedProducts.map((product) => (
                <Card
                  key={product.id}
                  className={`bg-gradient-to-br from-gray-900 to-black border-2 border-red-800 hover:border-red-500 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25 group ${
                    viewMode === "list" ? "flex flex-row" : ""
                  }`}
                >
                  <CardContent className={`p-0 ${viewMode === "list" ? "flex w-full" : ""}`}>
                    <div className={`relative overflow-hidden ${viewMode === "list" ? "w-48 flex-shrink-0" : ""}`}>
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={400}
                        height={400}
                        className={`${viewMode === "list" ? "w-full h-48" : "w-full h-64"} object-cover group-hover:scale-110 transition-transform duration-500`}
                      />

                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex flex-col space-y-2">
                        {product.isNew && <Badge className="bg-green-600 text-white font-bold">NUEVO</Badge>}
                        {product.isFeatured && <Badge className="bg-yellow-600 text-black font-bold">DESTACADO</Badge>}
                        {product.isLimited && <Badge className="bg-red-600 text-white font-bold">LIMITADO</Badge>}
                        {product.discount && (
                          <Badge className="bg-red-600 text-white font-bold">-{product.discount}%</Badge>
                        )}
                        {!product.inStock && <Badge className="bg-gray-600 text-white font-bold">AGOTADO</Badge>}
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

                      {/* Stock indicator */}
                      {product.isLimited && product.limited && (
                        <div className="absolute bottom-4 left-4">
                          <Badge className="bg-black/70 text-white text-xs">Solo {product.limited} unidades</Badge>
                        </div>
                      )}
                    </div>

                    <div className={`p-6 ${viewMode === "list" ? "flex-1 flex flex-col justify-between" : ""}`}>
                      <div>
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

                        {/* Product Details */}
                        <div className="space-y-1 mb-4 text-xs text-gray-500">
                          {product.sizes && <div>Tallas: {product.sizes.join(", ")}</div>}
                          {product.colors && <div>Colores: {product.colors.join(", ")}</div>}
                          {product.material && <div>Material: {product.material}</div>}
                          {product.size && <div>Tamaño: {product.size}</div>}
                        </div>
                      </div>

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
                          disabled={!product.inStock}
                          className="bg-red-600 hover:bg-red-700 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          {product.inStock ? "Agregar" : "Agotado"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* No Results */}
            {sortedProducts.length === 0 && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🤘</div>
                <h3 className="text-2xl font-bold text-gray-300 mb-2">No se encontraron productos</h3>
                <p className="text-gray-500 mb-6">Intenta ajustar tus filtros de búsqueda</p>
                <Button
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategories([])
                    setPriceRange("")
                  }}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Limpiar Filtros
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
