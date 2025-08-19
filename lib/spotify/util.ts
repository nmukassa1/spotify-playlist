
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

        console.log("First batch:", firstBatch);
        
        
        let songs: PlaylistTrackItem[] = [];
        const numberOfTracksInPlaylist = firstBatch.total;
        const iterations = Math.ceil(numberOfTracksInPlaylist / limiter);
        
        console.log(`Total tracks in playlist: ${numberOfTracksInPlaylist}, fetching in ${iterations} batches`);
        
        // Add first batch to songs array
        if (firstBatch.items && Array.isArray(firstBatch.items)) {
            songs = [...songs, ...firstBatch.items];
            console.log(`Added first batch: ${firstBatch.items.length} tracks`);
        }
        
        // Fetch remaining batches
        for (let i = 1; i < iterations; i++) {
            try {
                const nextOffset = i * limiter;
                console.log(`Fetching batch ${i + 1}, offset: ${nextOffset}`);
                
                const nextBatch = await getPlaylistTracks(playlistUrl + `?offset=${nextOffset}`);
                
                if (nextBatch && nextBatch.items && Array.isArray(nextBatch.items)) {
                    songs = [...songs, ...nextBatch.items];
                    console.log(`Added batch ${i + 1}: ${nextBatch.items.length} tracks`);
                }
            } catch (error) {
                console.error(`Error fetching batch ${i + 1}:`, error);
                break; // Stop fetching if there's an error
            }
        }
        
        console.log(`Total songs fetched: ${songs.length}`);
        return songs;
        
    } catch (error) {
        console.error("Error in fetchAllPlaylistTracks:", error);
        return [];
    }
}