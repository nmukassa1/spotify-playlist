import LoginForm from "@/components/common/login-form";


export default async function LoginPage() {

  return (
    <div className="flex min-h-screen items-center justify-center bg-spotify-dark px-4 py-12 sm:px-6 lg:px-8">
      <LoginForm />
    </div>
  )
}
