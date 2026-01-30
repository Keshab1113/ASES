import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Groups() {
  // TEMP demo data (replace with API)
  const [groups, setGroups] = useState([
    { id: 1, name: "ASES Manufacturing", status: "active" },
    { id: 2, name: "ASES Construction", status: "active" },
  ]);

  const [newGroup, setNewGroup] = useState("");

  const handleCreate = async () => {
    if (!newGroup) return;

    // Backend will create group
    // POST /api/groups
    setGroups([
      ...groups,
      { id: Date.now(), name: newGroup, status: "active" },
    ]);

    setNewGroup("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Groups</h1>
        <p className="text-sm text-muted-foreground">
          Manage organizations and business units
        </p>
      </div>

      {/* Create Group */}
      <Card>
        <CardHeader>
          <h2 className="font-semibold">Create New Group</h2>
        </CardHeader>
        <CardContent className="flex gap-3">
          <Input
            placeholder="Group name"
            value={newGroup}
            onChange={(e) => setNewGroup(e.target.value)}
          />
          <Button onClick={handleCreate}>Create</Button>
        </CardContent>
      </Card>

      {/* Groups List */}
      <Card>
        <CardHeader>
          <h2 className="font-semibold">Existing Groups</h2>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead className="text-left text-muted-foreground">
              <tr>
                <th className="py-2">Group Name</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {groups.map((g) => (
                <tr key={g.id} className="border-t">
                  <td className="py-2">{g.name}</td>
                  <td>
                    <span className="text-green-600 capitalize">
                      {g.status}
                    </span>
                  </td>
                  <td>
                    <Button variant="outline" size="sm">
                      View Teams
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
