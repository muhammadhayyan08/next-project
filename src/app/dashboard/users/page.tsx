"use client";

import { useState, useEffect } from "react";
import { useAuth } from '@/context/AuthContext';
import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from '@/lib/firebase';
import { User as FirebaseUser } from 'firebase/auth';

interface UserData {
  id: string;
  email: string;
  displayName: string;
  role: string;
  status: string;
  createdAt: string;
  lastLogin: string;
  emailVerified: boolean;
}

export default function UsersPage() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  
  const fetchUsers = async () => {
    try {
      setLoading(true);
      
      
      const usersCollection = collection(db, 'users');
      const usersSnapshot = await getDocs(usersCollection);
      const usersList = usersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as UserData[];
      
      setUsers(usersList);
    } catch (err: any) {
      console.error("Error fetching users:", err);
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  
  const getAuthUsersInfo = () => {
    
    const sampleUsers: UserData[] = [
      {
        id: currentUser?.uid || '1',
        email: currentUser?.email || 'current@user.com',
        displayName: currentUser?.displayName || 'Current User',
        role: 'Admin',
        status: 'Active',
        createdAt: currentUser?.metadata.creationTime || new Date().toISOString(),
        lastLogin: currentUser?.metadata.lastSignInTime || new Date().toISOString(),
        emailVerified: currentUser?.emailVerified || true
      },
      {
        id: '2',
        email: 'john@example.com',
        displayName: 'John Doe',
        role: 'User',
        status: 'Active',
        createdAt: new Date('2024-01-01').toISOString(),
        lastLogin: new Date().toISOString(),
        emailVerified: true
      },
      {
        id: '3',
        email: 'jane@example.com',
        displayName: 'Jane Smith',
        role: 'User',
        status: 'Inactive',
        createdAt: new Date('2024-01-02').toISOString(),
        lastLogin: new Date('2024-01-10').toISOString(),
        emailVerified: true
      }
    ];
    setUsers(sampleUsers);
    setLoading(false);
  };

  useEffect(() => {
    
    fetchUsers().catch(() => {
      
      getAuthUsersInfo();
    });
  }, []);

  const updateUserRole = async (userId: string, newRole: string) => {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, { role: newRole });
      
      // Update local state
      setUsers(prev => prev.map(user => 
        user.id === userId ? { ...user, role: newRole } : user
      ));
    } catch (err: any) {
      console.error("Error updating user:", err);
      setError("Failed to update user role");
    }
  };

  const toggleUserStatus = async (userId: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, { status: newStatus });
      
      
      setUsers(prev => prev.map(user => 
        user.id === userId ? { ...user, status: newStatus } : user
      ));
    } catch (err: any) {
      console.error("Error updating user status:", err);
      setError("Failed to update user status");
    }
  };

  const deleteUser = async (userId: string, userEmail: string) => {
    if (!window.confirm(`Are you sure you want to delete user ${userEmail}?`)) {
      return;
    }

    try {
      
      const userRef = doc(db, 'users', userId);
      await deleteDoc(userRef);
      
      
      setUsers(prev => prev.filter(user => user.id !== userId));
    } catch (err: any) {
      console.error("Error deleting user:", err);
      setError("Failed to delete user");
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Users Management</h2>
            <div className="w-32 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-16 bg-gray-100 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Users Management</h2>
        <div className="flex gap-3">
          <button 
            onClick={fetchUsers}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
          >
            Refresh
          </button>
          <button className="bg-[#2E4A62] text-white px-4 py-2 rounded-lg hover:bg-[#203345] transition">
            Add User
          </button>
        </div>
      </div>

      
      {currentUser && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Your Account</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="font-medium">Email:</span>
              <p className="text-blue-700">{currentUser.email}</p>
            </div>
            <div>
              <span className="font-medium">Role:</span>
              <p className="text-blue-700">Admin</p>
            </div>
            <div>
              <span className="font-medium">Status:</span>
              <p className="text-blue-700">Active</p>
            </div>
            <div>
              <span className="font-medium">Verified:</span>
              <p className="text-blue-700">{currentUser.emailVerified ? 'Yes' : 'No'}</p>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-600 text-center">{error}</p>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email Verified
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-[#2E4A62] rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3">
                        {user.email?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {user.displayName || 'No Name'}
                        </div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={user.role}
                      onChange={(e) => updateUserRole(user.id, e.target.value)}
                      className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#2E4A62]"
                      disabled={user.id === currentUser?.uid}
                    >
                      <option value="Admin">Admin</option>
                      <option value="User">User</option>
                      <option value="Moderator">Moderator</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleUserStatus(user.id, user.status)}
                      className={`px-2 py-1 text-xs font-semibold rounded-full transition ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-800 hover:bg-green-200"
                          : "bg-red-100 text-red-800 hover:bg-red-200"
                      }`}
                      disabled={user.id === currentUser?.uid}
                    >
                      {user.status}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.emailVerified
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {user.emailVerified ? "Verified" : "Pending"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.lastLogin).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      className="text-indigo-600 hover:text-indigo-900 mr-3 transition"
                      
                    >
                      Edit
                    </button>
                    <button 
                      className="text-red-600 hover:text-red-900 transition"
                      onClick={() => deleteUser(user.id, user.email)}
                      disabled={user.id === currentUser?.uid}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {users.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">👥</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
            <p className="text-gray-500">Get started by creating your first user.</p>
          </div>
        )}
      </div>

      {/* Stats Summary */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-gray-800">{users.length}</div>
          <div className="text-sm text-gray-600">Total Users</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-green-600">
            {users.filter(u => u.status === 'Active').length}
          </div>
          <div className="text-sm text-gray-600">Active Users</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-blue-600">
            {users.filter(u => u.role === 'Admin').length}
          </div>
          <div className="text-sm text-gray-600">Admins</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-yellow-600">
            {users.filter(u => !u.emailVerified).length}
          </div>
          <div className="text-sm text-gray-600">Pending Verification</div>
        </div>
      </div>
    </div>
  );
}