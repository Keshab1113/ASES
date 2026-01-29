import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ThemeToggle from "../../components/ThemeToggle/ThemeToggle";

export default function Home({ user }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b bg-white dark:bg-card">
        <div>
          <h1 className="text-xl font-bold tracking-tight">ASES</h1>
          <p className="text-xs text-muted-foreground">
            Advanced Safety and Efficiency Systems
          </p>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <span className="text-sm font-medium">{user?.name}</span>
        </div>
      </header>

      {/* Main */}
      <main className="p-6 space-y-6">
        {/* Welcome */}
        <div>
          <h2 className="text-2xl font-semibold">
            Welcome back{user?.name ? `, ${user.name}` : ""}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Here’s an overview of your safety system today
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard title="Safety Score" value="87 / 100" />
          <StatCard title="Open High-Risk Tasks" value="3" />
          <StatCard title="Predictive Alerts" value="2" />
          <StatCard title="Compliance Status" value="On Track" />
        </div>

        {/* Predictive Alerts */}
        <Card className="border-l-4 border-red-500">
          <CardContent className="p-4 space-y-2">
            <h3 className="font-semibold text-red-600">
              Predictive Risk Alerts
            </h3>
            <p className="text-sm text-muted-foreground">
              Forklift incidents and delayed maintenance indicate elevated risk
              in the Warehouse area.
            </p>
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </CardContent>
        </Card>

        {/* Role-based Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Employee */}
          {user?.role === "employee" && (
            <>
              <ActionCard
                title="Report Incident"
                desc="Log a safety incident or near miss"
                action="Report"
              />
              <ActionCard
                title="My Tasks"
                desc="View and complete assigned actions"
                action="Open"
              />
              <ActionCard
                title="Safety Suggestion"
                desc="Share ideas to improve workplace safety"
                action="Submit"
              />
            </>
          )}

          {/* Team Admin */}
          {user?.role === "team_admin" && (
            <>
              <ActionCard
                title="Team Tasks"
                desc="Track corrective actions and SLAs"
                action="Manage"
              />
              <ActionCard
                title="Inspections"
                desc="Perform or review inspections"
                action="Start"
              />
              <ActionCard
                title="JSA Management"
                desc="Create or update Job Safety Analyses"
                action="Open"
              />
            </>
          )}

          {/* Group / Super Admin */}
          {(user?.role === "group_admin" || user?.role === "super_admin") && (
            <>
              <ActionCard
                title="Analytics Dashboard"
                desc="View safety trends and KPIs"
                action="View"
              />
              <ActionCard
                title="Compliance Reports"
                desc="ISO 45001 & OSHA aligned reports"
                action="Generate"
              />
              <ActionCard
                title="Executive Summary"
                desc="AI-generated leadership insights"
                action="Open"
              />
            </>
          )}
        </div>
      </main>
    </div>
  );
}

/* ---------------- Components ---------------- */

function StatCard({ title, value }) {
  return (
    <Card>
      <CardContent className="p-4">
        <p className="text-xs text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
      </CardContent>
    </Card>
  );
}

function ActionCard({ title, desc, action }) {
  return (
    <Card className="hover:shadow-md transition">
      <CardContent className="p-4 space-y-2">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{desc}</p>
        <Button size="sm" variant="secondary">
          {action}
        </Button>
      </CardContent>
    </Card>
  );
}
