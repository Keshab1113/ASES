import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { dashboardStats, incidents, tasks, trainings } from '@/data/dummyData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, ListTodo, GraduationCap, ClipboardCheck, TrendingUp, TrendingDown, Activity, Shield } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { cn, formatDate, getRiskColor, getStatusColor } from '@/lib/utils';
import { Link } from 'react-router-dom';

const StatCard = ({ title, value, change, icon: Icon, trend }) => (
  <Card className="tactical-shadow" data-testid={`stat-card-${title.toLowerCase().replace(/\s+/g, '-')}`}>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{title}</CardTitle>
      <Icon className="w-5 h-5 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-3xl font-bold font-heading">{value}</div>
      {change && (
        <div className={cn("text-xs flex items-center gap-1 mt-1", trend === 'up' ? 'text-success' : 'text-destructive')}>
          {trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {change}
        </div>
      )}
    </CardContent>
  </Card>
);

const DummyDashboard = () => {
  const { user } = useAuth();

  const incidentTrendData = [
    { month: 'Jul', incidents: 18 },
    { month: 'Aug', incidents: 15 },
    { month: 'Sep', incidents: 12 },
    { month: 'Oct', incidents: 14 },
    { month: 'Nov', incidents: 10 },
    { month: 'Dec', incidents: 8 },
    { month: 'Jan', incidents: 12 }
  ];

  const riskDistribution = [
    { name: 'High Risk', value: 25, color: 'hsl(var(--destructive))' },
    { name: 'Medium Risk', value: 45, color: 'hsl(var(--accent))' },
    { name: 'Low Risk', value: 86, color: 'hsl(var(--success))' }
  ];

  const recentIncidents = incidents.slice(0, 5);
  const upcomingTasks = tasks.filter(t => t.status === 'open' || t.status === 'in_progress').slice(0, 5);

  return (
    <div className="space-y-8" data-testid="dashboard-page">
      <div>
        <h1 className="text-4xl font-bold tracking-tight uppercase mb-2" data-testid="dashboard-title">
          DASHBOARD
        </h1>
        <p className="text-sm text-muted-foreground">
          Welcome back, {user?.name}. Here's your safety overview.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Incidents"
          value={dashboardStats.incidents.this_month}
          change="-15% from last month"
          icon={AlertTriangle}
          trend="up"
        />
        <StatCard
          title="Open Tasks"
          value={dashboardStats.tasks.open}
          change={`${dashboardStats.tasks.overdue} overdue`}
          icon={ListTodo}
          trend="down"
        />
        <StatCard
          title="Training Progress"
          value={`${dashboardStats.training.compliance_rate}%`}
          change="+3% this month"
          icon={GraduationCap}
          trend="up"
        />
        <StatCard
          title="Safety Score"
          value={dashboardStats.safety_score.overall}
          change={`+${dashboardStats.safety_score.trend}`}
          icon={Shield}
          trend="up"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="tactical-shadow" data-testid="incident-trend-chart">
          <CardHeader>
            <CardTitle className="text-xl font-semibold uppercase">Incident Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={incidentTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '4px'
                  }}
                />
                <Line type="monotone" dataKey="incidents" stroke="hsl(var(--destructive))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="tactical-shadow" data-testid="risk-distribution-chart">
          <CardHeader>
            <CardTitle className="text-xl font-semibold uppercase">Risk Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '4px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="tactical-shadow" data-testid="recent-incidents-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl font-semibold uppercase">Recent Incidents</CardTitle>
            <Link to="/incidents" className="text-xs text-primary hover:underline uppercase font-semibold" data-testid="view-all-incidents">
              View All
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentIncidents.map((incident) => (
                <Link
                  key={incident.id}
                  to={`/incidents/${incident.id}`}
                  className="flex items-start gap-3 p-3 bg-muted/30 rounded-sm hover:bg-muted/50 transition-colors border border-transparent hover:border-border"
                  data-testid={`incident-item-${incident.id}`}
                >
                  <AlertTriangle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-semibold truncate">{incident.title}</p>
                      <Badge variant={getRiskColor(incident.risk_score)} className="text-xs uppercase flex-shrink-0">
                        {incident.risk_score.toFixed(1)}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{formatDate(incident.date_occurred)}</p>
                  </div>
                  <Badge variant={getStatusColor(incident.status)} className="text-xs uppercase flex-shrink-0">
                    {incident.status.replace('_', ' ')}
                  </Badge>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="tactical-shadow" data-testid="upcoming-tasks-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl font-semibold uppercase">Upcoming Tasks</CardTitle>
            <Link to="/tasks" className="text-xs text-primary hover:underline uppercase font-semibold" data-testid="view-all-tasks">
              View All
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-start gap-3 p-3 bg-muted/30 rounded-sm border border-border"
                  data-testid={`task-item-${task.id}`}
                >
                  <ListTodo className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold mb-1">{task.title}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs uppercase">
                        {task.priority}
                      </Badge>
                      <p className="text-xs text-muted-foreground">Due: {formatDate(task.due_date)}</p>
                    </div>
                  </div>
                  <Badge variant={getStatusColor(task.status)} className="text-xs uppercase flex-shrink-0">
                    {task.status.replace('_', ' ')}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {user?.role !== 'employee' && (
        <Card className="tactical-shadow border-l-4 border-l-accent" data-testid="ai-insights-card">
          <CardHeader>
            <CardTitle className="text-xl font-semibold uppercase flex items-center gap-2">
              <Activity className="w-5 h-5 text-accent" />
              AI Safety Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-accent/10 border border-accent/20 rounded-sm">
                <p className="text-sm font-semibold mb-2 uppercase">Predictive Alert</p>
                <p className="text-sm text-muted-foreground">
                  AI analysis detected increased near-miss incidents in Manufacturing Plant A. Recommend immediate forklift safety refresher training.
                </p>
                <div className="mt-3">
                  <Badge variant="outline" className="text-xs">
                    Confidence: 88%
                  </Badge>
                </div>
              </div>
              <div className="p-4 bg-success/10 border border-success/20 rounded-sm">
                <p className="text-sm font-semibold mb-2 uppercase">Positive Trend</p>
                <p className="text-sm text-muted-foreground">
                  Leading indicators show 25% increase in safety suggestions this month. Employee engagement improving.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DummyDashboard;