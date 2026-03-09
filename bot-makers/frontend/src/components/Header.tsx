import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-indigo-700 text-white shadow-md">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold tracking-tight">
          🔐 Auth RBAC
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          {isAuthenticated ? (
            <>
              <span className="opacity-80">
                Hi, <strong>{user?.name}</strong> ({user?.role})
              </span>
              <Link to="/dashboard" className="hover:underline">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="bg-white text-indigo-700 px-3 py-1 rounded font-semibold hover:bg-indigo-100 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link
                to="/register"
                className="bg-white text-indigo-700 px-3 py-1 rounded font-semibold hover:bg-indigo-100 transition"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
