import { useEffect, useRef, useState } from 'react'
import { mutate } from 'swr'
import { BlogService } from "@/services/blog.service"
import type { Blog} from "@/types/blogs"

export function useBlog() {
  const [isLoading, setIsLoading] = useState(false)
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getBlogs = async (): Promise<Blog | null> => {
    const isAuthenticated = await BlogService.ensureAuthenticated()
    setIsAuthenticating(false)

    if (!isAuthenticated) {
      setError("Error de autenticación del sistema")
      return null
    }
    setIsLoading(true)
    setError(null)

    try {
      const response = await BlogService.getBlogs()

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

  const getBlogSecction = async (blogId: number): Promise<Blog | null> => {
    const isAuthenticated = await BlogService.ensureAuthenticated()
    setIsAuthenticating(false)

    if (!isAuthenticated) {
      setError("Error de autenticación del sistema")
      return null
    }
    setIsLoading(true)
    setError(null)

    try {
      const response = await BlogService.getBlogSecction(blogId)

      if (response.success && response.data) {
        return response.data
      } else {
        setError(response.error || "Error al obtener el producto")
        return null
      }
    } catch (err) {
      setError("Error inesperado al obtener la orden")
      return null
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    isAuthenticating,
    error,
    getBlogs,
    getBlogSecction,
    clearError: () => setError(null),
  }
}
