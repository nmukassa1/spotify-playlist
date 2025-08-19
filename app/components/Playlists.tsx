import { getPlaylistTracks, getPlaylists } from "@/lib/spotify/queries";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, MoreHorizontal, Music, Clock, ExternalLink } from "lucide-react";
import Image from "next/image";
import { PlaylistTrackItem, SpotifyPlaylists } from "@/lib/spotify/types";

// Function to fetch all tracks from a playlist
async function fetchAllPlaylistTracks(playlistUrl: string): Promise<PlaylistTrackItem[]> {
    const limiter = 20; // Default amount of songs returned per batch
    const offset = 0; // Index of first item to return
    
    try {
        // Fetch first batch
        const firstBatch = await getPlaylistTracks(playlistUrl + `?offset=${offset}&limit=${limiter}`);
        
        if (!firstBatch) {
            console.error("Failed to fetch first batch of tracks");
            return [];
        }
        
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
                
                const nextBatch = await getPlaylistTracks(playlistUrl + `?offset=${nextOffset}&limit=${limiter}`);
                
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

async function Playlists() {
    const playlists: SpotifyPlaylists[] | null = await getPlaylists();
    
    console.log(playlists);
    
    // Check if playlists exist and have content
    if (!playlists || playlists.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No playlists found</p>
            </div>
        );
    }

    // Fetch all tracks from the first playlist
    let songs: PlaylistTrackItem[] = [];
    
    try {
        if (playlists[0] && playlists[0].tracks && playlists[0].tracks.href) {
            const playlistUrl = playlists[0].tracks.href;
            songs = await fetchAllPlaylistTracks(playlistUrl);
            
            if (songs.length > 0) {
                console.log("Songs:", songs[42]);
            }
        }
    } catch (error) {
        console.error("Error fetching playlist tracks:", error);
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 md:gap-6">
            {playlists.map((playlist: SpotifyPlaylists) => (
                <Card
                    key={playlist.id}
                    className="bg-[#282828] border-[#3E3E3E] hover:bg-[#3E3E3E] transition-colors group cursor-pointer"
                >
                    <CardContent className="p-3 md:p-4">
                        {/* Mobile: Vertical layout, Desktop: Horizontal layout */}
                        <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                            {/* Playlist Cover */}
                            <div className="relative self-center sm:self-start">
                                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center overflow-hidden">
                                    {playlist.images && playlist.images.length > 0 ? (
                                        <Image
                                            src={playlist.images[0].url}
                                            alt={playlist.name}
                                            width={80}
                                            height={80}
                                            className="rounded-lg object-cover w-full h-full"
                                        />
                                    ) : (
                                        <Music className="h-8 w-8 text-gray-400" />
                                    )}
                                </div>
                                <Button
                                    size="icon"
                                    className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                                >
                                    <Play className="h-3 w-3 sm:h-4 sm:w-4 fill-current" />
                                </Button>
                            </div>

                            {/* Playlist Info */}
                            <div className="flex-1 min-w-0 text-center sm:text-left">
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2">
                                    <div className="mb-2 sm:mb-0">
                                        <h3 className="font-bold text-white truncate text-base sm:text-lg">
                                            {playlist.name}
                                        </h3>
                                        <p className="text-[#B3B3B3] text-sm line-clamp-2 sm:line-clamp-1">
                                            {playlist.description || "No description"}
                                        </p>
                                    </div>
                                    <div className="flex gap-1 self-center sm:self-start">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-[#B3B3B3] hover:text-white hover:bg-[#3E3E3E]"
                                            asChild
                                        >
                                            <a href={playlist.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                                                <ExternalLink className="h-4 w-4" />
                                            </a>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-[#B3B3B3] hover:text-white hover:bg-[#3E3E3E]"
                                        >
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>

                                {/* Metadata */}
                                <div className="flex items-center justify-center sm:justify-start gap-3 text-[#B3B3B3] text-sm mb-3">
                                    <span className="flex items-center gap-1">
                                        <Music className="h-3 w-3" />
                                        {playlist.tracks.total}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        {playlist.public ? "Public" : "Private"}
                                    </span>
                                </div>

                                {/* Owner and Type Badge */}
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                    <Badge
                                        variant="secondary"
                                        className="bg-[#1DB954]/20 text-[#1DB954] border-[#1DB954]/30 text-xs self-center sm:self-start"
                                    >
                                        {playlist.owner.display_name}
                                    </Badge>
                                    <span className="text-[#B3B3B3] text-xs">
                                        {playlist.collaborative ? "Collaborative" : "Personal"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

export default Playlists;