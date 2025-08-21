import { fetchAllPlaylistTracks } from "./util";
import { SpotifyPlaylists, PlaylistTrackItem } from "./types";

export interface PlaylistTracksData {
  [playlistId: string]: PlaylistTrackItem[];
}

/**
 * Fetches all tracks from a single playlist
 */
export async function fetchPlaylistTracks(playlist: SpotifyPlaylists): Promise<PlaylistTrackItem[]> {
  if (!playlist.tracks?.href) {
    console.warn(`No tracks href found for playlist: ${playlist.name}`);
    return [];
  }

  try {
    return await fetchAllPlaylistTracks(playlist.tracks.href);
  } catch (error) {
    console.error(`Error fetching tracks for playlist ${playlist.name}:`, error);
    return [];
  }
}

/**
 * Fetches all tracks from multiple playlists
 */
export async function fetchAllPlaylistsTracks(playlists: SpotifyPlaylists[]): Promise<PlaylistTracksData> {
  const allSongsByPlaylist: PlaylistTracksData = {};

  // Process playlists sequentially to avoid overwhelming the API
  for (const playlist of playlists) {
    const tracks = await fetchPlaylistTracks(playlist);
    allSongsByPlaylist[playlist.id] = tracks;
  }

  return allSongsByPlaylist;
}

/**
 * Extracts track objects from playlist tracks data
 */
export function extractTrackObjects(playlistTracksData: PlaylistTracksData) {
  return Object.values(playlistTracksData)
    .flat()
    .map(item => item.track);
}

/**
 * Creates song names with artists from track objects
 */
export function createSongNamesWithArtists(tracks: PlaylistTrackItem['track'][]) {
  return tracks.map(track => {
    const songName = track.name;
    const artistNames = track.artists.map((artist: { name: string }) => artist.name).join(', ');
    return `${songName} - ${artistNames}`;
  });
}

/**
 * Main function to get all playlist tracks and process them
 */
export async function getAllPlaylistTracksData(playlists: SpotifyPlaylists[]) {
  try {
    // Fetch all tracks from all playlists
    const playlistTracksData = await fetchAllPlaylistsTracks(playlists);
    
    // Extract track objects
    const allTrackObjects = extractTrackObjects(playlistTracksData);
    
    // Create song names with artists
    const songNamesWithArtists = createSongNamesWithArtists(allTrackObjects);
    
    return {
      playlistTracksData,
      allTrackObjects,
      songNamesWithArtists,
      totalSongs: songNamesWithArtists.length
    };
  } catch (error) {
    console.error("Error in getAllPlaylistTracksData:", error);
    throw error;
  }
} 