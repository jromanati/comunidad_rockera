"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  CreditCard,
  Truck,
  Shield,
  Tag,
  User,
  Mail,
  Phone,
  MapPin,
  Home,
  MessageSquare,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
export default function CarritoPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Camiseta Comunidad Metal Edición Limitada",
      price: 15990,
      originalPrice: 19990,
      image: "/placeholder.svg?height=200&width=200",
      quantity: 2,
      size: "L",
      color: "Negro",
    },
    {
      id: 2,
      name: "Gorra Snapback Metal Chile",
      price: 12990,
      image: "/placeholder.svg?height=200&width=200",
      quantity: 1,
      color: "Negro",
    },
    {
      id: 3,
      name: "Vinilo Compilado Metal Chileno",
      price: 25990,
      image: "/placeholder.svg?height=200&width=200",
      quantity: 1,
    },
  ])

  const [promoCode, setPromoCode] = useState("")
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null)
  const [showCheckoutForm, setShowCheckoutForm] = useState(false)
  const [customerData, setCustomerData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    postalCode: "",
    comments: "",
  })
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({})

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id)
      return
    }
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "metal2024") {
      setAppliedPromo("METAL2024")
      setPromoCode("")
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setCustomerData((prev) => ({ ...prev, [field]: value }))
    // Limpiar error cuando el usuario empiece a escribir
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const errors: { [key: string]: string } = {}

    if (!customerData.fullName.trim()) errors.fullName = "El nombre es obligatorio"
    if (!customerData.email.trim()) errors.email = "El email es obligatorio"
    else if (!/\S+@\S+\.\S+/.test(customerData.email)) errors.email = "Email inválido"
    if (!customerData.phone.trim()) errors.phone = "El teléfono es obligatorio"
    if (!customerData.city.trim()) errors.city = "La ciudad es obligatoria"
    if (!customerData.address.trim()) errors.address = "La dirección es obligatoria"

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleCheckout = () => {
    if (!showCheckoutForm) {
      setShowCheckoutForm(true)
      return
    }

    if (validateForm()) {
      // Procesar el pedido
      console.log("Pedido confirmado:", { cartItems, customerData, total })
      alert("¡Pedido confirmado! Recibirás un email de confirmación.")
      // Limpiar carrito y formulario
      setCartItems([])
      setCustomerData({
        fullName: "",
        email: "",
        phone: "",
        city: "",
        address: "",
        postalCode: "",
        comments: "",
      })
      setShowCheckoutForm(false)
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = appliedPromo ? subtotal * 0.1 : 0
  const shipping = subtotal > 30000 ? 0 : 3990
  const total = subtotal - discount + shipping

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      {/* <Header cartItems={cartItems.length} /> */}

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500">
            CARRITO DE COMPRAS
          </h1>
          <p className="text-xl text-gray-300">Revisa tus productos antes de finalizar</p>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart className="w-24 h-24 text-gray-600 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-300 mb-4">Tu carrito está vacío</h3>
            <p className="text-gray-500 mb-8">¡Agrega algunos productos increíbles!</p>
            <Link href="/tienda">
              <Button className="bg-red-600 hover:bg-red-700 text-white font-bold text-lg px-8 py-4">
                Ir a la Tienda
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <Card key={item.id} className="bg-gradient-to-br from-gray-900 to-black border border-red-800/30">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={200}
                          height={200}
                          className="w-32 h-32 object-cover rounded-lg"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-bold text-white text-lg mb-2">{item.name}</h3>
                            <div className="space-y-1 text-sm text-gray-400">
                              {item.size && <div>Talla: {item.size}</div>}
                              {item.color && <div>Color: {item.color}</div>}
                            </div>
                          </div>
                          <Button
                            onClick={() => removeItem(item.id)}
                            variant="ghost"
                            size="sm"
                            className="text-gray-400 hover:text-red-400"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              variant="outline"
                              size="sm"
                              className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white bg-transparent"
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="font-bold text-white w-8 text-center">{item.quantity}</span>
                            <Button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              variant="outline"
                              size="sm"
                              className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white bg-transparent"
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>

                          <div className="text-right">
                            <div className="text-red-500 font-bold text-xl">
                              ${(item.price * item.quantity).toLocaleString()}
                            </div>
                            {item.originalPrice && (
                              <div className="text-gray-500 line-through text-sm">
                                ${(item.originalPrice * item.quantity).toLocaleString()}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              {/* Promo Code */}
              <Card className="bg-gradient-to-br from-gray-900 to-black border border-red-800/30">
                <CardContent className="p-6">
                  <h3 className="font-bold text-red-500 mb-4 flex items-center">
                    <Tag className="w-5 h-5 mr-2" />
                    CÓDIGO PROMOCIONAL
                  </h3>
                  {appliedPromo ? (
                    <div className="flex items-center justify-between bg-green-900/30 border border-green-600 rounded-lg p-3">
                      <span className="text-green-400 font-bold">{appliedPromo} aplicado</span>
                      <Button
                        onClick={() => setAppliedPromo(null)}
                        variant="ghost"
                        size="sm"
                        className="text-green-400 hover:text-green-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      <Input
                        type="text"
                        placeholder="Ingresa tu código"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="bg-gray-800 border-red-800/50 text-white"
                      />
                      <Button onClick={applyPromoCode} className="bg-red-600 hover:bg-red-700">
                        Aplicar
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Order Summary */}
              <Card className="bg-gradient-to-br from-gray-900 to-black border border-red-800/30">
                <CardContent className="p-6">
                  <h3 className="font-bold text-red-500 mb-6 text-xl">RESUMEN DEL PEDIDO</h3>

                  <div className="space-y-4">
                    <div className="flex justify-between text-gray-300">
                      <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} productos)</span>
                      <span>${subtotal.toLocaleString()}</span>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between text-green-400">
                        <span>Descuento (10%)</span>
                        <span>-${discount.toLocaleString()}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-gray-300">
                      <span>Envío</span>
                      <span>{shipping === 0 ? "GRATIS" : `$${shipping.toLocaleString()}`}</span>
                    </div>

                    <Separator className="bg-red-800/50" />

                    <div className="flex justify-between text-white font-bold text-xl">
                      <span>Total</span>
                      <span className="text-red-500">${total.toLocaleString()}</span>
                    </div>
                  </div>

                  <Button
                    onClick={handleCheckout}
                    className="w-full mt-6 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-lg py-4"
                  >
                    <CreditCard className="w-5 h-5 mr-2" />
                    {showCheckoutForm ? "CONFIRMAR PEDIDO" : "PROCEDER AL PAGO"}
                  </Button>

                  {/* Checkout Form */}
                  {showCheckoutForm && (
                    <Card className="bg-gradient-to-br from-gray-900 to-black border border-red-800/30 mt-6">
                      <CardContent className="p-6">
                        <h3 className="font-bold text-red-500 mb-6 text-xl">DATOS DEL CLIENTE</h3>

                        <div className="space-y-4">
                          {/* Nombre Completo */}
                          <div>
                            <label className="flex items-center text-white font-bold mb-2">
                              <User className="w-4 h-4 mr-2 text-red-500" />
                              Nombre Completo *
                            </label>
                            <Input
                              type="text"
                              value={customerData.fullName}
                              onChange={(e) => handleInputChange("fullName", e.target.value)}
                              className={`bg-gray-800 border-red-800/50 text-white ${formErrors.fullName ? "border-red-500" : ""}`}
                              placeholder="Ingresa tu nombre completo"
                            />
                            {formErrors.fullName && <p className="text-red-400 text-sm mt-1">{formErrors.fullName}</p>}
                          </div>

                          {/* Email */}
                          <div>
                            <label className="flex items-center text-white font-bold mb-2">
                              <Mail className="w-4 h-4 mr-2 text-red-500" />
                              Email *
                            </label>
                            <Input
                              type="email"
                              value={customerData.email}
                              onChange={(e) => handleInputChange("email", e.target.value)}
                              className={`bg-gray-800 border-red-800/50 text-white ${formErrors.email ? "border-red-500" : ""}`}
                              placeholder="tu@email.com"
                            />
                            {formErrors.email && <p className="text-red-400 text-sm mt-1">{formErrors.email}</p>}
                          </div>

                          {/* Teléfono */}
                          <div>
                            <label className="flex items-center text-white font-bold mb-2">
                              <Phone className="w-4 h-4 mr-2 text-red-500" />
                              Teléfono *
                            </label>
                            <Input
                              type="tel"
                              value={customerData.phone}
                              onChange={(e) => handleInputChange("phone", e.target.value)}
                              className={`bg-gray-800 border-red-800/50 text-white ${formErrors.phone ? "border-red-500" : ""}`}
                              placeholder="+56 9 1234 5678"
                            />
                            {formErrors.phone && <p className="text-red-400 text-sm mt-1">{formErrors.phone}</p>}
                          </div>

                          {/* Ciudad */}
                          <div>
                            <label className="flex items-center text-white font-bold mb-2">
                              <MapPin className="w-4 h-4 mr-2 text-red-500" />
                              Ciudad *
                            </label>
                            <Input
                              type="text"
                              value={customerData.city}
                              onChange={(e) => handleInputChange("city", e.target.value)}
                              className={`bg-gray-800 border-red-800/50 text-white ${formErrors.city ? "border-red-500" : ""}`}
                              placeholder="Santiago, Valparaíso, etc."
                            />
                            {formErrors.city && <p className="text-red-400 text-sm mt-1">{formErrors.city}</p>}
                          </div>

                          {/* Dirección */}
                          <div>
                            <label className="flex items-center text-white font-bold mb-2">
                              <Home className="w-4 h-4 mr-2 text-red-500" />
                              Dirección *
                            </label>
                            <Input
                              type="text"
                              value={customerData.address}
                              onChange={(e) => handleInputChange("address", e.target.value)}
                              className={`bg-gray-800 border-red-800/50 text-white ${formErrors.address ? "border-red-500" : ""}`}
                              placeholder="Calle, número, depto/casa"
                            />
                            {formErrors.address && <p className="text-red-400 text-sm mt-1">{formErrors.address}</p>}
                          </div>

                          {/* Código Postal */}
                          <div>
                            <label className="flex items-center text-white font-bold mb-2">
                              <Tag className="w-4 h-4 mr-2 text-red-500" />
                              Código Postal
                            </label>
                            <Input
                              type="text"
                              value={customerData.postalCode}
                              onChange={(e) => handleInputChange("postalCode", e.target.value)}
                              className="bg-gray-800 border-red-800/50 text-white"
                              placeholder="1234567 (opcional)"
                            />
                          </div>

                          {/* Comentarios */}
                          <div>
                            <label className="flex items-center text-white font-bold mb-2">
                              <MessageSquare className="w-4 h-4 mr-2 text-red-500" />
                              Comentarios Adicionales
                            </label>
                            <textarea
                              value={customerData.comments}
                              onChange={(e) => handleInputChange("comments", e.target.value)}
                              className="w-full bg-gray-800 border border-red-800/50 text-white rounded-md px-3 py-2 min-h-[80px] resize-none"
                              placeholder="Instrucciones especiales de entrega, referencias, etc."
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Shipping Info */}
                  <div className="mt-6 space-y-3 text-sm text-gray-400">
                    <div className="flex items-center space-x-2">
                      <Truck className="w-4 h-4 text-red-500" />
                      <span>Envío gratis en compras sobre $30.000</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Shield className="w-4 h-4 text-red-500" />
                      <span>Compra 100% segura</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Continue Shopping */}
              <Link href="/tienda">
                <Button
                  variant="outline"
                  className="w-full border-red-600 text-red-400 hover:bg-red-600 hover:text-white bg-transparent"
                >
                  Continuar Comprando
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
