import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

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
        <main className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-white to-slate-50 
      dark:from-slate-900 dark:to-slate-800">
          {children}
          <div className="mt-10 -mx-6 -mb-6">
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
}
