"use client";
import { getPlaylistTracks, getPlaylists } from "@/lib/spotify/queries";
import { Button } from "../ui/button";
import { getSpotifyAccount } from "@/lib/spotify/auth";
import {
  Playlist,
  SpotifyPlaylistTracksResponse,
  TrackParentNode,
  TrackObject,
} from "@/lib/spotify/types";
import {
  extractTrackObject,
  getTotalSongsFromPlaylist,
} from "@/lib/spotify/util";

function FetchSongsButton() {
  const handleClick = async () => {
    try {
      const user = await getSpotifyAccount();
      if (!user) throw new Error("Error getting user");

      const playlists: Playlist[] | { error: string } = await getPlaylists({
        userId: user.externalId,
      });

      console.log(playlists);
      return playlists;
    } catch (err) {
      console.error(err);
    }
  };

  const handleGetPlaylist = async (
    playlistId: string
  ): Promise<TrackObject[] | undefined> => {
    try {
      // Get first 100 tracks
      const playlist: SpotifyPlaylistTracksResponse | { error: string } =
        await getPlaylistTracks(playlistId);

      if (!playlist || "error" in playlist) {
        throw new Error("Failed to fetch playlist");
      }

      const songsFromPlaylist = await getTotalSongsFromPlaylist(
        playlist,
        playlistId
      );

      if (!songsFromPlaylist) {
        console.error("Failed to get total songs from playlist");
        return;
      }

      const extractedTrackObject = await extractTrackObject(songsFromPlaylist);

      return extractedTrackObject;
    } catch (err) {
      console.error(err);
    }
  };

  // bringing it all together
  const x = async () => {
    try {
      const user = await getSpotifyAccount();
      if (!user) throw new Error("Error getting user");

      const playlists: Playlist[] | { error: string } = await getPlaylists({
        userId: user.externalId,
      });

      if (!Array.isArray(playlists) || playlists.length === 0) {
        console.error("Playlists is not an array");

        return;
      }

      let songs: TrackParentNode[] = [];

      for (const playlist of playlists) {
        const res: TrackParentNode[] | undefined =
          await getTotalSongsFromPlaylist(playlist.id);

        if (!res) return;

        songs = [...songs, ...(res as TrackParentNode[])];
      }

      const extractedObj = await extractTrackObject(songs);

      console.log("Extracted Songs:", extractedObj);
      return allSongs;
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Button onClick={handleClick}>Fetch Playlists</Button>
      <Button
        onClick={() => {
          handleGetPlaylist("7AFhqVzNXAT7RsW03rVcGS");
        }}
      >
        Get Playlist
      </Button>
      <Button onClick={x}>Fetch All Songs</Button>
    </>
  );
}

export default FetchSongsButton;
