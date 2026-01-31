import { useState, useEffect } from "react";
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
  Clock
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import api from "../../api/axios";

export default function UsersPage() {
  const { teamId } = useParams();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [approveDialog, setApproveDialog] = useState(false);
  const [rejectDialog, setRejectDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [rejectReason, setRejectReason] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    if (teamId) {
      fetchTeamDetails();
      fetchUsers();
    }
  }, [teamId]);

  const fetchTeamDetails = async () => {
    try {
      const response = await api.get(`/teams/${teamId}`);
      setTeam(response.data.data);
    } catch (error) {
      console.error("Error fetching team details:", error);
      showMessage("error", "Failed to fetch team details");
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/teams/${teamId}/users`);
      setUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      showMessage("error", "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    try {
      await api.post(`/users/${selectedUser.id}/approve`);
      
      showMessage("success", "User approved successfully");
      setApproveDialog(false);
      setSelectedUser(null);
      fetchUsers();
    } catch (error) {
      console.error("Error approving user:", error);
      showMessage("error", error.response?.data?.message || "Failed to approve user");
    }
  };

  const handleReject = async () => {
    try {
      await api.post(`/users/${selectedUser.id}/reject`, { reason: rejectReason });
      
      showMessage("success", "User rejected successfully");
      setRejectDialog(false);
      setSelectedUser(null);
      setRejectReason("");
      fetchUsers();
    } catch (error) {
      console.error("Error rejecting user:", error);
      showMessage("error", error.response?.data?.message || "Failed to reject user");
    }
  };

  const handleStatusUpdate = async (userId, status) => {
    try {
      await api.patch(`/users/${userId}/status`, { status });
      
      showMessage("success", `User ${status === 'active' ? 'activated' : 'deactivated'}`);
      fetchUsers();
    } catch (error) {
      console.error("Error updating user status:", error);
      showMessage("error", error.response?.data?.message || "Failed to update user status");
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
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
        {role.replace('_', ' ')}
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-sky-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-2 text-sm text-slate-500">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Message Alert */}
      {message.text && (
        <div className={`p-4 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
          {message.text}
        </div>
      )}

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
                            >
                              <XCircle className="w-4 h-4 mr-2" />
                              Deactivate
                            </DropdownMenuItem>
                          )}
                          {user.status === 'inactive' && (
                            <DropdownMenuItem 
                              onClick={() => handleStatusUpdate(user.id, 'active')}
                              className="text-green-600"
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
            <Button onClick={handleApprove} className="bg-green-600 hover:bg-green-700">
              <CheckCircle className="w-4 h-4 mr-2" />
              Approve User
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
              disabled={!rejectReason.trim()}
            >
              <XCircle className="w-4 h-4 mr-2" />
              Reject User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}