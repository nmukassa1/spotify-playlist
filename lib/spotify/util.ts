import {
  //   SpotifyPlaylistTracksResponse,
  TrackObject,
  TrackParentNode,
} from "@/lib/spotify/types";
import { getPlaylistTracks } from "./queries";

export async function extractTrackObject(
  songs: TrackParentNode[]
): Promise<TrackObject[] | undefined> {
  const extractedTrackObject: TrackObject[] = songs.map(
    (item: TrackParentNode) => {
      const { artists, name, id, href } = item.track;
      const obj = {
        artists,
        name,
        id,
        href,
      };
      return obj;
    }
  );

  console.log("ExtractedTrackObject:", extractedTrackObject);
  return extractedTrackObject;
}

export async function getTotalSongsFromPlaylist(
  //   playlistObj: SpotifyPlaylistTracksResponse,
  playlistId: string
): Promise<TrackParentNode[] | undefined> {
  if (!playlistId) {
    console.error("No playlist ID Detected");
    return;
  }

  const playlist = await getPlaylistTracks(playlistId);

  if (!playlist) {
    console.error("No playlist was detected");
    return;
  }

  let songs: TrackParentNode[] = [];

  songs = playlist.items;

  // Handle batching if playlist has > 100 tracks
  const limiter = 100;
  const iterations = Math.ceil(playlist.total / limiter);

  for (let i = 1; i < iterations; i++) {
    const nextOffset = i * limiter;

    const nextBatch = await getPlaylistTracks(playlistId, nextOffset);

    if (!nextBatch || "error" in nextBatch) {
      throw new Error(
        `Error fetching batch ${i + 1}: ${
          nextBatch && "error" in nextBatch ? nextBatch.error : "Unknown error"
        }`
      );
    }

    songs = [...songs, ...nextBatch.items];
  }

  // Return total songs
  return songs;
}
