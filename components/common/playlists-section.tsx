import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import PlaylistGrid from "./playlist-grid"

export default function PlaylistsSection() {
  return (
    <Card className="bg-[#191414] border-[#282828]">
      <CardHeader className="pb-4 px-4 md:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <CardTitle className="text-white text-lg md:text-xl">Your Playlists</CardTitle>
            <CardDescription className="text-[#B3B3B3] text-sm">Fresh playlists based on your habits</CardDescription>
          </div>
          <Button
            variant="ghost"
            className="text-[#B3B3B3] hover:text-white hover:bg-[#282828] self-start sm:self-auto"
            size="sm"
          >
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-4 md:px-6">
        <Suspense fallback={<div className="text-[#B3B3B3]">Loading playlists...</div>}>
          <PlaylistGrid />
        </Suspense>
      </CardContent>
    </Card>
  )
}
