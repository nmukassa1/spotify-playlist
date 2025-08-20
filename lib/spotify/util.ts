
import { PlaylistTrackItem } from "@/lib/spotify/types";
import { getPlaylistTracks } from "./queries";

// export async function groupTracksIntoOne(playlists){

// }




// Function to fetch all tracks from a playlist since Spotify returns 100 items at a time
export async function fetchAllPlaylistTracks(playlistUrl: string): Promise<PlaylistTrackItem[]> {
    const limiter = 100; // Spotify returns 100 items per batch by default
    const offset = 0; // Index of first item to return
    
    try {
        // Fetch first batch
        const firstBatch = await getPlaylistTracks(playlistUrl + `?offset=${offset}`);
        
        if (!firstBatch) {
            console.error("Failed to fetch first batch of tracks");
            return [];
        }
        
        let songs: PlaylistTrackItem[] = [];
        const numberOfTracksInPlaylist = firstBatch.total;
        const iterations = Math.ceil(numberOfTracksInPlaylist / limiter);
    
        
        // Add first batch to songs array
        if (firstBatch.items && Array.isArray(firstBatch.items)) {
            songs = [...songs, ...firstBatch.items];
        }
        
        // Fetch remaining batches
        for (let i = 1; i < iterations; i++) {
            try {
                const nextOffset = i * limiter;
                
                const nextBatch = await getPlaylistTracks(playlistUrl + `?offset=${nextOffset}`);
                
                if (nextBatch && nextBatch.items && Array.isArray(nextBatch.items)) {
                    songs = [...songs, ...nextBatch.items];
                }
            } catch (error) {
                console.error(`Error fetching batch ${i + 1}:`, error);
                break; // Stop fetching if there's an error
            }
        }
        
        return songs;
        
    } catch (error) {
        console.error("Error in fetchAllPlaylistTracks:", error);
        return [];
    }
}