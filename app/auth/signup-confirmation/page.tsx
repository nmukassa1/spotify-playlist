"use client"

import Link from "next/link"

export default function SignupConfirmation() {
  return (
    <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center">
      <div className="max-w-md mx-auto text-center px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Check Your Email</h1>
          <p className="text-gray-300 text-lg">
            We&apos;ve sent you a confirmation email to complete your signup.
          </p>
        </div>
        
        <div className="bg-[#282828] rounded-lg p-6 mb-8">
          <div className="text-6xl mb-4">📧</div>
          <h2 className="text-xl font-semibold mb-2">Almost there!</h2>
          <p className="text-gray-400">
            Click the link in your email to verify your account and start using the app.
          </p>
        </div>
        
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Didn&apos;t receive the email? Check your spam folder or try signing up again.
          </p>
          
          <Link 
            href="/auth/login"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  )
} 