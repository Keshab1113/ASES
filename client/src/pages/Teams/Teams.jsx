// pages/Teams/Teams.jsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Card, 
  CardHeader, 
  CardContent,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Users,
  Plus,
  Building,
  Eye,
  MoreVertical,
  CheckCircle,
  XCircle,
  Filter,
  Loader2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGroup, useGroupTeams } from "../../hooks/useGroups";
import { useTeams, useCreateTeam, useUpdateTeamStatus } from "../../hooks/useTeams";

export default function Teams({ user, groupId: propGroupId }) {
  const { groupId: paramGroupId } = useParams();
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Determine which groupId to use
  const groupId = propGroupId || paramGroupId;
  
  const [newTeam, setNewTeam] = useState({
    name: "",
    description: "",
    group_id: groupId || ""
  });

  // React Query hooks
  const { data: group, isLoading: groupLoading } = useGroup(groupId);
  const { data: teams = [], isLoading: teamsLoading } = useGroupTeams(groupId);
  const createTeamMutation = useCreateTeam();
  const updateStatusMutation = useUpdateTeamStatus();

  const handleCreate = async () => {
    if (!newTeam.group_id) return;
    
    await createTeamMutation.mutateAsync(newTeam);
    setDialogOpen(false);
    setNewTeam({ name: "", description: "", group_id: groupId || "" });
  };

  const handleStatusUpdate = (teamId, status) => {
    updateStatusMutation.mutate({ id: teamId, status });
  };

  const getStatusBadge = (status) => {
    const colors = {
      active: "bg-green-100 text-green-800",
      inactive: "bg-gray-100 text-gray-800"
    };

    return (
      <Badge className={`${colors[status]} capitalize`}>
        {status}
      </Badge>
    );
  };

  const isLoading = groupLoading || teamsLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-sky-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-2 text-sm text-slate-500">Loading teams...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Teams</h1>
          <div className="flex items-center gap-2 mt-1">
            {group ? (
              <>
                <Building className="w-4 h-4 text-slate-400" />
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {group?.name} • {group?.code}
                </p>
              </>
            ) : (
              <>
                <Filter className="w-4 h-4 text-slate-400" />
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  All Teams
                </p>
              </>
            )}
          </div>
        </div>
        
        {/* Only show create button if we have a group context */}
        {groupId && (
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Create Team
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Team</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Team Name *</Label>
                  <Input
                    id="name"
                    placeholder="Enter team name"
                    value={newTeam.name}
                    onChange={(e) => setNewTeam({...newTeam, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter team description"
                    value={newTeam.description}
                    onChange={(e) => setNewTeam({...newTeam, description: e.target.value})}
                    rows={3}
                  />
                </div>
                {group && (
                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-md">
                    <p className="text-sm font-medium">Group: {group.name}</p>
                    <p className="text-xs text-slate-500">Code: {group.code}</p>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleCreate} 
                  disabled={!newTeam.name.trim() || createTeamMutation.isPending}
                >
                  {createTeamMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    'Create Team'
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Total Teams</p>
                <p className="text-2xl font-bold">{teams.length}</p>
              </div>
              <Users className="w-8 h-8 text-sky-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Active Teams</p>
                <p className="text-2xl font-bold">
                  {teams.filter(t => t.status === 'active').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Total Members</p>
                <p className="text-2xl font-bold">
                  {teams.reduce((sum, team) => sum + (team.user_count || 0), 0)}
                </p>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Teams Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            {group ? `Teams in ${group.name}` : 'All Teams'}
          </CardTitle>
          <CardDescription>
            {group 
              ? "View and manage all teams under this group" 
              : "View and manage all teams across all groups"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Team Name</TableHead>
                {!group && <TableHead>Group</TableHead>}
                <TableHead>Code</TableHead>
                <TableHead>Members</TableHead>
                <TableHead>Admin</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teams.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={group ? 6 : 7} className="text-center py-8 text-slate-500">
                    {groupId 
                      ? "No teams found in this group. Create your first team." 
                      : "No teams found."}
                  </TableCell>
                </TableRow>
              ) : (
                teams.map((team) => (
                  <TableRow key={team.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-slate-400" />
                        {team.name}
                      </div>
                    </TableCell>
                    {!group && (
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4 text-slate-400" />
                          {team.group_name || 'N/A'}
                        </div>
                      </TableCell>
                    )}
                    <TableCell>
                      <code className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                        {team.code}
                      </code>
                    </TableCell>
                    <TableCell>{team.user_count || 0}</TableCell>
                    <TableCell>
                      {team.admin_name ? (
                        <div className="text-sm">
                          <p>{team.admin_name}</p>
                          <p className="text-xs text-slate-500">{team.admin_email}</p>
                        </div>
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </TableCell>
                    <TableCell>{getStatusBadge(team.status)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => navigate(`/teams/${team.id}/users`)}>
                            <Eye className="w-4 h-4 mr-2" />
                            View Users
                          </DropdownMenuItem>
                          {user?.role === 'super_admin' || user?.role === 'group_admin' ? (
                            team.status === 'active' ? (
                              <DropdownMenuItem 
                                onClick={() => handleStatusUpdate(team.id, 'inactive')}
                                className="text-red-600"
                                disabled={updateStatusMutation.isPending}
                              >
                                <XCircle className="w-4 h-4 mr-2" />
                                Deactivate
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem 
                                onClick={() => handleStatusUpdate(team.id, 'active')}
                                className="text-green-600"
                                disabled={updateStatusMutation.isPending}
                              >
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Activate
                              </DropdownMenuItem>
                            )
                          ) : null}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}