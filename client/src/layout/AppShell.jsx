import { useState, useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

export default function AppShell({ user, onLogout, children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close sidebar on route change on mobile
  useEffect(() => {
    if (sidebarOpen && isMobile) {
      setSidebarOpen(false);
    }
  }, [location.pathname, isMobile, sidebarOpen]);

  // Handle logout
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user?.name) return "U";
    return user.name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  // Get user role display name
  const getUserRoleDisplay = () => {
    if (!user?.role) return "User";
    const roleNames = {
      super_admin: "Super Admin",
      group_admin: "Group Admin", 
      team_admin: "Team Admin",
      employee: "Employee"
    };
    return roleNames[user.role] || user.role.replace('_', ' ');
  };

  // Check if current user can access admin features
  const canAccessAdmin = () => {
    return ['super_admin', 'group_admin', 'team_admin'].includes(user?.role);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-950">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Mobile */}
      {isMobile && (
        <div className={`fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <Sidebar 
            role={user?.role} 
            onClose={() => setSidebarOpen(false)}
            onLogout={handleLogout}
            user={user}
          />
        </div>
      )}

      {/* Sidebar - Desktop */}
      {!isMobile && (
        <div className="hidden lg:flex lg:flex-shrink-0">
          <Sidebar 
            role={user?.role}
            onLogout={handleLogout}
            user={user}
          />
        </div>
      )}

      {/* Main area */}
      <div className="flex flex-col flex-1 overflow-hidden w-full">
        {/* Header */}
        <Header 
          user={user} 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          onLogout={handleLogout}
          userInitials={getUserInitials()}
          userRoleDisplay={getUserRoleDisplay()}
          canAccessAdmin={canAccessAdmin()}
        />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-0 bg-gradient-to-b from-white/80 to-slate-50/80 
          dark:from-slate-900/90 dark:to-slate-800/90 backdrop-blur-sm">
          <div className=" ">
            {/* Show user approval status if pending */}
            {user && !user.is_approved && (
              <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-yellow-800 dark:text-yellow-200">
                      Account Pending Approval
                    </h3>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                      Your account is pending approval. Some features may be limited until an administrator approves your account.
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm font-medium text-yellow-700 bg-yellow-100 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:hover:bg-yellow-900/50 dark:text-yellow-300 rounded-lg transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}

            {/* Breadcrumb navigation */}
            {location.pathname !== "/app" && (
              <div className="mb-6">
                <nav className="flex px-10 pt-4" aria-label="Breadcrumb">
                  <ol className="flex items-center space-x-2">
                    <li>
                      <button
                        onClick={() => navigate("/app")}
                        className="text-sm text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400"
                      >
                        Home
                      </button>
                    </li>
                    {location.pathname.split('/').filter(Boolean).map((segment, index, array) => {
                      if (segment === 'app') return null;
                      const path = '/' + array.slice(0, index + 2).join('/');
                      const isLast = index === array.length - 2;
                      
                      return (
                        <li key={path} className="flex items-center">
                          <svg className="w-4 h-4 text-slate-400 mx-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                          {isLast ? (
                            <span className="text-sm font-medium text-slate-900 dark:text-white capitalize">
                              {segment.replace(/-/g, ' ')}
                            </span>
                          ) : (
                            <button
                              onClick={() => navigate(path)}
                              className="text-sm text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 capitalize"
                            >
                              {segment.replace(/-/g, ' ')}
                            </button>
                          )}
                        </li>
                      );
                    })}
                  </ol>
                </nav>
              </div>
            )}

            {/* Page Content */}
            <div className="bg-white dark:bg-slate-900  shadow-lg border border-slate-200 dark:border-slate-800 overflow-hidden">
              {/* Content Area */}
              <div className="p-4 md:p-6 lg:p-8">
                {children ? children : <Outlet />}
              </div>
              
              {/* Footer */}
              <div className="border-t border-slate-200 dark:border-slate-800">
                <Footer />
              </div>
            </div>

            {/* Quick Actions Floating Button for Mobile */}
            {isMobile && canAccessAdmin() && (
              <div className="fixed bottom-6 right-6 z-40 lg:hidden">
                <div className="flex flex-col items-end gap-3">
                  {/* Quick Action Buttons */}
                  <div className="flex flex-col gap-2 items-end">
                    {user?.role === 'super_admin' && (
                      <button
                        onClick={() => navigate("/groups")}
                        className="px-4 py-3 bg-sky-600 text-white rounded-full shadow-lg hover:bg-sky-700 transition-colors flex items-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <span className="text-sm font-medium">Groups</span>
                      </button>
                    )}
                    {['super_admin', 'group_admin'].includes(user?.role) && (
                      <button
                        onClick={() => navigate("/app/admin")}
                        className="px-4 py-3 bg-emerald-600 text-white rounded-full shadow-lg hover:bg-emerald-700 transition-colors flex items-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <span className="text-sm font-medium">Admin</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Loading overlay for pending approval users */}
      {user && !user.is_approved && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 max-w-md mx-4 shadow-2xl">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                Awaiting Approval
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                Your account registration is pending approval from an administrator. 
                You will receive an email notification once your account is approved.
              </p>
              <div className="space-y-3">
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {getUserRoleDisplay()} Account
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {user?.name} • {user?.email}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full px-6 py-3 bg-sky-600 text-white font-medium rounded-lg hover:bg-sky-700 transition-colors"
                >
                  Return to Login
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}