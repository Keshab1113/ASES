const pool = require("../config/db");

exports.getGroups = async (req, res) => {
  try {
    const [groups] = await pool.execute(`
      SELECT 
        g.*,
        u.name as admin_name,
        u.email as admin_email,
        COUNT(DISTINCT t.id) as team_count,
        COUNT(DISTINCT u2.id) as user_count
      FROM \`groups\` g
      LEFT JOIN users u ON g.created_by = u.id
      LEFT JOIN teams t ON g.id = t.group_id
      LEFT JOIN users u2 ON t.id = u2.team_id OR g.id = u2.group_id
      GROUP BY g.id
      ORDER BY g.created_at DESC
    `);

    res.json({
      success: true,
      data: groups
    });
  } catch (error) {
    console.error("Get groups error:", error);
    res.status(500).json({
      message: "Failed to fetch groups",
      error: error.message
    });
  }
};

exports.createGroup = async (req, res) => {
  try {
    const { name, description } = req.body;
    const userId = req.user.id;

    if (!name) {
      return res.status(400).json({ message: "Group name is required" });
    }

    // Generate unique code
    const code = `${name.replace(/\s+/g, '').substring(0, 3).toUpperCase()}-${Date.now().toString().substr(-4)}`;

    const [result] = await pool.execute(
      "INSERT INTO `groups` (name, code, description, created_by, status) VALUES (?, ?, ?, ?, 'active')",
      [name, code, description || null, userId]
    );

    const [newGroup] = await pool.execute(
      "SELECT * FROM `groups` WHERE id = ?",
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      message: "Group created successfully",
      data: newGroup[0]
    });
  } catch (error) {
    console.error("Create group error:", error);
    res.status(500).json({
      message: "Failed to create group",
      error: error.message
    });
  }
};

exports.updateGroupStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['active', 'inactive'].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    await pool.execute(
      "UPDATE `groups` SET status = ? WHERE id = ?",
      [status, id]
    );

    // Also update all teams and users under this group if deactivating
    if (status === 'inactive') {
      await pool.execute(
        "UPDATE teams SET status = 'inactive' WHERE group_id = ?",
        [id]
      );
      
      await pool.execute(
        "UPDATE users SET status = 'inactive' WHERE group_id = ? AND role IN ('employee', 'team_admin')",
        [id]
      );
    }

    res.json({
      success: true,
      message: `Group ${status === 'active' ? 'activated' : 'deactivated'} successfully`
    });
  } catch (error) {
    console.error("Update group status error:", error);
    res.status(500).json({
      message: "Failed to update group status",
      error: error.message
    });
  }
};

exports.getGroupDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    // Check if user has access to this group
    if (user.role === 'group_admin' && user.group_id != id) {
      return res.status(403).json({ message: "Access denied" });
    }

    const [groups] = await pool.execute(`
      SELECT 
        g.*,
        u.name as admin_name,
        u.email as admin_email,
        (SELECT COUNT(*) FROM teams WHERE group_id = g.id) as team_count,
        (SELECT COUNT(*) FROM users WHERE group_id = g.id) as user_count
      FROM \`groups\` g
      LEFT JOIN users u ON g.created_by = u.id
      WHERE g.id = ?
    `, [id]);

    if (groups.length === 0) {
      return res.status(404).json({ message: "Group not found" });
    }

    res.json({
      success: true,
      data: groups[0]
    });
  } catch (error) {
    console.error("Get group details error:", error);
    res.status(500).json({
      message: "Failed to fetch group details",
      error: error.message
    });
  }
};

exports.getGroupTeams = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    // Check access
    if (user.role === 'group_admin' && user.group_id != id) {
      return res.status(403).json({ message: "Access denied" });
    }

    const [teams] = await pool.execute(`
      SELECT 
        t.*,
        u.name as admin_name,
        u.email as admin_email,
        COUNT(DISTINCT u2.id) as user_count
      FROM teams t
      LEFT JOIN users u ON t.created_by = u.id
      LEFT JOIN users u2 ON t.id = u2.team_id
      WHERE t.group_id = ?
      GROUP BY t.id
      ORDER BY t.created_at DESC
    `, [id]);

    res.json({
      success: true,
      data: teams
    });
  } catch (error) {
    console.error("Get group teams error:", error);
    res.status(500).json({
      message: "Failed to fetch teams",
      error: error.message
    });
  }
};