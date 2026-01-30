import { useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Teams() {
  // In real flow, groupId comes from route param
  // /groups/:groupId/teams
  const { groupId } = useParams();

  // TEMP demo data (replace with API)
  const [teams, setTeams] = useState([
    { id: 1, name: "Warehouse Team", status: "active" },
    { id: 2, name: "Maintenance Team", status: "active" },
  ]);

  const [newTeam, setNewTeam] = useState("");

  const handleCreate = async () => {
    if (!newTeam) return;

    // Backend:
    // POST /api/groups/:groupId/teams
    setTeams([
      ...teams,
      { id: Date.now(), name: newTeam, status: "active" },
    ]);

    setNewTeam("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Teams</h1>
        <p className="text-sm text-muted-foreground">
          Manage teams under this group
        </p>
      </div>

      {/* Create Team */}
      <Card>
        <CardHeader>
          <h2 className="font-semibold">Create New Team</h2>
        </CardHeader>
        <CardContent className="flex gap-3">
          <Input
            placeholder="Team name"
            value={newTeam}
            onChange={(e) => setNewTeam(e.target.value)}
          />
          <Button onClick={handleCreate}>Create</Button>
        </CardContent>
      </Card>

      {/* Teams List */}
      <Card>
        <CardHeader>
          <h2 className="font-semibold">Teams List</h2>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead className="text-left text-muted-foreground">
              <tr>
                <th className="py-2">Team Name</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team.id} className="border-t">
                  <td className="py-2">{team.name}</td>
                  <td>
                    <span className="text-green-600 capitalize">
                      {team.status}
                    </span>
                  </td>
                  <td className="flex gap-2 py-2">
                    <Button variant="outline" size="sm">
                      View Users
                    </Button>
                    <Button variant="outline" size="sm">
                      Dashboard
                    </Button>
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
