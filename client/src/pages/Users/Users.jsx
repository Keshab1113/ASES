import { useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Users() {
  // teamId comes from route: /groups/:groupId/teams/:teamId/users
  const { teamId } = useParams();

  // TEMP demo data (replace with API)
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Suresh Kumar",
      email: "suresh@company.com",
      role: "employee",
      status: "pending",
    },
    {
      id: 2,
      name: "Neha Patel",
      email: "neha@company.com",
      role: "employee",
      status: "active",
    },
    {
      id: 3,
      name: "Rakesh Singh",
      email: "rakesh@company.com",
      role: "team_admin",
      status: "active",
    },
  ]);

  const updateStatus = (id, status) => {
    // Backend:
    // PATCH /api/users/:id/status
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status } : u
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Users</h1>
        <p className="text-sm text-muted-foreground">
          Manage users under this team
        </p>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <h2 className="font-semibold">Team Members</h2>
        </CardHeader>

        <CardContent>
          <table className="w-full text-sm">
            <thead className="text-left text-muted-foreground">
              <tr>
                <th className="py-2">Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t">
                  <td className="py-2">{user.name}</td>
                  <td>{user.email}</td>
                  <td className="capitalize">
                    <Badge variant="secondary">
                      {user.role.replace("_", " ")}
                    </Badge>
                  </td>
                  <td>
                    <StatusBadge status={user.status} />
                  </td>
                  <td className="text-right space-x-2">
                    {user.status === "pending" && (
                      <Button
                        size="sm"
                        onClick={() =>
                          updateStatus(user.id, "active")
                        }
                      >
                        Approve
                      </Button>
                    )}

                    {user.status === "active" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          updateStatus(user.id, "inactive")
                        }
                      >
                        Deactivate
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}

/* -------- Helper -------- */

function StatusBadge({ status }) {
  const map = {
    active: <Badge className="bg-green-600">Active</Badge>,
    pending: <Badge variant="warning">Pending</Badge>,
    inactive: <Badge variant="destructive">Inactive</Badge>,
  };

  return map[status] || null;
}
