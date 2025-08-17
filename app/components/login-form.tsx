"use client"

import { Button } from "@/components/ui/button"
import { Music } from "lucide-react"
import { signInWithOAuth } from "@/lib/actions"
import { useSearchParams } from "next/navigation"



function SpotifyIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  )
}

export default function LoginForm() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  return (
    <div className="w-full max-w-md space-y-8 bg-spotify-dark-elevated p-8 rounded-lg">
      <div className="space-y-4 text-center">
        <div className="flex justify-center">
          <div className="bg-spotify-green p-3 rounded-full">
            <Music className="h-8 w-8 text-black" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-white">Log in to Spotify AI</h1>
        <p className="text-spotify-text-subdued">Continue to your personalized playlists</p>
      </div>

      <div className="space-y-4">
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-md text-sm text-white">
            {error === "oauth_error" && "Authentication failed. Please try again."}
            {error === "oauth_callback_error" && "Authentication callback failed. Please try again."}
            {error === "session_error" && "No session created"}
          </div>
        )}

        {/* <form action={signInWithOAuth.bind(null, "spotify")} className="w-full"> */}
        <form action={() => signInWithOAuth()} className="w-full">
          <Button
            type="submit"
            className="w-full bg-spotify-green hover:bg-spotify-green-dark text-black font-bold py-3 text-base rounded-full h-12 transition-all duration-200 flex items-center justify-center gap-3"
          >
            <SpotifyIcon />
            Continue with Spotify
          </Button>
        </form>

       
      </div>
    </div>
  )
}
