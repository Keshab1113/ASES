const pool = require("../config/db");

exports.getIndicatorTrends = async (req, res) => {
  const [rows] = await pool.execute(`
    SELECT 
      DATE(created_at) as date,
      indicator_type,
      COUNT(*) as count
    FROM ai_analysis
    GROUP BY date, indicator_type
    ORDER BY date
  `);

  res.json(rows);
};
