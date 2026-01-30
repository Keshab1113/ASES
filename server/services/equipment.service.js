const pool = require("../config/db");

exports.createEquipment = async (data) => {
  const { name, equipment_code, category, location, safety_critical, risk_level } = data;
  await pool.execute(
    `INSERT INTO equipment (name,equipment_code,category,location,safety_critical,risk_level)
     VALUES (?,?,?,?,?,?)`,
    [name, equipment_code, category, location, safety_critical, risk_level]
  );
};

exports.getEquipment = async () => {
  const [rows] = await pool.execute("SELECT * FROM equipment");
  return rows;
};

exports.createPlan = async (data, userId) => {
  const { equipment_id, maintenance_type, frequency_days } = data;
  await pool.execute(
    `INSERT INTO maintenance_plans (equipment_id,maintenance_type,frequency_days,created_by)
     VALUES (?,?,?,?)`,
    [equipment_id, maintenance_type, frequency_days, userId]
  );
};

exports.recordMaintenance = async (data, userId) => {
  const { equipment_id, plan_id, condition_status, remarks } = data;

  // Create corrective task if unsafe
  let taskId = null;
  if (condition_status === "unsafe") {
    const [task] = await pool.execute(
      `INSERT INTO tasks (task_type, priority, status)
       VALUES ('Equipment Repair','high','open')`
    );
    taskId = task.insertId;
  }

  await pool.execute(
    `INSERT INTO maintenance_records
     (equipment_id,plan_id,performed_by,performed_at,condition_status,remarks,linked_task_id)
     VALUES (?,?,?,NOW(),?,?,?)`,
    [equipment_id, plan_id, userId, condition_status, remarks, taskId]
  );
};

exports.getAnalytics = async () => {
  const [[stats]] = await pool.execute(`
    SELECT
      COUNT(*) total,
      SUM(safety_critical=1) critical
    FROM equipment
  `);

  const [[overdue]] = await pool.execute(`
    SELECT COUNT(*) overdue
    FROM maintenance_plans mp
    WHERE mp.id NOT IN (
      SELECT plan_id FROM maintenance_records
    )
  `);

  return { equipment: stats, overdue_maintenance: overdue.overdue };
};
