import NextAuth from "next-auth"
import Spotify from "next-auth/providers/spotify"

declare module "next-auth" {
  interface Session {
    accessToken?: string
  }
}
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Spotify({
      clientId: process.env.AUTH_SPOTIFY_ID!,
      clientSecret: process.env.AUTH_SPOTIFY_SECRET!,
      authorization: {
        url: "https://accounts.spotify.com/authorize",
        params: {
          scope: "user-read-playback-state user-modify-playback-state streaming user-library-read playlist-read-private playlist-read-collaborative user-read-currently-playing user-read-email user-read-private",
        }, 
      },
    })
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
      }
      return token
    },
    async session({ session, token }) {
      session.accessToken = typeof token.accessToken === "string" ? token.accessToken : undefined
      return session
    }
  }
})

