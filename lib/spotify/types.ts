export interface Playlist {
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

export interface SpotifyPlaylistTracksResponse {
  href: string;
  items: TrackParentNode[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}

export interface TrackParentNode {
  added_at: string; // ISO timestamp when the track was added
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
    id: string;
    name: string;
    uri: string;
    preview_url: string | null;
    explicit: boolean;
    available_markets: string[];
    type: string; // "track"
    episode: boolean;
    album: {
      id: string;
      name: string;
      release_date: string;
      release_date_precision: string;
      images: {
        url: string;
        height: number;
        width: number;
      }[];
      external_urls: {
        spotify: string;
      };
    };
    artists: {
      id: string;
      name: string;
      uri: string;
      external_urls: {
        spotify: string;
      };
      href: string;
      type: string;
    }[];
    duration_ms: number;
    popularity: number;
    external_urls: {
      spotify: string;
    };
    href: string;
  };
  video_thumbnail: {
    url: string | null;
  };
}
export interface TrackObject {
  id: string;
  name: string;
  href: string;
  artists: {
    id: string;
    name: string;
    href: string;
  }[];
}
