// import { createClient } from "@supabase/supabase-js"
import { createClient } from "@supabase/supabase-js"
import { NextResponse, type NextRequest } from "next/server"

// Check if Supabase environment variables are available
export const isSupabaseConfigured =
  typeof process.env.NEXT_PUBLIC_SUPABASE_URL === "string" &&
  process.env.NEXT_PUBLIC_SUPABASE_URL.length > 0 &&
  typeof process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY === "string" &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.length > 0

export async function updateSession(request: NextRequest) {
  // If Supabase is not configured, just continue without auth
  if (!isSupabaseConfigured) {
    return NextResponse.next({
      request,
    })
  }

  const res = NextResponse.next()
  const requestUrl = new URL(request.url)
  const pathname = requestUrl.pathname

  // Skip auth check for auth-related routes
  if (pathname.startsWith("/auth/")) {
    return res
  }

  // Only check session for protected routes
  const isProtectedRoute = pathname.startsWith("/dashboard")

  if (isProtectedRoute) {
    try {
      // Create a Supabase client configured to use cookies from the request
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          auth: {
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: false,
          },
          global: {
            headers: {
              cookie: request.headers.get('cookie') || '',
            },
          },
        }
      )

      // Debug: Log the cookies being sent
      const cookies = request.headers.get('cookie') || ''
      console.log("Middleware - Cookies received:", cookies)

      // Get the session from cookies
      const { data: { session } } = await supabase.auth.getSession()
      console.log("Middleware - Protected route:", pathname, "Session:", session ? "Valid" : "None")
      
      if (!session) {
        console.log("Middleware - No session, redirecting to login")
        const redirectUrl = new URL("/auth/login", request.url)
        return NextResponse.redirect(redirectUrl)
      }
    } catch (error) {
      console.error("Session check error:", error)
      const redirectUrl = new URL("/auth/login?error=session_error", request.url)
      return NextResponse.redirect(redirectUrl)
    }
  }

  return res
}
