import { useNavigate } from 'react-router-dom';
import { Search, Bell, Sun, Moon, LogOut, User, Menu } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function Header({ dark, toggleTheme, toggleSideMenu }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="z-10 py-3 bg-white dark:bg-[#0d081d] border-b border-gray-200/50 dark:border-white/[0.06]">
      <div className="container flex items-center justify-between h-full px-6 mx-auto">
        {/* Mobile hamburger */}
        <button
          className="lg:hidden mr-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/[0.06] transition-colors text-gray-500 dark:text-gray-400"
          onClick={toggleSideMenu}
          aria-label="Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search Bar */}
        <div className="flex justify-center flex-1 lg:mr-32">
          <div className="relative w-full max-w-xl">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5">
              <Search className="w-4 h-4 text-gray-400" />
            </div>
            <input
              className="w-full py-2 pl-10 pr-4 text-sm text-gray-700 bg-gray-100 border-0 rounded-xl dark:bg-white/[0.04] dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30 hover:bg-gray-200 dark:hover:bg-white/[0.06] transition-all"
              type="text"
              placeholder="Search for projects"
              aria-label="Search"
            />
          </div>
        </div>

        {/* Right icons */}
        <ul className="flex items-center space-x-1">
          <li>
            <button
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/[0.06] transition-colors text-gray-500 dark:text-gray-400"
              onClick={toggleTheme}
              aria-label="Toggle color mode"
            >
              {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </li>

          <li className="relative">
            <button
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/[0.06] transition-colors text-gray-500 dark:text-gray-400"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-[#0d081d]" />
            </button>
          </li>

          <li>
            <button
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/[0.06] transition-colors"
              aria-label="Account"
            >
              {user ? (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white font-medium text-sm shadow-lg shadow-purple-600/20">
                  {user.name?.charAt(0).toUpperCase() || 'D'}
                </div>
              ) : (
                <User className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              )}
            </button>
          </li>

          <li>
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/[0.06] transition-colors text-gray-500 dark:text-gray-400"
              aria-label="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
