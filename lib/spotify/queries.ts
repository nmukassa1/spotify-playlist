"use server";
import { getAccessToken } from "./auth";
import type {
  Playlist,
  SpotifyPlaylistTracksResponse,
} from "@/lib/spotify/types";

export async function getPlaylists({
  userId,
}: {
  userId: string;
}): Promise<Playlist[] | { error: string }> {
  if (!userId) {
    const error = "No user Id provided";
    console.error(error);
    return { error };
  }

  const limiter = 50;
  const offset = 0;
  const apiEndpoint = `https://api.spotify.com/v1/users/${userId}/playlists?limit=${limiter}&offset=${offset}`;

  try {
    const accessToken = await getAccessToken();
    if (!accessToken) throw new Error("Error getting access token");

    const res = await fetch(apiEndpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      // cache: "no-store", // <- optional: avoid Next.js caching API responses
    });

    if (!res.ok) {
      throw new Error(`Spotify API error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json(); // ✅ await here

    return data.items; // ✅ plain object for client
  } catch (err) {
    console.error(err);
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function getPlaylistTracks(
  playlistId: string,
  offset = 0
): Promise<SpotifyPlaylistTracksResponse | undefined> {
  const limiter = 100;

  if (!playlistId) {
    const error = "No playlist Id provided";
    console.error(error);
    return;
  }

  const playlistUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=${limiter}&offset=${offset}`;

  try {
    const accessToken = await getAccessToken();
    if (!accessToken) throw new Error("Error getting access token");

    const res = await fetch(playlistUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      // cache: "no-store", // <- optional: avoid Next.js caching API responses
    });

    if (!res.ok) {
      throw new Error(`Spotify API error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json(); // ✅ await here
    console.log(data);

    return data; // ✅ plain object for client
  } catch (err) {
    console.error(err);
    return;
  }
}
