const pool = require("../config/db");

/* =======================
   CREATE JSA
======================= */
exports.createJSA = async (data, userId) => {
  const { job_title, location, description, hazards } = data;

  const [res] = await pool.execute(
    `INSERT INTO jsas (job_title, location, description, created_by)
     VALUES (?,?,?,?)`,
    [job_title, location, description, userId]
  );

  const jsaId = res.insertId;

  for (const h of hazards) {
    const initialRisk = h.severity * h.likelihood;

    const [haz] = await pool.execute(
      `INSERT INTO jsa_hazards
       (jsa_id, hazard_type, severity, likelihood, initial_risk)
       VALUES (?,?,?,?,?)`,
      [jsaId, h.hazard_type, h.severity, h.likelihood, initialRisk]
    );

    for (const c of h.controls) {
      await pool.execute(
        `INSERT INTO jsa_controls
         (hazard_id, control_type, description)
         VALUES (?,?,?)`,
        [haz.insertId, c.control_type, c.description]
      );
    }
  }

  return jsaId;
};

/* =======================
   GET FULL JSA
======================= */
exports.getJSA = async (id) => {
  const [[jsa]] = await pool.execute(
    "SELECT * FROM jsas WHERE id=?",
    [id]
  );

  const [hazards] = await pool.execute(
    "SELECT * FROM jsa_hazards WHERE jsa_id=?",
    [id]
  );

  for (const h of hazards) {
    const [controls] = await pool.execute(
      "SELECT * FROM jsa_controls WHERE hazard_id=?",
      [h.id]
    );
    h.controls = controls;
  }

  jsa.hazards = hazards;
  return jsa;
};

/* =======================
   SUBMIT FOR APPROVAL
======================= */
exports.submitJSA = async (jsaId) => {
  await pool.execute(
    `UPDATE jsas SET status='pending_approval' WHERE id=?`,
    [jsaId]
  );
};

/* =======================
   APPROVAL
======================= */
exports.approveJSA = async (data, approverId) => {
  const { jsa_id, decision, comment } = data;

  await pool.execute(
    `INSERT INTO jsa_approvals
     (jsa_id, approved_by, approval_level, approved_at, decision, comment)
     VALUES (?,?, 'group', NOW(), ?, ?)`,
    [jsa_id, approverId, decision, comment]
  );

  await pool.execute(
    `UPDATE jsas SET status=? WHERE id=?`,
    [decision === "approved" ? "approved" : "rejected", jsa_id]
  );
};

/* =======================
   EMPLOYEE ACK
======================= */
exports.acknowledgeJSA = async (jsaId, userId) => {
  await pool.execute(
    `INSERT INTO jsa_acknowledgements (jsa_id, user_id)
     VALUES (?,?)`,
    [jsaId, userId]
  );
};
