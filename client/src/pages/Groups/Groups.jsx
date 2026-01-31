import { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader,
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
  Building,
  Plus,
  Users,
  CheckCircle,
  XCircle,
  Eye,
  MoreVertical
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function Groups() {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  
  const [newGroup, setNewGroup] = useState({
    name: "",
    description: ""
  });

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      setLoading(true);
      const response = await api.get("/groups");
      setGroups(response.data.data);
    } catch (error) {
      console.error("Error fetching groups:", error);
      showMessage("error", "Failed to fetch groups");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    try {
      const response = await api.post("/groups", newGroup);
      
      showMessage("success", response.data.message);
      setDialogOpen(false);
      setNewGroup({ name: "", description: "" });
      fetchGroups();
    } catch (error) {
      console.error("Error creating group:", error);
      showMessage("error", error.response?.data?.message || "Failed to create group");
    }
  };

  const handleStatusUpdate = async (groupId, status) => {
    try {
      await api.patch(`/groups/${groupId}/status`, { status });
      
      showMessage("success", `Group ${status === 'active' ? 'activated' : 'deactivated'}`);
      fetchGroups();
    } catch (error) {
      console.error("Error updating group status:", error);
      showMessage("error", error.response?.data?.message || "Failed to update group status");
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  const getStatusBadge = (status) => {
    const variants = {
      active: "default",
      inactive: "secondary",
      pending: "outline"
    };
    
    const colors = {
      active: "bg-green-100 text-green-800 hover:bg-green-100",
      inactive: "bg-gray-100 text-gray-800 hover:bg-gray-100",
      pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
    };

    return (
      <Badge className={`${colors[status]} capitalize`} variant={variants[status]}>
        {status}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-sky-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-2 text-sm text-slate-500">Loading groups...</p>
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Groups</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Manage organizations and business units
          </p>
        </div>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Create Group
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Group</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Group Name *</Label>
                <Input
                  id="name"
                  placeholder="Enter group name"
                  value={newGroup.name}
                  onChange={(e) => setNewGroup({...newGroup, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter group description"
                  value={newGroup.description}
                  onChange={(e) => setNewGroup({...newGroup, description: e.target.value})}
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreate} disabled={!newGroup.name.trim()}>
                Create Group
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Total Groups</p>
                <p className="text-2xl font-bold">{groups.length}</p>
              </div>
              <Building className="w-8 h-8 text-sky-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Active Groups</p>
                <p className="text-2xl font-bold">
                  {groups.filter(g => g.status === 'active').length}
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
                <p className="text-sm text-slate-600 dark:text-slate-400">Inactive Groups</p>
                <p className="text-2xl font-bold">
                  {groups.filter(g => g.status === 'inactive').length}
                </p>
              </div>
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Groups Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Groups</CardTitle>
          <CardDescription>
            View and manage all organization groups
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Group Name</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Teams</TableHead>
                <TableHead>Users</TableHead>
                <TableHead>Admin</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {groups.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-slate-500">
                    No groups found. Create your first group.
                  </TableCell>
                </TableRow>
              ) : (
                groups.map((group) => (
                  <TableRow key={group.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4 text-slate-400" />
                        {group.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <code className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                        {group.code}
                      </code>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-slate-400" />
                        {group.team_count || 0}
                      </div>
                    </TableCell>
                    <TableCell>{group.user_count || 0}</TableCell>
                    <TableCell>
                      {group.admin_name ? (
                        <div className="text-sm">
                          <p>{group.admin_name}</p>
                          <p className="text-xs text-slate-500">{group.admin_email}</p>
                        </div>
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </TableCell>
                    <TableCell>{getStatusBadge(group.status)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => navigate(`/groups/${group.id}/teams`)}>
                            <Eye className="w-4 h-4 mr-2" />
                            View Teams
                          </DropdownMenuItem>
                          {group.status === 'active' ? (
                            <DropdownMenuItem 
                              onClick={() => handleStatusUpdate(group.id, 'inactive')}
                              className="text-red-600"
                            >
                              <XCircle className="w-4 h-4 mr-2" />
                              Deactivate
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem 
                              onClick={() => handleStatusUpdate(group.id, 'active')}
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
    </div>
  );
}