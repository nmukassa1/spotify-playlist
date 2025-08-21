"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Music, CheckCircle, AlertCircle } from "lucide-react"

export default function SpotifyAuth() {
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)

  const handleSpotifyConnect = async () => {
    setIsConnecting(true)

    // Simulate Spotify OAuth flow
    setTimeout(() => {
      setIsConnected(true)
      setIsConnecting(false)
    }, 2000)
  }

  if (isConnected) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="flex items-center gap-4 p-6">
          <CheckCircle className="h-8 w-8 text-green-600" />
          <div>
            <h3 className="font-semibold">Connected to Spotify</h3>
            <p className="text-sm text-muted-foreground">Ready to generate playlists!</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="mx-auto w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mb-4">
          <Music className="h-6 w-6 text-white" />
        </div>
        <CardTitle>Connect Your Spotify</CardTitle>
        <CardDescription>Connect your Spotify account to start generating personalized playlists</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            Access your playlists and listening history
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            Create and update playlists automatically
          </div>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-yellow-600" />
            We never store your personal data
          </div>
        </div>

        <Button
          onClick={handleSpotifyConnect}
          disabled={isConnecting}
          className="w-full bg-green-600 hover:bg-green-700"
        >
          {isConnecting ? "Connecting..." : "Connect with Spotify"}
        </Button>
      </CardContent>
    </Card>
  )
}
