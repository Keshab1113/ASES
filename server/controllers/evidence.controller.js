const pool = require("../config/db");

exports.uploadEvidence = async (req, res) => {
  const { task_id } = req.body;

  await pool.execute(
    `INSERT INTO task_evidence (task_id, file_path)
     VALUES (?,?)`,
    [task_id, req.file.path]
  );

  res.json({ message: "Evidence uploaded" });
};
