import { Button } from "@/components/ui/button"
import { Play, LogOut } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { signOut } from "@/lib/actions"

export default async function LandingHeader() {
  // Check if user is authenticated
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <header className="border-b border-spotify-gray-dark">
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-spotify-green rounded-full flex items-center justify-center">
              <Play className="w-4 h-4 text-black fill-current" />
            </div>
            <span className="text-xl font-bold">PlaylistAI</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-spotify-gray-light hover:text-white transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-spotify-gray-light hover:text-white transition-colors">
              How it Works
            </a>
            <a href="#pricing" className="text-spotify-gray-light hover:text-white transition-colors">
              Pricing
            </a>
          </nav>

          {user ? (
            <div className="flex items-center gap-3">
              <Link href="/dashboard">
                <Button
                  variant="outline"
                  className="border-spotify-gray text-white hover:bg-spotify-gray-dark bg-transparent"
                >
                  Dashboard
                </Button>
              </Link>
              <form action={signOut}>
                <Button
                  type="submit"
                  variant="outline"
                  className="border-spotify-gray text-white hover:bg-spotify-gray-dark bg-transparent"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </form>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/auth/login">
                <Button
                  variant="outline"
                  className="border-spotify-gray bg-spotify-green text-black hover:bg-spotify-gray-dark"
                >
                  Log In
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
