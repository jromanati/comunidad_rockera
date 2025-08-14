"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Users,
  Eye,
  MessageCircle,
  Heart,
  Share2,
  Tv,
  Radio,
  Calendar,
  Clock,
  Flame,
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function ComunidadMetalTV() {
  // 
  const [isLive, setIsLive] = useState(true)
  const [videoId, setVideoId] = useState<string | null>(null)
  const [viewers, setViewers] = useState(1247)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [volume, setVolume] = useState(75)
  const [isMuted, setIsMuted] = useState(false)
  const [chatMessages, setChatMessages] = useState([
    { user: "MetalHead666", message: "¡Brutal esta transmisión! 🤘", time: "21:45" },
    { user: "ChileanMetal", message: "Saludos desde Santiago", time: "21:46" },
    { user: "ThrashLover", message: "¿Cuándo tocan Pentagram?", time: "21:47" },
    { user: "MetalQueen", message: "La mejor radio de Chile 🔥", time: "21:48" },
  ])
  const API_KEY = "AIzaSyCXJRm3kM2wg_NazUf2fcFGNhXimSOlrUc"
  const CHANNEL_ID = "UCS1sW2a3JbvQxscSYPVvBug"
  // const checkYouTubeLive = async (): Promise<boolean> => {
  //   const res = await fetch(
  //     `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&type=video&eventType=live&key=${API_KEY}`
  //   )

  //   const data = await res.json()
  //   return data.items && data.items.length > 0
  // }
  
  // useEffect(() => {
  //   const fetchLiveStatus = async () => {
  //     const online = await checkYouTubeLive()
  //     setIsLive(online)
  //   }

  //   fetchLiveStatus()
  //   const interval = setInterval(fetchLiveStatus, 30000) // cada 30 seg
  //   return () => clearInterval(interval)
  // }, [])

  useEffect(() => {
    const fetchLiveVideoId = async () => {
      try {
        // const res = await fetch(
        //   `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=TU_CHANNEL_ID&type=video&eventType=live&key=TU_API_KEY`
        // )
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&type=video&eventType=live&key=${API_KEY}`
        )
        const data = await res.json()
        if (data.items && data.items.length > 0) {
          const id = data.items[0].id.videoId
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

  const upcomingShows = [
    { time: "22:00", show: "Metal Chileno en Vivo", band: "Pentagram Chile" },
    { time: "23:30", show: "Entrevista Exclusiva", band: "Criminal" },
    { time: "00:00", show: "Concierto Completo", band: "Dorsal Atlántica" },
    { time: "01:30", show: "Metal Internacional", band: "Metallica Tributo" },
  ]

  useEffect(() => {
    // Simular cambio de viewers
    const interval = setInterval(() => {
      setViewers((prev) => prev + Math.floor(Math.random() * 10) - 5)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
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
            Transmisión en vivo 24/7 - La mejor música metal de Chile y el mundo
          </p>
          <div className="flex items-center justify-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-red-400 font-bold">EN VIVO</span>
            </div>
            <div className="flex items-center space-x-2">
              <Eye className="w-5 h-5 text-gray-400" />
              <span className="text-gray-300">{viewers.toLocaleString()} espectadores</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-gray-400" />
              <span className="text-gray-300">Comunidad activa</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Video Player */}
          <div className="lg:col-span-3">
            <Card className="bg-gradient-to-br from-gray-900 to-black border-2 border-red-800 overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-bold text-red-500 flex items-center">
                    <Radio className="w-6 h-6 mr-2" />
                    Transmisión Principal
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-red-600 text-white animate-pulse">LIVE</Badge>
                    <Badge variant="outline" className="border-red-600 text-red-400">
                      HD
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className={`relative ${isFullscreen ? "fixed inset-0 z-50 bg-black" : "aspect-video"}`}>
                   {isLive ? (
                      <iframe
                        src="https://www.youtube.com/embed/live_stream?channel=UCS1sW2a3JbvQxscSYPVvBug&autoplay=1"
                        width="100%"
                        height="600"
                        allowFullScreen
                        className="w-full h-full border-0"
                        title="Comunidad Metal TV"
                      />
                    ) : (
                      <div className="h-[600px] flex items-center justify-center bg-black text-red-500">
                        <p>No hay transmisión en vivo en este momento.</p>
                      </div>
                    )}

                </div>
              </CardContent>
            </Card>

            {/* Program Info */}
            <Card className="mt-6 bg-gradient-to-r from-red-950/30 to-transparent border border-red-800/50">
              <CardHeader>
                <CardTitle className="text-xl text-red-500 flex items-center">
                  <Flame className="w-5 h-5 mr-2" />
                  Ahora en Vivo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Metal Chileno Showcase</h3>
                    <p className="text-gray-400 mb-4">
                      Especial dedicado a las mejores bandas de metal chileno. Presentando entrevistas exclusivas,
                      conciertos en vivo y la historia del metal nacional.
                    </p>
                  </div>

                  <Separator className="bg-red-800/50" />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-500">21:30</div>
                      <div className="text-sm text-gray-400">Hora actual</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-500">45min</div>
                      <div className="text-sm text-gray-400">Tiempo restante</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-500">HD</div>
                      <div className="text-sm text-gray-400">Calidad</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Chat */}
            <Card className="bg-gradient-to-br from-gray-900 to-black border border-red-800/50">
              <CardHeader>
                <CardTitle className="text-lg text-red-500 flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Chat en Vivo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 rounded-lg p-2 shadow-inner border border-red-800">
                  {isLive && videoId ? (
                    <iframe
                      src={`https://www.youtube.com/live_chat?v=${videoId}&embed_domain=https://maqueta-comunidad-rockera.vercel.app`}
                      width="100%"
                      height="400"
                      className="w-full h-[400px] border-none rounded-md"
                      title="Chat en Vivo"
                  />
                  ) : (
                    <div className="text-center text-red-500 py-4">El chat aparecerá cuando inicie la transmisión.</div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Shows */}
            <Card className="bg-gradient-to-br from-gray-900 to-black border border-red-800/50">
              <CardHeader>
                <CardTitle className="text-lg text-red-500 flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Próximos Programas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingShows.map((show, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 rounded-lg bg-red-950/20 border border-red-800/30"
                    >
                      <div className="text-center">
                        <Clock className="w-4 h-4 text-red-400 mx-auto mb-1" />
                        <div className="text-sm font-bold text-red-400">{show.time}</div>
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-white text-sm">{show.show}</div>
                        <div className="text-xs text-gray-400">{show.band}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card className="bg-gradient-to-br from-gray-900 to-black border border-red-800/50">
              <CardHeader>
                <CardTitle className="text-lg text-red-500">Estadísticas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Espectadores</span>
                    <span className="font-bold text-white">{viewers.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Tiempo al aire</span>
                    <span className="font-bold text-green-400">24/7</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Calidad</span>
                    <Badge className="bg-green-600">HD 1080p</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Estado</span>
                    <Badge className="bg-red-600 animate-pulse">EN VIVO</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <Card className="mt-12 bg-gradient-to-r from-red-950/50 via-black to-red-950/50 border-2 border-red-800">
          <CardContent className="text-center py-12">
            <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500 mb-4">
              ¡Únete a la Comunidad Metal!
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Disfruta de transmisiones en vivo, entrevistas exclusivas y la mejor música metal las 24 horas
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 px-8 text-lg">
                <Radio className="w-5 h-5 mr-2" />
                Escuchar Radio
              </Button>
              <Button
                variant="outline"
                className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white font-bold py-3 px-8 text-lg bg-transparent"
              >
                <Users className="w-5 h-5 mr-2" />
                Únete al Chat
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
