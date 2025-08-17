import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, ArrowRight } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"

export default async function HeroSection() {
  // Check if user is authenticated
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <Badge className="mb-6 bg-spotify-green/10 text-spotify-green border-spotify-green/20">
          AI-Powered Music Discovery
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Your Perfect Playlist,
          <br />
          <span className="text-spotify-green">Generated Automatically</span>
        </h1>
        <p className="text-xl text-spotify-gray-light mb-8 max-w-2xl mx-auto">
          Connect your Spotify account and let our AI create personalized playlists that evolve with your taste. Set
          custom rules, discover new music, and never run out of perfect songs.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {user ? (
            <>
              <Link href="/dashboard">
                <Button size="lg" className="bg-spotify-green hover:bg-spotify-green-dark text-black font-semibold">
                  <Play className="w-5 h-5 mr-2" />
                  Go to Dashboard
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-spotify-gray text-white hover:bg-spotify-gray-dark bg-transparent"
              >
                Watch Demo
              </Button>
            </>
          ) : (
            <>
              <Link href="/auth/sign-up">
                <Button size="lg" className="bg-spotify-green hover:bg-spotify-green-dark text-black font-semibold">
                  <Play className="w-5 h-5 mr-2" />
                  Start Free Trial
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-spotify-gray text-white hover:bg-spotify-gray-dark bg-transparent"
              >
                Watch Demo
              </Button>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
