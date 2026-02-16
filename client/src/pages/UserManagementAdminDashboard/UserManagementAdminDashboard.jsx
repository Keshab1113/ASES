// pages/UserManagementAdminDashboard/UserManagementAdminDashboard.jsx
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Building,
  Users,
  User,
  Shield,
  Clock,
  CheckCircle,
  XCircle,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  usePendingApprovals,
  useApproveUser,
  useRejectUser,
} from "../../hooks/useUsers";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export default function UserManagementAdminDashboard() {
  const navigate = useNavigate();
  const [rejectReason, setRejectReason] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  // React Query hooks
  const { data: pendingApprovals = [], isLoading } = usePendingApprovals();
  const approveMutation = useApproveUser();
  const rejectMutation = useRejectUser();

  // Calculate stats
  const stats = {
    total: pendingApprovals.length,
    employees: pendingApprovals.filter((u) => u.role === "employee").length,
    teamAdmins: pendingApprovals.filter((u) => u.role === "team_admin").length,
    groupAdmins: pendingApprovals.filter((u) => u.role === "group_admin")
      .length,
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "group_admin":
        return <Building className="w-4 h-4" />;
      case "team_admin":
        return <Users className="w-4 h-4" />;
      case "employee":
        return <User className="w-4 h-4" />;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  const getRoleBadge = (role) => {
    const colors = {
      group_admin: "bg-blue-100 text-blue-800",
      team_admin: "bg-green-100 text-green-800",
      employee: "bg-slate-100 text-slate-800",
    };

    return (
      <Badge
        className={`${colors[role]} capitalize text-xs flex items-center gap-1`}
      >
        {getRoleIcon(role)}
        <span>{role.replace("_", " ")}</span>
      </Badge>
    );
  };

  const handleApprove = (userId) => {
    approveMutation.mutate(userId);
  };

  const handleReject = (user) => {
    setSelectedUser(user);
    setRejectReason("");
  };

  const confirmReject = () => {
    if (!rejectReason.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please provide a reason for rejection",
      });
      return;
    }

    rejectMutation.mutate({
      id: selectedUser.id,
      reason: rejectReason,
    });

    setSelectedUser(null);
    setRejectReason("");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-sky-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-2 text-sm text-slate-500">
            Loading pending approvals...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Approve pending user registrations and manage system access
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Total Pending
                </p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Employees
                </p>
                <p className="text-2xl font-bold">{stats.employees}</p>
              </div>
              <User className="w-8 h-8 text-sky-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Team Admins
                </p>
                <p className="text-2xl font-bold">{stats.teamAdmins}</p>
              </div>
              <Users className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Group Admins
                </p>
                <p className="text-2xl font-bold">{stats.groupAdmins}</p>
              </div>
              <Building className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Approvals Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Pending Approvals</CardTitle>
              <CardDescription>
                Users waiting for approval to access the system
              </CardDescription>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate("/groups")}
              className="gap-2"
            >
              <Building className="w-4 h-4" />
              Manage Groups
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Group/Team</TableHead>
                <TableHead>Registered On</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingApprovals.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-8 text-slate-500"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <CheckCircle className="w-12 h-12 text-green-400 mb-2" />
                      <p>No pending approvals</p>
                      <p className="text-sm text-slate-400">
                        All users have been approved.
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                pendingApprovals.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center">
                          <User className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                        </div>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-xs text-slate-500">{user.email}</p>
                          {user.position && (
                            <p className="text-xs text-slate-400">
                              {user.position}
                            </p>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1">
                          <Building className="w-3 h-3 text-slate-400" />
                          <span className="text-sm">
                            {user.group_name || "No group"}
                          </span>
                        </div>
                        {user.team_name && (
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3 text-slate-400" />
                            <span className="text-sm">{user.team_name}</span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {new Date(user.created_at).toLocaleDateString()}
                        <div className="text-xs text-slate-500">
                          {new Date(user.created_at).toLocaleTimeString()}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleApprove(user.id)}
                          className="gap-1"
                          disabled={approveMutation.isPending}
                        >
                          <CheckCircle className="w-3 h-3" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleReject(user)}
                          className="gap-1"
                        >
                          <XCircle className="w-3 h-3" />
                          Reject
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Groups Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Manage organizations and their settings
            </p>
            <Button
              onClick={() => navigate("/groups")}
              className="w-full gap-2"
            >
              <Building className="w-4 h-4" />
              Go to Groups
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Teams Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              View and manage teams under groups
            </p>
            <Button
              onClick={() => navigate("/groups")}
              className="w-full gap-2"
              variant="outline"
            >
              <Users className="w-4 h-4" />
              View Teams
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">User Permissions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Manage user roles and permissions
            </p>
            <Button
              onClick={() => navigate("/users")}
              className="w-full gap-2"
              variant="outline"
            >
              <Shield className="w-4 h-4" />
              User Roles
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Reject Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle>Reject User</CardTitle>
              <CardDescription>
                Provide a reason for rejecting {selectedUser.name}'s
                registration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">
                  Reason for rejection *
                </label>
                <textarea
                  className="w-full mt-1 p-2 border rounded-md dark:bg-slate-900"
                  rows={4}
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Please explain why this registration is being rejected..."
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setSelectedUser(null)}>
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={confirmReject}
                  disabled={!rejectReason.trim() || rejectMutation.isPending}
                >
                  {rejectMutation.isPending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Rejecting...
                    </>
                  ) : (
                    "Confirm Reject"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
