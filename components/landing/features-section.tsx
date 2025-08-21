import { Card } from "@/components/ui/card"
import { Zap, Clock, TrendingUp, Shuffle, Users, Star } from "lucide-react"

export default function FeaturesSection() {
  const features = [
    {
      icon: Zap,
      title: "Auto-Generation",
      description: "Playlists are automatically created and updated based on your listening patterns and custom rules.",
    },
    {
      icon: Clock,
      title: "Smart Scheduling",
      description: "Set time-based rules for different moods - morning energy, focus sessions, or evening chill.",
    },
    {
      icon: TrendingUp,
      title: "Trend Analysis",
      description: "Discover emerging artists and tracks that match your taste before they hit the mainstream.",
    },
    {
      icon: Shuffle,
      title: "Genre Mixing",
      description: "Intelligently blend genres and create unique combinations that expand your musical horizons.",
    },
    {
      icon: Users,
      title: "Social Integration",
      description: "Share your AI-generated playlists and discover what others are listening to in your network.",
    },
    {
      icon: Star,
      title: "Quality Control",
      description: "Rate songs to improve recommendations and fine-tune the AI to your exact preferences.",
    },
  ]

  return (
    <section id="features" className="py-16 bg-spotify-gray-darkest">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Intelligent Music Curation</h2>
          <p className="text-xl text-spotify-gray-light max-w-2xl mx-auto">
            Our AI analyzes your listening habits and creates playlists that perfectly match your mood and preferences.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-spotify-gray-dark border-spotify-gray p-6 hover:bg-spotify-gray transition-colors"
            >
              <div className="w-12 h-12 bg-spotify-green/10 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-spotify-green" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
              <p className="text-spotify-gray-light">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
