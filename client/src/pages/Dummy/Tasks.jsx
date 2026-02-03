import React, { useState } from 'react';
import { tasks, users } from '@/data/dummyData';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ListTodo, Plus, Search, Clock } from 'lucide-react';
import { formatDate, getStatusColor, calculateSLAStatus } from '@/lib/utils';

const DummyTasks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getUserName = (userId) => {
    return users.find(u => u.id === userId)?.name || 'Unknown';
  };

  return (
    <div className="space-y-6" data-testid="tasks-page">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight uppercase mb-2" data-testid="tasks-title">TASKS</h1>
          <p className="text-sm text-muted-foreground">Manage corrective actions and assignments</p>
        </div>
        <Button className="uppercase tracking-wider font-semibold text-xs" data-testid="create-task-btn">
          <Plus className="w-4 h-4 mr-2" />
          Create Task
        </Button>
      </div>

      <Card className="tactical-shadow">
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                data-testid="search-tasks-input"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48" data-testid="filter-status-select">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-full md:w-48" data-testid="filter-priority-select">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full" data-testid="tasks-table">
              <thead className="border-b-2 border-border">
                <tr>
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">ID</th>
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Title</th>
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Type</th>
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Assigned To</th>
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Priority</th>
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Due Date</th>
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">SLA</th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.map((task, index) => {
                  const slaStatus = calculateSLAStatus(task.due_date);
                  return (
                    <tr
                      key={task.id}
                      className={`border-b border-border hover:bg-muted/30 transition-colors ${index % 2 === 0 ? 'bg-muted/10' : ''}`}
                      data-testid={`task-row-${task.id}`}
                    >
                      <td className="py-3 px-4">
                        <span className="text-primary font-mono text-sm font-semibold">{task.id}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-start gap-2">
                          <ListTodo className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                          <span className="font-semibold text-sm">{task.title}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className="text-xs uppercase">
                          {task.type.replace('_', ' ')}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-sm">{getUserName(task.assigned_to)}</td>
                      <td className="py-3 px-4">
                        <Badge
                          variant={task.priority === 'critical' || task.priority === 'high' ? 'destructive' : 'outline'}
                          className="text-xs uppercase"
                        >
                          {task.priority}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={getStatusColor(task.status)} className="text-xs uppercase">
                          {task.status.replace('_', ' ')}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">{formatDate(task.due_date)}</td>
                      <td className="py-3 px-4">
                        {task.status !== 'completed' && (
                          <Badge variant={slaStatus.color} className="text-xs flex items-center gap-1 uppercase">
                            <Clock className="w-3 h-3" />
                            {slaStatus.label}
                          </Badge>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DummyTasks;