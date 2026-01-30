const pool = require("../config/db");

exports.submitSuggestion = async (data, userId) => {
  const { category, suggestion } = data;
  await pool.execute(
    `INSERT INTO safety_suggestions (user_id,category,suggestion)
     VALUES (?,?,?)`,
    [userId, category, suggestion]
  );
};

exports.getSuggestions = async () => {
  const [rows] = await pool.execute(`
    SELECT s.*, u.name
    FROM safety_suggestions s
    JOIN users u ON s.user_id=u.id
    ORDER BY created_at DESC
  `);
  return rows;
};

exports.scoreNearMiss = async (data) => {
  const { incident_id, quality_score, ai_feedback } = data;
  await pool.execute(
    `INSERT INTO near_miss_scores
     (incident_id,quality_score,ai_feedback)
     VALUES (?,?,?)`,
    [incident_id, quality_score, ai_feedback]
  );
};

exports.recordCommittee = async (data) => {
  const { user_id, meeting_date, role } = data;
  await pool.execute(
    `INSERT INTO safety_committee_participation
     (user_id,meeting_date,role)
     VALUES (?,?,?)`,
    [user_id, meeting_date, role]
  );
};

exports.getAnalytics = async () => {
  const [[suggestions]] = await pool.execute(
    "SELECT COUNT(*) total FROM safety_suggestions"
  );

  const [[nearmiss]] = await pool.execute(
    "SELECT AVG(quality_score) avg_score FROM near_miss_scores"
  );

  const [[committee]] = await pool.execute(
    "SELECT COUNT(DISTINCT user_id) members FROM safety_committee_participation"
  );

  return {
    suggestions: suggestions.total,
    near_miss_quality: Math.round(nearmiss.avg_score || 0),
    committee_participation: committee.members
  };
};
