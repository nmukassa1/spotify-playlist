import { Play } from "lucide-react"

export default function LandingFooter() {
  return (
    <footer className="border-t border-spotify-gray-dark py-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-6 h-6 bg-spotify-green rounded-full flex items-center justify-center">
              <Play className="w-3 h-3 text-black fill-current" />
            </div>
            <span className="font-semibold">PlaylistAI</span>
          </div>
          <div className="flex space-x-6 text-sm text-spotify-gray-light">
            <a href="#" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
