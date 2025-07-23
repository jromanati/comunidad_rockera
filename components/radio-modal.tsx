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
  Music,
  Headphones,
  Waves,
  Zap,
  Heart,
  Share2,
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

  const playlist = [
    { title: "Iron Maiden - The Trooper", duration: "4:12", playing: true },
    { title: "Metallica - Master of Puppets", duration: "8:35", playing: false },
    { title: "Black Sabbath - Paranoid", duration: "2:48", playing: false },
    { title: "Pentagram (Chile) - Fatal Prediction", duration: "5:23", playing: false },
    { title: "Criminal - Walking Dead", duration: "3:45", playing: false },
    { title: "Dorsal Atlántica - Mundo Muerto", duration: "4:18", playing: false },
    { title: "Necrosis - Apocalipsis", duration: "6:12", playing: false },
    { title: "Atomic Aggressor - Bloody Ceremonial", duration: "4:55", playing: false },
  ]

  const radioUrl = "https://stream10.usastreams.com/9316/stream"

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume[0] / 100
    }
  }, [volume])

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(console.error)
        setCurrentSong("Radio FM TOP40 - En Vivo")
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
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume[0] / 100
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`bg-gradient-to-br from-gray-900 via-black to-gray-900 border-2 border-red-800 text-white ${
          isMinimized ? "max-w-sm" : "max-w-2xl"
        } transition-all duration-500`}
      >
        <audio ref={audioRef} src={radioUrl} preload="none" />

        <DialogHeader className="border-b border-red-800/50 pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500 flex items-center">
              <Radio className="w-8 h-8 text-red-500 mr-3 animate-pulse" />
              RADIO COMUNIDAD METAL
            </DialogTitle>
            <div className="flex items-center space-x-2">
              {/* <Button
                onClick={() => setIsMinimized(!isMinimized)}
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-red-400"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </Button> */}
            </div>
          </div>
        </DialogHeader>

        {!isMinimized && (
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
                <p className="text-gray-400">Radio FM TOP40 - Metal 24/7</p>
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

            {/* Playlist */}
            {/* <div className="bg-gradient-to-r from-red-950/30 to-transparent p-6 rounded-2xl border border-red-800/30">
              <h4 className="font-bold text-red-500 mb-4 flex items-center">
                <Music className="w-5 h-5 mr-2" />
                PLAYLIST ACTUAL
              </h4>
              <div className="max-h-48 overflow-y-auto space-y-2 custom-scrollbar">
                {playlist.map((song, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-lg transition-all duration-300 ${
                      song.playing
                        ? "bg-gradient-to-r from-red-600/30 to-transparent border border-red-500/50"
                        : "bg-gray-800/50 hover:bg-gray-700/50"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {song.playing ? (
                        <div className="flex space-x-1">
                          <div className="w-1 h-4 bg-red-500 animate-pulse"></div>
                          <div className="w-1 h-4 bg-red-500 animate-pulse delay-100"></div>
                          <div className="w-1 h-4 bg-red-500 animate-pulse delay-200"></div>
                        </div>
                      ) : (
                        <Music className="w-4 h-4 text-gray-500" />
                      )}
                      <span className={`text-sm ${song.playing ? "text-red-400 font-bold" : "text-gray-300"}`}>
                        {song.title}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">{song.duration}</span>
                  </div>
                ))}
              </div>
            </div> */}
          </div>
        )}

        {isMinimized && (
          <div className="flex items-center space-x-4 py-2">
            <Button
              onClick={togglePlay}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 w-12 h-12 rounded-full"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </Button>
            <div className="flex-1">
              <div className="text-sm font-bold text-white truncate">{currentSong}</div>
              <div className="text-xs text-gray-400">Radio FM TOP40</div>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-red-500 animate-pulse" />
              <span className="text-xs text-red-400">LIVE</span>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
