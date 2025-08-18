"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Plus, Settings, Clock, TrendingUp, Heart, Sun } from "lucide-react"

const activeRules = [
  {
    id: "1",
    name: "Morning Boost",
    description: "Energetic tracks for 6-10 AM",
    isActive: true,
    icon: Sun,
    color: "text-yellow-400",
    bgColor: "bg-yellow-400/20",
  },
  {
    id: "2",
    name: "Focus Mode",
    description: "Instrumental during work hours",
    isActive: true,
    icon: Clock,
    color: "text-blue-400",
    bgColor: "bg-blue-400/20",
  },
  {
    id: "3",
    name: "Discover Weekly",
    description: "New songs based on taste",
    isActive: false,
    icon: TrendingUp,
    color: "text-[#1DB954]",
    bgColor: "bg-[#1DB954]/20",
  },
  {
    id: "4",
    name: "Liked Songs Mix",
    description: "Mix of your favorite tracks",
    isActive: true,
    icon: Heart,
    color: "text-red-400",
    bgColor: "bg-red-400/20",
  },
]

export default function RulesPanel() {
  return (
    <div className="space-y-6">
      <Card className="bg-[#191414] border-[#282828]">
        <CardHeader className="pb-4 px-4 md:px-6">
          <CardTitle className="flex items-center gap-2 text-white text-lg">
            <Settings className="h-5 w-5" />
            Active Rules
          </CardTitle>
          <CardDescription className="text-[#B3B3B3] text-sm">Manage your playlist generation rules</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 px-4 md:px-6">
          {activeRules.map((rule) => {
            const IconComponent = rule.icon
            return (
              <div
                key={rule.id}
                className="flex items-center gap-3 p-3 rounded-lg bg-[#282828] hover:bg-[#3E3E3E] transition-colors"
              >
                <div className={`p-2 rounded-lg ${rule.bgColor} flex-shrink-0`}>
                  <IconComponent className={`h-4 w-4 ${rule.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-medium text-sm text-white truncate">{rule.name}</h4>
                    <Switch checked={rule.isActive} className="data-[state=checked]:bg-[#1DB954] flex-shrink-0" />
                  </div>
                  <p className="text-xs text-[#B3B3B3] mt-1 line-clamp-2">{rule.description}</p>
                </div>
              </div>
            )
          })}

          <Button
            variant="outline"
            className="w-full bg-transparent border-[#535353] text-[#B3B3B3] hover:text-white hover:bg-[#282828] hover:border-[#1DB954] h-12"
            size="sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create New Rule
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-[#191414] border-[#282828]">
        <CardHeader className="pb-4 px-4 md:px-6">
          <CardTitle className="text-white text-lg">Today&apos;s Stats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 px-4 md:px-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">247</div>
              <div className="text-xs text-[#B3B3B3]">Songs processed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">12</div>
              <div className="text-xs text-[#B3B3B3]">New discoveries</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">5</div>
              <div className="text-xs text-[#B3B3B3]">Playlists updated</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">18</div>
              <div className="text-xs text-[#B3B3B3]">Rules triggered</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
