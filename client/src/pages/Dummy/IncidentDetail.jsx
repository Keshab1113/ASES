import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { incidents, tasks, users } from '@/data/dummyData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, AlertTriangle, MapPin, Calendar, User, FileText, TrendingUp, Activity } from 'lucide-react';
import { formatDateTime, getRiskColor, getStatusColor, getRiskLabel } from '@/lib/utils';

const DummyIncidentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const incident = incidents.find(i => i.id === id);

  if (!incident) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Incident not found</p>
        <Button onClick={() => navigate('/incidents')} className="mt-4">Back to Incidents</Button>
      </div>
    );
  }

  const relatedTasks = tasks.filter(t => t.related_incident === incident.id);
  const reporter = users.find(u => u.id === incident.reported_by);

  return (
    <div className="space-y-6" data-testid="incident-detail-page">
      <div>
        <Button
          variant="ghost"
          onClick={() => navigate('/incidents')}
          className="mb-4"
          data-testid="back-btn"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Incidents
        </Button>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl font-bold tracking-tight uppercase" data-testid="incident-title">{incident.title}</h1>
              <Badge variant={getStatusColor(incident.status)} className="text-xs uppercase">
                {incident.status.replace('_', ' ')}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">Incident ID: {incident.id}</p>
          </div>
          <Button className="uppercase tracking-wider font-semibold text-xs" data-testid="update-incident-btn">
            Update Status
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 tactical-shadow">
          <CardHeader>
            <CardTitle className="text-xl font-semibold uppercase flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              Incident Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Description</h3>
              <p className="text-sm">{incident.description}</p>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Type</h3>
                <Badge variant="outline" className="text-xs uppercase">
                  {incident.type.replace('_', ' ')}
                </Badge>
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Severity</h3>
                <Badge variant={getRiskColor(incident.risk_score)} className="text-xs uppercase">
                  {incident.severity}
                </Badge>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Location
              </h3>
              <p className="text-sm">{incident.location}</p>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Date Occurred
                </h3>
                <p className="text-sm">{formatDateTime(incident.date_occurred)}</p>
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Reported By
                </h3>
                <p className="text-sm">{reporter?.name || 'Unknown'}</p>
                <p className="text-xs text-muted-foreground">{formatDateTime(incident.reported_at)}</p>
              </div>
            </div>

            {incident.root_cause && (
              <>
                <Separator />
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Root Cause Analysis</h3>
                  <p className="text-sm">{incident.root_cause}</p>
                </div>
              </>
            )}

            {incident.evidence_urls.length > 0 && (
              <>
                <Separator />
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Evidence Files
                  </h3>
                  <div className="space-y-2">
                    {incident.evidence_urls.map((url, idx) => (
                      <div key={idx} className="p-2 bg-muted rounded-sm text-xs font-mono">
                        {url}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="tactical-shadow border-l-4 border-l-accent">
            <CardHeader>
              <CardTitle className="text-xl font-semibold uppercase flex items-center gap-2">
                <Activity className="w-5 h-5 text-accent" />
                AI Risk Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Risk Score</h3>
                <div className="flex items-center gap-3">
                  <div className="text-4xl font-bold font-heading">{incident.risk_score.toFixed(1)}</div>
                  <div>
                    <Badge variant={getRiskColor(incident.risk_score)} className="text-xs uppercase">
                      {getRiskLabel(incident.risk_score)}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      AI Confidence: {(incident.ai_confidence * 100).toFixed(0)}%
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Indicator Classification
                </h3>
                <div className="flex gap-2">
                  {incident.leading_indicator && (
                    <Badge variant="success" className="text-xs">
                      Leading Indicator
                    </Badge>
                  )}
                  {incident.lagging_indicator && (
                    <Badge variant="muted" className="text-xs">
                      Lagging Indicator
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {incident.leading_indicator
                    ? 'This incident can be used to predict and prevent future occurrences.'
                    : 'This incident reflects past safety performance and requires reactive measures.'}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="tactical-shadow">
            <CardHeader>
              <CardTitle className="text-xl font-semibold uppercase">Corrective Actions</CardTitle>
            </CardHeader>
            <CardContent>
              {relatedTasks.length > 0 ? (
                <div className="space-y-3">
                  {relatedTasks.map(task => (
                    <div key={task.id} className="p-3 bg-muted/30 rounded-sm border border-border">
                      <p className="text-sm font-semibold mb-1">{task.title}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant={getStatusColor(task.status)} className="text-xs uppercase">
                          {task.status.replace('_', ' ')}
                        </Badge>
                        <Badge variant="outline" className="text-xs uppercase">
                          {task.priority}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No corrective actions created yet</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DummyIncidentDetail;