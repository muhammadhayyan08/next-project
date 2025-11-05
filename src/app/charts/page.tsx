"use client";

import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

export default function ChartsPage() {
  // Sample data
  const [userData] = useState([
    { name: 'Jan', users: 400, posts: 240 },
    { name: 'Feb', users: 300, posts: 139 },
    { name: 'Mar', users: 200, posts: 180 },
    { name: 'Apr', users: 278, posts: 190 },
    { name: 'May', users: 189, posts: 150 },
    { name: 'Jun', users: 239, posts: 200 },
  ]);

  const [categoryData] = useState([
    { name: 'Technology', value: 35 },
    { name: 'Business', value: 25 },
    { name: 'Science', value: 20 },
    { name: 'Health', value: 15 },
    { name: 'Entertainment', value: 5 },
  ]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Analytics Charts</h2>
        <p className="text-gray-600">Simple data visualizations</p>
      </div>

      {/* Bar Chart */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Users vs Posts</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={userData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="users" fill="#2E4A62" />
              <Bar dataKey="posts" fill="#00C49F" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex gap-4 mt-4 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-[#2E4A62] mr-2"></div>
            <span>Users</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-[#00C49F] mr-2"></div>
            <span>Posts</span>
          </div>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Content Categories</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

    s{/* Line Chart */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Weekly Activity</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={userData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="#2E4A62" strokeWidth={2} />
              <Line type="monotone" dataKey="posts" stroke="#FF8042" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex gap-4 mt-4 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-[#2E4A62] mr-2"></div>
            <span>Users</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-[#FF8042] mr-2"></div>
            <span>Posts</span>
          </div>
        </div>
      </div>
    </div>
  );
}