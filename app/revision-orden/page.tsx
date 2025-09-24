"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Home,
  MessageSquare,
  ShoppingCart,
  Package,
  CheckCircle,
  Clock,
  Truck,
  ArrowLeft,
  Download,
  Star
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import {usePayment} from "@/hooks/use-payment"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
  size?: string
  color?: string
}

interface CustomerData {
  first_name: string
  email: string
  phone: string
  city: string
  address: string
  zip_code: string
}

interface OrderSummary {
  notes: string
  subtotal: number
  shipping_cost: number
  total: number
  items: CartItem[]
  shipping_address: CustomerData
}

interface OrderData extends OrderSummary {
  order_number: string
  created_at: string
  status: "processing" | "confirmed" | "shipped" | "delivered"
  tracking_number?: string
  estimatedDelivery?: string
  paymentMethod: string
  transaction_id: string
}

export default function RevisionOrdenPage() {
  const [orderData, setOrderData] = useState<OrderData | null>(null)
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")
  const { getOrder, isLoading } = usePayment()
  const [error, setError] = useState<boolean | null>(false)
  useEffect(() => {
    const loadOrder = async () => {
      localStorage.setItem('order_data', null)
      if (orderId) {
        // const orderData = await getOrder(orderId)
        const orderData = await getOrder(orderId)
        if (orderData) {
          console.log(orderData.all_reviews)
          setOrderData(orderData)
          localStorage.setItem("order_data", JSON.stringify(orderData))
        } else {
          setError(true)
          // setTimeout(() => router.push("/"), 3000)
        }
      }
    }
    loadOrder()
  }, [orderId])

/*
  useEffect(() => {
    // Simular datos de la orden procesada
    const mockOrderData: OrderData = {
      order_number: "ORD-2024-001234",
      created_at: "15 de Enero, 2024 - 14:30",
      status: "shipped",
      tracking_number: "CC123456789CL",
      // estimatedDelivery: "18 de Enero, 2024",
      paymentMethod: "WebPay Plus",
      transaction_id: "TXN789456123",
      items: [
        {
          id: 1,
          name: "Camiseta Iron Maiden - The Trooper",
          price: 25990,
          quantity: 2,
          image: "/placeholder.svg?height=100&width=100&text=Iron+Maiden",
          size: "L",
          color: "Negro",
        },
        {
          id: 2,
          name: "Vinilo Metallica - Master of Puppets",
          price: 35990,
          quantity: 1,
          image: "/placeholder.svg?height=100&width=100&text=Metallica",
        },
        {
          id: 3,
          name: "Parche Pentagram Chile",
          price: 8990,
          quantity: 3,
          image: "/placeholder.svg?height=100&width=100&text=Pentagram",
        },
      ],
      shipping_address: {
        first_name: "Juan Pérez Metalero",
        email: "juan.metalero@email.com",
        phone: "+56 9 1234 5678",
        city: "Santiago",
        address: "Av. Libertador Bernardo O'Higgins 1234, Santiago Centro",
        zip_code: "8320000"
      },
      notes: "Por favor tocar el timbre, vivo en el segundo piso.",
      subtotal: 87960,
      shipping_cost: 0,
      total: 87960,
    }
    setOrderData(mockOrderData)
  }, [])*/

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "processing":
        return {
          label: "Procesando",
          color: "bg-yellow-500",
          icon: Clock,
          description: "Tu pedido está siendo procesado",
        }
      case "approved":
        return {
          label: "Confirmado",
          color: "bg-blue-500",
          icon: CheckCircle,
          description: "Tu pedido ha sido confirmado y está siendo preparado",
        }
      case "shipped":
        return {
          label: "Enviado",
          color: "bg-green-500",
          icon: Truck,
          description: "Tu pedido está en camino",
        }
      case "delivered":
        return {
          label: "Entregado",
          color: "bg-green-600",
          icon: Package,
          description: "Tu pedido ha sido entregado",
        }
      default:
        return {
          label: "Desconocido",
          color: "bg-gray-500",
          icon: Clock,
          description: "Estado desconocido",
        }
    }
  }

  if (!orderData && !error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <div className="max-w-md text-center py-12 px-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
          <div className="text-6xl mb-4">🤘</div>
          <h3 className="text-2xl font-bold mb-2">No encontramos tu orden</h3>
          <p className="text-gray-400 mb-6">
            Puede que el enlace haya expirado o que el número de orden sea incorrecto.
          </p>
          <Link
            href="/tienda"
            className="inline-flex items-center gap-2 rounded-lg bg-white text-black px-5 py-2.5 font-medium hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white/40 transition"
          >
            Ir a la tienda
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
            >
              <path d="M13.5 5.5a1 1 0 1 1 1.4-1.4l6 6a1 1 0 0 1 0 1.4l-6 6a1 1 0 1 1-1.4-1.4L17.59 12l-4.09-4.5Z"></path>
              <path d="M3 12a1 1 0 0 1 1-1h12.59l-2.8-3.08a1 1 0 1 1 1.46-1.36l4.5 4.95a1 1 0 0 1 0 1.38l-4.5 4.95a1 1 0 1 1-1.46-1.36L16.59 13H4a1 1 0 0 1-1-1Z"></path>
            </svg>
          </Link>
        </div>
      </div>
    )
  }

  const statusInfo = getStatusInfo(orderData.status)
  const StatusIcon = statusInfo.icon

  const getPaymentStatusInfo = (status: string) => {
    switch (status) {
      case "processing":
        return {
          label: "Procesando",
          color: "bg-yellow-500",
          icon: Clock,
          description: "Tu pago está siendo procesado",
        }
      case "approved":
        return {
          label: "Pago Confirmado",
          color: "bg-blue-500",
          icon: CheckCircle,
          description: "Tu pedido ha sido confirmado",
        }
      case "shipped":
        return {
          label: "Enviado",
          color: "bg-green-500",
          icon: Truck,
          description: "Tu pedido está en camino",
        }
      case "delivered":
        return {
          label: "Entregado",
          color: "bg-green-600",
          icon: Package,
          description: "Tu pedido ha sido entregado",
        }
      default:
        return {
          label: "Desconocido",
          color: "bg-gray-500",
          icon: Clock,
          description: "Estado desconocido",
        }
    }
  }
  const paymentStatusInfo = getPaymentStatusInfo(orderData.payments.status)
  const PaymentStatusIcon = paymentStatusInfo.icon

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500 mb-4">
            ESTADO DE TU ORDEN
          </h1>
          <p className="text-gray-400 text-lg">Orden #{orderData.order_number}</p>
          <p className="text-gray-500 text-sm">{orderData.created_at}</p>
        </div>

        <div className="mb-8">
          <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-red-800/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-full ${statusInfo.color}`}>
                    <StatusIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{statusInfo.label}</h3>
                    <p className="text-gray-400">{statusInfo.description}</p>
                    {orderData.tracking_number && (
                      <p className="text-sm text-red-400 mt-1">
                        Código de seguimiento: <span className="font-mono">{orderData.tracking_number}</span>
                      </p>
                    )}
                    {/* {orderData.estimatedDelivery && (
                      <p className="text-sm text-green-400 mt-1">Entrega estimada: {orderData.estimatedDelivery}</p>
                    )} */}
                  </div>
                </div>
                {orderData.status === "approved" && !orderData.all_reviews && (
                  <div className="flex space-x-3">
                    <Link href="/resenas">
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        <Star className="w-4 h-4 mr-2" />
                        Escribir Reseña
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Datos del Cliente */}
          <div className="lg:col-span-2 space-y-8">
            {/* Información del Cliente */}
            <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-red-800/50">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-red-500 flex items-center">
                  <User className="w-6 h-6 mr-2" />
                  Datos del Cliente
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <User className="w-5 h-5 text-red-500" />
                    <div>
                      <p className="text-sm text-gray-400">Nombre</p>
                      <p className="text-white font-medium">{orderData.shipping_address.first_name}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-red-500" />
                    <div>
                      <p className="text-sm text-gray-400">Email</p>
                      <p className="text-white font-medium">{orderData.shipping_address.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-red-500" />
                    <div>
                      <p className="text-sm text-gray-400">Teléfono</p>
                      <p className="text-white font-medium">{orderData.shipping_address.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-red-500" />
                    <div>
                      <p className="text-sm text-gray-400">Ciudad</p>
                      <p className="text-white font-medium">{orderData.shipping_address.city}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Home className="w-5 h-5 text-red-500 mt-1" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-400">Dirección de Envío</p>
                    <p className="text-white font-medium">{orderData.shipping_address.address}</p>
                    {orderData.shipping_address.zip_code && (
                      <p className="text-gray-300 text-sm">Código Postal: {orderData.shipping_address.zip_code}</p>
                    )}
                  </div>
                </div>

                {orderData.notes && (
                  <div className="flex items-start space-x-3">
                    <MessageSquare className="w-5 h-5 text-red-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-400">Comentarios</p>
                      <p className="text-white font-medium">{orderData.notes}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Productos del Carrito */}
            <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-red-800/50">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-red-500 flex items-center">
                  <ShoppingCart className="w-6 h-6 mr-2" />
                  Productos Comprados ({orderData.items.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {orderData.items.map((item, index) => (
                  <div key={item.id}>
                    <div className="flex items-center space-x-4">
                      <Image
                        src={item.main_image || "/placeholder.svg"}
                        alt={item.product_name}
                        width={80}
                        height={80}
                        className="rounded-lg border border-red-800/30"
                      />

                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-white mb-1">{item.product_name}</h4>
                        <div className="flex items-center space-x-3 mb-2">
                          {item.size && (
                            <Badge variant="outline" className="border-red-600 text-red-400 text-xs">
                              Talla: {item.size}
                            </Badge>
                          )}
                          {item.color && (
                            <Badge variant="outline" className="border-red-600 text-red-400 text-xs">
                              Color: {item.color}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Cantidad: {item.quantity}</span>
                          <span className="text-red-500 font-bold text-lg">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                    {index < orderData.items.length - 1 && <Separator className="bg-red-800/30 mt-4" />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Resumen del Pedido */}
            <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-red-800/50 sticky top-24">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-red-500 flex items-center">
                  <Package className="w-6 h-6 mr-2" />
                  Resumen de Compra
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal ({orderData.items.reduce((sum, item) => sum + item.quantity, 0)} productos):</span>
                  <span className="font-bold">{formatPrice(orderData.subtotal)}</span>
                </div>

                <div className="flex justify-between text-gray-300">
                  <span>Envío:</span>
                  <span className="font-bold">
                    {orderData.shipping_cost === 0 ? (
                      <span className="text-green-500">¡GRATIS!</span>
                    ) : (
                      formatPrice(orderData.shipping_cost)
                    )}
                  </span>
                </div>

                {orderData.shipping_cost === 0 && (
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <p className="text-sm text-green-400">Envío gratis por compras sobre $50.000</p>
                  </div>
                )}

                <Separator className="bg-red-800/30" />

                <div className="flex justify-between text-2xl font-bold text-white">
                  <span>Total Pagado:</span>
                  <span className="text-green-500">{formatPrice(orderData.total)}</span>
                </div>

                <div className="bg-gradient-to-r from-green-950/30 to-transparent p-4 rounded-lg border border-green-800/30 mt-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Método de pago:</span>
                      <span className="text-green-400 font-bold">
                        {/* {orderData.paymentMethod} */}
                        WebPay Plus
                      </span>
                    </div>
                    {/* <div className="flex justify-between text-sm">
                      <span className="text-gray-400">ID Transacción:</span>
                      <span className="text-green-400 font-mono text-xs">{orderData.payments.transaction_id}</span>
                    </div> */}
                    <div className="flex items-center space-x-2 mt-3">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-green-400 font-bold text-sm">
                        {paymentStatusInfo.label}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  <Link href="/tienda">
                    <Button className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 text-lg transform hover:scale-105 transition-all duration-300">
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      SEGUIR COMPRANDO
                    </Button>
                  </Link>

                  <Link href="/">
                    <Button
                      variant="outline"
                      className="w-full border-red-600 text-red-400 hover:bg-red-600 hover:text-white bg-transparent"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Volver al Inicio
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-red-800/50">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-white">¿Necesitas Ayuda?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-gray-400">Si tienes alguna consulta sobre tu pedido, contáctanos:</p>
                  <div className="space-y-2">
                    <p className="text-sm text-white">📧 soporte@comunidadmetal.cl</p>
                    <p className="text-sm text-white">📱 +56 9 8765 4321</p>
                    <p className="text-sm text-white">🕒 Lun-Vie 9:00-18:00</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
