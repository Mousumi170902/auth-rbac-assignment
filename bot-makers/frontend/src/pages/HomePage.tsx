import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function HomePage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-white text-center px-4">
      <h1 className="text-4xl font-extrabold text-indigo-700 mb-4">
        Full Stack Auth & RBAC System
      </h1>
      <p className="text-gray-500 max-w-md mb-8 text-lg">
        JWT-based authentication with role-based access control. Register as a <strong>USER</strong> or <strong>ADMIN</strong> to explore protected content.
      </p>
      <div className="flex gap-4">
        {isAuthenticated ? (
          <Link
            to="/dashboard"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Go to Dashboard
          </Link>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="border-2 border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
