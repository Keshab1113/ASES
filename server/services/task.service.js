const pool = require("../config/db");

exports.createTaskFromRisk = async (resourceId, riskScore) => {
  let priority = "low";
  if (riskScore > 7) priority = "high";
  else if (riskScore > 4) priority = "medium";

  await pool.execute(
    `INSERT INTO tasks (resource_id, task_type, priority, due_date)
     VALUES (?,?,?,DATE_ADD(NOW(), INTERVAL 3 DAY))`,
    [resourceId, "Corrective Action", priority]
  );
};
