import { useEffect, useRef, useState } from 'react'
import { mutate } from 'swr'
import { StreamingService } from "@/services/streaming.service"
import type { ProductResponse} from "@/types/products"


export function useStreaming() {
  const [isLoading, setIsLoading] = useState(false)
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getStreamings = async (): Promise<ProductResponse | null> => {
    const isAuthenticated = await StreamingService.ensureAuthenticated()
    setIsAuthenticating(false)

    if (!isAuthenticated) {
      setError("Error de autenticación del sistema")
      return null
    }
    setIsLoading(true)
    setError(null)

    try {
      const response = await StreamingService.getStreamings()

      if (response.success && response.data) {
        return response
      } else {
        setError(response.error || "Error al obtener el producto")
        return null
      }
    } catch (err) {
      setError("Error inesperado al obtener la producto")
      return null
    } finally {
      setIsLoading(false)
    }
  }


  return {
    isLoading,
    isAuthenticating,
    error,
    getStreamings,
    clearError: () => setError(null),
  }
}
