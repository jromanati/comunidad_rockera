import { apiClient, type ApiResponse } from "@/lib/api"
import { AuthService } from "@/services/auth.service"

export interface Category {
  id: number
  name: string,
  subcategories?: Category[]
}


export class CategoryService {
  // Obtener todos los productos con filtros
  static async getCategories(): Promise<ApiResponse<Category>> {
    const token = await AuthService.getValidToken()
    
    if (!token) {
      console.log('no existe')
      return {
        success: false,
        error: "No se pudo autenticar",
      }
    }

    // Asignar token al cliente
    //apiClient.setToken(token)

    return apiClient.get<Category>(`categories`)
  }
  static async ensureAuthenticated(): Promise<boolean> {
    const token = await AuthService.getValidToken()
    return token !== null
  }
}
