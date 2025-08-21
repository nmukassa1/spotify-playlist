'use server'

import { getPlaylists } from '@/lib/spotify/queries';
import { SpotifyPlaylists } from '@/lib/spotify/types';
import { ApiResponse } from '@/types/api';

export async function getSpotifyPlaylists(): Promise<ApiResponse<SpotifyPlaylists[]>> {
  try {
    const playlists = await getPlaylists();
    
    if (!playlists || playlists.length === 0) {
      return {
        success: false,
        error: 'No playlists found',
        timestamp: Date.now()
      };
    }

    return {
      success: true,
      data: playlists,
      message: `Successfully fetched ${playlists.length} playlists`,
      timestamp: Date.now()
    };
  } catch (error) {
    console.error('Error fetching Spotify playlists:', error);
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch playlists',
      timestamp: Date.now()
    };
  }
} 