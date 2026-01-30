const pool = require("../config/db");

exports.createClaim = async (data, userId) => {
  const { incident_id, injury_type, body_part, claim_date } = data;

  await pool.execute(
    `INSERT INTO workers_comp_claims
     (incident_id, employee_id, injury_type, body_part, claim_date)
     VALUES (?,?,?,?,?)`,
    [incident_id, userId, injury_type, body_part, claim_date]
  );
};

exports.getClaims = async (user) => {
  if (user.role === "employee") {
    const [rows] = await pool.execute(
      "SELECT * FROM workers_comp_claims WHERE employee_id=?",
      [user.id]
    );
    return rows;
  }

  const [rows] = await pool.execute(
    "SELECT * FROM workers_comp_claims"
  );
  return rows;
};

exports.updateStatus = async (data) => {
  const { claim_id, claim_status } = data;
  await pool.execute(
    `UPDATE workers_comp_claims SET claim_status=? WHERE id=?`,
    [claim_status, claim_id]
  );
};

exports.addCost = async (data) => {
  const { claim_id, cost_type, amount } = data;
  await pool.execute(
    `INSERT INTO claim_costs (claim_id,cost_type,amount)
     VALUES (?,?,?)`,
    [claim_id, cost_type, amount]
  );
};

exports.updateRecovery = async (data) => {
  const { claim_id, lost_work_days, return_to_work_date, work_restriction, notes } = data;

  await pool.execute(
    `INSERT INTO claim_recovery
     (claim_id,lost_work_days,return_to_work_date,work_restriction,notes)
     VALUES (?,?,?,?,?)`,
    [claim_id, lost_work_days, return_to_work_date, work_restriction, notes]
  );
};

exports.getAnalytics = async () => {
  const [[cost]] = await pool.execute(`
    SELECT SUM(amount) total_cost FROM claim_costs
  `);

  const [[claims]] = await pool.execute(`
    SELECT COUNT(*) total_claims FROM workers_comp_claims
  `);

  const [[lost]] = await pool.execute(`
    SELECT SUM(lost_work_days) lost_days FROM claim_recovery
  `);

  return {
    total_claims: claims.total_claims,
    total_cost: cost.total_cost || 0,
    lost_work_days: lost.lost_days || 0
  };
};
