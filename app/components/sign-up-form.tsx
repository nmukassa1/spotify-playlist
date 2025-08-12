"use client"

import { Button } from "@/components/ui/button"
import { Music, Github } from "lucide-react"
import Link from "next/link"
import { signInWithOAuth } from "@/lib/actions"
import { useSearchParams } from "next/navigation"

function GoogleIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="currentColor"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="currentColor"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="currentColor"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  )
}

function SpotifyIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  )
}

export default function SignUpForm() {
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
        <h1 className="text-3xl font-bold text-white">Sign up for free</h1>
        <p className="text-spotify-text-subdued">Create your account to start generating playlists</p>
      </div>

      <div className="space-y-4">
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-md text-sm">
            {error === "oauth_error" && "Authentication failed. Please try again."}
            {error === "oauth_callback_error" && "Authentication callback failed. Please try again."}
          </div>
        )}

        <form action={signInWithOAuth.bind(null, "spotify")} className="w-full">
          <Button
            type="submit"
            className="w-full bg-spotify-green hover:bg-spotify-green-dark text-black font-bold py-3 text-base rounded-full h-12 transition-all duration-200 flex items-center justify-center gap-3"
          >
            <SpotifyIcon />
            Sign up with Spotify
          </Button>
        </form>

        <form action={signInWithOAuth.bind(null, "google")} className="w-full">
          <Button
            type="submit"
            variant="outline"
            className="w-full bg-transparent border-spotify-gray text-white hover:bg-spotify-gray hover:text-white font-medium py-3 text-base rounded-full h-12 transition-all duration-200 flex items-center justify-center gap-3"
          >
            <GoogleIcon />
            Sign up with Google
          </Button>
        </form>

        <form action={signInWithOAuth.bind(null, "github")} className="w-full">
          <Button
            type="submit"
            variant="outline"
            className="w-full bg-transparent border-spotify-gray text-white hover:bg-spotify-gray hover:text-white font-medium py-3 text-base rounded-full h-12 transition-all duration-200 flex items-center justify-center gap-3"
          >
            <Github className="w-5 h-5" />
            Sign up with GitHub
          </Button>
        </form>

        <div className="text-xs text-spotify-text-subdued">
          By clicking on sign-up, you agree to Spotify AI's{" "}
          <Link href="#" className="text-spotify-green hover:underline">
            Terms and Conditions of Use
          </Link>
          .
        </div>

        <div className="text-xs text-spotify-text-subdued">
          To learn more about how Spotify AI collects, uses, shares and protects your personal data, please see{" "}
          <Link href="#" className="text-spotify-green hover:underline">
            Spotify AI's Privacy Policy
          </Link>
          .
        </div>

        <hr className="border-spotify-gray" />

        <div className="text-center text-spotify-text-subdued">
          Have an account?{" "}
          <Link href="/auth/login" className="text-white hover:text-spotify-green underline">
            Log in
          </Link>
        </div>
      </div>
    </div>
  )
}
