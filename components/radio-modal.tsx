"use client"

import { useState, useRef, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Minimize2,
  Maximize2,
  Radio,
  Headphones,
  Waves,
  Heart,
  Share2,
  X,
} from "lucide-react"

interface RadioModalProps {
  isOpen: boolean
  onClose: () => void
}

export function RadioModal({ isOpen, onClose }: RadioModalProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState([50])
  const [isMuted, setIsMuted] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [currentSong, setCurrentSong] = useState("Cargando...")
  const audioRef = useRef<HTMLAudioElement>(null)

  const radioUrl = "https://sp001.servidoresph.com/8174/stream"

  // Persistir el estado del audio entre navegaciones
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume[0] / 100
      audioRef.current.muted = isMuted
    }
  }, [volume, isMuted])

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(console.error)
        setCurrentSong("Radio Comunidad Metal - En Vivo")
      } else {
        audioRef.current.pause()
        setCurrentSong("Radio Pausada")
      }
    }
  }, [isPlaying])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    if (audioRef.current) {
      const newMutedState = !isMuted
      audioRef.current.muted = newMutedState
      setIsMuted(newMutedState)
    }
  }

  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume[0] / 100
    }
  }

  const handleClose = () => {
    setIsPlaying(false)
    setIsMinimized(false)
    onClose()
  }

  const handleMinimize = () => {
    setIsMinimized(true)
  }

  const handleMaximize = () => {
    setIsMinimized(false)
  }

  // Modal minimizado flotante - SIEMPRE visible cuando está minimizado
  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-[9999] bg-gradient-to-br from-gray-900 via-black to-gray-900 border-2 border-red-800 rounded-lg p-4 shadow-2xl max-w-sm">
        <audio ref={audioRef} src={radioUrl} preload="none" />

        <div className="flex items-center space-x-3">
          <Button
            onClick={togglePlay}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 w-10 h-10 rounded-full flex-shrink-0"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </Button>

          <div className="flex-1 min-w-0">
            <div className="text-sm font-bold text-white truncate max-w-32">{currentSong}</div>

            {/* Mini visualizador */}
            <div className="flex items-center space-x-1 mt-1">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className={`w-0.5 bg-gradient-to-t from-red-600 to-yellow-500 rounded-full transition-all duration-300 ${
                    isPlaying ? "animate-pulse" : ""
                  }`}
                  style={{
                    height: isPlaying ? `${Math.random() * 12 + 4}px` : "2px",
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-1">
            <Button
              onClick={handleMaximize}
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-red-400 w-6 h-6 p-0"
            >
              <Maximize2 className="w-3 h-3" />
            </Button>
            <Button
              onClick={handleClose}
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-red-400 w-6 h-6 p-0"
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Modal completo - SIN onOpenChange para evitar cierre automático
  return (
    <Dialog open={isOpen && !isMinimized} onOpenChange={onClose}>
      <DialogContent
        className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border-2 border-red-800 text-white max-w-2xl"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <audio ref={audioRef} src={radioUrl} preload="none" />

        <DialogHeader className="border-b border-red-800/50 pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500 flex items-center">
              <Radio className="w-8 h-8 text-red-500 mr-3 animate-pulse" />
              RADIO COMUNIDAD METAL
            </DialogTitle>
            <div className="flex items-center space-x-2">
              <Button onClick={handleMinimize} variant="ghost" size="sm" title="minimizar" className="text-gray-400 hover:text-red-400">
                <Minimize2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Visualizer Effect */}
          <div className="relative bg-gradient-to-r from-red-950/50 to-black p-6 rounded-2xl border border-red-800/30 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-transparent"></div>

            {/* Animated Waves */}
            <div className="flex items-center justify-center space-x-1 mb-4">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className={`w-1 bg-gradient-to-t from-red-600 to-yellow-500 rounded-full transition-all duration-300 ${
                    isPlaying ? "animate-pulse" : ""
                  }`}
                  style={{
                    height: isPlaying ? `${Math.random() * 40 + 10}px` : "4px",
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>

            {/* Current Song Info */}
            <div className="text-center relative z-10">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Waves className="w-5 h-5 text-red-500" />
                <span className="text-red-400 font-bold">EN VIVO</span>
                <Waves className="w-5 h-5 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{currentSong}</h3>
              <p className="text-gray-400">Comunidad - Metal 24/7</p>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-gradient-to-r from-red-950/30 to-transparent p-6 rounded-2xl border border-red-800/30">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <Button
                  onClick={togglePlay}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 w-16 h-16 rounded-full transform hover:scale-110 transition-all duration-300 shadow-lg shadow-red-500/25"
                >
                  {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                </Button>

                <div className="flex items-center space-x-2">
                  <Button onClick={toggleMute} variant="ghost" className="text-gray-400 hover:text-red-400">
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </Button>
                  <div className="w-24">
                    <Slider value={volume} onValueChange={handleVolumeChange} max={100} step={1} className="w-full" />
                  </div>
                  <span className="text-sm text-gray-400 w-8">{volume[0]}%</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button variant="ghost" className="text-gray-400 hover:text-red-400">
                  <Heart className="w-5 h-5" />
                </Button>
                <Button variant="ghost" className="text-gray-400 hover:text-red-400">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center justify-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div
                  className={`w-2 h-2 rounded-full ${isPlaying ? "bg-green-500 animate-pulse" : "bg-gray-500"}`}
                ></div>
                <span className="text-gray-400">{isPlaying ? "Transmitiendo" : "Pausado"}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Headphones className="w-4 h-4 text-red-500" />
                <span className="text-gray-400">1,247 oyentes</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
