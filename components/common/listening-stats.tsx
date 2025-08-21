"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, BarChart3, Headphones } from "lucide-react"

const topGenres = [
  { name: "Indie Rock", percentage: 32, color: "bg-[#1DB954]", plays: "1,247" },
  { name: "Electronic", percentage: 28, color: "bg-purple-500", plays: "1,089" },
  { name: "Alternative", percentage: 22, color: "bg-blue-500", plays: "856" },
  { name: "Pop", percentage: 18, color: "bg-pink-500", plays: "702" },
]

const topArtists = [
  { name: "Tame Impala", plays: "47 plays", trend: "up", image: "🎵" },
  { name: "Flume", plays: "32 plays", trend: "up", image: "🎵" },
  { name: "ODESZA", plays: "28 plays", trend: "down", image: "🎵" },
  { name: "Glass Animals", plays: "24 plays", trend: "up", image: "🎵" },
]

export default function ListeningStats() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="bg-[#191414] border-[#282828]">
        <CardHeader className="pb-4 px-4 md:px-6">
          <CardTitle className="flex items-center gap-2 text-white text-lg">
            <BarChart3 className="h-5 w-5 text-[#1DB954]" />
            Top Genres
          </CardTitle>
          <CardDescription className="text-[#B3B3B3] text-sm">Your music taste this week</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 px-4 md:px-6">
          {topGenres.map((genre, index) => (
            <div key={genre.name} className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                  <span className="text-[#B3B3B3] text-sm w-4 flex-shrink-0">#{index + 1}</span>
                  <span className="text-white font-medium text-sm truncate">{genre.name}</span>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-[#B3B3B3] text-xs hidden sm:inline">{genre.plays}</span>
                  <span className="text-[#B3B3B3] text-sm">{genre.percentage}%</span>
                </div>
              </div>
              <div className="w-full bg-[#282828] rounded-full h-2">
                <div className={`h-2 rounded-full ${genre.color}`} style={{ width: `${genre.percentage}%` }} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-[#191414] border-[#282828]">
        <CardHeader className="pb-4 px-4 md:px-6">
          <CardTitle className="flex items-center gap-2 text-white text-lg">
            <Headphones className="h-5 w-5 text-[#1DB954]" />
            Top Artists
          </CardTitle>
          <CardDescription className="text-[#B3B3B3] text-sm">Most played this week</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 px-4 md:px-6">
          {topArtists.map((artist, index) => (
            <div
              key={`${artist.name}-${index}`}
              className="flex items-center justify-between p-3 rounded-lg bg-[#282828] hover:bg-[#3E3E3E] transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-[#3E3E3E] rounded-full flex items-center justify-center text-sm md:text-lg flex-shrink-0">
                  {artist.image}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-white text-sm truncate">{artist.name}</p>
                  <p className="text-xs text-[#B3B3B3]">{artist.plays}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Badge
                  variant="outline"
                  className={`text-xs border-none ${
                    artist.trend === "up" ? "bg-[#1DB954]/20 text-[#1DB954]" : "bg-red-500/20 text-red-400"
                  }`}
                >
                  #{index + 1}
                </Badge>
                <TrendingUp
                  className={`h-4 w-4 ${artist.trend === "up" ? "text-[#1DB954]" : "text-red-400 rotate-180"}`}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
