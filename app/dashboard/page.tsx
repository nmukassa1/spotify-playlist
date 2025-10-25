
import FetchSongsButton from "@/components/spotify/FetchSongsButton"
import DashboardHeader from "../../components/dashboard/dashboard-header"
import { PlaylistProvider } from "@/context/PlaylistProvider"
import Playlists from "@/components/spotify/Playlists"

export default async function Dashboard() {
  
 
  return (
    <>
    <PlaylistProvider>
    <div className="min-h-screen bg-[#171717] text-white">
      <DashboardHeader />


      <main className="container mx-auto px-4 md:px-6 py-4 md:py-8">
        <div className="space-y-6 lg:space-y-8">
            <FetchSongsButton />
            
            <section>
              <h1>Your Playlists</h1>
              <Playlists />
            </section>
        </div>
      </main>
    </div>
    </PlaylistProvider>
    </>
  )
}
