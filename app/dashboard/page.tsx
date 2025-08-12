import { createClient, isSupabaseConfigured } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import DashboardHeader from "../components/dashboard-header"
import MobileHeader from "../components/mobile-header"
import QuickStats from "../components/quick-stats"
import PlaylistsSection from "../components/playlists-section"
import ListeningStats from "../components/listening-stats"
import DashboardSidebar from "../components/dashboard-sidebar"

export default async function Dashboard() {
  // If Supabase is not configured, show setup message
  if (!isSupabaseConfigured) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-spotify-dark">
        <h1 className="text-2xl font-bold mb-4 text-white">Connect Supabase to get started</h1>
      </div>
    )
  }


  // Check if user is authenticated
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // If no user, redirect to login
  if (!user) {
    redirect("/auth/login")
  }

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
              <ListeningStats />
            </div>

            <DashboardSidebar />
          </div>
        </div>
      </main>
    </div>
  )
}
