# Playlist Architecture Documentation

## Overview
The playlist functionality has been refactored into a modular, maintainable architecture that separates concerns and promotes reusability. The system now properly separates server-side and client-side concerns.

## File Structure

### Core Services
- **`lib/spotify/playlistService.ts`** - Main service for playlist operations
- **`lib/spotify/playlistUtils.ts`** - Utility functions for playlist data formatting
- **`lib/spotify/queries.ts`** - Server-side functions for data fetching

### API Routes
- **`app/api/songs/route.ts`** - API endpoint for fetching songs from playlists

### React Hooks
- **`lib/hooks/usePlaylistTracks.ts`** - React hook for managing playlist tracks state
- **`lib/hooks/useFetchSongs.ts`** - Client-side hook for fetching songs via API

### Components
- **`app/components/Playlists.tsx`** - Main playlist display component (server-side)
- **`app/components/FetchSongsButton.tsx`** - Client component for triggering song fetching

## Key Functions

### playlistService.ts
- `fetchPlaylistTracks(playlist)` - Fetches tracks from a single playlist
- `fetchAllPlaylistsTracks(playlists)` - Fetches tracks from multiple playlists
- `extractTrackObjects(playlistTracksData)` - Extracts track objects from playlist data
- `createSongNamesWithArtists(tracks)` - Creates formatted song names with artists
- `getAllPlaylistTracksData(playlists)` - Main function that orchestrates the entire flow

### playlistUtils.ts
- `formatPlaylistMetadata(playlist)` - Formats playlist metadata for display
- `getPlaylistCover(playlist)` - Gets playlist cover image or fallback
- `hasAccessibleTracks(playlist)` - Validates playlist track accessibility
- `createPlaylistSummary(playlists)` - Creates summary statistics

### API Route
- **`POST /api/songs`** - Accepts playlists data and returns all songs

### useFetchSongs Hook
- Manages client-side state for song fetching
- Calls the API endpoint
- Provides loading, error, and success states
- **Client-side logging** - All console.logs appear in browser console

## Server vs Client Architecture

### Server-Side (queries.ts)
- Runs on the server
- Console logs appear in server terminal/logs
- Handles heavy data processing
- Access to server environment variables

### Client-Side (useFetchSongs hook)
- Runs in the browser
- Console logs appear in browser console
- Manages UI state and user interactions
- Calls server API endpoints

## Benefits of This Architecture

1. **Separation of Concerns**: Server handles data processing, client handles UI
2. **Proper Logging**: Server logs in terminal, client logs in browser console
3. **Reusability**: Functions can be imported and used across different components
4. **Maintainability**: Easier to debug and modify specific functionality
5. **Testability**: Individual functions can be unit tested
6. **Type Safety**: Proper TypeScript interfaces throughout
7. **Error Handling**: Centralized error handling with graceful fallbacks
8. **Performance**: Heavy processing stays on server, UI updates happen on client

## Usage Example

```typescript
// In a client component
import { useFetchSongs } from '@/lib/hooks/useFetchSongs';

function MyComponent() {
  const { songs, totalSongs, isLoading, error, fetchSongs } = useFetchSongs();
  
  const handleClick = async () => {
    console.log('Client: Starting fetch...'); // Shows in browser console
    await fetchSongs(playlists);
  };
  
  return <button onClick={handleClick}>Fetch Songs</button>;
}

// Server-side (queries.ts)
export async function fetchSongs(playlists: SpotifyPlaylists[]): Promise<string[]> {
  console.log('Server: Fetching songs...'); // Shows in server terminal
  // ... implementation
}
```

## Data Flow

1. **User Interaction**: Client component triggers song fetching
2. **API Call**: Client calls `/api/songs` endpoint
3. **Server Processing**: Server processes playlists and fetches tracks
4. **Response**: Server returns processed song data
5. **Client Update**: Client updates UI with new data
6. **Logging**: Server logs in terminal, client logs in browser console

## Error Handling

- Individual playlist failures don't break the entire operation
- Graceful fallbacks for missing data
- Comprehensive error logging on both server and client
- User-friendly error states in the UI
- Network error handling for API calls

## Debugging Tips

- **Server logs**: Check your terminal/console where Next.js is running
- **Client logs**: Check browser developer tools console
- **API errors**: Check Network tab in browser dev tools
- **State debugging**: Use React DevTools to inspect component state 