import { Bell, Search } from "lucide-react";
import ThemeToggle from "../components/ThemeToggle/ThemeToggle";
import { Input } from "@/components/ui/input";

export default function Header({ user }) {
  return (
    <header className="flex items-center justify-between px-6 py-3 border-b bg-white dark:bg-card">

      {/* Search */}
      <div className="hidden md:flex items-center gap-2 w-80">
        <Search size={16} className="text-muted-foreground" />
        <Input
          placeholder="Search incidents, tasks, assets..."
          className="h-8"
        />
      </div>

      {/* Right */}
      <div className="flex items-center gap-4 ml-auto">

        {/* Notifications */}
        <button className="relative">
          <Bell size={18} />
          <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full" />
        </button>

        {/* Theme */}
        <ThemeToggle />

        {/* Profile */}
        <div className="text-sm text-right">
          <p className="font-medium">{user?.name}</p>
          <p className="text-xs text-muted-foreground capitalize">
            {user?.role?.replace("_", " ")}
          </p>
        </div>
      </div>
    </header>
  );
}
