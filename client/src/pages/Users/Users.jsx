// pages/Teams/Users.jsx
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
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
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
  User,
  Users,
  Building,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  CheckCircle,
  XCircle,
  AlertCircle,
  MoreVertical,
  Shield,
  Clock,
  Loader2
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useTeam, useTeamUsers } from "../../hooks/useTeams";
import { useApproveUser, useRejectUser, useUpdateUserStatus } from "../../hooks/useUsers";
import { toast } from "@/hooks/use-toast";

export default function UsersPage() {
  const { teamId } = useParams();
  const navigate = useNavigate();
  const [approveDialog, setApproveDialog] = useState(false);
  const [rejectDialog, setRejectDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [rejectReason, setRejectReason] = useState("");

  // React Query hooks
  const { 
    data: team, 
    isLoading: teamLoading 
  } = useTeam(teamId);
  
  const { 
    data: users = [], 
    isLoading: usersLoading,
    refetch: refetchUsers 
  } = useTeamUsers(teamId);

  const approveMutation = useApproveUser();
  const rejectMutation = useRejectUser();
  const updateStatusMutation = useUpdateUserStatus();

  const handleApprove = async () => {
    await approveMutation.mutateAsync(selectedUser.id);
    setApproveDialog(false);
    setSelectedUser(null);
    refetchUsers();
  };

  const handleReject = async () => {
    await rejectMutation.mutateAsync({ 
      id: selectedUser.id, 
      reason: rejectReason 
    });
    setRejectDialog(false);
    setSelectedUser(null);
    setRejectReason("");
    refetchUsers();
  };

  const handleStatusUpdate = (userId, status) => {
    updateStatusMutation.mutate({ id: userId, status });
  };

  const getRoleBadge = (role) => {
    const colors = {
      super_admin: "bg-purple-100 text-purple-800 hover:bg-purple-100",
      group_admin: "bg-blue-100 text-blue-800 hover:bg-blue-100",
      team_admin: "bg-green-100 text-green-800 hover:bg-green-100",
      employee: "bg-slate-100 text-slate-800 hover:bg-slate-100"
    };

    return (
      <Badge className={`${colors[role]} capitalize`}>
        {role?.replace('_', ' ')}
      </Badge>
    );
  };

  const getStatusBadge = (status) => {
    const variants = {
      active: "default",
      pending: "warning",
      inactive: "secondary",
      rejected: "destructive",
      suspended: "destructive"
    };

    const icons = {
      active: <CheckCircle className="w-3 h-3 mr-1" />,
      pending: <Clock className="w-3 h-3 mr-1" />,
      inactive: <XCircle className="w-3 h-3 mr-1" />,
      rejected: <XCircle className="w-3 h-3 mr-1" />,
      suspended: <AlertCircle className="w-3 h-3 mr-1" />
    };

    return (
      <Badge variant={variants[status]} className="capitalize">
        {icons[status]}
        {status}
      </Badge>
    );
  };

  const isLoading = teamLoading || usersLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-sky-600 animate-spin mx-auto" />
          <p className="mt-2 text-sm text-slate-500">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Team Members</h1>
        <div className="flex items-center gap-2 mt-1">
          <Users className="w-4 h-4 text-slate-400" />
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {team?.name} • {team?.code}
          </p>
          <Building className="w-4 h-4 text-slate-400 ml-2" />
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {team?.group_name}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Total Members</p>
                <p className="text-2xl font-bold">{users.length}</p>
              </div>
              <Users className="w-8 h-8 text-sky-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Active</p>
                <p className="text-2xl font-bold">
                  {users.filter(u => u.status === 'active').length}
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
                <p className="text-sm text-slate-600 dark:text-slate-400">Pending</p>
                <p className="text-2xl font-bold">
                  {users.filter(u => u.status === 'pending').length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Admins</p>
                <p className="text-2xl font-bold">
                  {users.filter(u => u.role === 'team_admin').length}
                </p>
              </div>
              <Shield className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>
            Manage users under this team. Approve pending registrations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Registered</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-slate-500">
                    No users found in this team.
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center">
                          <User className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                        </div>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-xs text-slate-500">{user.employee_id || 'No ID'}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1">
                          <Mail className="w-3 h-3 text-slate-400" />
                          <span className="text-sm">{user.email}</span>
                        </div>
                        {user.mobile && (
                          <div className="flex items-center gap-1">
                            <Phone className="w-3 h-3 text-slate-400" />
                            <span className="text-sm">{user.mobile}</span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1">
                          <Briefcase className="w-3 h-3 text-slate-400" />
                          <span className="text-sm">{user.position || '-'}</span>
                        </div>
                        {user.work_location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            <span className="text-xs">{user.work_location}</span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {new Date(user.created_at).toLocaleDateString()}
                        <div className="text-xs text-slate-500">
                          {new Date(user.created_at).toLocaleTimeString()}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {user.status === 'pending' && (
                            <>
                              <DropdownMenuItem 
                                onClick={() => {
                                  setSelectedUser(user);
                                  setApproveDialog(true);
                                }}
                                className="text-green-600"
                                disabled={approveMutation.isPending}
                              >
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Approve
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => {
                                  setSelectedUser(user);
                                  setRejectDialog(true);
                                }}
                                className="text-red-600"
                                disabled={rejectMutation.isPending}
                              >
                                <XCircle className="w-4 h-4 mr-2" />
                                Reject
                              </DropdownMenuItem>
                            </>
                          )}
                          {user.status === 'active' && (
                            <DropdownMenuItem 
                              onClick={() => handleStatusUpdate(user.id, 'inactive')}
                              className="text-red-600"
                              disabled={updateStatusMutation.isPending}
                            >
                              <XCircle className="w-4 h-4 mr-2" />
                              Deactivate
                            </DropdownMenuItem>
                          )}
                          {user.status === 'inactive' && (
                            <DropdownMenuItem 
                              onClick={() => handleStatusUpdate(user.id, 'active')}
                              className="text-green-600"
                              disabled={updateStatusMutation.isPending}
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Activate
                            </DropdownMenuItem>
                          )}
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

      {/* Approve Dialog */}
      <Dialog open={approveDialog} onOpenChange={setApproveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve User Registration</DialogTitle>
            <DialogDescription>
              Are you sure you want to approve this user?
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center">
                    <User className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                  </div>
                  <div>
                    <p className="font-medium">{selectedUser.name}</p>
                    <p className="text-sm text-slate-500">{selectedUser.email}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline">{selectedUser.role}</Badge>
                      <Badge variant="warning">Pending</Badge>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                This user will be able to login and access the system after approval.
              </p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setApproveDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleApprove} 
              className="bg-green-600 hover:bg-green-700"
              disabled={approveMutation.isPending}
            >
              {approveMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Approving...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve User
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={rejectDialog} onOpenChange={setRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject User Registration</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this user.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center">
                    <User className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                  </div>
                  <div>
                    <p className="font-medium">{selectedUser.name}</p>
                    <p className="text-sm text-slate-500">{selectedUser.email}</p>
                    <Badge variant="outline">{selectedUser.role}</Badge>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reason">Rejection Reason</Label>
                <Textarea
                  id="reason"
                  placeholder="Enter reason for rejection..."
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleReject} 
              variant="destructive"
              disabled={!rejectReason.trim() || rejectMutation.isPending}
            >
              {rejectMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Rejecting...
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject User
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}