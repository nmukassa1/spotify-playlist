"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Music, Zap, TrendingUp, Plus } from "lucide-react"

const recentActivities = [
  {
    id: "1",
    type: "playlist_created",
    title: "Morning Energy",
    description: "Created with 25 tracks",
    time: "2h ago",
    icon: Plus,
    color: "text-[#1DB954]",
  },
  {
    id: "2",
    type: "rule_triggered",
    title: "Focus Mode activated",
    description: "Updated Deep Focus playlist",
    time: "4h ago",
    icon: Zap,
    color: "text-blue-400",
  },
  {
    id: "3",
    type: "discovery",
    title: "New song discovered",
    description: "Added to Chill Vibes",
    time: "6h ago",
    icon: TrendingUp,
    color: "text-purple-400",
  },
  {
    id: "4",
    type: "playlist_updated",
    title: "Workout Beast updated",
    description: "3 new tracks added",
    time: "1d ago",
    icon: Music,
    color: "text-orange-400",
  },
]

export default function RecentActivity() {
  return (
    <Card className="bg-[#191414] border-[#282828]">
      <CardHeader className="pb-4 px-4 md:px-6">
        <CardTitle className="flex items-center gap-2 text-white text-lg">
          <Clock className="h-5 w-5 text-[#1DB954]" />
          Recent Activity
        </CardTitle>
        <CardDescription className="text-[#B3B3B3] text-sm">Latest updates from your AI</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 px-4 md:px-6">
        {recentActivities.map((activity) => {
          const IconComponent = activity.icon
          return (
            <div
              key={activity.id}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#282828] transition-colors"
            >
              <div className="w-8 h-8 bg-[#282828] rounded-full flex items-center justify-center flex-shrink-0">
                <IconComponent className={`h-4 w-4 ${activity.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-white text-sm truncate">{activity.title}</p>
                <p className="text-[#B3B3B3] text-xs mt-1 line-clamp-2">{activity.description}</p>
                <p className="text-[#B3B3B3] text-xs mt-2">{activity.time}</p>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
