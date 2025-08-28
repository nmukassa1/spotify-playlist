
import FetchSongsButton from "@/components/spotify/FetchSongsButton"
import DashboardHeader from "../../components/dashboard/dashboard-header"

export default async function Dashboard() {
  
 
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <DashboardHeader />


      <main className="container mx-auto px-4 md:px-6 py-4 md:py-8">
        <div className="space-y-6 lg:space-y-8">
            <FetchSongsButton />
        </div>
      </main>
    </div>
  )
}
