import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Shield, 
  CheckCircle, 
  Clock, 
  BarChart3,
  Activity,
  Target,
  Users,
  Building,
  Filter
} from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

export default function Dashboard({ user }) {
  const [timeRange, setTimeRange] = useState("month");
  const [loading, setLoading] = useState(false);

  // Leading vs Lagging Indicators Data
  const leadingVsLaggingData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Trainings Completed',
        data: [45, 52, 48, 65, 58, 70],
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 2,
        type: 'bar',
        yAxisID: 'y',
        order: 2
      },
      {
        label: 'Safety Inspections',
        data: [38, 45, 42, 55, 50, 60],
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        borderColor: 'rgb(16, 185, 129)',
        borderWidth: 2,
        type: 'bar',
        yAxisID: 'y',
        order: 2
      },
      {
        label: 'Incidents Reported',
        data: [8, 6, 5, 4, 3, 2],
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        borderColor: 'rgb(239, 68, 68)',
        borderWidth: 3,
        type: 'line',
        tension: 0.4,
        yAxisID: 'y1',
        order: 1,
        fill: true
      }
    ]
  };

  // Doughnut Chart Data
  const incidentTypeData = {
    labels: ['Near Miss', 'First Aid', 'Property Damage', 'Lost Time'],
    datasets: [
      {
        data: [45, 25, 20, 10],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)'
        ],
        borderColor: [
          'rgb(59, 130, 246)',
          'rgb(16, 185, 129)',
          'rgb(245, 158, 11)',
          'rgb(239, 68, 68)'
        ],
        borderWidth: 2,
        hoverOffset: 20
      }
    ]
  };

  // Heatmap Data
  const heatmapData = {
    labels: ['Warehouse', 'Production', 'Maintenance', 'Office', 'Lab'],
    datasets: [
      {
        label: 'Team A',
        data: [85, 45, 65, 25, 55],
        backgroundColor: (context) => {
          const value = context.dataset.data[context.dataIndex];
          if (value >= 80) return 'rgba(239, 68, 68, 0.8)';
          if (value >= 60) return 'rgba(245, 158, 11, 0.8)';
          if (value >= 40) return 'rgba(59, 130, 246, 0.8)';
          return 'rgba(16, 185, 129, 0.8)';
        }
      },
      {
        label: 'Team B',
        data: [65, 75, 45, 35, 85],
        backgroundColor: (context) => {
          const value = context.dataset.data[context.dataIndex];
          if (value >= 80) return 'rgba(239, 68, 68, 0.8)';
          if (value >= 60) return 'rgba(245, 158, 11, 0.8)';
          if (value >= 40) return 'rgba(59, 130, 246, 0.8)';
          return 'rgba(16, 185, 129, 0.8)';
        }
      },
      {
        label: 'Team C',
        data: [45, 65, 85, 55, 75],
        backgroundColor: (context) => {
          const value = context.dataset.data[context.dataIndex];
          if (value >= 80) return 'rgba(239, 68, 68, 0.8)';
          if (value >= 60) return 'rgba(245, 158, 11, 0.8)';
          if (value >= 40) return 'rgba(59, 130, 246, 0.8)';
          return 'rgba(16, 185, 129, 0.8)';
        }
      }
    ]
  };

  // Recent Alerts Data
  const recentAlerts = [
    {
      id: 1,
      title: "Forklift Near-Misses",
      location: "Warehouse Zone A",
      risk: "High",
      time: "2 hours ago",
      description: "Multiple near-miss incidents detected in forklift operations"
    },
    {
      id: 2,
      title: "Delayed Equipment Maintenance",
      location: "Production Line 3",
      risk: "Medium",
      time: "1 day ago",
      description: "Critical maintenance overdue by 7 days"
    },
    {
      id: 3,
      title: "Safety Gear Compliance",
      location: "Construction Site",
      risk: "Medium",
      time: "2 days ago",
      description: "PPE compliance dropped by 15% this week"
    }
  ];

  // Chart Options
  const leadingLaggingOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#6b7280',
          font: {
            size: 11
          }
        }
      },
      title: {
        display: false
      },
      tooltip: {
        mode: 'index',
        intersect: false
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(229, 231, 235, 0.2)'
        },
        ticks: {
          color: '#6b7280'
        }
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Activities Count',
          color: '#6b7280'
        },
        grid: {
          color: 'rgba(229, 231, 235, 0.2)'
        },
        ticks: {
          color: '#6b7280'
        }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'Incidents Count',
          color: '#6b7280'
        },
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          color: '#6b7280'
        }
      }
    },
    interaction: {
      mode: 'index',
      intersect: false
    }
  };

  const heatmapOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#6b7280',
          font: {
            size: 11
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.raw}% risk score`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(229, 231, 235, 0.2)'
        },
        ticks: {
          color: '#6b7280'
        }
      },
      y: {
        grid: {
          color: 'rgba(229, 231, 235, 0.2)'
        },
        ticks: {
          color: '#6b7280'
        }
      }
    }
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: '#6b7280',
          font: {
            size: 11
          },
          padding: 20
        }
      }
    },
    cutout: '65%'
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent">
            Safety Intelligence Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">
            Real-time overview of safety performance and predictive risks • Last updated: Today, 10:30 AM
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800">
            <Filter className="w-4 h-4 text-slate-500" />
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="text-sm bg-transparent border-none focus:ring-0 text-slate-700 dark:text-slate-300"
            >
              <option value="week">Last 7 days</option>
              <option value="month">Last 30 days</option>
              <option value="quarter">Last quarter</option>
              <option value="year">Last year</option>
            </select>
          </div>
          <Button size="sm" variant="outline" className="gap-2">
            <Activity className="w-4 h-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard 
          title="Safety Score" 
          value="87" 
          unit="/100" 
          status="good" 
          trend="up" 
          icon={<Shield className="w-5 h-5" />}
          progress={87}
        />
        <KpiCard 
          title="Open High-Risk Tasks" 
          value="3" 
          status="warning" 
          trend="same" 
          icon={<AlertTriangle className="w-5 h-5" />}
        />
        <KpiCard 
          title="Predictive Alerts" 
          value="2" 
          status="critical" 
          trend="up" 
          icon={<Target className="w-5 h-5" />}
        />
        <KpiCard 
          title="Compliance Status" 
          value="94%" 
          status="good" 
          trend="up" 
          icon={<CheckCircle className="w-5 h-5" />}
          subtitle="On Track"
        />
      </div>

      {/* Predictive Alerts */}
      <Card className="border-l-4 border-red-500 bg-gradient-to-r from-red-50/50 to-white dark:from-red-900/10 dark:to-slate-900/50">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30">
                  <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-red-700 dark:text-red-300">
                    Active Predictive Risk Alerts
                  </h3>
                  <p className="text-sm text-red-600/80 dark:text-red-400/80">
                    Requires immediate attention
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground max-w-3xl">
                AI analysis detected a 45% increased probability of forklift-related incidents 
                in Warehouse Zone A based on recent near-misses, delayed maintenance, 
                and increased traffic patterns.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="sm" className="gap-2 bg-red-600 hover:bg-red-700">
                <AlertTriangle className="w-4 h-4" />
                View Alert Details
              </Button>
              <Button size="sm" variant="outline" className="gap-2">
                <Clock className="w-4 h-4" />
                Schedule Action
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leading vs Lagging Indicators */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-sky-600" />
                Leading vs Lagging Indicators
              </CardTitle>
              <Badge variant="outline" className="text-xs">
                Last 6 months
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <Bar data={leadingVsLaggingData} options={leadingLaggingOptions} />
            </div>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="text-center p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                <p className="text-2xl font-bold text-sky-600">42%</p>
                <p className="text-xs text-muted-foreground">Incident Reduction</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                <p className="text-2xl font-bold text-emerald-600">+65%</p>
                <p className="text-xs text-muted-foreground">Training Completion</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                <p className="text-2xl font-bold text-amber-600">12</p>
                <p className="text-xs text-muted-foreground">Inspections This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Incident Type Distribution */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Activity className="w-5 h-5 text-purple-600" />
              Incident Type Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <Doughnut data={incidentTypeData} options={doughnutOptions} />
            </div>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-sky-500"></div>
                  <span className="text-sm">Near Miss</span>
                </div>
                <span className="font-semibold">45%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <span className="text-sm">First Aid</span>
                </div>
                <span className="font-semibold">25%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Heatmap & Recent Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Risk Heatmap */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Building className="w-5 h-5 text-amber-600" />
                Predictive Risk Heatmap
                <Badge variant="outline" className="ml-2 text-xs">AI-Generated</Badge>
              </CardTitle>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-red-500"></div>
                  <span>High</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-amber-500"></div>
                  <span>Medium</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-blue-500"></div>
                  <span>Low</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <Bar 
                data={heatmapData} 
                options={{
                  ...heatmapOptions,
                  indexAxis: 'y'
                }} 
              />
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              <p>Heatmap shows risk scores across different locations and teams. Higher scores indicate areas requiring attention.</p>
            </div>
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              Recent Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium text-sm">{alert.title}</p>
                    <p className="text-xs text-muted-foreground">{alert.location}</p>
                  </div>
                  <Badge variant={alert.risk === 'High' ? 'destructive' : 'warning'} className="text-xs">
                    {alert.risk}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{alert.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">{alert.time}</span>
                  <Button size="sm" variant="ghost" className="h-6 text-xs">
                    Details
                  </Button>
                </div>
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full gap-2">
              <AlertTriangle className="w-4 h-4" />
              View All Alerts
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Task & SLA Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            Corrective Actions & SLA Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <SlaCard 
              title="Overdue Tasks" 
              value="1" 
              status="critical" 
              description="2 days overdue"
              trend="down"
            />
            <SlaCard 
              title="Due Today" 
              value="2" 
              status="warning" 
              description="Requires attention"
              trend="same"
            />
            <SlaCard 
              title="On Track" 
              value="14" 
              status="good" 
              description="Within SLA"
              trend="up"
            />
            <SlaCard 
              title="Completed This Month" 
              value="28" 
              status="good" 
              description="98% on time"
              trend="up"
            />
          </div>
          <div className="mt-6 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Overall SLA Performance</span>
              <span className="text-sm font-bold text-emerald-600">94%</span>
            </div>
            <Progress value={94} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>Target: 95%</span>
              <span>+2% from last month</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Role-based Executive Summary */}
      {(user?.role === "group_admin" || user?.role === "super_admin") && (
        <Card className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800/30 dark:to-blue-900/20 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              Executive AI Safety Summary
              <Badge variant="outline" className="ml-2">AI-Generated</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-white dark:bg-slate-800 border">
                  <p className="text-sm font-medium text-muted-foreground">Risk Level</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-3 h-3 rounded-full bg-amber-500 animate-pulse"></div>
                    <p className="text-xl font-bold">Moderate</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Stable with rising concerns</p>
                </div>
                <div className="p-4 rounded-lg bg-white dark:bg-slate-800 border">
                  <p className="text-sm font-medium text-muted-foreground">Top Risk Area</p>
                  <p className="text-xl font-bold mt-1">Warehouse Ops</p>
                  <p className="text-xs text-muted-foreground mt-1">45% incident probability</p>
                </div>
                <div className="p-4 rounded-lg bg-white dark:bg-slate-800 border">
                  <p className="text-sm font-medium text-muted-foreground">Recommendation</p>
                  <p className="text-xl font-bold mt-1">Immediate Action</p>
                  <p className="text-xs text-muted-foreground mt-1">Within 7 days</p>
                </div>
              </div>
              
              <div className="p-4 rounded-lg bg-white dark:bg-slate-800 border">
                <p className="text-sm text-muted-foreground mb-2">Executive Summary</p>
                <p className="text-sm leading-relaxed">
                  Safety performance remains stable with an overall score of 87. However, predictive analytics 
                  indicate a 45% increased risk in warehouse operations due to repeated forklift near-misses 
                  and delayed equipment maintenance. Housekeeping compliance has dropped by 15% in the last 
                  two weeks. Immediate preventive actions are recommended to avoid potential high-severity 
                  incidents in the next 30 days. Compliance metrics are on track at 94%, exceeding the 
                  industry benchmark of 90%.
                </p>
              </div>
              
              <div className="flex gap-3">
                <Button size="sm" variant="default" className="gap-2">
                  <TrendingUp className="w-4 h-4" />
                  View Full Analytics
                </Button>
                <Button size="sm" variant="outline" className="gap-2">
                  Download PDF Report
                </Button>
                <Button size="sm" variant="outline" className="gap-2">
                  Schedule Review Meeting
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

/* ---------------- Components ---------------- */

function KpiCard({ title, value, unit, status, trend, icon, progress, subtitle }) {
  const getStatusColor = (status) => {
    switch(status) {
      case 'good': return 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20';
      case 'warning': return 'text-amber-600 bg-amber-50 dark:bg-amber-900/20';
      case 'critical': return 'text-red-600 bg-red-50 dark:bg-red-900/20';
      default: return 'text-slate-600 bg-slate-50 dark:bg-slate-800';
    }
  };

  const getTrendIcon = (trend) => {
    switch(trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-emerald-600" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-600" />;
      default: return null;
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-2 rounded-lg ${getStatusColor(status)}`}>
            {icon}
          </div>
          {trend && getTrendIcon(trend)}
        </div>
        
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{title}</p>
          <div className="flex items-baseline gap-1">
            <p className="text-3xl font-bold">{value}</p>
            {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
          </div>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
          
          {progress && (
            <div className="pt-2">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-1.5" />
            </div>
          )}
          
          <StatusBadge status={status} />
        </div>
      </CardContent>
    </Card>
  );
}

function SlaCard({ title, value, status, description, trend }) {
  const getStatusColor = (status) => {
    switch(status) {
      case 'good': return 'border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-900/10';
      case 'warning': return 'border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-900/10';
      case 'critical': return 'border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-900/10';
      default: return 'border-slate-200 dark:border-slate-700';
    }
  };

  return (
    <div className={`border-2 rounded-xl p-4 ${getStatusColor(status)} hover:scale-[1.02] transition-transform duration-200`}>
      <div className="flex items-start justify-between mb-2">
        <p className="text-sm font-medium text-slate-900 dark:text-white">{title}</p>
        {trend === 'up' && <TrendingUp className="w-4 h-4 text-emerald-600" />}
        {trend === 'down' && <TrendingDown className="w-4 h-4 text-red-600" />}
        {trend === 'same' && <div className="w-4 h-4 text-amber-600">–</div>}
      </div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs text-muted-foreground mt-1">{description}</p>
      <div className="mt-3">
        <StatusBadge status={status} />
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    good: <Badge variant="success" className="text-xs">Good</Badge>,
    warning: <Badge variant="warning" className="text-xs">Attention</Badge>,
    critical: <Badge variant="destructive" className="text-xs">Critical</Badge>,
  };
  return map[status] || null;
}