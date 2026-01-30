const pool = require("../config/db");
const { analyzeHSE } = require("../services/ai.service");

exports.runAI = async (resourceId) => {
  const [[textRow]] = await pool.execute(
    "SELECT raw_text FROM extracted_text WHERE resource_id=?",
    [resourceId],
  );

  const aiResult = await analyzeHSE(textRow.raw_text);

  await pool.execute(
    `INSERT INTO ai_analysis 
     (resource_id,event_type,indicator_type,category,severity,risk_score,ai_confidence)
     VALUES (?,?,?,?,?,?,?)`,
    [
      resourceId,
      aiResult.event_type,
      aiResult.indicator_type,
      aiResult.category,
      aiResult.severity,
      aiResult.risk_score,
      aiResult.ai_confidence,
    ],
  );

  await pool.execute("UPDATE resources SET status='analyzed' WHERE id=?", [
    resourceId,
  ]);

  return aiResult;
};
