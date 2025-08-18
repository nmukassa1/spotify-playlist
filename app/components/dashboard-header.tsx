import { Button } from "@/components/ui/button"
import { Music, Plus, Settings } from "lucide-react"
import {
  SignOutButton
} from '@clerk/nextjs'

export default async function DashboardHeader() {

  return (
    <header className="hidden md:block bg-[#191414] border-b border-[#282828]">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#1DB954] rounded-full flex items-center justify-center">
              <Music className="h-6 w-6 text-black" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Playlist AI</h1>
              <p className="text-sm text-[#B3B3B3]">Auto-generated playlists</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
          
            <Button
              variant="outline"
              size="sm"
              className="border-[#535353] text-white hover:bg-[#282828] bg-transparent"
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button size="sm" className="bg-[#1DB954] hover:bg-[#1ed760] text-black font-semibold">
              <Plus className="h-4 w-4 mr-2" />
              New Rule
            </Button>
           <SignOutButton/>
          </div>
        </div>
      </div>
    </header>
  )
}
