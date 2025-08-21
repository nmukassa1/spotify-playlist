"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Music, Menu, Plus, Settings, User, Home, BarChart3, Clock } from "lucide-react"

export default function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="md:hidden bg-[#191414] border-b border-[#282828] sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo and Title */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#1DB954] rounded-full flex items-center justify-center">
            <Music className="h-5 w-5 text-black" />
          </div>
          <div>
            <h1 className="text-lg font-bold">Playlist AI</h1>
          </div>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2">
          <Button size="sm" className="bg-[#1DB954] hover:bg-[#1ed760] text-black font-semibold px-3">
            <Plus className="h-4 w-4" />
          </Button>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="text-white hover:bg-[#282828] p-2">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#191414] border-[#282828] text-white w-80">
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center gap-3 pb-6 border-b border-[#282828]">
                  <div className="w-10 h-10 bg-[#1DB954] rounded-full flex items-center justify-center">
                    <Music className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Playlist AI</h2>
                    <p className="text-sm text-[#B3B3B3]">Auto-generated playlists</p>
                  </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 py-6">
                  <div className="space-y-2">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-white hover:bg-[#282828] h-12"
                      onClick={() => setIsOpen(false)}
                    >
                      <Home className="h-5 w-5 mr-3" />
                      Dashboard
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-[#B3B3B3] hover:text-white hover:bg-[#282828] h-12"
                      onClick={() => setIsOpen(false)}
                    >
                      <BarChart3 className="h-5 w-5 mr-3" />
                      Analytics
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-[#B3B3B3] hover:text-white hover:bg-[#282828] h-12"
                      onClick={() => setIsOpen(false)}
                    >
                      <Clock className="h-5 w-5 mr-3" />
                      Recent Activity
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-[#B3B3B3] hover:text-white hover:bg-[#282828] h-12"
                      onClick={() => setIsOpen(false)}
                    >
                      <Settings className="h-5 w-5 mr-3" />
                      Settings
                    </Button>
                  </div>
                </nav>

                {/* User Profile */}
                <div className="border-t border-[#282828] pt-4">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-[#B3B3B3] hover:text-white hover:bg-[#282828] h-12"
                    onClick={() => setIsOpen(false)}
                  >
                    <User className="h-5 w-5 mr-3" />
                    Profile
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
