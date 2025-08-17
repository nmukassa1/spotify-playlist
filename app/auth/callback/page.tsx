"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
// import { supabase } from "@/lib/supabase/client"

export default function AuthCallback() {
  const router = useRouter()


useEffect(() => {
    const handleCallback = async () => {
      const hash = window.location.hash.substring(1)
      const params = new URLSearchParams(hash)
      const accessToken = params.get("access_token")
      const refreshToken = params.get("refresh_token")

      if (accessToken && refreshToken) {
        // Send tokens to server to set cookies
        const res = await fetch("/api/auth/set-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ accessToken, refreshToken }),
        })

        if (res.ok) {
            console.log("Session created");
            
          router.replace("/dashboard")
        } else {
          router.replace("/auth/login?error=session_error")
        }
      } else {
        // Redirect to verify email
        router.replace("/auth/verify")
      }
    }

    handleCallback()
  }, [router])


  return (
    <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Completing sign in...</h1>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
      </div>
    </div>
  )
} 