import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AppShell({ user, children }) {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-background">

      {/* Sidebar */}
      <Sidebar role={user?.role} />

      {/* Main area */}
      <div className="flex flex-col flex-1 overflow-hidden">

        {/* Header */}
        <Header user={user} />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
