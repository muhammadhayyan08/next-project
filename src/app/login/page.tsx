"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '@/lib/firebase';
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      
      
      console.log("User logged in successfully:", user.email);
      router.push("/dashboard");
    } catch (err: any) {
      console.error("Login error:", err);
      
      
      if (err.code === 'auth/invalid-credential') {
        setError("Invalid email or password. Please try again.");
      } else if (err.code === 'auth/user-not-found') {
        setError("No account found with this email.");
      } else if (err.code === 'auth/wrong-password') {
        setError("Incorrect password. Please try again.");
      } else if (err.code === 'auth/too-many-requests') {
        setError("Too many failed attempts. Please try again later.");
      } else if (err.code === 'auth/invalid-email') {
        setError("Please enter a valid email address.");
      } else {
        setError("Failed to login. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-gray-100">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-8">
          <img 
            src="/logo.png" 
            alt="Company Logo" 
            className="h-16 w-auto mb-4"
          />
          
        </div>

        <h1 className="text-center text-3xl font-bold mb-8 text-gray-800">
          Welcome Back
        </h1>

        <form onSubmit={handleLogin} className="space-y-6">
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-4 border border-gray-300 text-black rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E4A62] focus:border-transparent transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-gray-700 font-medium">
                Password
              </label>
              <Link 
                href="/forgot-password" 
                className="text-sm text-[#2E4A62] hover:text-[#203345] hover:underline transition"
              >
                Forgot Password?
              </Link>
            </div>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full p-4 border border-gray-300 text-black rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E4A62] focus:border-transparent transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm text-center">{error}</p>
            </div>
          )}

          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2E4A62] text-white py-4 rounded-xl hover:bg-[#203345] transition disabled:opacity-50 disabled:cursor-not-allowed font-medium text-lg"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Signing In...
              </div>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        
        <div className="text-center mt-8 pt-6 border-t border-gray-200">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link 
              href="/signup" 
              className="text-[#2E4A62] font-semibold hover:text-[#203345] hover:underline transition"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}