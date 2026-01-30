import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  AlertTriangle,
  CheckSquare,
  ClipboardList,
  Shield,
  Truck,
  Wrench,
  Users,
  FileText,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User,
  Settings,
  Bell,
  TrendingUp,
  BarChart3,
  Activity,
  HardHat,
  FileCheck,
  Calendar,
  MessageSquare,
  Award,
  Target,
  Zap,
  BookOpen,
  Briefcase,
  Home,
  AlertCircle,
  FileWarning,
  Users as UsersIcon,
  Settings as SettingsIcon,
  Shield as ShieldIcon,
  PieChart,
} from "lucide-react";

const navConfig = {
  employee: [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
      badge: null,
    },
    {
      label: "Report Incident",
      icon: AlertTriangle,
      path: "/incidents/report",
      badge: null,
    },
    { label: "My Tasks", icon: CheckSquare, path: "/tasks", badge: "3" },
    { label: "My Trainings", icon: BookOpen, path: "/trainings", badge: "2" },
    {
      label: "Safety Suggestions",
      icon: Lightbulb,
      path: "/suggestions",
      badge: null,
    },
    { label: "Safety Alerts", icon: Bell, path: "/alerts", badge: "2" },
    { label: "Calendar", icon: Calendar, path: "/calendar", badge: null },
    { label: "Messages", icon: MessageSquare, path: "/messages", badge: "5" },
  ],

  team_admin: [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
      badge: null,
    },
    { label: "Incidents", icon: AlertTriangle, path: "/incidents", badge: "4" },
    { label: "Tasks", icon: CheckSquare, path: "/tasks", badge: "8" },
    {
      label: "Inspections",
      icon: ClipboardList,
      path: "/inspections",
      badge: "3",
    },
    {
      label: "Risk Assessment",
      icon: Shield,
      path: "/risk-assessment",
      badge: null,
    },
    { label: "Equipment", icon: Wrench, path: "/equipment", badge: "2" },
    { label: "Vehicles", icon: Truck, path: "/vehicles", badge: "1" },
    { label: "Safety Meetings", icon: Users, path: "/meetings", badge: null },
    { label: "Reports", icon: FileText, path: "/reports", badge: null },
    {
      label: "Team Performance",
      icon: Award,
      path: "/team-performance",
      badge: null,
    },
    {
      label: "User Management",
      icon: Activity,
      path: "/users",
      badge: "100%",
    },
  ],

  group_admin: [
    {
      label: "Executive Dashboard",
      icon: LayoutDashboard,
      path: "/executive-dashboard",
      badge: null,
    },
    {
      label: "Safety Analytics",
      icon: BarChart3,
      path: "/analytics",
      badge: null,
    },
    {
      label: "Compliance",
      icon: ShieldIcon,
      path: "/compliance",
      badge: "94%",
    },
    { label: "Audits", icon: FileCheck, path: "/audits", badge: "2" },
    {
      label: "Training Management",
      icon: Users,
      path: "/training-management",
      badge: "12",
    },
    { label: "Equipment & Assets", icon: Wrench, path: "/assets", badge: null },
    { label: "Vehicle Fleet", icon: Truck, path: "/fleet", badge: null },
    {
      label: "Workers Comp",
      icon: Briefcase,
      path: "/workers-comp",
      badge: "1",
    },
    {
      label: "User Management",
      icon: UsersIcon,
      path: "/user-management",
      badge: null,
    },
    {
      label: "Reports & Analytics",
      icon: PieChart,
      path: "/reports-analytics",
      badge: null,
    },
    {
      label: "Team Management",
      icon: Activity,
      path: "/teams",
      badge: "100%",
    },
    {
      label: "User Management",
      icon: Activity,
      path: "/users",
      badge: "100%",
    },
  ],

  super_admin: [
    {
      label: "Dashboard",
      icon: Target,
      path: "/dashboard",
      badge: null,
    },
    {
      label: "Executive Overview",
      icon: Target,
      path: "/executive",
      badge: null,
    },
    {
      label: "Predictive Intelligence",
      icon: Activity,
      path: "/predictive-intelligence",
      badge: "3",
    },
    { label: "Risk Heatmap", icon: Zap, path: "/risk-heatmap", badge: null },
    {
      label: "Compliance Center",
      icon: Shield,
      path: "/compliance-center",
      badge: null,
    },
    {
      label: "User Management",
      icon: Users,
      path: "/user-management",
      badge: "45",
    },
    {
      label: "System Administration",
      icon: Settings,
      path: "/system-admin",
      badge: null,
    },
    {
      label: "Audit & Logs",
      icon: FileText,
      path: "/audit-logs",
      badge: "127",
    },
    {
      label: "API & Integrations",
      icon: Zap,
      path: "/integrations",
      badge: null,
    },
    {
      label: "System Health",
      icon: Activity,
      path: "/system-health",
      badge: "100%",
    },
    {
      label: "Group Management",
      icon: Activity,
      path: "/groups",
      badge: "100%",
    },
    {
      label: "Team Management",
      icon: Activity,
      path: "/teams",
      badge: "100%",
    },
    {
      label: "User Management",
      icon: Activity,
      path: "/users",
      badge: "100%",
    },
  ],
};

