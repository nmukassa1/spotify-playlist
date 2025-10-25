"use client";
import { getPlaylists } from "@/lib/spotify/queries";
import { Button } from "../ui/button";
import { getSpotifyAccount } from "@/lib/spotify/auth";
import { Playlist } from "@/lib/spotify/types";
import {
  // extractTrackObject,
  // getAudioFeature,
} from "@/lib/spotify/util";
import { usePlaylistContext } from "@/context/PlaylistProvider";


function FetchSongsButton() {
  const { setPlaylists } = usePlaylistContext();

  const handleGetPlaylists = async () => {
    try {
      const user = await getSpotifyAccount();
      if (!user) throw new Error("Error getting user");

      const playlists: Playlist[] | { error: string } = await getPlaylists({
        userId: user.externalId,
      });

      console.log("Playlists fetched:", playlists);
      setPlaylists(playlists as Playlist[]);
      return playlists;
    } catch (err) {
      console.error(err);
    }
  };

  // bringing it all together
  // const x = async () => {
  //   try {
  //     const user = await getSpotifyAccount();
  //     if (!user) throw new Error("Error getting user");

  //     // 1) Fetching playlists
  //     const playlists: Playlist[] | { error: string } = await getPlaylists({
  //       userId: user.externalId,
  //     });

  //     if (!Array.isArray(playlists) || playlists.length === 0) {
  //       console.error("You dont have any playlists");
  //       return;
  //     }

  //     let songs: TrackParentNode[] = [];
  //     // 2) Fetching Songs
  //     for (const playlist of playlists) {
  //       const res: TrackParentNode[] | undefined =
  //         await getTotalSongsFromPlaylist(playlist.id);

  //       if (!res) return;

  //       songs = [...songs, ...(res as TrackParentNode[])];
  //     }

  //     // 3) Extracting values I truly need
  //     const extractedObj = await extractTrackObject(songs);

  //     if (!extractedObj) {
  //       console.log("Error extracting objects");
  //       return;
  //     }

  //     // 4) Analyse Songs
  //     const audioFeature = await getAudioFeature(extractedObj[5].id);
  //     console.log("Song being analysed:", extractedObj[5]);

  //     console.log(audioFeature);

  //     return extractedObj;
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

 

  return (
    <>
      <Button onClick={handleGetPlaylists}>Fetch Playlists</Button>
    </>
  );
}

export default FetchSongsButton;
