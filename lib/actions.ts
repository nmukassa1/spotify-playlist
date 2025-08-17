"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export async function signInWithOAuth() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "spotify",
    // options: {
    //   redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
    // }
  })

  if (error) {
    console.error("OAuth error:", error)
    redirect("/auth/login?error=oauth_error")
  }

  if (data?.url) {
    console.log("OAuth Redirect url: ", data.url);
    
    redirect(data.url)
  }

  redirect("/auth/login?error=no_oauth_url")
}


export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect("/auth/login")
}