import React from 'react';
import { dashboardStats } from '@/data/dummyData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, LineChart, Line, AreaChart, Area, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Activity, Target, Award } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const DummyAnalytics = () => {
  const monthlyIncidents = [
    { month: 'Jul', total: 18, near_miss: 12, injury: 4, environmental: 2 },
    { month: 'Aug', total: 15, near_miss: 10, injury: 3, environmental: 2 },
    { month: 'Sep', total: 12, near_miss: 8, injury: 3, environmental: 1 },
    { month: 'Oct', total: 14, near_miss: 9, injury: 4, environmental: 1 },
    { month: 'Nov', total: 10, near_miss: 7, injury: 2, environmental: 1 },
    { month: 'Dec', total: 8, near_miss: 5, injury: 2, environmental: 1 },
    { month: 'Jan', total: 12, near_miss: 8, injury: 3, environmental: 1 }
  ];

  const trainingCompliance = [
    { month: 'Jul', compliance: 78 },
    { month: 'Aug', compliance: 81 },
    { month: 'Sep', compliance: 83 },
    { month: 'Oct', compliance: 85 },
    { month: 'Nov', compliance: 86 },
    { month: 'Dec', compliance: 84 },
    { month: 'Jan', compliance: 87 }
  ];

  const safetyMetrics = [
    { metric: 'Leadership', value: 85 },
    { metric: 'Training', value: 87 },
    { metric: 'Equipment', value: 82 },
    { metric: 'Inspections', value: 88 },
    { metric: 'Culture', value: 80 },
    { metric: 'Compliance', value: 90 }
  ];

  const teamPerformance = [
    { team: 'Plant A', score: 85, incidents: 4, compliance: 92 },
    { team: 'Warehouse', score: 78, incidents: 3, compliance: 85 },
    { team: 'Site B', score: 82, incidents: 5, compliance: 88 }
  ];

  return (
    <div className="space-y-6" data-testid="analytics-page">
      <div>
        <h1 className="text-4xl font-bold tracking-tight uppercase mb-2" data-testid="analytics-title">ANALYTICS & REPORTS</h1>
        <p className="text-sm text-muted-foreground">Comprehensive safety performance insights</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="tactical-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Overall Score</p>
                <div className="text-3xl font-bold font-heading">{dashboardStats.safety_score.overall}</div>
                <Badge variant="success" className="mt-2 text-xs">+{dashboardStats.safety_score.trend}</Badge>
              </div>
              <Award className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>
        <Card className="tactical-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Avg Risk Score</p>
                <div className="text-3xl font-bold font-heading text-accent">{dashboardStats.incidents.avg_risk_score}</div>
                <p className="text-xs text-muted-foreground mt-2">Last 30 days</p>
              </div>
              <Activity className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card className="tactical-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Leading Indicators</p>
                <div className="text-3xl font-bold font-heading text-success">{dashboardStats.incidents.leading_indicators}</div>
                <p className="text-xs text-muted-foreground mt-2">This month</p>
              </div>
              <TrendingUp className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card className="tactical-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Benchmark</p>
                <div className="text-3xl font-bold font-heading">{dashboardStats.safety_score.industry_benchmark}</div>
                <p className="text-xs text-muted-foreground mt-2">Industry avg</p>
              </div>
              <Target className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="tactical-shadow" data-testid="monthly-incidents-chart">
          <CardHeader>
            <CardTitle className="text-xl font-semibold uppercase">Monthly Incident Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyIncidents}>
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
                <Legend />
                <Area type="monotone" dataKey="near_miss" stackId="1" stroke="hsl(var(--success))" fill="hsl(var(--success))" name="Near Miss" />
                <Area type="monotone" dataKey="injury" stackId="1" stroke="hsl(var(--accent))" fill="hsl(var(--accent))" name="Injury" />
                <Area type="monotone" dataKey="environmental" stackId="1" stroke="hsl(var(--destructive))" fill="hsl(var(--destructive))" name="Environmental" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="tactical-shadow" data-testid="training-compliance-chart">
          <CardHeader>
            <CardTitle className="text-xl font-semibold uppercase">Training Compliance Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trainingCompliance}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" domain={[70, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '4px'
                  }}
                />
                <Line type="monotone" dataKey="compliance" stroke="hsl(var(--success))" strokeWidth={3} name="Compliance %" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="tactical-shadow" data-testid="safety-metrics-radar">
          <CardHeader>
            <CardTitle className="text-xl font-semibold uppercase">Safety Performance Radar</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={safetyMetrics}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="metric" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
                <Radar name="Score" dataKey="value" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="tactical-shadow" data-testid="team-performance-chart">
          <CardHeader>
            <CardTitle className="text-xl font-semibold uppercase">Team Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={teamPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="team" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '4px'
                  }}
                />
                <Legend />
                <Bar dataKey="score" fill="hsl(var(--primary))" name="Safety Score" />
                <Bar dataKey="compliance" fill="hsl(var(--success))" name="Compliance %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DummyAnalytics;