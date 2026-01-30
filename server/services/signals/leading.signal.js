const pool = require("../../config/db");

exports.checkLeadingDrop = async () => {
  const [rows] = await pool.execute(`
    SELECT COUNT(*) as count
    FROM ai_analysis
    WHERE indicator_type='leading'
      AND created_at >= NOW() - INTERVAL 7 DAY
  `);

  if (rows[0].count < 5) {
    return {
      type: "leading_drop",
      risk: "high",
      reason: "Safety observations dropped significantly"
    };
  }
  return null;
};
