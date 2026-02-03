import React from 'react';
import { jsas, users } from '@/data/dummyData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { FileText, Plus, AlertTriangle } from 'lucide-react';
import { formatDate, getStatusColor } from '@/lib/utils';

const DummyJSA = () => {
  const getUserName = (userId) => {
    return users.find(u => u.id === userId)?.name || 'Unknown';
  };

  return (
    <div className="space-y-6" data-testid="jsa-page">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight uppercase mb-2" data-testid="jsa-title">JOB SAFETY ANALYSIS</h1>
          <p className="text-sm text-muted-foreground">Identify hazards and control measures for job tasks</p>
        </div>
        <Button className="uppercase tracking-wider font-semibold text-xs" data-testid="create-jsa-btn">
          <Plus className="w-4 h-4 mr-2" />
          Create JSA
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {jsas.map(jsa => (
          <Card key={jsa.id} className="tactical-shadow" data-testid={`jsa-card-${jsa.id}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <FileText className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <CardTitle className="text-lg font-semibold uppercase">{jsa.job_title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{jsa.location}</p>
                  </div>
                </div>
                <Badge variant={getStatusColor(jsa.status)} className="text-xs uppercase">
                  {jsa.status.replace('_', ' ')}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">JSA ID</p>
                  <code className="text-sm font-mono">{jsa.id}</code>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Version</p>
                  <p className="text-sm font-semibold">{jsa.version}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Prepared By</p>
                  <p className="text-sm">{getUserName(jsa.prepared_by)}</p>
                </div>
                {jsa.approved_by && (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Approved By</p>
                    <p className="text-sm">{getUserName(jsa.approved_by)}</p>
                  </div>
                )}
              </div>

              <Separator />

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-4 h-4 text-accent" />
                  <p className="text-xs font-bold uppercase tracking-wider">Identified Hazards ({jsa.hazards.length})</p>
                </div>
                <div className="space-y-3">
                  {jsa.hazards.map((hazard, idx) => (
                    <div key={idx} className="p-4 bg-muted/30 rounded-sm border border-border">
                      <div className="flex items-start justify-between mb-2">
                        <p className="text-sm font-semibold">{hazard.step}</p>
                        <Badge
                          variant={hazard.risk_level === 'critical' ? 'destructive' : hazard.risk_level === 'high' ? 'accent' : 'outline'}
                          className="text-xs uppercase"
                        >
                          {hazard.risk_level}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Hazard:</p>
                          <p className="text-sm">{hazard.hazard}</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Controls:</p>
                          <ul className="list-disc list-inside space-y-1">
                            {hazard.controls.map((control, cidx) => (
                              <li key={cidx} className="text-sm">{control}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="text-xs text-muted-foreground">
                  {jsa.approved_at ? (
                    <>Approved on {formatDate(jsa.approved_at)} • Next review: {formatDate(jsa.next_review)}</>
                  ) : (
                    <>Created on {formatDate(jsa.created_at)}</>
                  )}
                </div>
                <Button size="sm" variant="outline" className="uppercase text-xs">
                  View Full JSA
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DummyJSA;