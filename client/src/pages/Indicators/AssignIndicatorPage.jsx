// pages/Indicators/AssignIndicatorPage.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, UserPlus, Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIndicator, useAvailableUsers, useAssignIndicator } from "../../hooks/useIndicators";
import { toast } from "@/hooks/use-toast";

export default function AssignIndicatorPage({ user }) {
  const { id, type } = useParams();
  const navigate = useNavigate();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // React Query hooks
  const { 
    data: indicator, 
    isLoading: indicatorLoading,
    error: indicatorError 
  } = useIndicator(id, type);
  
  const { 
    data: users = [], 
    isLoading: usersLoading 
  } = useAvailableUsers(user);
  
  const assignMutation = useAssignIndicator();

  const handleUserToggle = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (selectedUsers.length === 0) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select at least one user",
      });
      return;
    }

    await assignMutation.mutateAsync({
      id,
      data: {
        assignees: selectedUsers,
        type,
        due_date: dueDate,
        notes,
      },
    });

    navigate(`/app/indicators-dashboard/${id}/${type}`);
  };

  const isLoading = indicatorLoading || usersLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-sky-600 animate-spin mx-auto" />
          <p className="mt-4 text-lg text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (indicatorError || !indicator) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-600">Indicator not found</h2>
        <p className="text-muted-foreground mt-2">
          The indicator you're trying to assign doesn't exist or you don't have access.
        </p>
        <Button
          variant="outline"
          onClick={() => navigate("/app/indicators-dashboard")}
          className="mt-4"
        >
          Back to Dashboard
        </Button>
      </div>
    );
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const canAssignToUser = (targetUser) => {
    if (user.role === "super_admin") return true;
    if (user.role === "group_admin") {
      return ["team_admin", "employee"].includes(targetUser.role) && targetUser.group_id === user.group_id;
    }
    if (user.role === "team_admin") {
      return targetUser.role === "employee" && targetUser.team_id === user.team_id;
    }
    return false;
  };

  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        onClick={() => navigate(`/app/indicators-dashboard/${id}/${type}`)}
        className="gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Indicator
      </Button>

      <div>
        <h1 className="text-2xl font-bold">Assign Indicator</h1>
        <p className="text-muted-foreground">
          Assign "{indicator.name}" to team members
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Select Assignees</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label>Search Users</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="border rounded-lg max-h-96 overflow-y-auto">
              {filteredUsers.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">
                  No users found
                </div>
              ) : (
                filteredUsers.map((targetUser) => {
                  const canAssign = canAssignToUser(targetUser);
                  
                  return (
                    <div
                      key={targetUser.id}
                      className={`p-4 flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-900 border-b last:border-0 ${
                        !canAssign ? "opacity-50" : ""
                      }`}
                    >
                      <Checkbox
                        id={`user-${targetUser.id}`}
                        checked={selectedUsers.includes(targetUser.id)}
                        onCheckedChange={() => handleUserToggle(targetUser.id)}
                        disabled={!canAssign}
                      />
                      <label
                        htmlFor={`user-${targetUser.id}`}
                        className="flex-1 cursor-pointer"
                      >
                        <div>
                          <p className="font-medium">{targetUser.name}</p>
                          <p className="text-sm text-muted-foreground">{targetUser.email}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Role: {targetUser.role?.replace('_', ' ')} • {targetUser.team_name || 'No Team'}
                          </p>
                        </div>
                      </label>
                    </div>
                  );
                })
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="due_date">Due Date (Optional)</Label>
              <Input
                id="due_date"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Assignment Notes (Optional)</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any instructions for the assignees..."
                rows={3}
              />
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(`/app/indicators-dashboard/${id}/${type}`)}
                className="flex-1"
                disabled={assignMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 gap-2"
                disabled={selectedUsers.length === 0 || assignMutation.isPending}
              >
                {assignMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Assigning...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    Assign to {selectedUsers.length} User{selectedUsers.length !== 1 ? "s" : ""}
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Summary Card */}
      {selectedUsers.length > 0 && (
        <Card className="bg-gradient-to-r from-sky-50 to-emerald-50 dark:from-sky-900/20 dark:to-emerald-900/20 border-sky-200 dark:border-sky-800">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-2">Assignment Summary</h3>
            <p className="text-sm text-muted-foreground mb-4">
              You are assigning this indicator to {selectedUsers.length} user{selectedUsers.length !== 1 ? 's' : ''}
            </p>
            <div className="space-y-2">
              {selectedUsers.map(userId => {
                const user = users.find(u => u.id === userId);
                return (
                  <div key={userId} className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-sky-500" />
                    <span>{user?.name}</span>
                    <span className="text-xs text-muted-foreground">({user?.email})</span>
                  </div>
                );
              })}
            </div>
            {dueDate && (
              <p className="text-sm mt-4">
                <span className="font-medium">Due Date:</span> {new Date(dueDate).toLocaleDateString()}
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}