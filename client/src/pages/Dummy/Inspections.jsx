import React from 'react';
import { inspections, users } from '@/data/dummyData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ClipboardCheck, Plus, AlertCircle } from 'lucide-react';
import { formatDate, getStatusColor } from '@/lib/utils';

const DummyInspections = () => {
  const getUserName = (userId) => {
    return users.find(u => u.id === userId)?.name || 'Unknown';
  };

  return (
    <div className="space-y-6" data-testid="inspections-page">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight uppercase mb-2" data-testid="inspections-title">INSPECTIONS</h1>
          <p className="text-sm text-muted-foreground">Schedule and conduct safety inspections</p>
        </div>
        <Button className="uppercase tracking-wider font-semibold text-xs" data-testid="create-inspection-btn">
          <Plus className="w-4 h-4 mr-2" />
          New Inspection
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="tactical-shadow">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">This Month</p>
              <div className="text-3xl font-bold font-heading mb-1">8</div>
              <p className="text-xs text-muted-foreground">Completed Inspections</p>
            </div>
          </CardContent>
        </Card>
        <Card className="tactical-shadow">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Pending</p>
              <div className="text-3xl font-bold font-heading mb-1 text-accent">4</div>
              <p className="text-xs text-muted-foreground">Awaiting Action</p>
            </div>
          </CardContent>
        </Card>
        <Card className="tactical-shadow">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Avg Score</p>
              <div className="text-3xl font-bold font-heading mb-1 text-success">82%</div>
              <p className="text-xs text-muted-foreground">Safety Compliance</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {inspections.map(inspection => (
          <Card key={inspection.id} className="tactical-shadow" data-testid={`inspection-card-${inspection.id}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <ClipboardCheck className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <CardTitle className="text-lg font-semibold uppercase">{inspection.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">Inspector: {getUserName(inspection.inspector_id)}</p>
                  </div>
                </div>
                <Badge variant={getStatusColor(inspection.status)} className="text-xs uppercase">
                  {inspection.status.replace('_', ' ')}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Type</p>
                  <Badge variant="outline" className="text-xs uppercase">{inspection.type.replace('_', ' ')}</Badge>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Location</p>
                  <p className="text-sm">{inspection.location}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Scheduled</p>
                  <p className="text-sm">{formatDate(inspection.scheduled_date)}</p>
                </div>
                {inspection.score && (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Score</p>
                    <div className="text-2xl font-bold font-heading text-success">{inspection.score}%</div>
                  </div>
                )}
              </div>

              {inspection.findings.length > 0 && (
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertCircle className="w-4 h-4 text-accent" />
                    <p className="text-xs font-bold uppercase tracking-wider">Findings ({inspection.findings_count})</p>
                  </div>
                  <div className="space-y-2">
                    {inspection.findings.map((finding, idx) => (
                      <div key={idx} className="flex items-start gap-2 p-2 bg-muted/30 rounded-sm text-sm">
                        <Badge
                          variant={finding.severity === 'high' ? 'destructive' : finding.severity === 'medium' ? 'accent' : 'muted'}
                          className="text-xs uppercase mt-0.5"
                        >
                          {finding.severity}
                        </Badge>
                        <p className="flex-1">{finding.item}</p>
                        {finding.action_required && (
                          <Badge variant="outline" className="text-xs">Action Required</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DummyInspections;