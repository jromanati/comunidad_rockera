"use client"

import React, { useCallback, useMemo } from "react"
import useSWR from "swr"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, User, ArrowLeft, Share2, Facebook, Twitter, MessageCircle, Flame } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useBlog } from "@/hooks/use-blogs"

type ApiSection = {
  id: number
  blog: number
  titulo: string
  detalle: string
  image_public_id?: string | null
  image_url?: string | null
}

type ApiBlogDetail = {
  id: number
  titulo: string
  descripcion: string
  autor: string
  fecha: string
  tipo_blog: string
  image_public_id?: string | null
  image_url?: string | null
  sections: ApiSection[]
}

type ContentBlock =
  | { type: "text"; content: string }
  | { type: "heading"; content: string }
  | { type: "image"; src: string; alt?: string }

export default function BlogDetailPage({
  params,
}: {
  // 👇 Next te está pasando params como Promise en tu versión
  params: Promise<{ id: string }>
}) {
  const { getBlogSecction } = useBlog()
  const PLACEHOLDER = "/placeholder.svg?height=600&width=1000"

  // ✅ unwrap del Promise con React.use()
  const resolvedParams = React.use(params)

  const blogId = useMemo(() => {
    const n = Number(resolvedParams?.id)
    return Number.isFinite(n) ? n : null
  }, [resolvedParams?.id])

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
    const words = text.trim().split(/\s+/).filter(Boolean).length
    const minutes = Math.max(1, Math.ceil(words / 200))
    return `${minutes} min`
  }

  const normalizeTipoBlog = (tipo?: string | null) => {
    const t = (tipo || "").toLowerCase().trim()
    if (!t) return "Blog"
    return t.charAt(0).toUpperCase() + t.slice(1)
  }

  const fetchBlogDetail = useCallback(async (): Promise<ApiBlogDetail | null> => {
    if (!blogId) return null
    const resp = await getBlogSecction(blogId)

    // Compat: a veces viene { data: {...} } o directo {...}
    const raw = (resp?.data ?? resp ?? null) as ApiBlogDetail | null
    return raw
  }, [getBlogSecction, blogId])

  const { data: post, isLoading, error } = useSWR(
    blogId ? `blog-detail-${blogId}` : null,
    fetchBlogDetail,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      onSuccess: (d) => console.log("SWR onSuccess blog detail:", d),
      onError: (e) => console.error("SWR onError blog detail:", e),
    }
  )

  const contentBlocks: ContentBlock[] = useMemo(() => {
    if (!post) return []

    const blocks: ContentBlock[] = []

    // Descripción como primer párrafo
    if (post.descripcion) {
      blocks.push({ type: "text", content: post.descripcion })
    }

    // Secciones del backend
    for (const s of post.sections ?? []) {
      if (s?.titulo) blocks.push({ type: "heading", content: s.titulo })
      if (s?.detalle) blocks.push({ type: "text", content: s.detalle })
      if (s?.image_url) blocks.push({ type: "image", src: s.image_url, alt: s.titulo || "Imagen de sección" })
    }

    return blocks
  }, [post])

  const readTime = useMemo(() => {
    if (!post) return "—"
    const sectionsText = (post.sections ?? [])
      .map((s) => `${s?.titulo ?? ""} ${s?.detalle ?? ""}`.trim())
      .filter(Boolean)
      .join(" ")
    return estimateReadTime(`${post.titulo ?? ""} ${post.descripcion ?? ""} ${sectionsText}`)
  }, [post])

  // Estados
  if (!blogId) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-4">ID inválido</h1>
          <Link href="/blog">
            <Button className="bg-red-600 hover:bg-red-700">Volver al Blog</Button>
          </Link>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-red-950/20 to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.1),transparent_50%)]" />
        </div>
        <main className="relative z-10 pt-24 pb-32">
          <div className="container mx-auto px-4 text-center text-gray-400 py-16">Cargando artículo...</div>
        </main>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-red-950/20 to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.1),transparent_50%)]" />
        </div>
        <main className="relative z-10 pt-24 pb-32">
          <div className="container mx-auto px-4 text-center text-red-400 py-16">
            Ocurrió un error al cargar el blog.
            <div className="mt-6">
              <Link href="/blog">
                <Button className="bg-red-600 hover:bg-red-700">Volver al Blog</Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-4">Blog no encontrado</h1>
          <Link href="/blog">
            <Button className="bg-red-600 hover:bg-red-700">Volver al Blog</Button>
          </Link>
        </div>
      </div>
    )
  }

  const heroImage = post.image_url || PLACEHOLDER
  const categoryLabel = normalizeTipoBlog(post.tipo_blog)
  const authorLabel = post.autor?.trim() || "Comunidad Metal"
  const dateLabel = formatDateLabel(post.fecha)

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-red-950/20 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.1),transparent_50%)]" />
      </div>
      {/* Header */}

      {/* Main Content */}
      <main className="relative z-10 pt-24 pb-32">
        {/* Back Button */}
        <div className="container mx-auto px-4 mb-8">
          <Link href="/blog">
            <Button variant="ghost" className="text-red-400 hover:text-red-300 hover:bg-red-950/30">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al Blog
            </Button>
          </Link>
        </div>

        {/* Hero Image */}
        <div className="container mx-auto px-4 mb-12">
          <div className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden border-2 border-red-800">
            <Image src={heroImage} alt={post.titulo} width={1200} height={800} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            <Badge className="absolute top-6 left-6 bg-red-600 text-white font-bold text-lg px-4 py-2">
              {categoryLabel}
            </Badge>
          </div>
        </div>

        {/* Article */}
        <article className="container mx-auto px-4 max-w-4xl">
          {/* Title & Meta */}
          <div className="mb-12">
            <div className="flex items-center space-x-4 mb-6">
              <Flame className="w-8 h-8 text-red-500 animate-pulse" />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-500 to-red-600 leading-tight">
                {post.titulo}
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-6">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-red-500" />
                <span className="font-bold">{authorLabel}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-red-500" />
                <span>{dateLabel}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-red-500" />
                <span>{readTime} de lectura</span>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 font-bold">Compartir:</span>
              <Button size="sm" variant="outline" className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white bg-transparent">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white bg-transparent">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white bg-transparent">
                <MessageCircle className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white bg-transparent">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            {contentBlocks.map((block, index) => {
              if (block.type === "text") {
                return (
                  <p key={index} className="text-gray-300 text-lg leading-relaxed mb-6">
                    {block.content}
                  </p>
                )
              }

              if (block.type === "heading") {
                return (
                  <h2
                    key={index}
                    className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500 mt-12 mb-6"
                  >
                    {block.content}
                  </h2>
                )
              }

              if (block.type === "image") {
                return (
                  <div key={index} className="my-10 rounded-2xl overflow-hidden border-2 border-red-800">
                    <Image
                      src={block.src || PLACEHOLDER}
                      alt={block.alt || "Imagen del artículo"}
                      width={1000}
                      height={600}
                      className="w-full h-auto"
                    />
                    {block.alt && <p className="text-center text-gray-500 text-sm mt-2 italic">{block.alt}</p>}
                  </div>
                )
              }

              return null
            })}
          </div>

          {/* Call to Action */}
          <Card className="bg-gradient-to-br from-red-950 to-black border-2 border-red-600 mt-16">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-black text-white mb-4">¿Te gustó este artículo?</h3>
              <p className="text-gray-400 mb-6">
                Únete a nuestra comunidad y mantente al día con las últimas noticias del metal chileno
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/blog">
                  <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold">
                    Ver Más Artículos
                  </Button>
                </Link>
                <Link href="/contacto">
                  <Button variant="outline" className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white bg-transparent">
                    Contáctanos
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </article>
      </main>

      {/* Footer */}
    </div>
  )
}
