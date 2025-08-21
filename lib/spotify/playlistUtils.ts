import { SpotifyPlaylists } from "./types";

/**
 * Formats playlist metadata for display
 */
export function formatPlaylistMetadata(playlist: SpotifyPlaylists) {
  return {
    trackCount: playlist.tracks.total,
    visibility: playlist.public ? "Public" : "Private",
    type: playlist.collaborative ? "Collaborative" : "Personal",
    owner: playlist.owner.display_name
  };
}

/**
 * Gets playlist cover image or fallback
 */
export function getPlaylistCover(playlist: SpotifyPlaylists) {
  if (playlist.images && playlist.images.length > 0) {
    return {
      url: playlist.images[0].url,
      hasImage: true
    };
  }
  
  return {
    url: null,
    hasImage: false
  };
}

/**
 * Validates if a playlist has accessible tracks
 */
export function hasAccessibleTracks(playlist: SpotifyPlaylists): boolean {
  return !!(playlist.tracks?.href);
}

/**
 * Creates a summary of playlist data
 */
export function createPlaylistSummary(playlists: SpotifyPlaylists[]) {
  const totalPlaylists = playlists.length;
  const publicPlaylists = playlists.filter(p => p.public).length;
  const collaborativePlaylists = playlists.filter(p => p.collaborative).length;
  const totalTracks = playlists.reduce((sum, p) => sum + p.tracks.total, 0);

  return {
    totalPlaylists,
    publicPlaylists,
    privatePlaylists: totalPlaylists - publicPlaylists,
    collaborativePlaylists,
    personalPlaylists: totalPlaylists - collaborativePlaylists,
    totalTracks
  };
} 