import React, { useState } from 'react';
import { groups } from '@/data/dummyData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Building2, Plus, Search, Users, Briefcase } from 'lucide-react';
import { formatDate } from '@/lib/utils';

const DummyGroups = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6" data-testid="groups-page">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight uppercase mb-2" data-testid="groups-title">GROUPS</h1>
          <p className="text-sm text-muted-foreground">Manage organizations and companies</p>
        </div>
        <Button className="uppercase tracking-wider font-semibold text-xs" data-testid="add-group-btn">
          <Plus className="w-4 h-4 mr-2" />
          Add Group
        </Button>
      </div>

      <Card className="tactical-shadow">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search groups..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                data-testid="search-groups-input"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredGroups.map((group) => (
              <Card key={group.id} className="border-2 hover:border-primary transition-colors" data-testid={`group-card-${group.id}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <Building2 className="w-8 h-8 text-primary" />
                    <Badge variant={group.status === 'active' ? 'success' : 'muted'} className="text-xs uppercase">
                      {group.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg font-semibold uppercase mt-2">{group.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Code:</span>
                    <code className="px-2 py-1 bg-muted rounded text-xs font-mono">{group.code}</code>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{group.employee_count} employees</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{group.team_count} teams</span>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-border">
                    <p className="text-xs text-muted-foreground">Created {formatDate(group.created_at)}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DummyGroups;