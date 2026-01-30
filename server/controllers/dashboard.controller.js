const pool = require("../config/db");

exports.getDashboard = async (req, res) => {
  const { role, id, group_id, team_id } = req.user;

  let data = {};

  if (role === "super_admin") {
    const [[stats]] = await pool.execute(`
      SELECT 
        COUNT(*) AS total_incidents,
        SUM(indicator_type='leading') AS leading,
        SUM(indicator_type='lagging') AS lagging
      FROM ai_analysis
    `);
    data.globalStats = stats;
  }

  if (role === "group_admin") {
    const [[stats]] = await pool.execute(`
      SELECT COUNT(*) total_tasks
      FROM tasks t
      JOIN users u ON t.assigned_to=u.id
      WHERE u.group_id=?
    `, [group_id]);
    data.groupStats = stats;
  }

  if (role === "team_admin") {
    const [[stats]] = await pool.execute(`
      SELECT COUNT(*) open_tasks
      FROM tasks
      WHERE status='open'
    `);
    data.teamStats = stats;
  }

  if (role === "employee") {
    const [[stats]] = await pool.execute(`
      SELECT COUNT(*) my_tasks
      FROM tasks
      WHERE assigned_to=?
    `, [id]);
    data.employeeStats = stats;
  }

  res.json(data);
};
