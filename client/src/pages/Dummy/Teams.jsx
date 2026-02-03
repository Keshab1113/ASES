import React, { useState } from 'react';
import { teams, groups } from '@/data/dummyData';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Users, Plus, Search, Building2 } from 'lucide-react';
import { formatDate } from '@/lib/utils';

const DummyTeams = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getGroupName = (groupId) => {
    return groups.find(g => g.id === groupId)?.name || 'Unknown';
  };

  return (
    <div className="space-y-6" data-testid="teams-page">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight uppercase mb-2" data-testid="teams-title">TEAMS</h1>
          <p className="text-sm text-muted-foreground">Manage departments and site teams</p>
        </div>
        <Button className="uppercase tracking-wider font-semibold text-xs" data-testid="add-team-btn">
          <Plus className="w-4 h-4 mr-2" />
          Add Team
        </Button>
      </div>

      <Card className="tactical-shadow">
        <CardHeader>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search teams..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              data-testid="search-teams-input"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full" data-testid="teams-table">
              <thead className="border-b-2 border-border">
                <tr>
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Team Name</th>
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Code</th>
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Organization</th>
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Members</th>
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Created</th>
                </tr>
              </thead>
              <tbody>
                {filteredTeams.map((team, index) => (
                  <tr
                    key={team.id}
                    className={`border-b border-border hover:bg-muted/30 transition-colors ${index % 2 === 0 ? 'bg-muted/10' : ''}`}
                    data-testid={`team-row-${team.id}`}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary" />
                        <span className="font-semibold text-sm">{team.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <code className="px-2 py-1 bg-muted rounded text-xs font-mono">{team.code}</code>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-3 h-3 text-muted-foreground" />
                        <span className="text-sm">{getGroupName(team.group_id)}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm">{team.employee_count}</span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={team.status === 'active' ? 'success' : 'muted'} className="text-xs uppercase">
                        {team.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{formatDate(team.created_at)}</td>
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

export default DummyTeams;