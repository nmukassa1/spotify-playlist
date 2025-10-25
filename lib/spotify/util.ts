import {
  //   SpotifyPlaylistTracksResponse,
  TrackObject,
  TrackParentNode,
} from "@/lib/spotify/types";
import { getPlaylistTracks } from "./queries";
import { getAccessToken } from "./auth";

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

  let songs: TrackParentNode[] = playlist.items;

  // Handle batching if playlist has > 100 tracks
  const limiter = 100;
  const totalTracks = playlist.total;
  const iterations = Math.ceil(totalTracks / limiter);

  // If no additional batches needed, return early
  if (iterations <= 1) {
    return songs;
  }

  console.log(`Fetching ${iterations - 1} additional batches for playlist ${playlistId}`);

  // Create all batch promises in parallel
  const batchPromises = [];
  for (let i = 1; i < iterations; i++) {
    const nextOffset = i * limiter;
    batchPromises.push(getPlaylistTracks(playlistId, nextOffset));
  }

  // Execute all batches in parallel
  const batchResults = await Promise.allSettled(batchPromises);

  // Combine successful results
  batchResults.forEach((result, index) => {
    if (result.status === 'fulfilled' && result.value && !("error" in result.value)) {
      songs = [...songs, ...result.value.items];
    } else {
      console.warn(`Failed to fetch batch ${index + 2} for playlist ${playlistId}:`, 
        result.status === 'rejected' ? result.reason : 'Unknown error');
    }
  });

  return songs;
}

export async function getAudioFeature(trackId: string) {
  const accessToken = await getAccessToken();
  if (!accessToken) throw new Error("Error getting access token");

  if (!trackId) {
    console.error("No track ID found");
    return;
  }

  try {
    // const response = await fetch(
    //   `https://track-analysis.p.rapidapi.com/pktx/spotify/${trackId}`,
    //   {
    //     headers: {
    //       "x-rapidapi-host": "track-analysis.p.rapidapi.com",
    //       "x-rapidapi-key":
    //         "ea0897f4cfmsh80cb589ae78bceap1787b5jsne4777e340118",
    //     },
    //   }
    // );
    const response = await fetch(
      `https://api.spotify.com/v1/audio-features/${trackId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Audio Feature Data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching audio feature:", error);
  }
}
