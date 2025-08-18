"use server"

export async function getPlaylists(userId: string) {
  const accessToken = await getAccessToken()
  
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

// To get a Spotify access token, you need to use the Client Credentials Flow.
// This requires sending a POST request with grant_type=client_credentials
// and using Basic Auth with your client_id and client_secret (not Bearer).

export async function getAccessToken() {
  try {
    const clientId = process.env.AUTH_SPOTIFY_ID;
    const clientSecret = process.env.AUTH_SPOTIFY_SECRET;

    if (!clientId || !clientSecret) {
      throw new Error("Missing Spotify client ID or secret in environment variables.");
    }

    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${credentials}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: "grant_type=client_credentials"
    });

    if (!response.ok) {
      console.log(response);
      throw new Error(`Failed to fetch access token: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.access_token; // { access_token, token_type, expires_in }
  } catch (err) {
    console.error(err);
    return null;
  }
}