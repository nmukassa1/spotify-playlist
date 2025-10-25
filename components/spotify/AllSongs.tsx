"use client";
import React, { useState } from "react";
import { useSongContext } from "@/context/AllSongs";
// import { TrackParentNode } from "@/lib/spotify/types";
import { Music, Play, Pause, Heart, MoreHorizontal, Search, Filter } from "lucide-react";
import Image from "next/image";
import { getSpotifyAccount } from "@/lib/spotify/auth";
import { Playlist, TrackParentNode } from "@/lib/spotify/types";
import { getPlaylists } from "@/lib/spotify/queries";
import { getTotalSongsFromPlaylist } from "@/lib/spotify/util";
import { Button } from "../ui/button";

function AllSongs() {
  const { songs, setSongs } = useSongContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "artist" | "album">("name");
  const [isPlaying, setIsPlaying] = useState<string | null>(null);

  const handleGetAllSongs = async () => {
    try {
      console.time("fetchAllSongsDuration");
      const user = await getSpotifyAccount();
      if (!user) throw new Error("Error getting user");

      // 1) Fetching playlists
      const playlists: Playlist[] | { error: string } = await getPlaylists({
        userId: user.externalId,
      });

      if (!Array.isArray(playlists) || playlists.length === 0) {
        console.error("You dont have any playlists");
        return;
      }

      console.log(`Fetching songs from ${playlists.length} playlists in parallel...`);
      
      // 2) Fetching Songs in PARALLEL with rate limiting (major performance boost!)
      const playlistPromises = playlists.map((playlist, index) => 
        // Add small delay to prevent rate limiting (50ms between requests)
        new Promise(resolve => 
          setTimeout(() => resolve(getTotalSongsFromPlaylist(playlist.id)), index * 50)
        )
      );
      
      const playlistResults = await Promise.allSettled(playlistPromises);

      
      
      // 3) Combine all successful results
      let songs: TrackParentNode[] = [];
      let successCount = 0;
      let errorCount = 0;
      
      playlistResults.forEach((result, index) => {
        if (result.status === 'fulfilled' && Array.isArray(result.value)) {
          songs = [...songs, ...result.value];
          successCount++;
        } else {
          console.warn(`Failed to fetch songs from playlist ${playlists[index].name}:`, 
            result.status === 'rejected' ? result.reason : 'No data returned');
          errorCount++;
        }
      });

      console.log(`Successfully fetched from ${successCount} playlists, ${errorCount} failed`);
      
      if (songs.length === 0) {
        console.error("No songs found");
        return;
      }
      
      console.timeEnd("fetchAllSongsDuration");
      console.log(`All songs fetched: ${songs.length} total songs`);
      console.log("Songs:", songs);
      setSongs(songs);
      
      return songs;
    } catch (err) {
      console.error(err);
    }
  };

  if (!songs || songs.length === 0) {
    return (
      <section className="p-6">
        <div className="flex flex-col items-center justify-center h-64 bg-zinc-900 rounded-lg border border-zinc-800">
          <Music className="w-12 h-12 text-zinc-600 mb-4" />
          <h2 className="text-xl font-semibold text-zinc-400 mb-2">No Songs Found</h2>
          <p className="text-zinc-500 text-center">
            Fetch songs from your playlists to see them here
          </p>
          <Button onClick={handleGetAllSongs}>Fetch All Songs</Button>
        </div>
      </section>
    );
  }

  // Filter and sort songs
  const filteredSongs = songs
    .filter(song => {
      const searchLower = searchTerm.toLowerCase();
      const songName = song.track.name.toLowerCase();
      const artistName = song.track.artists[0]?.name.toLowerCase() || "";
      const albumName = song.track.album?.name.toLowerCase() || "";
      
      return songName.includes(searchLower) || 
             artistName.includes(searchLower) || 
             albumName.includes(searchLower);
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.track.name.localeCompare(b.track.name);
        case "artist":
          return (a.track.artists[0]?.name || "").localeCompare(b.track.artists[0]?.name || "");
        case "album":
          return (a.track.album?.name || "").localeCompare(b.track.album?.name || "");
        default:
          return 0;
      }
    });

  const handlePlayPause = (songId: string) => {
    setIsPlaying(isPlaying === songId ? null : songId);
  };

  return (
    <section className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-4">
          All Songs ({songs.length})
        </h2>
        
        {/* Search and Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search songs, artists, or albums..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="text-zinc-400 w-4 h-4" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "name" | "artist" | "album")}
              className="px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="name">Sort by Name</option>
              <option value="artist">Sort by Artist</option>
              <option value="album">Sort by Album</option>
            </select>
          </div>
        </div>
      </div>

      {/* Songs List */}
      <div className="bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden">
        <div className="max-h-[600px] overflow-y-auto">
          {filteredSongs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Search className="w-8 h-8 text-zinc-600 mb-2" />
              <p className="text-zinc-400">No songs match your search</p>
            </div>
          ) : (
            <div className="divide-y divide-zinc-800">
              {filteredSongs.map((song, index) => (
                <div
                  key={`${song.track.id}-${index}`}
                  className="flex items-center gap-4 p-4 hover:bg-zinc-800 transition-colors group"
                >
                  {/* Album Art */}
                  <div className="relative w-12 h-12 flex-shrink-0">
                    {song.track.album?.images?.[0]?.url ? (
                      <Image
                        src={song.track.album.images[0].url}
                        alt={song.track.album.name}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-zinc-700 rounded flex items-center justify-center">
                        <Music className="w-6 h-6 text-zinc-500" />
                      </div>
                    )}
                  </div>

                  {/* Song Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium truncate group-hover:text-green-400 transition-colors">
                      {song.track.name}
                    </h3>
                    <p className="text-zinc-400 text-sm truncate">
                      {song.track.artists.map(artist => artist.name).join(", ")}
                    </p>
                    {song.track.album && (
                      <p className="text-zinc-500 text-xs truncate">
                        {song.track.album.name}
                      </p>
                    )}
                  </div>

                  {/* Duration */}
                  <div className="text-zinc-400 text-sm">
                    {song.track.duration_ms ? 
                      `${Math.floor(song.track.duration_ms / 60000)}:${String(Math.floor((song.track.duration_ms % 60000) / 1000)).padStart(2, '0')}` 
                      : '--:--'
                    }
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handlePlayPause(song.track.id)}
                      className="p-2 hover:bg-zinc-700 rounded-full transition-colors"
                      title={isPlaying === song.track.id ? "Pause" : "Play"}
                    >
                      {isPlaying === song.track.id ? (
                        <Pause className="w-4 h-4 text-white" />
                      ) : (
                        <Play className="w-4 h-4 text-white" />
                      )}
                    </button>
                    
                    <button
                      className="p-2 hover:bg-zinc-700 rounded-full transition-colors"
                      title="Add to favorites"
                    >
                      <Heart className="w-4 h-4 text-zinc-400 hover:text-red-400 transition-colors" />
                    </button>
                    
                    <button
                      className="p-2 hover:bg-zinc-700 rounded-full transition-colors"
                      title="More options"
                    >
                      <MoreHorizontal className="w-4 h-4 text-zinc-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {filteredSongs.length > 0 && (
        <div className="mt-4 text-center text-zinc-400 text-sm">
          Showing {filteredSongs.length} of {songs.length} songs
          {searchTerm && ` matching "${searchTerm}"`}
        </div>
      )}
    </section>
  );
}

export default AllSongs;