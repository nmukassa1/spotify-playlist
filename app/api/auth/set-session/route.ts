// app/api/auth/set-session/route.ts
import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(req: Request) {
  const { accessToken, refreshToken } = await req.json()
  const supabase = await createClient()

  // Manually set the session in the server client (this sets cookies)
  const {  error } = await supabase.auth.setSession({
    access_token: accessToken,
    refresh_token: refreshToken,
  })

  // Set the access and refresh tokens as HttpOnly cookies using NextResponse
  // (expires in 7 days for refresh, 1 hour for access)
  const accessTokenExpires = 60 * 60 // 1 hour
  const refreshTokenExpires = 60 * 60 * 24 * 7 // 7 days

  const response = NextResponse.json({ ok: true })

  response.cookies.set("sb-access-token", accessToken, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: accessTokenExpires,
  })

  response.cookies.set("sb-refresh-token", refreshToken, {
    httpOnly: true,
    secure: true,
    // secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: refreshTokenExpires,
  })

  return response

  if (error) {
    // return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json({ error:"Error setting session" }, { status: 400 })
  }

  

  return NextResponse.json({ ok: true })
}