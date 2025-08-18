"use server"

// import { createClient } from "@/lib/supabase/server"
// import { redirect } from "next/navigation"
// import { cookies } from "next/headers"

// export async function signInWithOAuth(provider: "spotify") {
  // const supabase = await createClient()
  

  // const { data } = await supabase.auth.signInWithOAuth({
  //   provider,
  //   options: {
  //     redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
  //   }
  // })

  // if (error) {
  //   console.error("OAuth error:", error)
  //   redirect("/auth/login?error=oauth_error")
  // }
  
  // if (data.url) {
  //   console.log("OAuth URL:", data.url);
  //   redirect(data.url)
  // }
  
  // If no URL is returned, something went wrong
  // redirect("/auth/login?error=no_oauth_url")
// }

// export async function signOut() {
//   const supabase = await createClient()
//   await supabase.auth.signOut()

//   // Delete the Supabase access/refresh token cookies using Next.js cookies API
//   const cookieStore = await cookies()
//   cookieStore.delete("sb-access-token")
//   cookieStore.delete("sb-refresh-token")

//   redirect("/auth/login")
// }