export default function Sidebar({
  role = "employee",
  user,
  notificationCount = 0,
}) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const items = navConfig[role] || [];

  const handleLogout = () => {
    // Implement logout logic
    console.log("Logging out...");
    window.location.href = "/login";
  };

  // Get role display name
  const getRoleDisplayName = () => {
    const roleNames = {
      employee: "Employee",
      team_admin: "Team Administrator",
      group_admin: "Group Administrator",
      super_admin: "System Administrator",
    };
    return roleNames[role] || role.replace("_", " ").toUpperCase();
  };

  // Get role color
  const getRoleColor = () => {
    const colors = {
      employee: "from-blue-500 to-cyan-500",
      team_admin: "from-emerald-500 to-green-500",
      group_admin: "from-purple-500 to-pink-500",
      super_admin: "from-amber-500 to-orange-500",
    };
    return colors[role] || "from-slate-500 to-slate-700";
  };

  return (
    <aside
      className={`
      ${collapsed ? "w-20" : "w-64"} 
      bg-gradient-to-b from-white to-slate-50 
      dark:from-slate-900 dark:to-slate-800 
      border-r border-slate-200 dark:border-slate-700
      flex flex-col transition-all duration-300
      h-screen sticky top-0 overflow-hidden
      shadow-lg
    `}
    >
      {/* Header */}
      <div className="px-4 py-4 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between">
          <div
            className={`flex items-center gap-3 ${collapsed ? "justify-center w-full" : ""}`}
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-100 to-emerald-100 dark:from-sky-900/30 dark:to-emerald-900/30 flex items-center justify-center">
                <img src="/only_logo.png" alt="ASES Logo" className="w-8 h-8" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-sky-500 to-emerald-500 rounded-full border-2 border-white dark:border-slate-900"></div>
            </div>

            {!collapsed && (
              <div>
                <h1 className="font-bold text-lg bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent">
                  ASES
                </h1>
                <div className="flex items-center gap-1">
                  <div
                    className={`w-2 h-2 rounded-full bg-gradient-to-r ${getRoleColor()}`}
                  ></div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {getRoleDisplayName()}
                  </p>
                </div>
              </div>
            )}
          </div>

          {!collapsed && (
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <ChevronLeft className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            </button>
          )}
        </div>
      </div>

      {/* User Profile */}
      {!collapsed && user && (
        <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800/50 dark:to-blue-900/20 border border-slate-200 dark:border-slate-700">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-100 to-emerald-100 dark:from-sky-900 dark:to-emerald-900 flex items-center justify-center">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-12 h-12 rounded-full"
                  />
                ) : (
                  <User className="w-6 h-6 text-sky-600 dark:text-sky-400" />
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900"></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-slate-900 dark:text-white truncate">
                {user.name}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                {user.email}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-1">
                  <Award className="w-3 h-3 text-amber-500" />
                  <span className="text-xs font-medium text-amber-600">
                    Lvl 4
                  </span>
                </div>
                <div className="h-1 w-1 rounded-full bg-slate-300"></div>
                <span className="text-xs text-slate-500">
                  Member since 2023
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto scrollbar-thin">
        {items.map((item, idx) => (
          <NavItem
            key={idx}
            {...item}
            collapsed={collapsed}
            active={location.pathname.startsWith(item.path)}
          />
        ))}
      </nav>

      {/* Collapse Button for Collapsed State */}
      {collapsed && (
        <div className="p-4 border-t border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center justify-center"
            title="Expand sidebar"
          >
            <ChevronRight className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </button>
        </div>
      )}

      {/* Safety Status */}
      {!collapsed && (
        <div className="mx-3 mb-4 p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-sky-50 dark:from-emerald-900/20 dark:to-sky-900/20 border border-emerald-200 dark:border-emerald-800">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
              <HardHat className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <span className="text-xs font-semibold text-slate-900 dark:text-white">
              Safety Status
            </span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-600 dark:text-slate-400">
                Incident-free Days
              </span>
              <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                127
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-600 dark:text-slate-400">
                Team Compliance
              </span>
              <span className="text-sm font-bold text-sky-600 dark:text-sky-400">
                94%
              </span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-1 rounded-full overflow-hidden mt-2">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full"
                style={{ width: "94%" }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="border-t border-slate-200 dark:border-slate-700 p-3">
        {!collapsed ? (
          <button
            onClick={handleLogout}
            className={`
              flex items-center gap-3 w-full px-3 py-2.5 rounded-lg
              text-sm font-medium text-slate-700 dark:text-slate-300 
              hover:bg-red-50 dark:hover:bg-red-900/20 
              hover:text-red-600 dark:hover:text-red-400 
              transition-all duration-200
              border border-slate-200 dark:border-slate-700
              hover:border-red-200 dark:hover:border-red-800
            `}
          >
            <LogOut className="w-4 h-4" />
            Logout
            <span className="ml-auto text-xs text-slate-400">⌘Q</span>
          </button>
        ) : (
          <button
            onClick={handleLogout}
            className={`
              w-full p-2 rounded-lg
              text-slate-600 dark:text-slate-400 
              hover:bg-red-50 dark:hover:bg-red-900/20 
              hover:text-red-600 dark:hover:text-red-400 
              transition-colors
              flex items-center justify-center
            `}
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        )}
      </div>
    </aside>
  );
}

function NavItem({ icon: Icon, label, path, collapsed, active, badge }) {
  return (
    <Link
      to={path}
      className={`
        group flex items-center gap-3 w-full px-3 py-2.5 rounded-xl
        text-sm transition-all duration-200 relative
        ${
          active
            ? "bg-gradient-to-r from-sky-500/10 to-emerald-500/10 border border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300 font-semibold shadow-sm"
            : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
        }
        ${collapsed ? "justify-center px-2" : ""}
      `}
    >
      <div className={`relative ${collapsed ? "" : ""}`}>
        <Icon
          className={`w-5 h-5 ${active ? "text-sky-600 dark:text-sky-400" : "text-slate-500 group-hover:text-sky-500"}`}
        />
        {active && !collapsed && (
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
        )}
      </div>

      {!collapsed && <span className="flex-1">{label}</span>}

      {/* Badge */}
      {badge && !collapsed && (
        <span
          className={`
          px-1.5 py-0.5 rounded-md text-xs font-medium
          ${
            active
              ? "bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300"
              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
          }
        `}
        >
          {badge}
        </span>
      )}

      {badge && collapsed && (
        <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
      )}

      {/* Active indicator for collapsed state */}
      {active && collapsed && (
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-emerald-500 rounded-r-full"></div>
      )}

      {/* Hover tooltip for collapsed state */}
      {collapsed && (
        <div className="absolute left-full ml-2 px-2 py-1 bg-slate-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
          {label}
          {badge && <span className="ml-1 text-red-300">({badge})</span>}
        </div>
      )}
    </Link>
  );
}

// Additional icon
import { Lightbulb } from "lucide-react";

// Add custom scrollbar styles
const styles = `
  .scrollbar-thin::-webkit-scrollbar {
    width: 4px;
  }
  
  .scrollbar-thin::-webkit-scrollbar-track {
    background: transparent;
  }
  
  .scrollbar-thin::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 2px;
  }
  
  .scrollbar-thin::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }
  
  .dark .scrollbar-thin::-webkit-scrollbar-thumb {
    background: #475569;
  }
  
  .dark .scrollbar-thin::-webkit-scrollbar-thumb:hover {
    background: #64748b;
  }
`;

// Add styles to document head
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}
