import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Bell, 
  Search, 
  Menu, 
  X, 
  ChevronDown,
  Sun,
  Moon,
  User,
  Settings,
  LogOut,
  Shield
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle/ThemeToggle";

export default function Header({ 
  user, 
  onMenuClick, 
  onLogout, 
  userInitials, 
  userRoleDisplay,
  canAccessAdmin 
}) {
  const navigate = useNavigate();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implement search functionality
      console.log("Searching for:", searchQuery);
    }
  };

  const handleProfileClick = () => {
    navigate("/app/profile");
    setUserMenuOpen(false);
  };

  const handleSettingsClick = () => {
    navigate("/app/settings");
    setUserMenuOpen(false);
  };

  const handleAdminClick = () => {
    navigate("/app/admin");
    setUserMenuOpen(false);
  };

  const getRoleColor = (role) => {
    const colors = {
      super_admin: "bg-gradient-to-r from-purple-500 to-purple-700",
      group_admin: "bg-gradient-to-r from-blue-500 to-blue-700",
      team_admin: "bg-gradient-to-r from-green-500 to-green-700",
      employee: "bg-gradient-to-r from-slate-500 to-slate-700"
    };
    return colors[role] || "bg-gradient-to-r from-slate-500 to-slate-700";
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm px-4 md:px-6 lg:px-8">
      {/* Mobile menu button */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
      >
        <Menu className="w-5 h-5" />
      </button>

      

      {/* Search Bar */}
      <div className="flex-1 max-w-2xl mx-4 hidden md:block">
        <form onSubmit={handleSearch} className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for inspections, tasks, users..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
          />
        </form>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-2 ml-auto">
        {/* Theme Toggle */}
        <div className="hidden sm:block">
          <ThemeToggle />
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 relative"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>
          
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 py-2 z-50">
              <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-800">
                <h3 className="font-semibold text-slate-900 dark:text-white">Notifications</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {/* Notification items */}
                <div className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                        New user registration
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        John Doe has registered for team approval
                      </p>
                      <p className="text-xs text-slate-400 mt-1">2 min ago</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-2 border-t border-slate-200 dark:border-slate-800">
                <button className="text-sm text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 w-full text-center py-2">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-sky-500 to-emerald-500 flex items-center justify-center text-white font-semibold text-sm">
              {userInitials}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                {user?.name || "User"}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {userRoleDisplay}
              </p>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 hidden md:block" />
          </button>

          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 py-2 z-50">
              {/* User Info */}
              <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${getRoleColor(user?.role)} flex items-center justify-center text-white font-semibold`}>
                    {userInitials}
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">
                      {user?.name || "User"}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {user?.email}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        user?.role === 'super_admin' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' :
                        user?.role === 'group_admin' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                        user?.role === 'team_admin' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                        'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300'
                      }`}>
                        {userRoleDisplay}
                      </span>
                      {user?.is_approved ? (
                        <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                          Approved
                        </span>
                      ) : (
                        <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
                          Pending
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                <button
                  onClick={handleProfileClick}
                  className="flex items-center gap-3 w-full px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <User className="w-4 h-4" />
                  My Profile
                </button>
                <button
                  onClick={handleSettingsClick}
                  className="flex items-center gap-3 w-full px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </button>
                {canAccessAdmin && (
                  <button
                    onClick={handleAdminClick}
                    className="flex items-center gap-3 w-full px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <Shield className="w-4 h-4" />
                    Admin Dashboard
                  </button>
                )}
              </div>

              {/* Logout */}
              <div className="border-t border-slate-200 dark:border-slate-800 pt-2">
                <button
                  onClick={onLogout}
                  className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}