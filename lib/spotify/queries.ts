"use server"
import { getAccessToken, getSpotifyAccount } from "./auth";

export async function getPlaylists() {
  const spotifyAccount = await getSpotifyAccount();
  const userId = spotifyAccount?.externalId;
  const accessToken = await getAccessToken();

  try {
    const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      headers: {
        // Authorization: `Bearer ${process.env.AUTH_SPOTIFY_SECRET}`
        Authorization: `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      console.log(response);
      
      throw new Error(`Failed to fetch playlists: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function getPlaylist(playlistLink: string){
  const accessToken = await getAccessToken();
  try {
    const response = await fetch(playlistLink, {
      headers: {
        // Authorization: `Bearer ${process.env.AUTH_SPOTIFY_SECRET}`
        Authorization: `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      console.log(response);
      
      throw new Error(`Failed to fetch playlist: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
}