// pages/SystemAdmin/SystemAdministration/SystemAdministration.jsx
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Shield,
  Users,
  Settings,
  Key,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Activity,
  CheckCircle,
  AlertCircle,
  Loader2,
  UserCog,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRoles, usePermissions, useDeleteRole } from "../../../hooks/useRBAC";
import { useUsers } from "../../../hooks/useUsers";
import EditRoleModal from "./EditRoleModal";
import RoleDetailsModal from "./RoleDetailsModal";
import UserPermissionsModal from "./UserPermissionsModal";
import AuditLogsTable from "./AuditLogsTable";

export default function SystemAdministration({ user }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("roles");

  // Modals
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showUserPermissions, setShowUserPermissions] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  // React Query hooks
  const { data: roles = [], isLoading: rolesLoading } = useRoles();
  const { data: permissions = [], isLoading: permissionsLoading } = usePermissions();
  const { data: users = [], isLoading: usersLoading } = useUsers();
  const deleteRoleMutation = useDeleteRole();

  const handleDeleteRole = (id, roleName) => {
    if (window.confirm(`Are you sure you want to delete "${roleName}"?`)) {
      deleteRoleMutation.mutate(id);
    }
  };

  const handleViewDetails = (role) => {
    setSelectedRole(role);
    setShowDetailsModal(true);
  };

  const handleEditClick = (role) => {
    setSelectedRole(role);
    setShowEditModal(true);
  };

  const handleViewUserPermissions = (user) => {
    setSelectedUser(user);
    setShowUserPermissions(true);
  };

  const filteredRoles = roles.filter(
    (role) =>
      role.role_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.role_key?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    totalRoles: roles.length,
    systemRoles: roles.filter((r) => r.is_system).length,
    customRoles: roles.filter((r) => !r.is_system).length,
    totalPermissions: permissions.reduce(
      (sum, group) => sum + (group.permissions?.length || 0),
      0
    ),
  };

  const isLoading = rolesLoading || permissionsLoading || usersLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-purple-600 mx-auto" />
          <p className="mt-2 text-sm text-slate-500">Loading system data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-[1600px] mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                System Administration
              </span>
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">
              Manage roles, permissions, and access control
            </p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <Button
              size="default"
              className="text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg shadow-purple-500/30 transition-all"
              onClick={() => navigate("/system-admin/create-role")}
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Role
            </Button>
            <Button
              size="default"
              className="text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-500/30 transition-all"
              onClick={() => navigate("/system-admin/create-permission")}
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Permission
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 sm:p-3 rounded-xl bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/50 dark:to-purple-800/50">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-muted-foreground truncate">
                    Total Roles
                  </p>
                  <p className="text-xl sm:text-2xl font-bold">{stats.totalRoles}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 sm:p-3 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/50 dark:to-blue-800/50">
                  <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-muted-foreground truncate">
                    System Roles
                  </p>
                  <p className="text-xl sm:text-2xl font-bold">{stats.systemRoles}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-500 hover:shadow-lg transition-shadow bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 sm:p-3 rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/50 dark:to-emerald-800/50">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-muted-foreground truncate">
                    Custom Roles
                  </p>
                  <p className="text-xl sm:text-2xl font-bold">{stats.customRoles}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-amber-500 hover:shadow-lg transition-shadow bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 sm:p-3 rounded-xl bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900/50 dark:to-amber-800/50">
                  <Key className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-muted-foreground truncate">
                    Permissions
                  </p>
                  <p className="text-xl sm:text-2xl font-bold">
                    {stats.totalPermissions}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid bg-white dark:bg-slate-800 p-1 rounded-xl shadow-md">
            <TabsTrigger
              value="roles"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white"
            >
              <Shield className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Roles</span>
            </TabsTrigger>
            <TabsTrigger
              value="permissions"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white"
            >
              <Key className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Permissions</span>
            </TabsTrigger>
            <TabsTrigger
              value="users"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white"
            >
              <UserCog className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Users</span>
            </TabsTrigger>
            <TabsTrigger
              value="audit"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white"
            >
              <Activity className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Audit</span>
            </TabsTrigger>
          </TabsList>

          {/* Roles Tab */}
          <TabsContent value="roles" className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search roles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-2"
                />
              </div>
            </div>

            <div>
              {filteredRoles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredRoles.map((role) => (
                    <RoleCard
                      key={role.id}
                      role={role}
                      onView={() => handleViewDetails(role)}
                      onEdit={() => handleEditClick(role)}
                      onDelete={() => handleDeleteRole(role.id, role.role_name)}
                    />
                  ))}
                </div>
              ) : (
                <Card className="border-2 border-dashed">
                  <CardContent className="p-12 text-center">
                    <Shield className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold mb-2">No roles found</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      {searchTerm
                        ? "No roles match your search"
                        : "Get started by creating your first role"}
                    </p>
                    {!searchTerm && (
                      <Button onClick={() => navigate("/system-admin/create-role")}>
                        <Plus className="w-4 h-4 mr-2" />
                        Create Role
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Permissions Tab */}
          <TabsContent value="permissions" className="space-y-4">
            {permissions.map((group) => (
              <Card key={group.group_name}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                      <Key className="w-4 h-4" />
                    </div>
                    {group.group_name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {group.permissions?.map((permission) => (
                      <div
                        key={permission.id}
                        className="p-3 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-medium text-sm">
                              {permission.permission_name}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {permission.description}
                            </p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {permission.action}
                          </Badge>
                        </div>
                        <code className="text-xs text-purple-600 dark:text-purple-400">
                          {permission.permission_key}
                        </code>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-2"
                />
              </div>
            </div>

            {filteredUsers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredUsers.map((user) => (
                  <Card
                    key={user.id}
                    className="hover:shadow-lg transition-shadow border-2"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/50 dark:to-blue-800/50">
                            <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <p className="font-semibold">{user.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full"
                        onClick={() => handleViewUserPermissions(user)}
                      >
                        <UserCog className="w-4 h-4 mr-2" />
                        Manage Permissions
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-2 border-dashed">
                <CardContent className="p-12 text-center">
                  <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold mb-2">No users found</h4>
                  <p className="text-sm text-muted-foreground">
                    {searchTerm
                      ? "No users match your search"
                      : "No users available"}
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Audit Tab */}
          <TabsContent value="audit" className="space-y-4">
            <AuditLogsTable />
          </TabsContent>
        </Tabs>
      </div>

      {showEditModal && selectedRole && (
        <EditRoleModal
          role={selectedRole}
          permissions={permissions}
          onClose={() => {
            setShowEditModal(false);
            setSelectedRole(null);
          }}
        />
      )}

      {showDetailsModal && selectedRole && (
        <RoleDetailsModal
          role={selectedRole}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedRole(null);
          }}
        />
      )}

      {showUserPermissions && selectedUser && (
        <UserPermissionsModal
          user={selectedUser}
          permissions={permissions}
          onClose={() => {
            setShowUserPermissions(false);
            setSelectedUser(null);
          }}
        />
      )}
    </div>
  );
}

function RoleCard({ role, onView, onEdit, onDelete }) {
  const getHierarchyColor = (level) => {
    const colors = {
      0: "text-purple-500",
      1: "text-blue-500",
      2: "text-emerald-500",
      3: "text-slate-500",
    };
    return colors[level] || colors[3];
  };

  const getHierarchyBg = (level) => {
    const colors = {
      0: "bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30",
      1: "bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30",
      2: "bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30",
      3: "bg-gradient-to-br from-slate-100 to-gray-100 dark:from-slate-800/30 dark:to-gray-800/30",
    };
    return colors[level] || colors[3];
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-purple-200 dark:hover:border-purple-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div
            className={`p-3 rounded-xl ${getHierarchyBg(
              role.hierarchy_level
            )} group-hover:scale-110 transition-transform`}
          >
            <Shield
              className={`w-6 h-6 ${getHierarchyColor(role.hierarchy_level)}`}
            />
          </div>
          <div className="flex flex-wrap gap-2 justify-end">
            {role.is_system === 1 && (
              <Badge
                variant="secondary"
                className="text-xs bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
              >
                System
              </Badge>
            )}
            <Badge
              className={`text-xs ${
                role.is_active
                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
              }`}
            >
              {role.is_active ? (
                <>
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Active
                </>
              ) : (
                <>
                  <AlertCircle className="w-3 h-3 mr-1" />
                  Inactive
                </>
              )}
            </Badge>
          </div>
        </div>

        <h3 className="font-bold text-lg sm:text-xl mb-2 line-clamp-1">
          {role.role_name}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 min-h-[2.5rem]">
          {role.description || "No description provided"}
        </p>

        <div className="space-y-2 mb-4 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Role Key</span>
            <code className="text-xs px-2 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded font-mono">
              {role.role_key}
            </code>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Permissions</span>
            <Badge variant="outline" className="font-semibold">
              {role.permission_count || 0}
            </Badge>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Users</span>
            <Badge variant="outline" className="font-semibold">
              {role.user_count || 0}
            </Badge>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Hierarchy</span>
            <span className="font-semibold text-purple-600 dark:text-purple-400">
              Level {role.hierarchy_level}
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 hover:bg-purple-50 hover:border-purple-300 dark:hover:bg-purple-900/20"
            onClick={onView}
          >
            <Eye className="w-4 h-4 mr-1" />
            View
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="hover:bg-blue-50 hover:border-blue-300 dark:hover:bg-blue-900/20"
            onClick={onEdit}
          >
            <Edit className="w-4 h-4" />
          </Button>
          {!role.is_system && (
            <Button
              variant="outline"
              size="sm"
              onClick={onDelete}
              className="text-red-600 hover:bg-red-50 hover:border-red-300 dark:hover:bg-red-900/20"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}