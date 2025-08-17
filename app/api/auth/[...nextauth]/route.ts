import { handlers } from "@/auth" // Referring to the auth.ts we just created
export const { POST } = handlers

export async function GET() {
  // return Response.redirect("https://accounts.spotify.com/authorize?scope=user-read-email,user-read-private,user-top-read");
  return new Response('working', { status: 200 });
}