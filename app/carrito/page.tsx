"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Minus, Plus, Trash2, ShoppingCart, User, Mail, Phone, MapPin, Home, MessageSquare } from "lucide-react"
import Image from "next/image"
import { useCart } from "@/app/store/cart"   // ⬅️ NUEVO
import { useState, useMemo } from "react"
import type {
  CreateOrderPayload, CreateShippingAddress, CreateOrderItem
} from "@/types/payment"
import useSWR from 'swr'
import {usePayment} from "@/hooks/use-payment"


type CustomerData = {
  nombre: string
  apellido: string
  email: string
  telefono: string
  region: string
  ciudad: string
  direccion: string
  codigoPostal: string
  comentarios: string
}
interface FormErrors {
  [key: string]: string
}

export default function CarritoPage() {
  const { items, updateQty, removeItem, subtotal, clear } = useCart()
  const [showCheckout, setShowCheckout] = useState(false)
  const [customerData, setCustomerData] = useState<CustomerData>({
    nombre: "", apellido: "", email: "", telefono: "", region: "", ciudad: "", direccion: "", codigoPostal: "", comentarios: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const { createOrder, isLoading } = usePayment()

  const regionsToCommunes = useMemo(() => {
    return {
      "Arica y Parinacota": ["Arica", "Camarones", "Putre", "General Lagos"],
      Tarapacá: ["Iquique", "Alto Hospicio", "Pozo Almonte", "Camiña", "Colchane", "Huara", "Pica"],
      Antofagasta: ["Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "Ollagüe", "San Pedro de Atacama", "Tocopilla", "María Elena"],
      Atacama: ["Copiapó", "Caldera", "Tierra Amarilla", "Chañaral", "Diego de Almagro", "Vallenar", "Alto del Carmen", "Freirina", "Huasco"],
      Coquimbo: ["La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paihuano", "Vicuña", "Illapel", "Canela", "Los Vilos", "Salamanca", "Ovalle", "Combarbalá", "Monte Patria", "Punitaqui", "Río Hurtado"],
      Valparaíso: ["Valparaíso", "Casablanca", "Concón", "Juan Fernández", "Puchuncaví", "Quintero", "Viña del Mar", "Isla de Pascua", "Los Andes", "Calle Larga", "Rinconada", "San Esteban", "La Ligua", "Cabildo", "Papudo", "Petorca", "Zapallar", "Quillota", "Calera", "Hijuelas", "La Cruz", "Nogales", "San Antonio", "Algarrobo", "Cartagena", "El Quisco", "El Tabo", "Santo Domingo", "San Felipe", "Catemu", "Llaillay", "Panquehue", "Putaendo", "Santa María", "Quilpué", "Limache", "Olmué", "Villa Alemana"],
      "Región Metropolitana": ["Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Joaquín", "San Miguel", "San Ramón", "Santiago", "Vitacura", "Puente Alto", "Pirque", "San José de Maipo", "Colina", "Lampa", "Tiltil", "San Bernardo", "Buin", "Calera de Tango", "Paine", "Melipilla", "Alhué", "Curacaví", "María Pinto", "San Pedro", "Talagante", "El Monte", "Isla de Maipo", "Padre Hurtado", "Peñaflor"],
      "O'Higgins": ["Rancagua", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", "Las Cabras", "Machalí", "Malloa", "Mostazal", "Olivar", "Peumo", "Pichidegua", "Quinta de Tilcoco", "Rengo", "Requínoa", "San Vicente", "Pichilemu", "La Estrella", "Litueche", "Marchihue", "Navidad", "Paredones", "San Fernando", "Chépica", "Chimbarongo", "Lolol", "Nancagua", "Palmilla", "Peralillo", "Placilla", "Pumanque", "Santa Cruz"],
      Maule: ["Talca", "Constitución", "Curepto", "Empedrado", "Maule", "Pelarco", "Pencahue", "Río Claro", "San Clemente", "San Rafael", "Cauquenes", "Chanco", "Pelluhue", "Curicó", "Hualañé", "Licantén", "Molina", "Rauco", "Romeral", "Sagrada Familia", "Teno", "Vichuquén", "Linares", "Colbún", "Longaví", "Parral", "Retiro", "San Javier", "Villa Alegre", "Yerbas Buenas"],
      Ñuble: ["Chillán", "Chillán Viejo", "El Carmen", "Pemuco", "Pinto", "Quillón", "San Ignacio", "Yungay", "Bulnes", "Cobquecura", "Coelemu", "Coihueco", "Ñiquén", "Portezuelo", "Quirihue", "Ránquil", "San Carlos", "San Fabián", "San Nicolás", "Treguaco", "Ninhue"],
      Biobío: ["Concepción", "Coronel", "Chiguayante", "Florida", "Hualqui", "Lota", "Penco", "San Pedro de la Paz", "Santa Juana", "Talcahuano", "Tomé", "Hualpén", "Lebu", "Arauco", "Cañete", "Contulmo", "Curanilahue", "Los Álamos", "Tirúa", "Los Ángeles", "Antuco", "Cabrero", "Laja", "Mulchén", "Nacimiento", "Negrete", "Quilaco", "Quilleco", "San Rosendo", "Santa Bárbara", "Tucapel", "Yumbel", "Alto Biobío"],
      Araucanía: ["Temuco", "Carahue", "Cunco", "Curarrehue", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Melipeuco", "Nueva Imperial", "Padre Las Casas", "Perquenco", "Pitrufquén", "Pucón", "Saavedra", "Teodoro Schmidt", "Toltén", "Vilcún", "Villarrica", "Cholchol", "Angol", "Collipulli", "Curacautín", "Ercilla", "Lonquimay", "Los Sauces", "Lumaco", "Purén", "Renaico", "Traiguén", "Victoria"],
      "Los Ríos": ["Valdivia", "Corral", "Lanco", "Los Lagos", "Máfil", "Mariquina", "Paillaco", "Panguipulli", "La Unión", "Futrono", "Lago Ranco", "Río Bueno"],
      "Los Lagos": ["Puerto Montt", "Calbuco", "Cochamó", "Fresia", "Frutillar", "Los Muermos", "Llanquihue", "Maullín", "Puerto Varas", "Castro", "Ancud", "Chonchi", "Curaco de Vélez", "Dalcahue", "Puqueldón", "Queilén", "Quellón", "Quemchi", "Quinchao", "Osorno", "Puerto Octay", "Purranque", "Puyehue", "Río Negro", "San Juan de la Costa", "San Pablo", "Chaitén", "Futaleufú", "Hualaihué", "Palena"],
      Aysén: ["Coyhaique", "Lago Verde", "Aysén", "Cisnes", "Guaitecas", "Cochrane", "O'Higgins", "Tortel", "Chile Chico", "Río Ibáñez"],
      Magallanes: ["Punta Arenas", "Laguna Blanca", "Río Verde", "San Gregorio", "Cabo de Hornos", "Antártica", "Porvenir", "Primavera", "Timaukel", "Natales", "Torres del Paine"],
    } as Record<string, string[]>
  }, [])

  const regions = useMemo(() => Object.keys(regionsToCommunes), [regionsToCommunes])
  const communesForSelectedRegion = useMemo(() => {
    if (!customerData.region) return []
    return regionsToCommunes[customerData.region] ?? []
  }, [customerData.region, regionsToCommunes])
  

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", minimumFractionDigits: 0 }).format(price)

  const shipping = subtotal > 50000 ? 0 : 5990
  const total = subtotal + shipping

  const updateQuantity = (key: string, newQuantity: number) => updateQty(key, newQuantity)
  const removeByKey = (key: string) => removeItem(key)

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-12">
        <div className="container mx-auto px-4">
          <div className="text-center py-20">
            <ShoppingCart className="w-24 h-24 text-gray-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">Tu carrito está vacío</h2>
            <p className="text-gray-400 mb-8">¡Agrega algunos productos increíbles de nuestra tienda!</p>
            <Button asChild className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-3 text-lg">
              <a href="/tienda">Ir a la Tienda</a>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!customerData.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio"
    }

    if (!customerData.email.trim()) {
      newErrors.email = "El email es obligatorio"
    } else if (!/\S+@\S+\.\S+/.test(customerData.email)) {
      newErrors.email = "El email no es válido"
    }

    if (!customerData.telefono.trim()) {
      newErrors.telefono = "El teléfono es obligatorio"
    }

    if (!customerData.region.trim()) {
      newErrors.region = "La región es obligatoria"
    }

    if (!customerData.ciudad.trim()) {
      newErrors.ciudad = "La comuna es obligatoria"
    }

    if (!customerData.direccion.trim()) {
      newErrors.direccion = "La dirección es obligatoria"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof CustomerData, value: string) => {
    setCustomerData((prev) => ({ ...prev, [field]: value }))
    // Limpiar error cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleRegionChange = (value: string) => {
    setCustomerData((prev) => ({ ...prev, region: value, ciudad: "" }))
    if (errors.region || errors.ciudad) {
      setErrors((prev) => ({ ...prev, region: "", ciudad: "" }))
    }
  }
  const handleConfirmOrder = async () => {
    if (validateForm()) {
      // Aquí iría la lógica para procesar el pedido
      // CreateOrderPayload, CreateShippingAddress, CreateOrderItem
      
      const newShippingAddress: CreateShippingAddress = {        
        firstName: customerData.nombre,
        lastName: customerData.apellido,
        email: customerData.email,
        phone: customerData.telefono,
        address: customerData.direccion,
        city: customerData.ciudad,
        region: customerData.region || "",
        zipCode: customerData.codigoPostal
      }
      const newCreateOrderItem: CreateOrderItem[] = items.map(item => ({
        product_id: item.id || 0,
        price: item.price,
        quantity: item.quantity,
      }))
      const returnUrl = `${window.location.origin}/success`
      const statusUrl = `${window.location.origin}/revision-orden`
      const newCreateOrderPayload: CreateOrderPayload = {
        items: newCreateOrderItem,
        shippingAddress: newShippingAddress,
        payment_method: "webpay",
        subtotal: subtotal,
        shippingCost: shipping,
        total: total,
        notes: customerData.comentarios,
        return_url: returnUrl,
        status_url: statusUrl,
      }
      const response = await createOrder(newCreateOrderPayload)
      if (response.data_web_pay) {
        localStorage.setItem("payment_id", response.payment_id)
        if (response.data_web_pay.url && response.data_web_pay.token) {
          window.location.href = `${response.data_web_pay.url}?token_ws=${response.data_web_pay.token}`
          return
        } else {
          throw new Error("Respuesta inválida de Webpay")
        }
      }
      /*setCustomerData({
        nombre: "",
        email: "",
        telefono: "",
        ciudad: "",
        direccion: "",
        codigoPostal: "",
        comentarios: "",
      })
      setShowCheckout(false)
      setErrors({})
      clear()*/
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-12">
      <div className="container mx-auto px-4">
        {/* ... encabezado ... */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item._key} className="bg-gradient-to-r from-gray-900/50 to-black/50 border-red-800/30">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} width={100} height={100} className="rounded-lg border border-red-800/30" />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">{item.name}</h3>
                      <div className="flex items-center space-x-4 mb-3">
                        {item.size && <Badge variant="outline" className="border-red-600 text-red-400">Talla: {item.size}</Badge>}
                        {item.color && <Badge variant="outline" className="border-red-600 text-red-400">Color: {item.color}</Badge>}
                      </div>
                      <p className="text-2xl font-bold text-red-500">{formatPrice(item.price)}</p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Button onClick={() => updateQuantity(item._key, item.quantity - 1)} variant="outline" size="sm" className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white">
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="text-white font-bold text-lg w-8 text-center">{item.quantity}</span>
                      <Button onClick={() => updateQuantity(item._key, item.quantity + 1)} variant="outline" size="sm" className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>

                    <Button onClick={() => removeByKey(item._key)} variant="ghost" size="sm" className="text-red-400 hover:text-red-300 hover:bg-red-950/30">
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Resumen */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-red-800/50">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-red-500">Resumen del Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-gray-300"><span>Subtotal:</span><span className="font-bold">{formatPrice(subtotal)}</span></div>
                <div className="flex justify-between text-gray-300"><span>Envío:</span><span className="font-bold">{shipping === 0 ? <span className="text-green-500">¡GRATIS!</span> : formatPrice(shipping)}</span></div>
                <Separator className="bg-red-800/30" />
                <div className="flex justify-between text-xl font-bold text-white"><span>Total:</span><span className="text-red-500">{formatPrice(total)}</span></div>

                {!showCheckout ? (
                  <Button onClick={() => setShowCheckout(true)} className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 text-lg transform hover:scale-105 transition-all duration-300">
                    PROCEDER AL PAGO
                  </Button>
                ) : (
                  <Button onClick={handleConfirmOrder} disabled={isLoading} className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-3 text-lg transform hover:scale-105 transition-all duration-300">
                    CONFIRMAR PEDIDO
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Formulario (igual que el tuyo) */}
            {showCheckout && (
              <Card className="bg-gradient-to-br from-gray-900/80 to-black/80 border-red-800/50">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-red-500">Datos del Cliente</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="nombre" className="text-white flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      Nombre Completo *
                    </Label>
                    <Input
                      id="nombre"
                      value={customerData.nombre}
                      onChange={(e) => handleInputChange("nombre", e.target.value)}
                      className="bg-gray-800/50 border-red-800/30 text-white focus:border-red-500"
                      placeholder="Tu nombre completo"
                    />
                    {errors.nombre && <p className="text-red-400 text-sm">{errors.nombre}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="apellido" className="text-white flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      Apellido Completo *
                    </Label>
                    <Input
                      id="apellido"
                      value={customerData.apellido}
                      onChange={(e) => handleInputChange("apellido", e.target.value)}
                      className="bg-gray-800/50 border-red-800/30 text-white focus:border-red-500"
                      placeholder="Tu apellido completo"
                    />
                    {errors.apellido && <p className="text-red-400 text-sm">{errors.apellido}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white flex items-center">
                      <Mail className="w-4 h-4 mr-2" />
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={customerData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="bg-gray-800/50 border-red-800/30 text-white focus:border-red-500"
                      placeholder="tu@email.com"
                    />
                    {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telefono" className="text-white flex items-center">
                      <Phone className="w-4 h-4 mr-2" />
                      Teléfono *
                    </Label>
                    <Input
                      id="telefono"
                      value={customerData.telefono}
                      onChange={(e) => handleInputChange("telefono", e.target.value)}
                      className="bg-gray-800/50 border-red-800/30 text-white focus:border-red-500"
                      placeholder="+56 9 1234 5678"
                    />
                    {errors.telefono && <p className="text-red-400 text-sm">{errors.telefono}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="region" className="text-white flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      Región *
                    </Label>
                    <Select value={customerData.region} onValueChange={handleRegionChange}>
                      <SelectTrigger id="region" className="bg-gray-800/50 border-red-800/30 text-white focus:border-red-500">
                        <SelectValue placeholder="Selecciona una región" />
                      </SelectTrigger>
                      <SelectContent>
                        {regions.map((region) => (
                          <SelectItem key={region} value={region}>
                            {region}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.region && <p className="text-red-400 text-sm">{errors.region}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ciudad" className="text-white flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      Comuna *
                    </Label>
                    <Select
                      value={customerData.ciudad}
                      onValueChange={(value) => handleInputChange("ciudad", value)}
                      disabled={!customerData.region}
                    >
                      <SelectTrigger id="ciudad" className="bg-gray-800/50 border-red-800/30 text-white focus:border-red-500">
                        <SelectValue placeholder={customerData.region ? "Selecciona una comuna" : "Selecciona una región primero"} />
                      </SelectTrigger>
                      <SelectContent>
                        {communesForSelectedRegion.map((comuna) => (
                          <SelectItem key={comuna} value={comuna}>
                            {comuna}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.ciudad && <p className="text-red-400 text-sm">{errors.ciudad}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="direccion" className="text-white flex items-center">
                      <Home className="w-4 h-4 mr-2" />
                      Dirección *
                    </Label>
                    <Input
                      id="direccion"
                      value={customerData.direccion}
                      onChange={(e) => handleInputChange("direccion", e.target.value)}
                      className="bg-gray-800/50 border-red-800/30 text-white focus:border-red-500"
                      placeholder="Calle, número, comuna"
                    />
                    {errors.direccion && <p className="text-red-400 text-sm">{errors.direccion}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="codigoPostal" className="text-white">
                      Código Postal
                    </Label>
                    <Input
                      id="codigoPostal"
                      value={customerData.codigoPostal}
                      onChange={(e) => handleInputChange("codigoPostal", e.target.value)}
                      className="bg-gray-800/50 border-red-800/30 text-white focus:border-red-500"
                      placeholder="1234567"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="comentarios" className="text-white flex items-center">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Comentarios Adicionales
                    </Label>
                    <Textarea
                      id="comentarios"
                      value={customerData.comentarios}
                      onChange={(e) => handleInputChange("comentarios", e.target.value)}
                      className="bg-gray-800/50 border-red-800/30 text-white focus:border-red-500"
                      placeholder="Instrucciones especiales para la entrega..."
                      rows={3}
                    />
                  </div>

                  <Button
                    onClick={handleConfirmOrder}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-3 text-lg transform hover:scale-105 transition-all duration-300"
                  >
                    CONFIRMAR PEDIDO
                  </Button>

                  <p className="text-sm text-gray-400">* Campos obligatorios</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
