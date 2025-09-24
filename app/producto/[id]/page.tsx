"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingCart, Heart, Share2, Star, Truck, Shield, RotateCcw, Plus, Minus, Check } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import {useProduct} from "@/hooks/use-products"
import type { ProductResponse} from "@/types/products"
import { useCart } from "@/app/store/cart"   // ⬅️ NUEVO

export default function ProductoDetalle({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1)
  const { getProduct, isLoading } = useProduct()
  const { id } = useParams()
  const productId = Number(id)
  const [product, setProductData] = useState<ProductResponse | null>(null)
  const [relatedProducts, setrelatedProducts] = useState<ProductResponse[]>([])
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  // const handleSelect = (featureId: string | number, value: string) =>
  // setSelectedOptions(prev => ({ ...prev, [String(featureId)]: value }));
  const { images = [], main_image } = product ?? {}
  const PLACEHOLDER = "/placeholder.svg?height=600&width=600"
  const { addItem } = useCart()  // ⬅️ NUEVO
  // estado
  
  const [showFeatureErrors, setShowFeatureErrors] = useState(false)

  const imageUrls = useMemo(() => {
    const primary = (typeof main_image === "string" && main_image.trim()) ? [main_image] : []
    const gallery = Array.isArray(images) ? images.map(i => i?.url).filter(Boolean) : []
    const all = [...primary, ...gallery]
    const dedup = Array.from(new Set(all))
    return dedup.length ? dedup : [PLACEHOLDER]
  }, [main_image, images])

  // IDs de features que requieren selección (tienen al menos 1 detalle)
  const requiredFeatureIds = useMemo(() => {
    const feats = product?.features ?? []
    return feats
      .map((g: any) => g?.feature)
      .filter((f: any) => f && Array.isArray(f.detail) && f.detail.length > 0)
      .map((f: any) => String(f.id))
  }, [product])

  const allSelected = useMemo(
    () => requiredFeatureIds.every(fid => !!selectedOptions[fid]),
    [requiredFeatureIds, selectedOptions]
  )

  const missingFeatureIds = useMemo(
    () => requiredFeatureIds.filter(fid => !selectedOptions[fid]),
    [requiredFeatureIds, selectedOptions]
  )

  const missingFeatureNames = useMemo(() => {
    const feats = product?.features ?? []
    return feats
      .map((g: any) => g?.feature)
      .filter((f: any) => f && missingFeatureIds.includes(String(f.id)))
      .map((f: any) => f.name)
  }, [product, missingFeatureIds])

  // selección de opción
  const handleSelect = (featureId: string | number, value: string | number) => {
    setShowFeatureErrors(false)
    setSelectedOptions(prev => ({ ...prev, [String(featureId)]: String(value) }))
  }

  const [selectedImage, setSelectedImage] = useState(0)
  const router = useRouter()

  useEffect(() => {
    if (selectedImage >= imageUrls.length) setSelectedImage(0)
  }, [imageUrls.length, selectedImage])

  const mockproduct = {
    id: 1,
    name: "Camiseta Comunidad Metal Edición Limitada",
    price: 15990,
    originalPrice: 19990,
    main_image: "/placeholder.svg?height=600&width=600",
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
    is_new: true,
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
  function mapRelatedProduct(product: any) {
    let image = PLACEHOLDER
    if (product.main_image){
      image = product.main_image
    }
    if (product.images.length > 0){
      image = product.images[0].url
    }
    return { ...product, image }
  }
  useEffect(() => {
    const loadProduct = async () => {
      if (productId) {
        const productData = await getProduct(productId)
        if (productData) {
          setProductData(productData)
          setrelatedProducts(productData.related.map(mapRelatedProduct))
        } else {
          setTimeout(() => router.push("/"), 3000)
          // setProductData(mockproduct)
        }
      }
      // setProductData(mockproduct)
    }
    loadProduct()
  }, [productId])
  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500"></div>
      </div>
    )
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

  const relatedProducts2 = [
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

  function firstImageUrl(images?: any): string | undefined {
    if (!images || !Array.isArray(images) || images.length === 0) return undefined
    const first = images[0]
    return typeof first === "string" ? first : (first?.url || first?.secure_url || first?.path)
  }

  const handleAddToCart = (product: any) => {
    // si hay features, exige selección completa
    const hasFeatures = (product?.features?.length ?? 0) > 0
    if (hasFeatures && !allSelected) {
      setShowFeatureErrors(true)
      // opcional: scroll al bloque
      return
    }

    // construir opciones elegidas para el carrito
    const chosenOptions =
      (product?.features ?? [])
        .map((g: any) => g?.feature)
        .filter((f: any) => f && Array.isArray(f.detail) && f.detail.length > 0)
        .map((f: any) => {
          const fid = String(f.id)
          const selId = selectedOptions[fid]
          const sel = f.detail.find((d: any) => String(d.id) === selId)
          return sel
            ? {
                feature_id: f.id,
                feature_name: f.name,
                detail_id: sel.id,
                detail_name: sel.name,
              }
            : null
        })
        .filter(Boolean)

    addItem({
      id: product.id,
      name: product.name,
      price: Number(product.price), // venía string en tu payload
      image: product.image || product.main_image || firstImageUrl(product.images) || PLACEHOLDER,
      quantity, // usa tu estado de cantidad
      options: chosenOptions, // queda visible en el checkout
    })
  }

  

  const hasSpecs =
    Array.isArray(product?.specifications) && product.specifications.length > 0


  return (
    <div className="min-h-screen bg-black text-white">
      {/* <Header cartItems={cartItems} /> */}

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-2xl border border-red-800/30">
              <Image
                src={imageUrls[selectedImage]}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-96 lg:h-[500px] object-cover rounded-lg"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col space-y-2">
                {product.is_new && <Badge className="bg-green-600 text-white font-bold">NUEVO</Badge>}
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
                    src={image.url || "/placeholder.svg"}
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
              <div className="mb-4">
                {product.brand_data &&
                  <Badge className="bg-red-600 text-white text-lg px-4 py-2 font-bold">
                    {product.brand_data.name}
                  </Badge>
                }
              </div>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating_avg) ? "text-yellow-500 fill-current" : "text-gray-600"
                      }`}
                    />
                  ))}
                  <span className="text-gray-400 ml-2">({product.reviews_count} reseñas)</span>
                </div>
                {product.stock > 0 && (
                  <div>
                    <Badge className="bg-green-600 text-white">
                      En Stock ({product.stock} disponibles)</Badge>
                  </div>
                )}
                {product.stock <= 0 && (
                  <div>
                    <Badge className="bg-red-600 hover:bg-red-700 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                      Agotado  
                    </Badge>
                  </div>
                )}
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
              <div id="feature-block" className="space-y-1 mb-4 text-xs text-gray-500">
                {product.features && product.features.map((group: any, idx: number) => {
                  const featureGroup = group.feature
                  if (!featureGroup || !featureGroup.detail?.length) return null

                  const featureId = featureGroup.id
                  const selectedValue = selectedOptions[String(featureId)]
                  const isMissing = showFeatureErrors && missingFeatureIds.includes(String(featureId))

                  return (
                    <div key={featureId ?? idx} className="mb-4">
                      <label
                        className={
                          "block text-sm font-bold mb-3 " +
                          (isMissing ? "text-red-400" : "text-gray-300")
                        }
                      >
                        {featureGroup.name}
                        {isMissing && <span className="ml-2 text-red-400">(requerido)</span>}
                      </label>

                      <div className="flex flex-wrap gap-2">
                        {featureGroup.detail.map((d: any) => {
                          const isSelected = selectedValue === String(d.id)
                          return (
                            <Button
                              key={d.id}
                              onClick={() => handleSelect(featureId, d.id)}
                              variant={isSelected ? "default" : "outline"}
                              disabled={product.stock <= 0}
                              className={
                                isSelected
                                  ? "bg-red-600 hover:bg-red-700 text-white"
                                  : "border-red-600 text-red-400 hover:bg-red-600 hover:text-white bg-transparent"
                              }
                            >
                              {d.name}
                            </Button>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
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
                      disabled={product.stock <= 0}
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
                onClick={() => handleAddToCart(product)}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-lg py-4"
                disabled={product.stock <= 0}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                AGREGAR AL CARRITO - ${(product.price * quantity).toLocaleString()}
              </Button>
              {showFeatureErrors && !allSelected && (
                <p className="text-red-400 text-sm mt-2">
                  Selecciona una opción para: {missingFeatureNames.join(", ")}.
                </p>
              )}

              {/* <div className="flex space-x-4">
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
              </div> */}
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
            {hasSpecs && (
              <TabsTrigger value="specifications" className="data-[state=active]:bg-red-600">
                Especificaciones
              </TabsTrigger>
            )}
            {/* <TabsTrigger value="specifications" className="data-[state=active]:bg-red-600">
                  Especificaciones
                </TabsTrigger>
            <TabsTrigger value="reviews" className="data-[state=active]:bg-red-600">
              Reseñas ({product.reviews})
            </TabsTrigger> */}
            {product.reviews_count > 0 && (
              <TabsTrigger value="reviews" className="data-[state=active]:bg-red-600">
                Reseñas ({product.reviews_count})
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <Card className="bg-gradient-to-br from-gray-900 to-black border border-red-800/30">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-red-500 mb-6">Descripción del Producto</h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">{product.description}</p>

                {/* <h4 className="text-xl font-bold text-white mb-4">Características Destacadas:</h4>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3 text-gray-300">
                      <Check className="w-5 h-5 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul> */}
              </CardContent>
            </Card>
          </TabsContent>
          {hasSpecs && (
            <TabsContent value="specifications" className="mt-6">
              <Card className="bg-gradient-to-br from-gray-900 to-black border border-red-800/30">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-red-500 mb-6">Especificaciones Técnicas</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {product.specifications && product.specifications.map((d) => {
                      return (
                        <div key={d.id} className="flex justify-between items-center py-3 border-b border-red-800/30">
                          <span className="font-bold text-gray-300">{d.name}:</span>
                          <span className="text-white">{d.value}</span>
                        </div>
                      )
                    })}


                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
          {product.reviews_count > 0 && (
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
                              i < Math.floor(product.rating_avg) ? "text-yellow-500 fill-current" : "text-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-white font-bold">{product.rating_avg}/5</span>
                      <span className="text-gray-400">({product.reviews_count} reseñas)</span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {product.products_reviews.map((review) => (
                      <div key={review.id} className="border-b border-red-800/30 pb-6">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <span className="font-bold text-white">{review.customer_name}</span>
                            {review.verified && (
                              <Badge className="bg-green-600 text-white text-xs">Compra Verificada</Badge>
                            )}
                          </div>
                          <span className="text-gray-400 text-sm">{review.created_at}</span>
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
          )}          
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
    </div>
  )
}
