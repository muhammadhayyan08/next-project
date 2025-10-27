"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from '@/context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAuth();

  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: "📊" },
    { name: "Users", href: "/dashboard/users", icon: "👥" },
    { name: "Posts", href: "/dashboard/posts", icon: "📝" },
  ];

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-[#2E4A62] text-white transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-gray-600">
          <div className="flex items-center space-x-3">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-8 w-auto"
            />
            {isSidebarOpen && (
              <span className="text-xl font-bold"></span>
            )}
          </div>
        </div>

        
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition ${
                    pathname === item.href
                      ? "bg-[#203345] text-white"
                      : "text-gray-300 hover:bg-[#203345] hover:text-white"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  {isSidebarOpen && (
                    <span className="font-medium">{item.name}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        
        {isSidebarOpen && (
          <div className="p-4 border-t border-gray-600">
            <div className="text-sm">
              <p className="font-medium truncate">{user.email}</p>
              <p className="text-gray-400 text-xs">
                {user.emailVerified ? 'Verified' : 'Not Verified'}
              </p>
            </div>
          </div>
        )}

        
        <div className="p-4 border-t border-gray-600">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full flex items-center justify-center p-2 text-gray-300 hover:text-white transition"
          >
            {isSidebarOpen ? "◀" : "▶"}
          </button>
        </div>
      </div>

      
      <div className="flex-1 flex flex-col overflow-hidden">
        
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between p-4">
            <h1 className="text-2xl font-semibold text-gray-800">
              {menuItems.find(item => item.href === pathname)?.name || 'Dashboard'}
            </h1>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-gray-800">
                🔔
              </button>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-700">
                    {user.displayName || user.email?.split('@')[0]}
                  </p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <div className="w-10 h-10 bg-[#2E4A62] rounded-full flex items-center justify-center text-white font-semibold">
                  {user.email?.charAt(0).toUpperCase()}
                </div>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 text-sm bg-black hover:bg-gray-200 rounded-lg transition"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}