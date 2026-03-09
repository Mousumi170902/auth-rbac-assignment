import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getPublicContent, getUserContent, getAdminContent } from '../api/axios';

interface Content {
  message: string;
  content: string;
  accessLevel: string;
}

export function DashboardPage() {
  const { user } = useAuth();
  const [publicData, setPublicData] = useState<Content | null>(null);
  const [roleData, setRoleData] = useState<Content | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        setError('');

        // Always fetch public content
        const pubRes = await getPublicContent();
        setPublicData(pubRes.data);

        // Fetch role-specific content
        if (user?.role === 'ADMIN') {
          const adminRes = await getAdminContent();
          setRoleData(adminRes.data);
        } else if (user?.role === 'USER') {
          const userRes = await getUserContent();
          setRoleData(userRes.data);
        }
      } catch {
        setError('Failed to load content. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-indigo-600 text-lg font-medium animate-pulse">Loading content...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome, {user?.name}!
        </h1>
        <p className="text-gray-500 mt-1">
          Logged in as <span className="font-semibold text-indigo-600">{user?.email}</span> ·{' '}
          <span className={`font-semibold ${user?.role === 'ADMIN' ? 'text-red-600' : 'text-green-600'}`}>
            {user?.role}
          </span>
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-4 mb-6">
          {error}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {/* Public Content Card — always visible */}
        {publicData && (
          <div className="bg-white rounded-xl shadow p-6 border-t-4 border-gray-400">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🌐</span>
              <h2 className="text-lg font-bold text-gray-700">{publicData.message}</h2>
            </div>
            <p className="text-gray-500 text-sm">{publicData.content}</p>
            <span className="mt-3 inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full font-medium">
              {publicData.accessLevel}
            </span>
          </div>
        )}

        {/* Role-specific Content Card */}
        {roleData && (
          <div className={`bg-white rounded-xl shadow p-6 border-t-4 ${
            user?.role === 'ADMIN' ? 'border-red-500' : 'border-green-500'
          }`}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">{user?.role === 'ADMIN' ? '🛡️' : '👤'}</span>
              <h2 className="text-lg font-bold text-gray-700">{roleData.message}</h2>
            </div>
            <p className="text-gray-500 text-sm">{roleData.content}</p>
            <span className={`mt-3 inline-block text-xs px-2 py-1 rounded-full font-medium ${
              user?.role === 'ADMIN'
                ? 'bg-red-100 text-red-600'
                : 'bg-green-100 text-green-600'
            }`}>
              {roleData.accessLevel}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
