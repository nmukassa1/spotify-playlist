import { Button } from "@/components/ui/button"
import { Music, Plus, Settings, LogOut, User } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { signOut } from "@/lib/actions"

export default async function DashboardHeader() {
  // Get current user
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

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
            {user && (
              <div className="flex items-center gap-2 text-sm text-[#B3B3B3]">
                <User className="h-4 w-4" />
                <span>{user.email}</span>
              </div>
            )}
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
            <form action={signOut}>
              <Button
                type="submit"
                variant="outline"
                size="sm"
                className="border-[#535353] text-white hover:bg-[#282828] bg-transparent"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </form>
          </div>
        </div>
      </div>
    </header>
  )
}
