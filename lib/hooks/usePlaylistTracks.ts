import { useState, useEffect } from 'react';
import { getAllPlaylistTracksData } from '@/lib/spotify/playlistService';
import { SpotifyPlaylists } from '@/lib/spotify/types';

export interface PlaylistTracksState {
  songNamesWithArtists: string[];
  totalSongs: number;
  isLoading: boolean;
  error: string | null;
}

export function usePlaylistTracks(playlists: SpotifyPlaylists[] | null) {
  const [state, setState] = useState<PlaylistTracksState>({
    songNamesWithArtists: [],
    totalSongs: 0,
    isLoading: false,
    error: null
  });

  useEffect(() => {
    if (!playlists || playlists.length === 0) {
      setState({
        songNamesWithArtists: [],
        totalSongs: 0,
        isLoading: false,
        error: null
      });
      return;
    }

    const fetchTracks = async () => {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      try {
        const result = await getAllPlaylistTracksData(playlists);
        setState({
          songNamesWithArtists: result.songNamesWithArtists,
          totalSongs: result.totalSongs,
          isLoading: false,
          error: null
        });
      } catch (error) {
        console.error('Error fetching playlist tracks:', error);
        setState({
          songNamesWithArtists: [],
          totalSongs: 0,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Failed to fetch tracks'
        });
      }
    };

    fetchTracks();
  }, [playlists]);

  return state;
} 