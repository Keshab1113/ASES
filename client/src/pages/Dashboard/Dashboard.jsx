import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Dashboard({ user }) {
  return (
    <div className="space-y-6">

      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Safety Dashboard
        </h1>
        <p className="text-sm text-muted-foreground">
          Real-time overview of safety performance and predictive risks
        </p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KpiCard title="Safety Score" value="87 / 100" status="good" />
        <KpiCard title="Open High-Risk Tasks" value="3" status="warning" />
        <KpiCard title="Predictive Alerts" value="2" status="critical" />
        <KpiCard title="Compliance Status" value="On Track" status="good" />
      </div>

      {/* Predictive Alerts */}
      <Card className="border-l-4 border-red-500">
        <CardContent className="p-4 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-red-600">
              Predictive Risk Alerts
            </h3>
            <Badge variant="destructive">High Risk</Badge>
          </div>

          <p className="text-sm text-muted-foreground">
            Repeated forklift near-misses and delayed maintenance indicate
            elevated risk in the Warehouse area.
          </p>

          <Button size="sm" variant="outline">
            View Alert Details
          </Button>
        </CardContent>
      </Card>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Leading vs Lagging */}
        <Card>
          <CardContent className="p-4 space-y-2">
            <h3 className="font-semibold">
              Leading vs Lagging Indicators
            </h3>
            <div className="h-48 flex items-center justify-center text-muted-foreground text-sm">
              Chart: Incidents vs Trainings / Inspections
            </div>
          </CardContent>
        </Card>

        {/* Risk Heatmap */}
        <Card>
          <CardContent className="p-4 space-y-2">
            <h3 className="font-semibold">
              Predictive Risk Heatmap
            </h3>
            <div className="h-48 flex items-center justify-center text-muted-foreground text-sm">
              Heatmap: Site / Team / Activity
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Task & SLA Overview */}
      <Card>
        <CardContent className="p-4 space-y-3">
          <h3 className="font-semibold">
            Corrective Actions & SLA
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SlaCard title="Overdue Tasks" value="1" status="critical" />
            <SlaCard title="Due Today" value="2" status="warning" />
            <SlaCard title="On Track" value="14" status="good" />
          </div>
        </CardContent>
      </Card>

      {/* Role-based Section */}
      {(user?.role === "group_admin" || user?.role === "super_admin") && (
        <Card>
          <CardContent className="p-4 space-y-3">
            <h3 className="font-semibold">
              Executive AI Summary
            </h3>

            <p className="text-sm text-muted-foreground">
              Safety performance is stable with an overall score of 87.
              Predictive indicators show rising risk related to forklift
              operations and housekeeping gaps. Immediate preventive action
              is recommended to avoid high-potential incidents in the next
              30 days.
            </p>

            <Button size="sm" variant="secondary">
              View Full Summary
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

/* ---------------- Components ---------------- */

function KpiCard({ title, value, status }) {
  return (
    <Card>
      <CardContent className="p-4 space-y-1">
        <p className="text-xs text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
        <StatusBadge status={status} />
      </CardContent>
    </Card>
  );
}

function SlaCard({ title, value, status }) {
  return (
    <div className="border rounded-lg p-3 space-y-1">
      <p className="text-xs text-muted-foreground">{title}</p>
      <p className="text-xl font-bold">{value}</p>
      <StatusBadge status={status} />
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    good: <Badge variant="success">Good</Badge>,
    warning: <Badge variant="warning">Attention</Badge>,
    critical: <Badge variant="destructive">Critical</Badge>,
  };
  return map[status] || null;
}
