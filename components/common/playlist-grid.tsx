"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, MoreHorizontal, Clock, Music } from "lucide-react"
import Image from "next/image"

const mockPlaylists = [
  {
    id: "1",
    name: "Morning Energy",
    description: "Start your day with high-energy tracks",
    image: "/morning-music-playlist-cover.png",
    trackCount: 25,
    duration: "1h 23m",
    lastUpdated: "2 hours ago",
    rule: "High Energy + Morning",
    color: "from-orange-500 to-red-500",
  },
  {
    id: "2",
    name: "Deep Focus",
    description: "Instrumental beats for concentration",
    image: "/focus-instrumental-cover.png",
    trackCount: 42,
    duration: "2h 15m",
    lastUpdated: "1 day ago",
    rule: "Instrumental + Focus",
    color: "from-blue-500 to-purple-500",
  },
  {
    id: "3",
    name: "Chill Vibes",
    description: "Relaxed tracks for unwinding",
    image: "/chill-weekend-music-cover.png",
    trackCount: 33,
    duration: "1h 45m",
    lastUpdated: "3 days ago",
    rule: "Chill + Weekend",
    color: "from-green-500 to-teal-500",
  },
  {
    id: "4",
    name: "Workout Beast",
    description: "Pump up your workout sessions",
    image: "/workout-pump-music-cover.png",
    trackCount: 28,
    duration: "1h 12m",
    lastUpdated: "5 hours ago",
    rule: "High BPM + Energy",
    color: "from-red-500 to-pink-500",
  },
]

export default function PlaylistGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 md:gap-6">
      {mockPlaylists.map((playlist) => (
        <Card
          key={playlist.id}
          className="bg-[#282828] border-[#3E3E3E] hover:bg-[#3E3E3E] transition-colors group cursor-pointer"
        >
          <CardContent className="p-3 md:p-4">
            {/* Mobile: Vertical layout, Desktop: Horizontal layout */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              {/* Playlist Cover */}
              <div className="relative self-center sm:self-start">
                <div
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-gradient-to-br ${playlist.color} flex items-center justify-center`}
                >
                  <Image
                    src={playlist.image || "/placeholder.svg"}
                    alt={playlist.name}
                    width={80}
                    height={80}
                    className="rounded-lg object-cover"
                  />
                </div>
                <Button
                  size="icon"
                  className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                >
                  <Play className="h-3 w-3 sm:h-4 sm:w-4 fill-current" />
                </Button>
              </div>

              {/* Playlist Info */}
              <div className="flex-1 min-w-0 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2">
                  <div className="mb-2 sm:mb-0">
                    <h3 className="font-bold text-white truncate text-base sm:text-lg">{playlist.name}</h3>
                    <p className="text-[#B3B3B3] text-sm line-clamp-2 sm:line-clamp-1">{playlist.description}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-[#B3B3B3] hover:text-white hover:bg-[#3E3E3E] self-center sm:self-start"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>

                {/* Metadata */}
                <div className="flex items-center justify-center sm:justify-start gap-3 text-[#B3B3B3] text-sm mb-3">
                  <span className="flex items-center gap-1">
                    <Music className="h-3 w-3" />
                    {playlist.trackCount}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {playlist.duration}
                  </span>
                </div>

                {/* Rule Badge and Update Time */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <Badge
                    variant="secondary"
                    className="bg-[#1DB954]/20 text-[#1DB954] border-[#1DB954]/30 text-xs self-center sm:self-start"
                  >
                    {playlist.rule}
                  </Badge>
                  <span className="text-[#B3B3B3] text-xs">Updated {playlist.lastUpdated}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
