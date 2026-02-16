// pages/Alerts/AlertsDashboard.jsx
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  AlertTriangle, Bell, CheckCircle, Clock, Filter, 
  Search, TrendingUp, TrendingDown, Shield, Loader2
} from 'lucide-react';
import { PredictiveAlertCard } from '../../components/alerts/PredictiveAlertCard';
import { useAlerts, useAcknowledgeAlert, useConfigureAlertSettings } from '../../hooks/useAlerts';

export default function AlertsDashboard({ user }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showConfig, setShowConfig] = useState(false);
  const [configSettings, setConfigSettings] = useState({
    threshold: 'high',
    frequency: 'immediate',
    escalation: 'team'
  });

  // React Query hooks
  const { 
    data: alerts = [], 
    isLoading, 
    refetch 
  } = useAlerts();
  
  const acknowledgeMutation = useAcknowledgeAlert();
  const configureMutation = useConfigureAlertSettings();

  const handleAcknowledge = (alertId) => {
    acknowledgeMutation.mutate(alertId);
  };

  const handleSaveConfig = () => {
    configureMutation.mutate(configSettings);
    setShowConfig(false);
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || alert.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Mock alerts for demonstration if no data
  const displayAlerts = alerts.length > 0 ? filteredAlerts : [];

  // Stats
  const stats = {
    active: alerts.filter(a => a.status === 'active').length,
    acknowledged: alerts.filter(a => a.status === 'acknowledged').length,
    high: alerts.filter(a => a.severity === 'high' || a.severity === 'critical').length,
    avgResponse: '4.2h' // This would come from API
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-sky-600 animate-spin mx-auto" />
          <p className="mt-2 text-sm text-slate-500">Loading alerts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent">
            Predictive Alerts Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">
            AI-generated safety risk predictions and alerts requiring attention
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button size="sm" variant="outline" className="gap-2" onClick={() => refetch()}>
            <Bell className="w-4 h-4" />
            Refresh Alerts
          </Button>
          <Button 
            size="sm" 
            className="gap-2"
            onClick={() => setShowConfig(!showConfig)}
          >
            <Shield className="w-4 h-4" />
            Configure Alerts
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Active Alerts" 
          value={stats.active.toString()} 
          icon={<AlertTriangle className="w-5 h-5" />}
          color="text-red-600 bg-red-50 dark:bg-red-900/20"
          trend={stats.active > 0 ? 'up' : 'same'}
        />
        <StatCard 
          title="Acknowledged" 
          value={stats.acknowledged.toString()} 
          icon={<CheckCircle className="w-5 h-5" />}
          color="text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20"
          trend="same"
        />
        <StatCard 
          title="High Priority" 
          value={stats.high.toString()} 
          icon={<Bell className="w-5 h-5" />}
          color="text-amber-600 bg-amber-50 dark:bg-amber-900/20"
          trend={stats.high > 0 ? 'up' : 'same'}
        />
        <StatCard 
          title="Avg Response Time" 
          value={stats.avgResponse} 
          icon={<Clock className="w-5 h-5" />}
          color="text-blue-600 bg-blue-50 dark:bg-blue-900/20"
          trend="down"
        />
      </div>

      {/* Search and Filter */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search alerts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={filterStatus === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterStatus('all')}
          >
            All
          </Button>
          <Button
            variant={filterStatus === 'active' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterStatus('active')}
            className="gap-1"
          >
            <AlertTriangle className="w-3 h-3" />
            Active
          </Button>
          <Button
            variant={filterStatus === 'acknowledged' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterStatus('acknowledged')}
            className="gap-1"
          >
            <CheckCircle className="w-3 h-3" />
            Acknowledged
          </Button>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800">
          <Filter className="w-4 h-4 text-slate-500" />
          <select className="text-sm bg-transparent border-none focus:ring-0 text-slate-700 dark:text-slate-300 w-full">
            <option>Sort by: Newest</option>
            <option>Sort by: Priority</option>
            <option>Sort by: Severity</option>
          </select>
        </div>
      </div>

      {/* Configuration Panel */}
      {showConfig && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600" />
              Alert Configuration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Alert Threshold</label>
                  <select 
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm"
                    value={configSettings.threshold}
                    onChange={(e) => setConfigSettings({...configSettings, threshold: e.target.value})}
                  >
                    <option value="high">High (70% risk score)</option>
                    <option value="medium">Medium (50% risk score)</option>
                    <option value="low">Low (30% risk score)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Notification Frequency</label>
                  <select 
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm"
                    value={configSettings.frequency}
                    onChange={(e) => setConfigSettings({...configSettings, frequency: e.target.value})}
                  >
                    <option value="immediate">Immediate</option>
                    <option value="daily">Daily Digest</option>
                    <option value="weekly">Weekly Summary</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Escalation Level</label>
                  <select 
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm"
                    value={configSettings.escalation}
                    onChange={(e) => setConfigSettings({...configSettings, escalation: e.target.value})}
                  >
                    <option value="team">Team Level</option>
                    <option value="group">Group Level</option>
                    <option value="executive">Executive Level</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSaveConfig} disabled={configureMutation.isPending}>
                  {configureMutation.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : null}
                  Save Configuration
                </Button>
                <Button variant="outline" onClick={() => setShowConfig(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Critical Alert Banner */}
      {displayAlerts.some(alert => alert.severity === 'critical' && alert.status === 'active') && (
        <Card className="border-l-4 border-red-500 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/10 dark:to-orange-900/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-red-100 dark:bg-red-900/30">
                  <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-semibold text-red-700 dark:text-red-300">
                    Critical Alert Requiring Immediate Attention
                  </h3>
                  <p className="text-sm text-red-600/80 dark:text-red-400/80">
                    One or more critical alerts require immediate action to prevent potential incidents
                  </p>
                </div>
              </div>
              <Button variant="destructive" size="sm">
                Take Action
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Alerts Grid */}
      <div className="space-y-4">
        {displayAlerts.length > 0 ? (
          displayAlerts.map((alert) => (
            <div key={alert.id}>
              <PredictiveAlertCard alert={alert} />
              {alert.status === 'active' && (
                <div className="mt-2 flex justify-end">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleAcknowledge(alert.id)}
                    className="gap-1"
                    disabled={acknowledgeMutation.isPending}
                  >
                    {acknowledgeMutation.isPending ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <CheckCircle className="w-3 h-3" />
                    )}
                    Acknowledge
                  </Button>
                </div>
              )}
            </div>
          ))
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <Bell className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                No alerts found
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                {searchTerm || filterStatus !== 'all' 
                  ? 'Try adjusting your search or filters'
                  : 'No active alerts at this time. Great job!'}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color, trend }) {
  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-emerald-600" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-2 rounded-lg ${color}`}>
            {icon}
          </div>
          {getTrendIcon(trend)}
        </div>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}