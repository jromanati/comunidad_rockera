import { apiClient, type ApiResponse } from "@/lib/api"
import { AuthService } from "@/services/auth.service"
import { Blog } from "@/types/blogs"

export interface ProductFilters {
  category?: string
  brand?: string
  model?: string
  minPrice?: number
  maxPrice?: number
  inStock?: boolean
  sortBy?: string
}

export class BlogService {
  // Obtener todos los productos con filtros
  static async getBlogs(filters: ProductFilters = {}, page = 1, limit = 20): Promise<ApiResponse<Blog>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...Object.entries(filters).reduce(
        (acc, [key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            acc[key] = value.toString()
          }
          return acc
        },
        {} as Record<string, string>,
      ),
    })
    return apiClient.get<Blog>(`blogs`)
  }

  // Obtener producto por ID
  static async getBlogSecction(id: number): Promise<ApiResponse<Blog>> {
    return apiClient.get<Blog>(`blog/${id}/sections/`)
    // return apiClient.get(`payments/prueba/`)
  }

  // Verificar stock de un producto
  static async checkStock(
    productId: number,
    quantity = 1,
  ): Promise<ApiResponse<{ available: boolean; stock: number }>> {
    return apiClient.get<{ available: boolean; stock: number }>(`/products/${productId}/stock?quantity=${quantity}`)
  }

  static async ensureAuthenticated(): Promise<boolean> {
    const token = await AuthService.getValidToken()
    return token !== null
  }
}
