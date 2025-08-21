"use client"

import { Card, CardContent, 
  CardHeader, CardTitle } from "@/components/ui/card"


export default function RulesPanel() {
  return (
    <div className="space-y-6">
  

      <Card className="bg-[#191414] border-[#282828]">
        <CardHeader className="pb-4 px-4 md:px-6">
          <CardTitle className="text-white text-lg">Today&apos;s Stats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 px-4 md:px-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">247</div>
              <div className="text-xs text-[#B3B3B3]">Songs processed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">12</div>
              <div className="text-xs text-[#B3B3B3]">New discoveries</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">5</div>
              <div className="text-xs text-[#B3B3B3]">Playlists updated</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">18</div>
              <div className="text-xs text-[#B3B3B3]">Rules triggered</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}