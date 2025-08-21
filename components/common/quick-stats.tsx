import { Card, CardContent } from "@/components/ui/card"
import { Music, Heart, Zap, TrendingUp } from "lucide-react"

const stats = [
  {
    label: "Generated",
    value: "3",
    change: "+2 today",
    icon: Music,
    color: "#1DB954",
  },
  {
    label: "Rules",
    value: "8",
    change: "Active",
    icon: Zap,
    color: "#1DB954",
  },
  {
    label: "Analyzed",
    value: "1.2K",
    change: "This week",
    icon: TrendingUp,
    color: "#1DB954",
  },
  {
    label: "Match",
    value: "94%",
    change: "+5% week",
    icon: Heart,
    color: "#1DB954",
  },
]

export default function QuickStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon
        return (
          <Card key={index} className="bg-[#191414] border-[#282828]">
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="mb-2 md:mb-0">
                  <p className="text-[#B3B3B3] text-xs md:text-sm font-medium">{stat.label}</p>
                  <p className="text-2xl md:text-3xl font-bold text-white">{stat.value}</p>
                  <p className="text-[#1DB954] text-xs">{stat.change}</p>
                </div>
                <div className="w-8 h-8 md:w-12 md:h-12 bg-[#1DB954]/20 rounded-full flex items-center justify-center self-end md:self-auto">
                  <IconComponent className="h-4 w-4 md:h-6 md:w-6 text-[#1DB954]" />
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
