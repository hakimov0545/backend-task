import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { dark, toggleDark } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-lg text-sky-500">
          <span className="text-2xl">⚡</span>
          <span>TaskFlow</span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Dark mode toggle */}
          <button
            onClick={toggleDark}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Dark mode toggle"
          >
            {dark ? '☀️' : '🌙'}
          </button>

          {user && (
            <>
              <Link
                to="/categories"
                className="hidden sm:block text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                Kategoriyalar
              </Link>
              <span className="hidden sm:block text-sm text-gray-500">
                👤 {user.name}
              </span>
              <button onClick={handleLogout} className="btn-danger text-sm py-1.5">
                Chiqish
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
