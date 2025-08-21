'use client';

import { Button } from "@/components/ui/button";
import { useFetchSongs } from "@/lib/hooks/useFetchSongs";
import { SpotifyPlaylists } from "@/lib/spotify/types";
import { Music, Loader2 } from "lucide-react";

interface FetchSongsButtonProps {
  playlists: SpotifyPlaylists[];
}

export default function FetchSongsButton({ playlists }: FetchSongsButtonProps) {
  const { songs, totalSongs, isLoading, error, fetchSongs } = useFetchSongs();

  const handleFetchSongs = async () => {
    try {
      console.log('Client: Button clicked, playlists:', playlists.length);
      await fetchSongs(playlists);
    } catch (error) {
      console.error('Client: Failed to fetch songs:', error);
    }
  };

  return (
    <div className="mb-6 p-4 bg-[#282828] rounded-lg border border-[#3E3E3E]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Fetch All Songs</h3>
        <Button
          onClick={handleFetchSongs}
          disabled={isLoading}
          className="bg-[#1DB954] hover:bg-[#1ed760] text-black"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Fetching...
            </>
          ) : (
            <>
              <Music className="mr-2 h-4 w-4" />
              Fetch Songs
            </>
          )}
        </Button>
      </div>

      {error && (
        <div className="text-red-400 text-sm mb-3">
          Error: {error}
        </div>
      )}

      {songs.length > 0 && (
        <div className="space-y-2">
          <div className="text-green-400 text-sm">
            ✅ Successfully fetched {totalSongs} songs
          </div>
          <div className="text-[#B3B3B3] text-xs">
            First few songs: {songs.slice(0, 3).join(', ')}
            {songs.length > 3 && `... and ${songs.length - 3} more`}
          </div>
        </div>
      )}

      {isLoading && (
        <div className="text-[#B3B3B3] text-sm">
          Fetching songs from {playlists.length} playlists...
        </div>
      )}
    </div>
  );
}