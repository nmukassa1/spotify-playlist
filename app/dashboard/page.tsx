
import DashboardHeader from "../components/dashboard-header"
import MobileHeader from "../components/mobile-header"
import QuickStats from "../components/quick-stats"
import PlaylistsSection from "../components/playlists-section"
import ListeningStats from "../components/listening-stats"
import DashboardSidebar from "../components/dashboard-sidebar"
import Playlists from "../components/Playlists"

export default async function Dashboard() {
  

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <DashboardHeader />

      {/* Mobile Header */}
      <MobileHeader />

      <main className="container mx-auto px-4 md:px-6 py-4 md:py-8">
        <div className="space-y-6 lg:space-y-8">
          <QuickStats />

          {/* Mobile: Stack everything vertically, Desktop: Sidebar layout */}
          <div className="space-y-6 xl:grid xl:grid-cols-4 xl:gap-8 xl:space-y-0">
            {/* Main Content */}
            <div className="xl:col-span-3 space-y-6 md:space-y-8">
              <PlaylistsSection />

              {/* Listening Analytics */}
              {/* <ListeningStats /> */}
            </div>

            <DashboardSidebar />

            <Playlists />
          </div>
        </div>
      </main>
    </div>
  )
}
