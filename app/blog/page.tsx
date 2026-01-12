"use client"

import { useCallback, useMemo } from "react"
import useSWR from "swr"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight, Flame, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useBlog } from "@/hooks/use-blogs"
import type { Blog as BlogResponse } from "@/types/blogs"

type ApiSection = {
  id: number
  blog: number
  titulo: string
  detalle: string
  image_public_id?: string | null
  image_url?: string | null
}

type ApiBlog = {
  id: number
  titulo: string
  descripcion: string
  autor?: string | null
  fecha?: string | null
  tipo_blog?: string | null
  image_public_id?: string | null
  image_url?: string | null
  sections?: ApiSection[]
  // campos “extras” que a veces vienen en tu API (los ignoro si no existen)
  image?: string
  features?: any[]
  in_stock?: boolean
}

type UiBlogPost = {
  id: number
  slug: string
  title: string
  excerpt: string
  coverImage: string
  dateLabel: string
  readTimeLabel: string
  categoryLabel: string
  authorLabel: string
  featured: boolean
}

export default function BlogPage() {
  const { getBlogs } = useBlog()
  const PLACEHOLDER = "/placeholder.svg?height=300&width=300"

  const slugify = (text: string) =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")

  const formatDateLabel = (iso?: string | null) => {
    if (!iso) return "—"
    const d = new Date(iso)
    if (Number.isNaN(d.getTime())) return "—"
    return d.toLocaleDateString("es-CL", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }

  const estimateReadTime = (text: string) => {
    // ~200 palabras/min
    const words = text.trim().split(/\s+/).filter(Boolean).length
    const minutes = Math.max(1, Math.ceil(words / 200))
    return `${minutes} min`
  }

  const normalizeTipoBlog = (tipo?: string | null) => {
    const t = (tipo || "").toLowerCase().trim()
    if (!t) return "General"
    // capitalizar básico
    return t.charAt(0).toUpperCase() + t.slice(1)
  }

  const mapApiToUi = (blogs: ApiBlog[]): UiBlogPost[] => {
    // 1️⃣ Ordenar por fecha DESC (más reciente primero)
    const sorted = [...(blogs || [])].sort((a, b) => {
      const ta = a?.fecha ? new Date(a.fecha).getTime() : 0
      const tb = b?.fecha ? new Date(b.fecha).getTime() : 0
      return tb - ta
    })

    // 2️⃣ Verificar si existe algún blog destacado desde backend
    const hasFeaturedFromBackend = sorted.some((b) => b?.destacado === true)

    return sorted.map((b, idx) => {
      const title = b?.titulo ?? "Sin título"
      const excerpt = b?.descripcion ?? ""
      const coverImage = b?.image_url || b?.image || PLACEHOLDER
      const dateLabel = formatDateLabel(b?.fecha)
      const categoryLabel = normalizeTipoBlog(b?.tipo_blog)
      const authorLabel = b?.autor?.trim() || "Comunidad Metal"

      const extraText =
        (b?.sections || [])
          .map((s) => `${s?.titulo ?? ""} ${s?.detalle ?? ""}`.trim())
          .filter(Boolean)
          .join(" ") || ""

      const readTimeLabel = estimateReadTime(`${title} ${excerpt} ${extraText}`)

      // 🔥 LÓGICA FINAL DE FEATURED
      const featured = hasFeaturedFromBackend
        ? b?.destacado === true       // usa el backend
        : idx === 0                  // fallback: el más reciente

      return {
        id: b.id,
        slug: `${slugify(title)}-${b.id}`,
        title,
        excerpt,
        coverImage,
        dateLabel,
        readTimeLabel,
        categoryLabel,
        authorLabel,
        featured,
      }
    })
  }

  const fetchBlogs = useCallback(async (): Promise<BlogResponse> => {
    const resp = await getBlogs()

    // compatibilidad: tu hook podría devolver { data: [...] } o directamente [...]
    const rawBlogs: ApiBlog[] = (resp?.data ?? resp ?? []) as ApiBlog[]

    return {
      blogs: rawBlogs,
    } as BlogResponse
  }, [getBlogs])

  const { data, isLoading, error } = useSWR(getBlogs ? "blogs" : null, fetchBlogs, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
    onSuccess: (d) => console.log("SWR onSuccess blogs:", d),
    onError: (e) => console.error("SWR onError blogs:", e),
  })

  const blogPosts: UiBlogPost[] = useMemo(() => {
    const apiBlogs = (data?.blogs ?? []) as ApiBlog[]
    return mapApiToUi(apiBlogs)
  }, [data])

  const featuredPost = blogPosts.find((p) => p.featured)
  const otherPosts = blogPosts.filter((p) => !p.featured)

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-red-950/20 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.1),transparent_50%)]" />
      </div>

      {/* Main Content */}
      <main className="relative z-10 pt-24 pb-32">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-500 to-red-600">
                BLOG METAL
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-gray-300 font-bold max-w-3xl mx-auto">
              Noticias, entrevistas, reseñas y todo sobre la escena metalera chilena
            </p>
          </div>

          {/* Estados (loading / error / vacío) */}
          {isLoading && (
            <div className="text-center text-gray-400 py-10">Cargando blogs...</div>
          )}

          {!isLoading && error && (
            <div className="text-center text-red-400 py-10">
              Ocurrió un error al cargar los blogs.
            </div>
          )}

          {!isLoading && !error && blogPosts.length === 0 && (
            <div className="text-center text-gray-400 py-10">No hay publicaciones aún.</div>
          )}

          {/* Featured Post */}
          {featuredPost && (
            <div className="mb-20">
              <Link href={`/blog/${featuredPost.id}`}>
                <Card className="bg-gradient-to-br from-gray-900 to-black border-2 border-red-600 hover:border-red-400 transition-all duration-500 overflow-hidden group cursor-pointer">
                  <div className="grid md:grid-cols-2 gap-0">
                    {/* Image */}
                    <div className="relative h-80 md:h-auto overflow-hidden">
                      <Image
                        src={featuredPost.coverImage || PLACEHOLDER}
                        alt={featuredPost.title}
                        width={800}
                        height={600}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                      <Badge className="absolute top-6 left-6 bg-red-600 text-white font-bold text-lg px-4 py-2">
                        DESTACADO
                      </Badge>
                    </div>

                    {/* Content */}
                    <CardContent className="p-8 md:p-12 flex flex-col justify-center">
                      <Badge className="w-fit bg-red-950 text-red-400 border border-red-600 mb-4">
                        {featuredPost.categoryLabel}
                      </Badge>
                      <h2 className="text-3xl md:text-4xl font-black mb-4 text-white group-hover:text-red-400 transition-colors">
                        {featuredPost.title}
                      </h2>
                      <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                        {featuredPost.excerpt}
                      </p>
                      <div className="flex items-center space-x-6 mb-6 text-gray-500">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">{featuredPost.dateLabel}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">{featuredPost.readTimeLabel} de lectura</span>
                        </div>
                      </div>
                      <Button className="w-fit bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold group-hover:shadow-lg group-hover:shadow-red-500/50">
                        Leer Artículo
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                      </Button>
                    </CardContent>
                  </div>
                </Card>
              </Link>
            </div>
          )}

          {/* Other Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`}>
                <Card className="bg-gradient-to-br from-gray-900 to-black border-2 border-red-800 hover:border-red-500 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25 group h-full cursor-pointer">
                  <CardContent className="p-0">
                    {/* Image */}
                    <div className="relative overflow-hidden">
                      <Image
                        src={post.coverImage || PLACEHOLDER}
                        alt={post.title}
                        width={800}
                        height={600}
                        className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                      <Badge className="absolute top-4 left-4 bg-red-950 text-red-400 border border-red-600">
                        {post.categoryLabel}
                      </Badge>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-black mb-3 text-white group-hover:text-red-400 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-400 mb-4 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>{post.dateLabel}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <span>{post.readTimeLabel}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-gray-500">
                          <User className="w-4 h-4" />
                          <span className="text-sm">{post.authorLabel}</span>
                        </div>
                        <ArrowRight className="w-5 h-5 text-red-500 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
    </div>
  )
}
