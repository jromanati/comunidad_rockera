// types/payment.ts

/** Métodos de pago aceptados por el backend */
export type PaymentMethodCode = "webpay" | "transfer" | "cash"

/** Ítem del carro a enviar en la orden */
export interface CreateOrderItem {
  product_id: number
  price: number // CLP (entero)
  quantity: number
}

/** Dirección de envío */
export interface CreateShippingAddress {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  region: string
  zipCode?: string
}

/** Payload para crear una orden (tal cual tu JSON) */
export interface CreateOrderPayload {
  items: CreateOrderItem[]
  shippingAddress: CreateShippingAddress
  payment_method: PaymentMethodCode
  subtotal: number        // suma(price * quantity)
  shippingCost: number
  total: number           // subtotal + shippingCost
  notes?: string
  return_url: string
  status_url: string
}

/** (Opcional) Respuesta básica de creación de orden */
export interface CreateOrderResponse {
  id: string
  order_number: string
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  subtotal: number
  shipping_cost: number
  total: number
  created_at: string
  updated_at: string
}

export interface PaymentStatus {
  paymentId: string
  orderId: string
  provider_response?: {
    status: "pending" | "approved" | "rejected" | "cancelled"
  }
  status: "pending" | "approved" | "rejected" | "cancelled"
  transactionId?: string
  amount: number
  currency: string
  processedAt?: string
  errorMessage?: string
}


export interface CreateReviewOrder {
  product_id: number
  order_id: number
  customer_name: string
  customer_email: string
  rating: number
  comment: string
}