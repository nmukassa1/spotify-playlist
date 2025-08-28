"use server";

import { currentUser } from "@clerk/nextjs/server";

export interface SpotifyAccount {
  id: string;
  externalId: string; // This is the Spotify user ID
  username?: string | null;
  provider: string;
}

export async function getSpotifyAccount(): Promise<SpotifyAccount | null> {
  try {
    const user = await currentUser();

    if (!user) {
      return null;
    }

    const spotifyAccount = user.externalAccounts.find(
      (account) => account.provider === "oauth_spotify"
    );

    if (!spotifyAccount) {
      return null;
    }

    return {
      id: spotifyAccount.id,
      externalId: spotifyAccount.externalId,
      username: spotifyAccount.username ?? null,
      provider: spotifyAccount.provider,
    };
  } catch (error) {
    console.error("Error fetching Spotify account:", error);
    return null;
  }
}

export async function getAccessToken() {
  try {
    const clientId = process.env.AUTH_SPOTIFY_ID;
    const clientSecret = process.env.AUTH_SPOTIFY_SECRET;

    if (!clientId || !clientSecret) {
      throw new Error(
        "Missing Spotify client ID or secret in environment variables."
      );
    }

    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
      "base64"
    );

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });

    if (!response.ok) {
      console.error(response);
      throw new Error(
        `Failed to fetch access token: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log("Access token:", data);

    return data.access_token; // { access_token, token_type, expires_in }
  } catch (err) {
    console.error(err);
    return null;
  }
}
