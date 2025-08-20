"use server"
import { getAccessToken, getSpotifyAccount } from "./auth";
import { AudioFeature, SpotifyPlaylists, TrackParentNode } from "@/lib/spotify/types";

export async function getPlaylists(): Promise<SpotifyPlaylists[] | null> {
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
      console.error(response);
      
      throw new Error(`Failed to fetch playlists: ${response.status} ${response.statusText}`);
    }
    

    const {items: playlists} = await response.json();

    // console.log("Playlists: ", playlists);
    
    return playlists;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function getPlaylistTracks(playlistLink: string): Promise<TrackParentNode | null>{
  const accessToken = await getAccessToken();
  try {
    const response = await fetch(playlistLink, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      console.error(response);
      
      throw new Error(`Failed to fetch playlist: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function getAudioFeature(trackId: string): Promise<AudioFeature | null>{
  const accessToken = await getAccessToken();
  console.log("Access token", accessToken);
  console.log("Track id for fetch", trackId);
  
  
  const fetctUrl = "https://api.spotify.com/v1/audio-features/" + trackId
  try {
    const response = await fetch(fetctUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      console.error(response);
      
      throw new Error(`Failed to fetch audio feature for song: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Audi Feature:", data);
    
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
}