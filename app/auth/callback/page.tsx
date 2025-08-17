// app/auth/callback/page.tsx
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function AuthCallback() {
  const supabase = await createClient()

  const { data: { session }, error } = await supabase.auth.getSession()

  if (error || !session) {
    console.log("Session error: ", error);
    
    redirect("/auth/login?error=session_error")
  }

  // ✅ Session is set via Supabase cookies
  redirect("/dashboard")
}