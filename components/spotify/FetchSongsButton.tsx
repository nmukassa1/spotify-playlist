"use client";
import { getPlaylists } from "@/lib/spotify/queries";
import { Button } from "../ui/button";
import { getSpotifyAccount } from "@/lib/spotify/auth";
import { Playlist, TrackParentNode } from "@/lib/spotify/types";
import {
  extractTrackObject,
  getAudioFeature,
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

  // bringing it all together
  const x = async () => {
    try {
      const user = await getSpotifyAccount();
      if (!user) throw new Error("Error getting user");

      // 1) Fetching playlists
      const playlists: Playlist[] | { error: string } = await getPlaylists({
        userId: user.externalId,
      });

      if (!Array.isArray(playlists) || playlists.length === 0) {
        console.error("Playlists is not an array");

        return;
      }

      let songs: TrackParentNode[] = [];
      // 2) Fetching Songs
      for (const playlist of playlists) {
        const res: TrackParentNode[] | undefined =
          await getTotalSongsFromPlaylist(playlist.id);

        if (!res) return;

        songs = [...songs, ...(res as TrackParentNode[])];
      }

      // 3) Extracting values I truly need
      const extractedObj = await extractTrackObject(songs);

      if (!extractedObj) {
        console.log("Error extracting objects");
        return;
      }

      // 4) Analyse Songs
      const audioFeature = await getAudioFeature(extractedObj[5].id);
      console.log("Song being analysed:", extractedObj[5]);

      console.log(audioFeature);

      return extractedObj;
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
