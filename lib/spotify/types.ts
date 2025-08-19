export interface SpotifyPlaylists {
    id: string;
    name: string;
    description: string;
    external_urls: {
        spotify: string;
    };
    href: string;
    images: Array<{
        url: string;
        height: number;
        width: number;
    }>;
    owner: {
        display_name: string;
        external_urls: {
            spotify: string;
        };
        href: string;
        id: string;
        type: string;
    };
    primary_color: string | null;
    public: boolean;
    snapshot_id: string;
    tracks: {
        href: string;
        total: number;
    };
    type: string;
    uri: string;
    collaborative: boolean;
}

export interface TrackParentNode {
    href: string;
    items: PlaylistTrackItem[];
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
}

export interface PlaylistTrackItem {
    added_at: string;
    added_by: {
        external_urls: {
            spotify: string;
        };
        href: string;
        id: string;
        type: string;
        uri: string;
    };
    is_local: boolean;
    primary_color: string | null;
    track: {
        album: {
            available_markets: string[];
            type: string;
            album_type: string;
            href: string;
            id: string;
            images: Array<{
                height: number;
                url: string;
                width: number;
            }>;
            name: string;
            release_date: string;
            release_date_precision: string;
            total_tracks: number;
            uri: string;
        };
        artists: Array<{
            external_urls: {
                spotify: string;
            };
            href: string;
            id: string;
            name: string;
            type: string;
            uri: string;
        }>;
        available_markets: string[];
        disc_number: number;
        duration_ms: number;
        episode: boolean;
        explicit: boolean;
        external_ids: {
            isrc: string;
        };
        external_urls: {
            spotify: string;
        };
        href: string;
        id: string;
        is_local: boolean;
        name: string;
        popularity: number;
        preview_url: string | null;
        track: boolean;
        track_number: number;
        type: string;
        uri: string;
    };
    video_thumbnail: {
        url: string | null;
    };
}