import React, { useState } from 'react';
import { trainings, trainingAssignments, users } from '@/data/dummyData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GraduationCap, Plus, Search, BookOpen, CheckCircle2, Clock } from 'lucide-react';
import { formatDate, getStatusColor } from '@/lib/utils';

const DummyTraining = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTrainings = trainings.filter(training =>
    training.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getUserName = (userId) => {
    return users.find(u => u.id === userId)?.name || 'Unknown';
  };

  const getTrainingTitle = (trainingId) => {
    return trainings.find(t => t.id === trainingId)?.title || 'Unknown';
  };

  return (
    <div className="space-y-6" data-testid="training-page">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight uppercase mb-2" data-testid="training-title">TRAINING</h1>
          <p className="text-sm text-muted-foreground">Manage safety training and competency</p>
        </div>
        <Button className="uppercase tracking-wider font-semibold text-xs" data-testid="create-training-btn">
          <Plus className="w-4 h-4 mr-2" />
          Create Training
        </Button>
      </div>

      <Tabs defaultValue="catalog" className="space-y-6">
        <TabsList>
          <TabsTrigger value="catalog" className="uppercase text-xs" data-testid="tab-catalog">
            <BookOpen className="w-4 h-4 mr-2" />
            Training Catalog
          </TabsTrigger>
          <TabsTrigger value="assignments" className="uppercase text-xs" data-testid="tab-assignments">
            <CheckCircle2 className="w-4 h-4 mr-2" />
            My Assignments
          </TabsTrigger>
        </TabsList>

        <TabsContent value="catalog">
          <Card className="tactical-shadow">
            <CardHeader>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search training courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  data-testid="search-training-input"
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTrainings.map(training => (
                  <Card key={training.id} className="border-2 hover:border-primary transition-colors" data-testid={`training-card-${training.id}`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between mb-2">
                        <GraduationCap className="w-8 h-8 text-primary" />
                        {training.is_mandatory && (
                          <Badge variant="destructive" className="text-xs uppercase">Mandatory</Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg font-semibold uppercase">{training.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground">{training.description}</p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-xs text-muted-foreground uppercase">Duration:</span>
                          <span className="font-semibold">{training.duration_hours}h</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-xs text-muted-foreground uppercase">Valid For:</span>
                          <span className="font-semibold">{training.valid_months} months</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-xs text-muted-foreground uppercase">Type:</span>
                          <Badge variant="outline" className="text-xs uppercase">{training.type}</Badge>
                        </div>
                      </div>
                      <Button className="w-full mt-4 uppercase tracking-wider font-semibold text-xs" size="sm">
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assignments">
          <Card className="tactical-shadow">
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <table className="w-full" data-testid="assignments-table">
                  <thead className="border-b-2 border-border">
                    <tr>
                      <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Training</th>
                      <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Assigned By</th>
                      <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Status</th>
                      <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Due Date</th>
                      <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Score</th>
                      <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trainingAssignments.map((assignment, index) => (
                      <tr
                        key={assignment.id}
                        className={`border-b border-border hover:bg-muted/30 transition-colors ${index % 2 === 0 ? 'bg-muted/10' : ''}`}
                        data-testid={`assignment-row-${assignment.id}`}
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-start gap-2">
                            <GraduationCap className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                            <span className="font-semibold text-sm">{getTrainingTitle(assignment.training_id)}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm">{getUserName(assignment.assigned_by)}</td>
                        <td className="py-3 px-4">
                          <Badge variant={getStatusColor(assignment.status)} className="text-xs uppercase">
                            {assignment.status.replace('_', ' ')}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">{formatDate(assignment.due_date)}</td>
                        <td className="py-3 px-4">
                          {assignment.score ? (
                            <span className="text-sm font-semibold">{assignment.score}%</span>
                          ) : (
                            <span className="text-xs text-muted-foreground">-</span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          {assignment.status === 'pending' && (
                            <Button size="sm" variant="outline" className="h-8 uppercase text-xs">
                              <Clock className="w-3 h-3 mr-1" />
                              Start
                            </Button>
                          )}
                          {assignment.status === 'in_progress' && (
                            <Button size="sm" className="h-8 uppercase text-xs">
                              Continue
                            </Button>
                          )}
                          {assignment.status === 'completed' && assignment.certificate_url && (
                            <Button size="sm" variant="outline" className="h-8 uppercase text-xs">
                              Certificate
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DummyTraining;