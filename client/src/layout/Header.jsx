import { useState, useEffect } from "react";
import { 
  Bell, 
  Search, 
  User, 
  Settings, 
  HelpCircle, 
  Calendar,
  ChevronDown,
  LogOut,
  Shield,
  Building,
  Users
} from "lucide-react";
import { CheckCircle, BookOpen, AlertTriangle } from "lucide-react";
import ThemeToggle from "../components/ThemeToggle/ThemeToggle";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

export default function Header({ user, notifications = [] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [currentDate, setCurrentDate] = useState("");

  // Calculate unread notifications
  useEffect(() => {
    const unread = notifications.filter(n => !n.read).length;
    setUnreadCount(unread);
  }, [notifications]);

  // Update current date
  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const options = { weekday: 'short', month: 'short', day: 'numeric' };
      setCurrentDate(now.toLocaleDateString('en-US', options));
    };
    updateDate();
  }, []);

  // Mock notifications data
  const defaultNotifications = [
    { id: 1, title: "New Safety Alert", description: "High risk detected in Warehouse Zone A", time: "10 min ago", type: "alert", read: false },
    { id: 2, title: "Task Assigned", description: "Complete monthly fire inspection", time: "1 hour ago", type: "task", read: true },
    { id: 3, title: "Training Due", description: "Forklift safety training expires in 3 days", time: "2 hours ago", type: "training", read: false },
    { id: 4, title: "Incident Reported", description: "Near-miss incident in Production Area", time: "5 hours ago", type: "incident", read: true },
    { id: 5, title: "System Update", description: "New safety features available", time: "1 day ago", type: "system", read: true },
  ];

  const displayNotifications = notifications.length > 0 ? notifications : defaultNotifications;

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user?.name) return "U";
    return user.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Get role icon
  const getRoleIcon = () => {
    switch(user?.role) {
      case 'super_admin':
        return <Shield className="w-3 h-3 text-emerald-500" />;
      case 'group_admin':
        return <Building className="w-3 h-3 text-blue-500" />;
      case 'team_admin':
        return <Users className="w-3 h-3 text-amber-500" />;
      default:
        return <User className="w-3 h-3 text-slate-500" />;
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      // Implement search functionality
    }
  };

  const handleLogout = () => {
    console.log("Logging out...");
    // Implement logout logic
    window.location.href = "/login";
  };

  const markAllAsRead = () => {
    console.log("Marking all as read");
    // Implement mark all as read
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm supports-[backdrop-filter]:bg-white/60">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left Section - Search */}
          <div className="flex-1 flex items-center max-w-2xl">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search incidents, tasks, inspections, reports..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 h-9 w-full border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-10 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    ✕
                  </button>
                )}
                <Button 
                  type="submit" 
                  size="sm" 
                  variant="ghost" 
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 h-8 px-3 text-slate-600 dark:text-slate-400"
                >
                  Search
                </Button>
              </div>
            </form>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            
            {/* Quick Actions */}
            <div className="hidden md:flex items-center gap-2">
              <Button size="sm" variant="ghost" className="gap-2 text-xs">
                <Calendar className="w-4 h-4" />
                {currentDate}
              </Button>
              <Button size="sm" variant="ghost" className="gap-2 text-xs">
                <HelpCircle className="w-4 h-4" />
                Help
              </Button>
            </div>

            {/* Notifications Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="relative h-9 w-9 rounded-full"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center bg-red-500 text-white text-xs font-bold rounded-full border-2 border-white dark:border-slate-900">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-96">
                <DropdownMenuLabel className="flex items-center justify-between">
                  <span>Notifications</span>
                  {unreadCount > 0 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={markAllAsRead}
                      className="h-auto p-0 text-xs"
                    >
                      Mark all as read
                    </Button>
                  )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-96 overflow-y-auto">
                  {displayNotifications.length > 0 ? (
                    displayNotifications.map((notification) => (
                      <DropdownMenuItem 
                        key={notification.id}
                        className={`flex flex-col items-start p-3 ${!notification.read ? 'bg-sky-50 dark:bg-sky-900/10' : ''}`}
                      >
                        <div className="flex items-start gap-3 w-full">
                          <div className={`p-2 rounded-full ${
                            notification.type === 'alert' ? 'bg-red-100 dark:bg-red-900/30 text-red-600' :
                            notification.type === 'task' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600' :
                            notification.type === 'training' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600' :
                            notification.type === 'incident' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600' :
                            'bg-purple-100 dark:bg-purple-900/30 text-purple-600'
                          }`}>
                            {notification.type === 'alert' && <Bell className="w-4 h-4" />}
                            {notification.type === 'task' && <CheckCircle className="w-4 h-4" />}
                            {notification.type === 'training' && <BookOpen className="w-4 h-4" />}
                            {notification.type === 'incident' && <AlertTriangle className="w-4 h-4" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <p className="font-medium text-sm">{notification.title}</p>
                              {!notification.read && (
                                <span className="h-2 w-2 bg-red-500 rounded-full ml-2 flex-shrink-0 mt-1" />
                              )}
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                              {notification.description}
                            </p>
                            <p className="text-xs text-slate-500 mt-2">{notification.time}</p>
                          </div>
                        </div>
                      </DropdownMenuItem>
                    ))
                  ) : (
                    <DropdownMenuItem className="flex justify-center p-4">
                      <p className="text-sm text-slate-500">No notifications</p>
                    </DropdownMenuItem>
                  )}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="justify-center">
                  <Button variant="ghost" size="sm" className="w-full">
                    View All Notifications
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* User Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-3 h-12 px-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback className="bg-gradient-to-r from-sky-100 to-emerald-100 dark:from-sky-900 dark:to-emerald-900 text-slate-800 dark:text-white">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium leading-none">{user?.name || "User"}</p>
                    <div className="flex items-center gap-1">
                      {getRoleIcon()}
                      <p className="text-xs text-muted-foreground capitalize">
                        {user?.role?.replace("_", " ") || "Employee"}
                      </p>
                    </div>
                  </div>
                  <ChevronDown className="hidden md:block w-4 h-4 text-slate-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name || "User"}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs capitalize">
                        {user?.role?.replace("_", " ") || "Employee"}
                      </Badge>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email || "user@company.com"}
                      </p>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-3">
                  <User className="w-4 h-4" />
                  <Link to={"/profile"}>Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-3">
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-3">
                  <Shield className="w-4 h-4" />
                  <span>Security</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <div className="p-2">
                  <div className="text-xs text-slate-500 mb-2">Quick Stats</div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-center p-2 rounded bg-slate-100 dark:bg-slate-800">
                      <p className="text-sm font-bold">127</p>
                      <p className="text-xs text-slate-500">Safe Days</p>
                    </div>
                    <div className="text-center p-2 rounded bg-slate-100 dark:bg-slate-800">
                      <p className="text-sm font-bold">92%</p>
                      <p className="text-xs text-slate-500">Compliance</p>
                    </div>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="gap-3 text-red-600 dark:text-red-400 focus:text-red-600"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full h-9"
            />
          </div>
        </div>
      </div>
    </header>
  );
}