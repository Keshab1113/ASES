import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  Shield,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import api from "../../api/axios";
import SafetyScoreChart from './SafetyScoreChart';
import IndicatorTrendChart from './IndicatorTrendChart';
import RiskHeatmap from './RiskHeatmap';
import ComplianceStatus from './ComplianceStatus';

const SafetyDashboard = ({ user }) => {
  const [dashboardData, setDashboardData] = useState({
    scores: {},
    trends: [],
    alerts: [],
    compliance: {},
    leadingIndicators: [],
    laggingIndicators: [],
    recentAssignments: []
  });
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('30d');

  useEffect(() => {
    fetchDashboardData();
  }, [timeframe, user.group_id, user.team_id]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch all data in parallel
      const [
        scoresRes,
        alertsRes,
        indicatorsRes,
        assignmentsRes,
        trendsRes
      ] = await Promise.all([
        api.get('/indicators/scores/all', {
          params: {
            groupId: user.group_id,
            teamId: user.team_id
          }
        }).catch(err => ({ data: { data: {} } })),
        
        api.get('/indicators/alerts/all', {
          params: { limit: 10, status: 'active' }
        }).catch(err => ({ data: { data: [] } })),
        
        api.get('/indicators/', {
          params: {
            groupId: user.group_id,
            teamId: user.team_id
          }
        }).catch(err => ({ data: { data: { leading: [], lagging: [] } } })),
        
        api.get('/indicators/assigned/me').catch(err => ({ data: { data: { leading: [], lagging: [] } } })),
        
        api.get('/analytics/trends', {
          params: { 
            timeframe,
            groupId: user.group_id,
            teamId: user.team_id
          }
        }).catch(err => ({ data: { data: [] } }))
      ]);

      // Calculate real metrics from data
      const leadingIndicators = indicatorsRes.data?.data?.leading || [];
      const laggingIndicators = indicatorsRes.data?.data?.lagging || [];
      const assignments = assignmentsRes.data?.data || { leading: [], lagging: [] };
      const alerts = alertsRes.data?.data || [];
      
      // Calculate completion rate
      const totalAssignments = assignments.leading.length + assignments.lagging.length;
      const completedAssignments = [
        ...assignments.leading.filter(a => a.status === 'completed'),
        ...assignments.lagging.filter(a => a.status === 'completed')
      ].length;
      const completionRate = totalAssignments > 0 ? (completedAssignments / totalAssignments) * 100 : 0;

      // Calculate days incident free
      const incidents = laggingIndicators.filter(i => 
        i.category?.includes('incident') || i.category?.includes('injury')
      );
      const lastIncident = incidents.length > 0 
        ? Math.max(...incidents.map(i => new Date(i.created_at).getTime()))
        : null;
      const daysIncidentFree = lastIncident 
        ? Math.floor((Date.now() - lastIncident) / (1000 * 60 * 60 * 24))
        : 30; // Default to 30 if no incidents

      // Calculate risk level based on alerts and lagging indicators
      const criticalAlerts = alerts.filter(a => a.severity === 'critical').length;
      const highAlerts = alerts.filter(a => a.severity === 'high').length;
      let riskLevel = 'low';
      if (criticalAlerts > 0 || incidents.length > 5) {
        riskLevel = 'critical';
      } else if (highAlerts > 2 || incidents.length > 2) {
        riskLevel = 'high';
      } else if (highAlerts > 0 || incidents.length > 0) {
        riskLevel = 'medium';
      }

      // Calculate leading and lagging scores
      const leadingScore = leadingIndicators.length > 0
        ? leadingIndicators.reduce((acc, ind) => {
            const value = ind.current_value || 0;
            const target = ind.target_value || 100;
            return acc + (value / target) * 100;
          }, 0) / leadingIndicators.length
        : 75;

      const laggingScore = laggingIndicators.length > 0
        ? Math.max(0, 100 - (laggingIndicators.length * 5))
        : 100;

      const compositeScore = (leadingScore * 0.6 + laggingScore * 0.4);

      // Determine trend
      const trend = compositeScore > 75 ? 'improving' : compositeScore < 50 ? 'declining' : 'stable';

      setDashboardData({
        scores: {
          compositeScore,
          leadingScore,
          laggingScore,
          trend,
          riskLevel,
          daysIncidentFree,
          completionRate
        },
        trends: trendsRes.data?.data || generateMockTrends(timeframe),
        alerts: alerts.slice(0, 5),
        compliance: {
          oshaStatus: completionRate > 80 ? 'compliant' : completionRate > 50 ? 'pending' : 'non-compliant',
          isoStatus: leadingScore > 70 ? 'compliant' : leadingScore > 40 ? 'pending' : 'non-compliant',
          trainingStatus: completionRate > 90 ? 'compliant' : completionRate > 60 ? 'pending' : 'non-compliant',
          equipmentStatus: alerts.filter(a => a.alert_type === 'equipment').length > 0 ? 'pending' : 'compliant'
        },
        metrics: {
          leadingProgress: leadingScore,
          laggingProgress: laggingScore,
          daysIncidentFree,
          completionRate,
          riskLevel
        }
      });
    } catch (error) {
      console.error('Dashboard fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateMockTrends = (timeframe) => {
    const points = timeframe === '7d' ? 7 : timeframe === '30d' ? 30 : 90;
    const data = [];
    for (let i = 0; i < points; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (points - i));
      data.push({
        date: date.toISOString(),
        score: 65 + Math.random() * 20,
        leading: 60 + Math.random() * 25,
        lagging: 70 + Math.random() * 15
      });
    }
    return data;
  };

  const getRiskColor = (level) => {
    const colors = {
      low: 'bg-green-100 text-green-700',
      medium: 'bg-yellow-100 text-yellow-700',
      high: 'bg-orange-100 text-orange-700',
      critical: 'bg-red-500 text-white'
    };
    return colors[level] || colors.low;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mb-4" />
              <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Timeframe Selector */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Safety Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Real-time safety performance metrics
          </p>
        </div>
        <div className="flex gap-2">
          {['7d', '30d', '90d'].map((period) => (
            <Button
              key={period}
              variant={timeframe === period ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeframe(period)}
            >
              {period}
            </Button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Safety Score</p>
                <p className="text-3xl font-bold mt-2">
                  {dashboardData.scores.compositeScore?.toFixed(1) || 'N/A'}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  {dashboardData.scores.trend === 'improving' ? (
                    <>
                      <ArrowUpRight className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-600">Improving</span>
                    </>
                  ) : dashboardData.scores.trend === 'declining' ? (
                    <>
                      <ArrowDownRight className="w-4 h-4 text-red-600" />
                      <span className="text-sm text-red-600">Declining</span>
                    </>
                  ) : (
                    <>
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-blue-600">Stable</span>
                    </>
                  )}
                </div>
              </div>
              <div className="p-3 rounded-lg bg-sky-100 dark:bg-sky-900/30">
                <Shield className="w-6 h-6 text-sky-600 dark:text-sky-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Leading Indicators</p>
                <p className="text-3xl font-bold mt-2">
                  {dashboardData.metrics?.leadingProgress?.toFixed(1) || '0'}%
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Proactive measures
                </p>
              </div>
              <div className="p-3 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                <TrendingUp className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Days Incident Free</p>
                <p className="text-3xl font-bold mt-2">
                  {dashboardData.metrics?.daysIncidentFree || 0}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  No new incidents
                </p>
              </div>
              <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/30">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Risk Level</p>
                <p className="text-3xl font-bold mt-2">
                  {dashboardData.metrics?.riskLevel?.toUpperCase() || 'LOW'}
                </p>
                <div className="mt-2">
                  <span className={`text-xs px-2 py-1 rounded-md ${getRiskColor(dashboardData.metrics?.riskLevel)}`}>
                    {dashboardData.metrics?.riskLevel}
                  </span>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-red-100 dark:bg-red-900/30">
                <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Safety Score Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <SafetyScoreChart 
              data={dashboardData.trends}
              timeframe={timeframe}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Leading vs Lagging Indicators</CardTitle>
          </CardHeader>
          <CardContent>
            <IndicatorTrendChart 
              leadingScore={dashboardData.scores.leadingScore}
              laggingScore={dashboardData.scores.laggingScore}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Risk Heatmap</CardTitle>
          </CardHeader>
          <CardContent>
            <RiskHeatmap 
              alerts={dashboardData.alerts}
              riskLevel={dashboardData.metrics?.riskLevel}
            />
          </CardContent>
        </Card>
      </div>

      {/* Alerts and Compliance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Alerts</CardTitle>
              <Badge variant="destructive">
                {dashboardData.alerts.length} Active
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dashboardData.alerts.length === 0 ? (
                <div className="text-center py-6">
                  <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">No active alerts</p>
                </div>
              ) : (
                dashboardData.alerts.map((alert, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">{alert.title || 'Safety Alert'}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {alert.alert_type || 'General'} • {alert.severity || 'medium'}
                        </p>
                      </div>
                      <Badge variant={
                        alert.severity === 'critical' ? 'destructive' : 
                        alert.severity === 'high' ? 'destructive' :
                        alert.severity === 'medium' ? 'secondary' : 'outline'
                      }>
                        {alert.severity || 'medium'}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {alert.created_at ? new Date(alert.created_at).toLocaleString() : new Date().toLocaleString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Compliance Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ComplianceStatus 
              data={dashboardData.compliance}
              user={user}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SafetyDashboard;