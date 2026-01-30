import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  AlertTriangle, 
  Shield, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  Users, 
  FileText, 
  BarChart3,
  Target,
  Calendar,
  Bell,
  Award,
  Activity,
  ChevronRight,
  Zap,
  Lightbulb,
  FileCheck
} from "lucide-react";

export default function Home({ user }) {
  const [currentTime, setCurrentTime] = useState("");
  const [greeting, setGreeting] = useState("");
  const [loading, setLoading] = useState(false);

  // Update time and greeting
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      
      setCurrentTime(`${hours}:${minutes}`);
      
      if (hours < 12) setGreeting("Good morning");
      else if (hours < 18) setGreeting("Good afternoon");
      else setGreeting("Good evening");
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Role-based quick actions
  const employeeActions = [
    { 
      icon: <AlertTriangle className="w-5 h-5" />, 
      title: "Report Incident", 
      desc: "Log safety incidents or near misses", 
      action: "Report Now",
      color: "from-red-500 to-orange-500",
      path: "/incidents/report"
    },
    { 
      icon: <CheckCircle className="w-5 h-5" />, 
      title: "My Tasks", 
      desc: "View and complete assigned actions", 
      action: "View Tasks",
      color: "from-emerald-500 to-green-500",
      path: "/tasks"
    },
    { 
      icon: <Lightbulb className="w-5 h-5" />, 
      title: "Safety Suggestion", 
      desc: "Share ideas to improve workplace safety", 
      action: "Submit",
      color: "from-blue-500 to-cyan-500",
      path: "/suggestions"
    },
    { 
      icon: <FileText className="w-5 h-5" />, 
      title: "My Trainings", 
      desc: "Access assigned safety trainings", 
      action: "Continue",
      color: "from-purple-500 to-pink-500",
      path: "/trainings"
    }
  ];

  const teamAdminActions = [
    { 
      icon: <Users className="w-5 h-5" />, 
      title: "Team Tasks", 
      desc: "Track corrective actions and SLAs", 
      action: "Manage",
      color: "from-blue-500 to-indigo-500",
      path: "/tasks"
    },
    { 
      icon: <FileCheck className="w-5 h-5" />, 
      title: "Inspections", 
      desc: "Perform or review safety inspections", 
      action: "Start",
      color: "from-emerald-500 to-teal-500",
      path: "/inspections"
    },
    { 
      icon: <Shield className="w-5 h-5" />, 
      title: "JSA Management", 
      desc: "Create or update Job Safety Analyses", 
      action: "Open",
      color: "from-amber-500 to-orange-500",
      path: "/jsa"
    },
    { 
      icon: <Activity className="w-5 h-5" />, 
      title: "Risk Assessment", 
      desc: "Conduct team risk assessments", 
      action: "Assess",
      color: "from-red-500 to-rose-500",
      path: "/risk-assessment"
    }
  ];

  const adminActions = [
    { 
      icon: <BarChart3 className="w-5 h-5" />, 
      title: "Analytics Dashboard", 
      desc: "View safety trends and KPIs", 
      action: "View",
      color: "from-sky-500 to-blue-500",
      path: "/analytics"
    },
    { 
      icon: <Target className="w-5 h-5" />, 
      title: "Compliance Reports", 
      desc: "ISO 45001 & OSHA aligned reports", 
      action: "Generate",
      color: "from-purple-500 to-violet-500",
      path: "/compliance"
    },
    { 
      icon: <TrendingUp className="w-5 h-5" />, 
      title: "Executive Summary", 
      desc: "AI-generated leadership insights", 
      action: "Open",
      color: "from-emerald-500 to-green-500",
      path: "/executive-summary"
    },
    { 
      icon: <Award className="w-5 h-5" />, 
      title: "Safety Awards", 
      desc: "Recognize team safety achievements", 
      action: "Review",
      color: "from-amber-500 to-yellow-500",
      path: "/awards"
    }
  ];

  // Get actions based on role
  const getActions = () => {
    switch(user?.role) {
      case 'team_admin': return teamAdminActions;
      case 'group_admin':
      case 'super_admin': return adminActions;
      default: return employeeActions;
    }
  };

  // Recent activities
  const recentActivities = [
    { id: 1, type: "training", title: "Forklift Safety Training", time: "2 hours ago", status: "completed" },
    { id: 2, type: "inspection", title: "Monthly Fire Safety Check", time: "Yesterday", status: "pending" },
    { id: 3, type: "incident", title: "Near-miss Report", time: "2 days ago", status: "reviewed" },
    { id: 4, type: "task", title: "Safety Equipment Audit", time: "3 days ago", status: "in-progress" }
  ];

  const handleQuickAction = (path) => {
    console.log(`Navigating to: ${path}`);
    // In real app: router.push(path);
  };

  return (
    <div className="min-h-screen  ">
      {/* Header Section */}
      <div className="p-0 pb-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-sky-100 to-emerald-100 dark:from-sky-900/30 dark:to-emerald-900/30">
                <Shield className="w-6 h-6 text-sky-600 dark:text-sky-400" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent">
                  {greeting}{user?.name ? `, ${user.name}` : ""}
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs">
                    {user?.role ? user.role.replace('_', ' ').toUpperCase() : 'EMPLOYEE'}
                  </Badge>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {currentTime} • Today, {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2 max-w-2xl">
              Welcome to your safety command center. Here's an overview of your safety system today.
            </p>
          </div>

          {/* Safety Streak */}
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-slate-900 dark:text-white">Safety Streak</p>
              <p className="text-2xl font-bold text-emerald-600">127 days</p>
              <p className="text-xs text-slate-500">No lost time incidents</p>
            </div>
            <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900/20 dark:to-green-900/20 border border-emerald-200 dark:border-emerald-800">
              <Award className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
        </div>
      </div>

      <main className="py-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard 
            title="Safety Score" 
            value="87" 
            unit="/100" 
            icon={<Shield className="w-5 h-5" />}
            status="good"
            trend="up"
            progress={87}
          />
          <KpiCard 
            title="High-Risk Tasks" 
            value="3" 
            icon={<AlertTriangle className="w-5 h-5" />}
            status="warning"
            trend="same"
            description="Requires attention"
          />
          <KpiCard 
            title="Predictive Alerts" 
            value="2" 
            icon={<Bell className="w-5 h-5" />}
            status="critical"
            trend="up"
            description="Active alerts"
          />
          <KpiCard 
            title="Compliance" 
            value="94%" 
            icon={<CheckCircle className="w-5 h-5" />}
            status="good"
            trend="up"
            description="On Track"
          />
        </div>

        {/* Predictive Alert Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 p-1">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-orange-600/20"></div>
          <div className="relative p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold text-white">
                    Active Predictive Risk Alert
                  </h3>
                  <Badge variant="destructive" className="animate-pulse">
                    High Priority
                  </Badge>
                </div>
                <p className="text-sm text-white/90 max-w-3xl">
                  AI analysis predicts a 45% increased risk of forklift-related incidents in 
                  Warehouse Zone A based on recent near-misses and delayed maintenance patterns.
                </p>
                <div className="flex items-center gap-4 text-xs text-white/80">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Detected 2 hours ago
                  </span>
                  <span className="flex items-center gap-1">
                    <Target className="w-3 h-3" />
                    Probability: 45%
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button 
                size="sm" 
                variant="secondary" 
                className="bg-white hover:bg-white/90 text-red-600"
                onClick={() => handleQuickAction("/alerts")}
              >
                View Details
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="border-white hover:text-white dark:bg-white text-red-500 hover:bg-white/20"
                onClick={() => handleQuickAction("/alerts/action")}
              >
                Take Action
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Actions & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-500" />
                Quick Actions
              </h2>
              <Badge variant="outline" className="text-xs">
                Role-based
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getActions().map((action, index) => (
                <Card 
                  key={index} 
                  className="group hover:shadow-lg hover:scale-[1.02] transition-all duration-300 border-slate-200 dark:border-slate-700 cursor-pointer bg-gradient-to-b from-white to-slate-50 
      dark:from-slate-900 dark:to-slate-800"
                  onClick={() => handleQuickAction(action.path)}
                >
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-r ${action.color}`}>
                        {action.icon}
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-sky-500 transition-colors" />
                    </div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                      {action.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {action.desc}
                    </p>
                    <Button 
                      size="sm" 
                      className={`w-full bg-gradient-to-r ${action.color} hover:opacity-90 text-white`}
                    >
                      {action.action}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-500" />
                Recent Activity
              </h2>
              <Button size="sm" variant="ghost" className="text-xs">
                View All
              </Button>
            </div>
            <Card className="border-slate-200 dark:border-slate-700 bg-gradient-to-b from-white to-slate-50 
      dark:from-slate-900 dark:to-slate-800">
              <CardContent className="p-4 space-y-4">
                {recentActivities.map((activity) => (
                  <div 
                    key={activity.id} 
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <div className={`p-2 rounded-lg ${
                      activity.type === 'training' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' :
                      activity.type === 'inspection' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' :
                      activity.type === 'incident' ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' :
                      'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
                    }`}>
                      {activity.type === 'training' && <FileText className="w-4 h-4" />}
                      {activity.type === 'inspection' && <FileCheck className="w-4 h-4" />}
                      {activity.type === 'incident' && <AlertTriangle className="w-4 h-4" />}
                      {activity.type === 'task' && <CheckCircle className="w-4 h-4" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                        {activity.title}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-slate-500">
                          {activity.time}
                        </span>
                        <Badge 
                          variant={
                            activity.status === 'completed' ? 'success' :
                            activity.status === 'pending' ? 'warning' :
                            activity.status === 'reviewed' ? 'secondary' : 'default'
                          } 
                          className="text-xs"
                        >
                          {activity.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                        Overall Progress
                      </p>
                      <p className="text-xs text-slate-500">Tasks & Trainings</p>
                    </div>
                    <span className="text-lg font-bold text-emerald-600">78%</span>
                  </div>
                  <Progress value={78} className="mt-2 h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Upcoming Events & Safety Tips */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
          {/* Upcoming Events */}
          <Card className="bg-gradient-to-b from-white to-slate-50 
      dark:from-slate-900 dark:to-slate-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-600" />
                Upcoming Safety Events
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 ">
              {[
                { title: "Quarterly Safety Review", date: "Tomorrow, 10:00 AM", type: "meeting" },
                { title: "Fire Drill", date: "This Friday, 2:00 PM", type: "drill" },
                { title: "Safety Training Session", date: "Next Monday, 9:00 AM", type: "training" },
                { title: "Emergency Equipment Check", date: "Next Wednesday", type: "inspection" }
              ].map((event, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                  <div className={`p-2 rounded-lg ${
                    event.type === 'meeting' ? 'bg-purple-100 dark:bg-purple-900/30' :
                    event.type === 'drill' ? 'bg-red-100 dark:bg-red-900/30' :
                    event.type === 'training' ? 'bg-blue-100 dark:bg-blue-900/30' :
                    'bg-emerald-100 dark:bg-emerald-900/30'
                  }`}>
                    <Calendar className={`w-4 h-4 ${
                      event.type === 'meeting' ? 'text-purple-600 dark:text-purple-400' :
                      event.type === 'drill' ? 'text-red-600 dark:text-red-400' :
                      event.type === 'training' ? 'text-blue-600 dark:text-blue-400' :
                      'text-emerald-600 dark:text-emerald-400'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {event.title}
                    </p>
                    <p className="text-xs text-slate-500">{event.date}</p>
                  </div>
                  <Button size="sm" variant="ghost" className="text-xs">
                    Add to Calendar
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Safety Tips */}
          <Card className="bg-gradient-to-br from-sky-50 to-emerald-50 dark:from-sky-900/10 dark:to-emerald-900/10 border-sky-200 dark:border-sky-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-600" />
                Safety Tip of the Day
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 rounded-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-sky-200 dark:border-sky-700">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30">
                    <Lightbulb className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                      Proper PPE Inspection
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                      Before starting work, always inspect your Personal Protective Equipment. 
                      Check for any wear, tear, or damage. Damaged PPE provides false protection 
                      and increases risk of injury.
                    </p>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span>✅ Visual inspection</span>
                      <span>✅ Fit check</span>
                      <span>✅ Function test</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 p-3 rounded-lg bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <p className="text-sm font-medium text-slate-900 dark:text-white mb-1">
                  Did you know?
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Regular PPE inspections can reduce workplace injuries by up to 60%
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Summary */}
        <Card className="bg-gradient-to-b from-white to-slate-50 
      dark:from-slate-900 dark:to-slate-800">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              Your Safety Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Training Completion</span>
                  <span className="text-lg font-bold text-emerald-600">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Incident Reports</span>
                  <span className="text-lg font-bold text-blue-600">5</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Safety Suggestions</span>
                  <span className="text-lg font-bold text-purple-600">8</span>
                </div>
                <Progress value={80} className="h-2" />
              </div>
            </div>
            <div className="mt-6 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
              <p className="text-sm text-slate-600 dark:text-slate-400 text-center">
                Your safety engagement score is <span className="font-bold text-emerald-600">15% above</span> the team average. 
                Keep up the great work!
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

/* ---------------- Components ---------------- */

function KpiCard({ title, value, unit, icon, status, trend, progress, description }) {
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
    <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-b from-white to-slate-50 
      dark:from-slate-900 dark:to-slate-800">
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-2.5 rounded-lg ${getStatusColor(status)}`}>
            {icon}
          </div>
          {trend && getTrendIcon(trend)}
        </div>
        
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{title}</p>
          <div className="flex items-baseline gap-1">
            <p className="text-2xl font-bold">{value}</p>
            {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
          </div>
          
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
          
          {progress && (
            <div className="pt-2">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-1.5" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}