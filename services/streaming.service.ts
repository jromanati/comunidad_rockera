import { apiClient, type ApiResponse } from "@/lib/api"
import { AuthService } from "@/services/auth.service"

export interface ScheduledStream {
  id: string
  title: string
  description: string
  scheduled_date: Date
  duration: number
  status: "scheduled" | "live" | "completed" | "cancelled"
  viewers?: number
  stream_url?: string
  url?: string
  public_id?: string
  main_image: File
}

export interface PastStream {
  id: string
  title: string
  description: string
  date: Date
  duration: number
  viewers: number
  sales: number
  stream_url: string
  recordingUrl?: string
  isActive: boolean
  imageUrl?: string
}

export interface ProductFilters {
  category?: string
  brand?: string
  model?: string
  minPrice?: number
  maxPrice?: number
  inStock?: boolean
  sortBy?: string
}

export class StreamingService {
  // Obtener todos los productos con filtros
  static async getStreamings(filters: ProductFilters = {}, page = 1, limit = 20): Promise<ApiResponse<ScheduledStream>> {
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
    return apiClient.get<ScheduledStream>(`stream_config`)
  }

  static async ensureAuthenticated(): Promise<boolean> {
    const token = await AuthService.getValidToken()
    return token !== null
  }
}
