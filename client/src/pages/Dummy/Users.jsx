import React, { useState } from 'react';
import { users } from '@/data/dummyData';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { UserPlus, Search, CheckCircle2, XCircle } from 'lucide-react';
import { formatDate, getStatusColor } from '@/lib/utils';
import { toast } from "@/hooks/use-toast";

const DummyUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getInitials = (name) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';
  };

  const getRoleLabel = (role) => {
    const labels = {
      super_admin: 'Super Admin',
      group_admin: 'Group Admin',
      team_admin: 'Team Admin',
      employee: 'Employee'
    };
    return labels[role] || role;
  };

  const handleApprove = (userId) => {
    toast.success('User approved successfully');
  };

  const handleReject = (userId) => {
    toast.error('User rejected');
  };

  return (
    <div className="space-y-6" data-testid="users-page">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight uppercase mb-2" data-testid="users-title">USERS</h1>
          <p className="text-sm text-muted-foreground">Manage user accounts and permissions</p>
        </div>
        <Button className="uppercase tracking-wider font-semibold text-xs" data-testid="add-user-btn">
          <UserPlus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      <Card className="tactical-shadow">
        <CardHeader>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              data-testid="search-users-input"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full" data-testid="users-table">
              <thead className="border-b-2 border-border">
                <tr>
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">User</th>
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Role</th>
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Joined</th>
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr
                    key={user.id}
                    className={`border-b border-border hover:bg-muted/30 transition-colors ${index % 2 === 0 ? 'bg-muted/10' : ''}`}
                    data-testid={`user-row-${user.id}`}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
                            {getInitials(user.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-sm">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="text-xs uppercase">
                        {getRoleLabel(user.role)}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={getStatusColor(user.status)} className="text-xs uppercase">
                        {user.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{formatDate(user.created_at)}</td>
                    <td className="py-3 px-4">
                      {user.status === 'pending' ? (
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8"
                            onClick={() => handleApprove(user.id)}
                            data-testid={`approve-user-${user.id}`}
                          >
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            <span className="text-xs">Approve</span>
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8"
                            onClick={() => handleReject(user.id)}
                            data-testid={`reject-user-${user.id}`}
                          >
                            <XCircle className="w-3 h-3 mr-1" />
                            <span className="text-xs">Reject</span>
                          </Button>
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">-</span>
                      )}
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

export default DummyUsers;