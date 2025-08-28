"use client";
import { getPlaylist, getPlaylists } from "@/lib/spotify/queries";
import { Button } from "../ui/button";
import { getSpotifyAccount } from "@/lib/spotify/auth";
import {
  SpotifyPlaylists,
  SpotifyPlaylistTracksResponse,
  TrackParentNode,
} from "@/lib/spotify/types";

function FetchSongsButton() {
  const handleClick = async () => {
    try {
      const user = await getSpotifyAccount();
      if (!user) throw new Error("Error getting user");

      const playlists: SpotifyPlaylists[] | { error: string } =
        await getPlaylists({ userId: user.externalId });

      console.log(playlists);
      return playlists;
    } catch (err) {
      console.error(err);
    }
  };

  const handleGetPlaylist = async (
    playlistId: string
  ): Promise<string[] | undefined> => {
    try {
      let songs: TrackParentNode[] = [];

      // Get first 100 tracks
      const playlist: SpotifyPlaylistTracksResponse | { error: string } =
        await getPlaylist(playlistId);

      if (!playlist || "error" in playlist) {
        throw new Error("Failed to fetch playlist");
      }

      songs = playlist.items;

      // Handle batching if playlist has > 100 tracks
      const limiter = 100;
      const iterations = Math.ceil(playlist.total / limiter);

      for (let i = 1; i < iterations; i++) {
        const nextOffset = i * limiter;

        const nextBatch = await getPlaylist(playlistId, nextOffset);

        if (!nextBatch || "error" in nextBatch) {
          throw new Error(
            `Error fetching batch ${i + 1}: ${
              nextBatch && "error" in nextBatch
                ? nextBatch.error
                : "Unknown error"
            }`
          );
        }

        songs = [...songs, ...nextBatch.items];
      }

      // Extract song name + artist names
      const extracted = songs.map((item) => {
        const track = item.track;
        const { artists, name } = track;
        const artistsNames = artists.map((artist) => artist.name);
        return `${name} by ${artistsNames.join(", ")}`;
      });

      return extracted;
    } catch (err) {
      console.error(err);
    }
  };

  const x = async () => {
    try {
      const user = await getSpotifyAccount();
      if (!user) throw new Error("Error getting user");

      const playlists: SpotifyPlaylists[] | { error: string } =
        await getPlaylists({ userId: user.externalId });

      if (!Array.isArray(playlists) || playlists.length === 0) {
        console.error("Playlists is not an array");

        return;
      }

      let allSongs: string[] = [];

      for (const playlist of playlists) {
        const res = await handleGetPlaylist(playlist.id);
        if (res) {
          allSongs = [...allSongs, ...res];
        }
      }

      console.log(allSongs);
      return allSongs;
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Button onClick={handleClick}>Fetch Playlists</Button>
      <Button onClick={x}>Fetch All Songs</Button>
    </>
  );
}

export default FetchSongsButton;
