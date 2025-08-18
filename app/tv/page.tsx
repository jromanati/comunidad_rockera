"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Eye,
  MessageCircle,
  Tv,
  Radio,
  Calendar,
  Clock,
  Flame,
  Play,
  ExternalLink,
  Youtube,
  ArrowLeft,
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

interface Video {
  id: string
  title: string
  thumbnail: string
  publishedAt: string
  duration: string
  viewCount: string
  description: string
}

interface UpcomingShow {
  time: string
  show: string
  band: string
  date: string
  description: string
}

export default function ComunidadMetalTV() {
  const [isLive, setIsLive] = useState(false)
  const [videoId, setVideoId] = useState<string | null>(null)
  const [viewers, setViewers] = useState(1247)
  const [previousVideos, setPreviousVideos] = useState<Video[]>([])
  const [upcomingShows, setUpcomingShows] = useState<UpcomingShow[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [currentView, setCurrentView] = useState<"live" | "previous">("live")

  // ID del streaming en vivo - cuando tenga valor, mostrará el chat
  // const id_streaming_live = null // Aquí irá el ID cuando haya transmisión en vivo
  const id_streaming_live = 'AtkyJ92pxxo'
  const CHANNEL_ID = "UCS1sW2a3JbvQxscSYPVvBug"
  const API_KEY = "AIzaSyCXJRm3kM2wg_NazUf2fcFGNhXimSOlrUc"
  /* 
    useEffect(() => {
      const fetchLiveVideoId = async () => {
        try {
          const res = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&type=video&eventType=live&key=${API_KEY}`
          )
          const data = await res.json()
          if (data.items && data.items.length > 0) {
            const id = 'kXgOoBQlPow'
            setVideoId(id)
            setIsLive(true)
          } else {
            setIsLive(false)
          }
        } catch (error) {
          console.error("Error fetching YouTube live stream", error)
          setIsLive(false)
        }
      }

      fetchLiveVideoId()
    }, [])
  */
  useEffect(() => {
    const fetchChannelData = async () => {
      try {
        setLoading(true)

        // Simular datos de videos anteriores
        const mockPreviousVideos: Video[] = [
          {
            id: "kXgOoBQlPow",
            title: "Metal Chileno Showcase - Pentagram Chile en Vivo",
            thumbnail: "/placeholder.svg?height=180&width=320&text=Pentagram+Chile",
            publishedAt: "2024-01-15",
            duration: "1:45:30",
            viewCount: "15,420",
            description:
              "Especial dedicado a Pentagram Chile, pioneros del metal chileno. Incluye entrevista exclusiva con los miembros originales y presentación de sus clásicos más emblemáticos.",
          },
          {
            id: "pu3uH3IEAa4",
            title: "Entrevista Exclusiva - Criminal Band",
            thumbnail: "/placeholder.svg?height=180&width=320&text=Criminal+Interview",
            publishedAt: "2024-01-12",
            duration: "45:20",
            viewCount: "8,750",
            description:
              "Conversación íntima con Criminal, una de las bandas más influyentes del thrash metal chileno. Hablan sobre su trayectoria internacional y nuevos proyectos.",
          },
        ]

        // Simular próximas transmisiones
        const mockUpcomingShows: UpcomingShow[] = [
          {
            time: "20:00",
            show: "Metal Chileno en Vivo",
            band: "Necrosis",
            date: "2024-01-20",
            description: "Especial dedicado a la banda pionera del death metal chileno",
          },
          {
            time: "21:30",
            show: "Entrevista Exclusiva",
            band: "Atomic Aggressor",
            date: "2024-01-22",
            description: "Conversamos con los veteranos del thrash metal nacional",
          },
          {
            time: "19:00",
            show: "Concierto Completo",
            band: "Mar de Grises",
            date: "2024-01-25",
            description: "Presentación completa de su último álbum",
          },
          {
            time: "22:00",
            show: "Metal Internacional",
            band: "Tributo a Iron Maiden",
            date: "2024-01-27",
            description: "Las mejores bandas tributo de Chile",
          },
        ]

        setPreviousVideos(mockPreviousVideos)
        setUpcomingShows(mockUpcomingShows)

        // Verificar si hay transmisión en vivo
        if (id_streaming_live) {
          setVideoId(id_streaming_live)
          setIsLive(true)
          setCurrentView("live")
        } else {
          setIsLive(false)
          setVideoId(null)
          setCurrentView("previous")
        }
      } catch (error) {
        console.error("Error fetching channel data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchChannelData()
  }, [id_streaming_live])

  useEffect(() => {
    // Simular cambio de viewers solo si hay transmisión en vivo
    if (isLive) {
      const interval = setInterval(() => {
        setViewers((prev) => prev + Math.floor(Math.random() * 10) - 5)
      }, 5000)

      return () => clearInterval(interval)
    }
  }, [isLive])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-CL", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatViewCount = (count: string) => {
    return count.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }

  const handleVideoSelect = (video: Video) => {
    setSelectedVideo(video)
    setCurrentView("previous")
  }

  const handleBackToLive = () => {
    setSelectedVideo(null)
    setCurrentView("live")
  }

  const getCurrentVideoId = () => {
    if (currentView === "live" && id_streaming_live) {
      return id_streaming_live
    }
    if (currentView === "previous" && selectedVideo) {
      return selectedVideo.id
    }
    return null
  }

  const getCurrentVideoTitle = () => {
    if (currentView === "live" && isLive) {
      return "Transmisión en Vivo"
    }
    if (currentView === "previous" && selectedVideo) {
      return selectedVideo.title
    }
    return "Canal de YouTube"
  }

  const getCurrentVideoDescription = () => {
    if (currentView === "live" && isLive) {
      return "Especial dedicado a las mejores bandas de metal chileno. Presentando entrevistas exclusivas, conciertos en vivo y la historia del metal nacional."
    }
    if (currentView === "previous" && selectedVideo) {
      return selectedVideo.description
    }
    return ""
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500 mx-auto"></div>
            <p className="text-white mt-4">Cargando Comunidad Metal TV...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Tv className="w-12 h-12 text-red-500 mr-4" />
            <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-500 to-red-500">
              COMUNIDAD METAL TV
            </h1>
          </div>
          <p className="text-xl text-gray-300 mb-6">
            Canal oficial de YouTube - La mejor música metal de Chile y el mundo
          </p>

          {/* Estado de transmisión */}
          <div className="flex items-center justify-center space-x-6 mb-8">
            {isLive ? (
              <>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-red-400 font-bold">EN VIVO AHORA</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Eye className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-300">{viewers.toLocaleString()} espectadores</span>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                <span className="text-gray-400 font-bold">SIN TRANSMISIÓN EN VIVO</span>
              </div>
            )}
            <div className="flex items-center space-x-2">
              <Youtube className="w-5 h-5 text-red-500" />
              <span className="text-gray-300">Canal Oficial</span>
            </div>
          </div>

          {/* Navegación entre vistas */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            {isLive && (
              <Button
                variant={currentView === "live" ? "default" : "outline"}
                className={
                  currentView === "live"
                    ? "bg-red-600 hover:bg-red-700"
                    : "border-red-600 text-red-400 hover:bg-red-600 hover:text-white bg-transparent"
                }
                onClick={() => setCurrentView("live")}
              >
                <Radio className="w-4 h-4 mr-2" />
                En Vivo
              </Button>
            )}
            <Button
              variant={currentView === "previous" ? "default" : "outline"}
              className={
                currentView === "previous"
                  ? "bg-red-600 hover:bg-red-700"
                  : "border-red-600 text-red-400 hover:bg-red-600 hover:text-white bg-transparent"
              }
              onClick={() => setCurrentView("previous")}
            >
              <Play className="w-4 h-4 mr-2" />
              Transmisiones Anteriores
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Video Player */}
          <div className={`${currentView === "live" && id_streaming_live ? "lg:col-span-3" : "lg:col-span-4"}`}>
            <Card className="bg-gradient-to-br from-gray-900 to-black border-2 border-red-800 overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <CardTitle className="text-2xl font-bold text-red-500 flex items-center">
                      <Radio className="w-6 h-6 mr-2" />
                      {getCurrentVideoTitle()}
                    </CardTitle>
                    {selectedVideo && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-red-400"
                        onClick={handleBackToLive}
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Volver
                      </Button>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    {currentView === "live" && isLive && (
                      <>
                        <Badge className="bg-red-600 text-white animate-pulse">LIVE</Badge>
                        <Badge variant="outline" className="border-red-600 text-red-400">
                          HD
                        </Badge>
                      </>
                    )}
                    {selectedVideo && (
                      <div className="flex items-center space-x-2 text-sm text-gray-400">
                        <span>{formatDate(selectedVideo.publishedAt)}</span>
                        <span>•</span>
                        <span>{formatViewCount(selectedVideo.viewCount)} vistas</span>
                        <span>•</span>
                        <span>{selectedVideo.duration}</span>
                      </div>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white bg-transparent"
                      onClick={() => {
                        const videoId = getCurrentVideoId()
                        if (videoId) {
                          window.open(`https://youtube.com/watch?v=${videoId}`, "_blank")
                        } else {
                          window.open(`https://youtube.com/channel/${CHANNEL_ID}`, "_blank")
                        }
                      }}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Ver en YouTube
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="aspect-video">
                  {getCurrentVideoId() ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${getCurrentVideoId()}?autoplay=1&mute=0`}
                      width="100%"
                      height="100%"
                      className="w-full h-full border-0"
                      allowFullScreen
                      title={getCurrentVideoTitle()}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                      <div className="text-center">
                        <Youtube className="w-24 h-24 text-red-500 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-white mb-2">No hay transmisión en vivo</h3>
                        <p className="text-gray-400 mb-6">
                          Revisa nuestras transmisiones anteriores o próximos programas
                        </p>
                        <Button
                          variant="outline"
                          className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white bg-transparent"
                          onClick={() => window.open(`https://youtube.com/channel/${CHANNEL_ID}`, "_blank")}
                        >
                          <Youtube className="w-4 h-4 mr-2" />
                          Visitar Canal de YouTube
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Video Info */}
            {getCurrentVideoDescription() && (
              <Card className="mt-6 bg-gradient-to-r from-red-950/30 to-transparent border border-red-800/50">
                <CardHeader>
                  <CardTitle className="text-xl text-red-500 flex items-center">
                    <Flame className="w-5 h-5 mr-2" />
                    {currentView === "live" ? "Ahora en Vivo" : "Descripción"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {selectedVideo ? selectedVideo.title : "Metal Chileno Showcase"}
                      </h3>
                      <p className="text-gray-400 mb-4">{getCurrentVideoDescription()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Chat - Solo mostrar si hay transmisión en vivo y estamos en vista live */}
          {currentView === "live" && id_streaming_live && (
            <div className="space-y-6">
              <Card className="bg-gradient-to-br from-gray-900 to-black border border-red-800/50">
                <CardHeader>
                  <CardTitle className="text-lg text-red-500 flex items-center">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Chat en Vivo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-900 rounded-lg p-2 shadow-inner border border-red-800">
                    <iframe
                      src={`https://www.youtube.com/live_chat?v=${id_streaming_live}&embed_domain=localhost`}
                      // src={`https://www.youtube.com/live_chat?v=${videoId}&embed_domain=maqueta-comunidad-rockera.vercel.app`}
                      width="100%"
                      height="400"
                      className="w-full h-[400px] border-none rounded-md"
                      title="Chat en Vivo"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Transmisiones Anteriores - Solo mostrar si estamos en vista previous */}
        {currentView === "previous" && (
          <div className="mt-12">
            <div className="flex items-center mb-6">
              <Play className="w-6 h-6 text-red-500 mr-3" />
              <h2 className="text-3xl font-bold text-white">Selecciona una Transmisión</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {previousVideos.map((video) => (
                <Card
                  key={video.id}
                  className={`bg-gradient-to-br from-gray-900 to-black border border-red-800/50 hover:border-red-600 transition-all duration-300 group cursor-pointer ${
                    selectedVideo?.id === video.id ? "border-red-500 ring-2 ring-red-500/50" : ""
                  }`}
                  onClick={() => handleVideoSelect(video)}
                >
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={video.thumbnail || "/placeholder.svg"}
                        alt={video.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-t-lg">
                        <Button size="lg" className="bg-red-600 hover:bg-red-700">
                          <Play className="w-6 h-6 mr-2" />
                          Ver Aquí
                        </Button>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                      {selectedVideo?.id === video.id && (
                        <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded flex items-center">
                          <Play className="w-3 h-3 mr-1" />
                          Reproduciendo
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-white text-sm mb-2 line-clamp-2">{video.title}</h3>
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span>{formatDate(video.publishedAt)}</span>
                        <span>{formatViewCount(video.viewCount)} vistas</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Próximas Transmisiones */}
        <div className="mt-12">
          <div className="flex items-center mb-6">
            <Calendar className="w-6 h-6 text-red-500 mr-3" />
            <h2 className="text-3xl font-bold text-white">Próximas Transmisiones</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingShows.map((show, index) => (
              <Card key={index} className="bg-gradient-to-r from-red-950/30 to-transparent border border-red-800/50">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="text-center bg-red-600 rounded-lg p-3 min-w-[80px]">
                      <Clock className="w-5 h-5 text-white mx-auto mb-1" />
                      <div className="text-sm font-bold text-white">{show.time}</div>
                      <div className="text-xs text-red-200">{formatDate(show.date)}</div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-white text-lg mb-1">{show.show}</h3>
                      <p className="text-red-400 font-semibold mb-2">{show.band}</p>
                      <p className="text-gray-400 text-sm">{show.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
