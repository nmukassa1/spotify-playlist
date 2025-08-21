import { Button } from "@/components/ui/button"
import { Play, ArrowRight } from "lucide-react"
import Link from "next/link"
import {
  SignedIn,
  SignedOut,
} from '@clerk/nextjs'

export default async function CTASection() {
  
 

  return (
    <section className="py-16 bg-gradient-to-r from-spotify-green/10 to-spotify-green/5">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Music?</h2>
        <p className="text-xl text-spotify-gray-light mb-8 max-w-2xl mx-auto">
          Join thousands of music lovers who&apos;ve discovered their new favorite songs through AI-powered playlists.
        </p>

        <SignedIn>
          <Link href="/dashboard">
            <Button size="lg" className="bg-spotify-green hover:bg-spotify-green-dark text-black font-semibold">
              <Play className="w-5 h-5 mr-2" />
              Go to Dashboard
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </SignedIn>

        <SignedOut>
          <Link href="/auth/sign-up">
            <Button size="lg" className="bg-spotify-green hover:bg-spotify-green-dark text-black font-semibold">
              <Play className="w-5 h-5 mr-2" />
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          </SignedOut>
      </div>
    </section>
  )
}
