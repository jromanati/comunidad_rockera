"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Star, CheckCircle, ArrowLeft, Send, AlertTriangle, ShieldCheck, Package, MessageSquare, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type {
  CreateOrderPayload, CreateShippingAddress, CreateReviewOrder
} from "@/types/payment"
import useSWR from 'swr'
import {usePayment} from "@/hooks/use-payment"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
  size?: string
  color?: string
  brand: string
}

interface ProductReview {
  productId: number
  rating: number
  comment: string
  submitted: boolean
}

interface OrderData {
  orderNumber: string
  orderDate: string
  transactionId: string
  items: CartItem[]
  customer: {
    nombre: string
    email: string
  }
}

type Review = { product_id: number; rating?: number; comment?: string };

export default function ResenasPage() {
  const [orderData, setOrderData] = useState<OrderData | null>(null)
  const [reviews, setReviews] = useState<ProductReview[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [allSubmitted, setAllSubmitted] = useState(false)
  const { createReviewOrder, isLoading } = usePayment()
  const mockOrderData2: OrderData = {
      orderNumber: "ORD-2024-001234",
      orderDate: "15 de Enero, 2024",
      transactionId: "TXN789456123",
      customer: {
        nombre: "Juan Pérez Metalero",
        email: "juan.metalero@email.com",
      },
      items: [
        {
          id: 1,
          name: "Camiseta Iron Maiden - The Trooper",
          price: 25990,
          quantity: 2,
          image: "/placeholder.svg?height=100&width=100&text=Iron+Maiden",
          size: "L",
          brand: "Metal Classics",
        },
        {
          id: 2,
          name: "Vinilo Metallica - Master of Puppets",
          price: 35990,
          quantity: 1,
          image: "/placeholder.svg?height=100&width=100&text=Metallica",
          brand: "Vinyl Collection",
        },
        {
          id: 3,
          name: "Parche Pentagram Chile",
          price: 8990,
          quantity: 3,
          image: "/placeholder.svg?height=100&width=100&text=Pentagram",
          brand: "Patches Chile",
        },
      ],
    }

  useEffect(() => {
    const raw = localStorage.getItem("order_data")
    if (!raw) return

    try {
      const order = raw ? JSON.parse(raw) : null
      if (!order) return

      setOrderData(order)

      /** Normaliza lo que venga a un array de reviews */
      const toReviewArray = (v: unknown): Review[] => {
        if (!v) return [];
        if (Array.isArray(v)) return v as Review[];
        // si algunos backends devuelven un solo objeto en vez de array
        if (typeof v === "object") return [v as Review];
        // cualquier otro caso: devolver vacío
        return [];
      };

      const reviewsArr: Review[] = toReviewArray(order?.reviews);

      const reviewedIds = new Set<number>(
        reviewsArr
          .map(r => Number((r as any).product_id))
          .filter(n => !Number.isNaN(n))
      );

      const initialReviews = (order.items ?? []).map((item: any) => {
        const existing = reviewsArr.find((r: any) => r.product_id === item.product_id)
        return {
          productId: item.product_id,
          rating: existing?.rating ?? 0,
          comment: existing?.comment ?? "",
          status: existing?.status ?? "",
          submitted: reviewedIds.has(item.product_id), // ✅ true si ya existe review para ese producto
        }
      })

      setReviews(initialReviews)
    } catch (e) {
      console.error("Error leyendo order_data de localStorage:", e)
    }
  }, [])

  const updateReview = (productId: number, field: keyof ProductReview, value: any) => {
    setReviews((prev) =>
      prev.map((review) => (review.productId === productId ? { ...review, [field]: value } : review)),
    )
  }

  const submitReview = async (productId: number) => {
    const review = reviews.find((r) => r.productId === productId)
    if (!review || review.rating === 0) {
      alert("Por favor selecciona una calificación")
      return
    }
    const newCreateReviewOrderPayload: CreateReviewOrder = {
      product_id: review.productId,
      order_id: Number(orderData.id),
      rating: review.rating,
      comment: review.comment,
      customer_name: orderData.shipping_address.first_name + " " + orderData.shipping_address.last_name,
      customer_email: orderData.shipping_address.email
    }
    // setIsSubmitting(true)
    const response = await createReviewOrder(newCreateReviewOrderPayload)
    if (response.data) {
      updateReview(productId, "submitted", true)
      setIsSubmitting(false)

      // Verificar si todas las reseñas han sido enviadas
      const updatedReviews = reviews.map((r) => (r.productId === productId ? { ...r, submitted: true, status:"sended" } : r))
      const allDone = updatedReviews.every((r) => r.submitted)
      setAllSubmitted(allDone)
    }
    // console.log(newCreateReviewOrderPayload, '')
    // // createReviewOrder
    // setIsSubmitting(true)

    // // Simular envío de reseña
    // setTimeout(() => {
    //   updateReview(productId, "submitted", true)
    //   setIsSubmitting(false)

    //   // Verificar si todas las reseñas han sido enviadas
    //   const updatedReviews = reviews.map((r) => (r.productId === productId ? { ...r, submitted: true } : r))
    //   const allDone = updatedReviews.every((r) => r.submitted)
    //   setAllSubmitted(allDone)
    // }, 1500)
  }

  const renderStars = (productId: number, currentRating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => updateReview(productId, "rating", star)}
            className="transition-all duration-200 hover:scale-110"
            disabled={reviews.find((r) => r.productId === productId)?.submitted}
          >
            <Star
              className={`w-8 h-8 ${
                star <= currentRating ? "text-yellow-500 fill-current" : "text-gray-600 hover:text-yellow-400"
              }`}
            />
          </button>
        ))}
        <span className="ml-2 text-gray-400 text-sm">{currentRating > 0 ? `${currentRating}/5` : "Sin calificar"}</span>
      </div>
    )
  }

  if (!orderData) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500 mb-4">
            CALIFICA TUS PRODUCTOS
          </h1>
          <p className="text-gray-400 text-lg mb-2">Orden #{orderData.order_number}</p>
          <p className="text-gray-500 text-sm">{orderData.orderDate}</p>
        </div>

        {/* Mensaje de Moderación */}
        <Alert className="mb-8 bg-gradient-to-r to-transparent border-blue-800/50">
          <ShieldCheck className="h-4 w-4 text-blue-400" />
          <AlertDescription className="text-blue-200">
            <strong>Política de Reseñas:</strong> Todas las reseñas son revisadas por nuestro equipo antes de ser
            publicadas para mantener un ambiente respetuoso y constructivo. No se permiten comentarios ofensivos, spam o
            contenido inapropiado.
          </AlertDescription>
        </Alert>

        {/* Verificación de Compra */}
        <Card className="bg-gradient-to-br from-green-950/30 to-black/80 border-green-800/50 mb-8">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full bg-green-600">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-green-400">Compra Verificada</h3>
                <p className="text-green-200">
                  Tu compra ha sido verificada. ID de transacción:{" "}
                  <span className="font-mono text-sm">{orderData.payments.transaction_id}</span>
                </p>
                <p className="text-green-300 text-sm">
                  Cliente: {orderData.shipping_address.first_name} {orderData.shipping_address.last_name} ({orderData.shipping_address.email})
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Productos para Reseñar */}
        <div className="space-y-8 mb-8">
          {orderData.items.map((item) => {
            const review = reviews.find((r) => r.productId === item.product_id)
            const isSubmitted = review?.submitted || false
            const reviewStatus = review?.reviewStatus || ""
            return (
              <Card
                key={item.id}
                className={`bg-gradient-to-br from-gray-900/80 to-black/80 border-red-800/50 ${
                  isSubmitted ? "border-green-600/50 bg-gradient-to-br from-green-950/20 to-black/80" : ""
                }`}
              >
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-white flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Package className="w-6 h-6 text-red-500" />
                      <span>Calificar Producto</span>
                    </div>
                    {isSubmitted && (
                      <Badge className="bg-green-600 text-white">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Enviada
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Información del Producto */}
                  <div className="flex items-center space-x-4">
                    <Image
                      src={item.main_image || "/placeholder.svg"}
                      alt={item.product_name}
                      width={100}
                      height={100}
                      className="rounded-lg border border-red-800/30"
                    />
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-white mb-2">{item.product_name}</h4>
                      <div className="flex items-center space-x-3 mb-2">
                        {item.brand_name && (
                          <Badge variant="outline" className="border-red-600 text-red-400">
                            {item.brand_name}
                          </Badge>
                        )}
                        {item.size && (
                          <Badge variant="outline" className="border-red-600 text-red-400 text-xs">
                            Talla: {item.size}
                          </Badge>
                        )}
                        <Badge variant="outline" className="border-red-600 text-red-400 text-xs">
                          Cantidad: {item.quantity}
                        </Badge>
                      </div>
                      <p className="text-red-500 font-bold">${item.price.toLocaleString()}</p>
                    </div>
                  </div>

                  <Separator className="bg-red-800/30" />

                  {!isSubmitted ? (
                    <>
                      {/* Calificación */}
                      <div>
                        <label className="block text-sm font-bold text-gray-300 mb-3">Calificación *</label>
                        {renderStars(item.product_id, review?.rating || 0)}
                      </div>

                      {/* Comentario */}
                      <div>
                        <label className="block text-sm font-bold text-gray-300 mb-3">Comentario (opcional)</label>
                        <Textarea
                          value={review?.comment || ""}
                          onChange={(e) => updateReview(item.product_id, "comment", e.target.value)}
                          placeholder="Comparte tu experiencia con este producto... ¿Qué te gustó? ¿Cómo es la calidad? ¿Lo recomendarías?"
                          className="bg-gray-800/50 border-red-800/30 text-white focus:border-red-500 min-h-[100px]"
                          maxLength={500}
                        />
                        <p className="text-xs text-gray-400 mt-1">{review?.comment?.length || 0}/500 caracteres</p>
                      </div>

                      {/* Botón Enviar Reseña Individual */}
                      <Button
                        onClick={() => submitReview(item.product_id)}
                        disabled={!review?.rating || isSubmitting}
                        className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Enviando...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Enviar Reseña
                          </>
                        )}
                      </Button>
                    </>
                  ) : (
                    <div className="bg-gradient-to-r from-green-950/30 to-transparent p-4 rounded-lg border border-green-800/30">
                      <div className="flex items-center space-x-3 mb-3">
                        {review?.status == 'pending' && (
                          <div>
                            <Clock className="w-5 h-5 text-yellow-500" />
                            <span className="text-yellow-400 font-bold">Reseña Pendiente</span>
                          </div>
                        )}
                        {review?.status == 'approved' && (
                          <div>
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <span className="text-green-400 font-bold">Reseña Aprobada</span>
                          </div>
                        )}
                        {review?.status == 'sended' && (
                          <div>
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <span className="text-green-400 font-bold">Reseña Enviada</span>
                          </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-400">Calificación:</span>
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < (review?.rating || 0) ? "text-yellow-500 fill-current" : "text-gray-600"
                                }`}
                              />
                            ))}
                            <span className="text-white ml-1">{review?.rating}/5</span>
                          </div>
                        </div>
                        {review?.comment && (
                          <div>
                            <span className="text-gray-400">Comentario:</span>
                            <p className="text-gray-300 italic mt-1">"{review.comment}"</p>
                          </div>
                        )}
                        {review?.status !== 'approved' && (
                          <p className="text-green-300 text-sm">
                            ✓ Tu reseña será revisada y publicada en las próximas 24-48 horas.
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Botones de Acción */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={{
              pathname: "/revision-orden",
              query: { orderId: orderData.id },
            }}
          >
            <Button
              variant="outline"
              className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white bg-transparent font-bold text-lg px-8 py-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Volver a Mi Orden
            </Button>
          </Link>
        </div>

        {/* Mensaje de Éxito */}
        {allSubmitted && (
          <Alert className="mt-8 bg-gradient-to-r to-transparent border-green-800/50">
            <CheckCircle className="h-4 w-4 text-green-400" />
            <AlertDescription className="text-green-200">
              <strong>¡Gracias por tus reseñas!</strong> Todas tus calificaciones han sido enviadas exitosamente. Serán
              revisadas y publicadas en las próximas 24-48 horas. Tu opinión nos ayuda a mejorar y ayuda a otros
              clientes a tomar mejores decisiones.
            </AlertDescription>
          </Alert>
        )}

        {/* Información Adicional */}
        <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-red-800/50 mt-8">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-white flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-yellow-500" />
              Información Importante
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-gray-300">
              <p>• Solo puedes escribir reseñas para productos que hayas comprado y recibido.</p>
              <p>• Las reseñas son revisadas por nuestro equipo antes de ser publicadas.</p>
              <p>• No se permiten comentarios ofensivos, spam o contenido inapropiado.</p>
              <p>• Una vez enviada, no podrás modificar tu reseña.</p>
              <p>• Las reseñas aparecerán marcadas como "Compra Verificada" en la página del producto.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
