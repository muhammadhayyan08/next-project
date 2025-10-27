"use client";

import { useAuth } from '@/context/AuthContext';

export default function DashboardPage() {
  const { user } = useAuth();

  const userStats = [
    { label: "Email", value: user?.email || "N/A" },
    { label: "Email Verified", value: user?.emailVerified ? "Yes" : "No" },
    { label: "Account Created", value: user?.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : "N/A" },
    { label: "Last Sign In", value: user?.metadata.lastSignInTime ? new Date(user.metadata.lastSignInTime).toLocaleDateString() : "N/A" },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome back, {user?.displayName || user?.email?.split('@')[0]}!
          </h2>
          <p className="text-gray-600">
            Here's your dashboard overview and account information.
          </p>
        </div>

        
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Account Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userStats.map((stat, index) => (
              <div key={index} className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-medium text-gray-700">{stat.label}:</span>
                <span className="text-gray-900">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}