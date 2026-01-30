const pool = require("../config/db");
const { extractText } = require("../services/mistral.service");

exports.runExtraction = async (resourceId) => {
  const [[resource]] = await pool.execute(
    "SELECT * FROM resources WHERE id = ?",
    [resourceId]
  );

  const result = await extractText(resource.storage_path);

  await pool.execute(
    `INSERT INTO extracted_text (resource_id, raw_text, language, confidence)
     VALUES (?,?,?,?)`,
    [resourceId, result.text, result.language, result.confidence]
  );

  await pool.execute(
    "UPDATE resources SET status='extracted' WHERE id=?",
    [resourceId]
  );

  return result;
};
