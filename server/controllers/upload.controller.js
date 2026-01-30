const { runExtraction } = require("./extraction.controller");
const { runAI } = require("./ai.controller");
const { createTaskFromRisk } = require("../services/task.service");

exports.uploadResource = async (req, res) => {
  const file = req.file;

  const [result] = await pool.execute(
    `INSERT INTO resources (uploaded_by, resource_type, original_name, storage_path)
     VALUES (?,?,?,?)`,
    [req.user.id, file.mimetype, file.originalname, file.path]
  );

  const resourceId = result.insertId;

  await runExtraction(resourceId);
  const ai = await runAI(resourceId);
  await createTaskFromRisk(resourceId, ai.risk_score);

  res.json({ message: "Upload → AI → Task completed" });
};
