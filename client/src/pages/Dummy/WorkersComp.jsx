import React from 'react';
import { workersComp, incidents, users } from '@/data/dummyData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { HeartPulse, DollarSign, Calendar, TrendingUp } from 'lucide-react';
import { formatDate, getStatusColor } from '@/lib/utils';

const DummyWorkersComp = () => {
  const getUserName = (userId) => {
    return users.find(u => u.id === userId)?.name || 'Unknown';
  };

  const getIncidentTitle = (incidentId) => {
    return incidents.find(i => i.id === incidentId)?.title || 'Unknown';
  };

  const totalClaims = workersComp.length;
  const openClaims = workersComp.filter(c => c.claim_status === 'open').length;
  const totalCost = workersComp.reduce((sum, c) => sum + c.estimated_total_cost, 0);
  const totalLostDays = workersComp.reduce((sum, c) => sum + c.lost_workdays, 0);

  return (
    <div className="space-y-6" data-testid="workers-comp-page">
      <div>
        <h1 className="text-4xl font-bold tracking-tight uppercase mb-2" data-testid="workers-comp-title">WORKERS COMPENSATION</h1>
        <p className="text-sm text-muted-foreground">Track injury claims and financial impact</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="tactical-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Total Claims</p>
                <div className="text-3xl font-bold font-heading">{totalClaims}</div>
              </div>
              <HeartPulse className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card className="tactical-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Open Claims</p>
                <div className="text-3xl font-bold font-heading text-accent">{openClaims}</div>
              </div>
              <TrendingUp className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card className="tactical-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Total Cost</p>
                <div className="text-3xl font-bold font-heading text-destructive">${totalCost.toLocaleString()}</div>
              </div>
              <DollarSign className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card className="tactical-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Lost Workdays</p>
                <div className="text-3xl font-bold font-heading">{totalLostDays}</div>
              </div>
              <Calendar className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="tactical-shadow">
        <CardHeader>
          <CardTitle className="text-xl font-semibold uppercase">Claims Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {workersComp.map(claim => (
              <Card key={claim.id} className="border-2" data-testid={`claim-card-${claim.id}`}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <code className="text-sm font-mono font-semibold">{claim.claim_number}</code>
                        <Badge variant={getStatusColor(claim.claim_status)} className="text-xs uppercase">
                          {claim.claim_status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Filed: {formatDate(claim.filed_date)}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Employee</p>
                      <p className="text-sm font-semibold">{getUserName(claim.employee_id)}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Injury Type</p>
                      <p className="text-sm">{claim.injury_type}</p>
                      <p className="text-xs text-muted-foreground">{claim.body_part}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Lost Workdays</p>
                      <p className="text-sm font-semibold">{claim.lost_workdays} days</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Estimated Cost</p>
                      <p className="text-sm font-semibold text-destructive">${claim.estimated_total_cost.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">Medical: ${claim.medical_cost.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Related Incident</p>
                    <p className="text-sm">{getIncidentTitle(claim.incident_id)}</p>
                  </div>

                  {claim.restrictions && (
                    <div className="mt-3 p-3 bg-accent/10 border border-accent/20 rounded-sm">
                      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Work Restrictions</p>
                      <p className="text-sm">{claim.restrictions}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DummyWorkersComp;