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
} from "lucide-react";

const navConfig = {
  employee: [
    { label: "Home", icon: LayoutDashboard },
    { label: "Report Incident", icon: AlertTriangle },
    { label: "My Tasks", icon: CheckSquare },
    { label: "My Trainings", icon: ClipboardList },
    { label: "Safety Suggestions", icon: Shield },
  ],

  team_admin: [
    { label: "Dashboard", icon: LayoutDashboard },
    { label: "Incidents", icon: AlertTriangle },
    { label: "Tasks", icon: CheckSquare },
    { label: "Inspections", icon: ClipboardList },
    { label: "JSA", icon: Shield },
    { label: "Equipment", icon: Wrench },
    { label: "Vehicles", icon: Truck },
  ],

  group_admin: [
    { label: "Dashboard", icon: LayoutDashboard },
    { label: "Analytics", icon: FileText },
    { label: "Audits", icon: ClipboardList },
    { label: "Training", icon: Users },
    { label: "Equipment", icon: Wrench },
    { label: "Vehicles", icon: Truck },
    { label: "Workers Comp", icon: Shield },
    { label: "Management", icon: Users },
  ],

  super_admin: [
    { label: "Executive Dashboard", icon: LayoutDashboard },
    { label: "Predictive Alerts", icon: AlertTriangle },
    { label: "Analytics", icon: FileText },
    { label: "Compliance", icon: Shield },
    { label: "Users", icon: Users },
    { label: "System Settings", icon: Wrench },
  ],
};

export default function Sidebar({ role = "employee" }) {
  const items = navConfig[role] || [];

  return (
    <aside className="w-64 bg-white dark:bg-card border-r hidden md:flex flex-col">
      {/* Brand */}
      <div className="px-6 py-5 border-b">
        <h1 className="text-lg font-bold tracking-tight">ASES</h1>
        <p className="text-xs text-muted-foreground">
          Advanced Safety & Efficiency
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {items.map((item, idx) => (
          <NavItem key={idx} {...item} />
        ))}
      </nav>
    </aside>
  );
}

function NavItem({ icon: Icon, label }) {
  return (
    <button
      className="flex items-center gap-3 w-full px-3 py-2 text-sm rounded-md
                 text-muted-foreground hover:bg-muted hover:text-foreground transition"
    >
      <Icon size={18} />
      {label}
    </button>
  );
}
