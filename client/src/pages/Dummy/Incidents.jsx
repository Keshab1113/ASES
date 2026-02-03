import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { incidents } from '@/data/dummyData';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertTriangle, Plus, Search, TrendingUp } from 'lucide-react';
import { formatDate, getRiskColor, getStatusColor, getRiskLabel } from '@/lib/utils';

const DummyIncidents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredIncidents = incidents.filter(incident => {
    const matchesSearch = incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         incident.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || incident.type === filterType;
    const matchesStatus = filterStatus === 'all' || incident.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-6" data-testid="incidents-page">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight uppercase mb-2" data-testid="incidents-title">INCIDENTS</h1>
          <p className="text-sm text-muted-foreground">Track and manage safety incidents</p>
        </div>
        <Button className="uppercase tracking-wider font-semibold text-xs" data-testid="report-incident-btn">
          <Plus className="w-4 h-4 mr-2" />
          Report Incident
        </Button>
      </div>

      <Card className="tactical-shadow">
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search incidents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                data-testid="search-incidents-input"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-48" data-testid="filter-type-select">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="injury">Injury</SelectItem>
                <SelectItem value="near_miss">Near Miss</SelectItem>
                <SelectItem value="environmental">Environmental</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48" data-testid="filter-status-select">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full" data-testid="incidents-table">
              <thead className="border-b-2 border-border">
                <tr>
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">ID</th>
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Title</th>
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Type</th>
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Risk Score</th>
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Date</th>
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Indicator</th>
                </tr>
              </thead>
              <tbody>
                {filteredIncidents.map((incident, index) => (
                  <tr
                    key={incident.id}
                    className={`border-b border-border hover:bg-muted/30 transition-colors cursor-pointer ${index % 2 === 0 ? 'bg-muted/10' : ''}`}
                    data-testid={`incident-row-${incident.id}`}
                  >
                    <td className="py-3 px-4">
                      <Link to={`/dummy/incidents/${incident.id}`} className="text-primary hover:underline font-mono text-sm font-semibold">
                        {incident.id}
                      </Link>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-destructive mt-1 flex-shrink-0" />
                        <Link to={`/dummy/incidents/${incident.id}`} className="font-semibold text-sm hover:underline">
                          {incident.title}
                        </Link>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="text-xs uppercase">
                        {incident.type.replace('_', ' ')}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Badge variant={getRiskColor(incident.risk_score)} className="text-xs">
                          {incident.risk_score.toFixed(1)}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{getRiskLabel(incident.risk_score)}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={getStatusColor(incident.status)} className="text-xs uppercase">
                        {incident.status.replace('_', ' ')}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{formatDate(incident.date_occurred)}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-1">
                        {incident.leading_indicator && (
                          <Badge variant="success" className="text-xs">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Leading
                          </Badge>
                        )}
                        {incident.lagging_indicator && (
                          <Badge variant="muted" className="text-xs">Lagging</Badge>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DummyIncidents;