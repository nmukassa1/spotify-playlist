
import DashboardHeader from "../../components/dashboard/dashboard-header"
import MobileHeader from "../../components/dashboard/mobile-header"
import QuickStats from "../../components/common/quick-stats"
import PlaylistsSection from "../../components/common/playlists-section"
// import ListeningStats from "../../components/common/listening-stats"
import DashboardSidebar from "../../components/dashboard/dashboard-sidebar"
import Playlists from "../../components/spotify/Playlists"

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
