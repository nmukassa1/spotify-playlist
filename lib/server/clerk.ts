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
      account => account.provider === "oauth_spotify"
    );

    if (!spotifyAccount) {
      return null;
    }

    return {
      id: spotifyAccount.id,
      externalId: spotifyAccount.externalId,
      username: spotifyAccount.username,
      provider: spotifyAccount.provider
    };
  } catch (error) {
    console.error("Error fetching Spotify account:", error);
    return null;
  }
}

