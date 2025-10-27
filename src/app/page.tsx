import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white text-black px-4">
      
      <div className="flex flex-col items-center mb-8">
        <img
          src="/logo.png"
          alt="Company Logo"
          className="h-20 w-auto mb-2"
        />
        
      </div>

      {/* Welcome Message */}
      <h1 className="text-4xl font-bold mb-6">Welcome <br/> Nice to see you here</h1>

      <p className="text-gray-600 mb-8 text-center max-w-md">
        Sign in or create an account to continue.
      </p>

      
      <div className="flex gap-4">
        <Link
          href="/login"
          className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
        >
          Login
        </Link>
        <Link
          href="/signup"
          className="px-6 py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-900 transition"
        >
          Sign Up
        </Link>
      </div>
    </main>
  );
}
