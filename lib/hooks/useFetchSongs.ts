import { useState } from 'react';
import { SpotifyPlaylists } from '@/lib/spotify/types';

export interface FetchSongsState {
  songs: string[];
  totalSongs: number;
  isLoading: boolean;
  error: string | null;
}

export function useFetchSongs() {
  const [state, setState] = useState<FetchSongsState>({
    songs: [],
    totalSongs: 0,
    isLoading: false,
    error: null
  });

  const fetchSongs = async (playlists: SpotifyPlaylists[]) => {
    console.log('Client: Starting to fetch songs...');
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const response = await fetch('/api/songs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ playlists }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      console.log('Client: Songs fetched successfully:', data.songs);
      console.log('Client: Total songs:', data.totalSongs);
      
      setState({
        songs: data.songs,
        totalSongs: data.totalSongs,
        isLoading: false,
        error: null
      });
      
      return data.songs;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch songs';
      console.error('Client: Error fetching songs:', error);
      
      setState({
        songs: [],
        totalSongs: 0,
        isLoading: false,
        error: errorMessage
      });
      
      throw error;
    }
  };

  return {
    ...state,
    fetchSongs
  };
} 