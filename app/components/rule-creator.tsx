"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Plus } from "lucide-react"

const genreOptions = ["Pop", "Rock", "Electronic", "Hip-Hop", "Jazz", "Classical", "Indie", "R&B"]
const moodOptions = ["Happy", "Sad", "Energetic", "Calm", "Aggressive", "Romantic", "Nostalgic"]
const timeOptions = ["Morning (6-12)", "Afternoon (12-18)", "Evening (18-24)", "Night (0-6)"]

export default function RuleCreator() {
  const [ruleName, setRuleName] = useState("")
  const [description, setDescription] = useState("")
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [selectedMoods, setSelectedMoods] = useState<string[]>([])
  const [selectedTimes, setSelectedTimes] = useState<string[]>([])
  const [playlistSize, setPlaylistSize] = useState("30")
  const [updateFrequency, setUpdateFrequency] = useState("")

  const addTag = (tag: string, list: string[], setter: (list: string[]) => void) => {
    if (!list.includes(tag)) {
      setter([...list, tag])
    }
  }

  const removeTag = (tag: string, list: string[], setter: (list: string[]) => void) => {
    setter(list.filter((item) => item !== tag))
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Create New Playlist Rule</CardTitle>
        <CardDescription>Define how your automatic playlist should be generated</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="rule-name">Rule Name</Label>
            <Input
              id="rule-name"
              placeholder="e.g., Morning Workout"
              value={ruleName}
              onChange={(e) => setRuleName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="playlist-size">Playlist Size</Label>
            <Select value={playlistSize} onValueChange={setPlaylistSize}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 songs</SelectItem>
                <SelectItem value="30">30 songs</SelectItem>
                <SelectItem value="50">50 songs</SelectItem>
                <SelectItem value="100">100 songs</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Describe when and how this playlist should be used..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="space-y-4">
          <div>
            <Label>Genres</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedGenres.map((genre) => (
                <Badge key={genre} variant="secondary" className="flex items-center gap-1">
                  {genre}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => removeTag(genre, selectedGenres, setSelectedGenres)}
                  />
                </Badge>
              ))}
            </div>
            <Select onValueChange={(value) => addTag(value, selectedGenres, setSelectedGenres)}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Add genres..." />
              </SelectTrigger>
              <SelectContent>
                {genreOptions.map((genre) => (
                  <SelectItem key={genre} value={genre}>
                    {genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Moods</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedMoods.map((mood) => (
                <Badge key={mood} variant="secondary" className="flex items-center gap-1">
                  {mood}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => removeTag(mood, selectedMoods, setSelectedMoods)}
                  />
                </Badge>
              ))}
            </div>
            <Select onValueChange={(value) => addTag(value, selectedMoods, setSelectedMoods)}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Add moods..." />
              </SelectTrigger>
              <SelectContent>
                {moodOptions.map((mood) => (
                  <SelectItem key={mood} value={mood}>
                    {mood}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Active Times</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedTimes.map((time) => (
                <Badge key={time} variant="secondary" className="flex items-center gap-1">
                  {time}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => removeTag(time, selectedTimes, setSelectedTimes)}
                  />
                </Badge>
              ))}
            </div>
            <Select onValueChange={(value) => addTag(value, selectedTimes, setSelectedTimes)}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Add active times..." />
              </SelectTrigger>
              <SelectContent>
                {timeOptions.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="update-frequency">Update Frequency</Label>
            <Select value={updateFrequency} onValueChange={setUpdateFrequency}>
              <SelectTrigger>
                <SelectValue placeholder="How often should this playlist update?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="manual">Manual only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button className="flex-1">
            <Plus className="h-4 w-4 mr-2" />
            Create Rule
          </Button>
          <Button variant="outline">Cancel</Button>
        </div>
      </CardContent>
    </Card>
  )
}
