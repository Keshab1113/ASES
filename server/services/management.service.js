const pool = require("../config/db");

exports.createActivity = async (data, userId) => {
  const { activity_type, location, topic, notes, activity_date } = data;

  await pool.execute(
    `INSERT INTO management_activities
     (activity_type, conducted_by, location, topic, notes, activity_date)
     VALUES (?,?,?,?,?,?)`,
    [activity_type, userId, location, topic, notes, activity_date]
  );
};

exports.getActivities = async () => {
  const [rows] = await pool.execute(`
    SELECT ma.*, u.name
    FROM management_activities ma
    JOIN users u ON ma.conducted_by=u.id
    ORDER BY activity_date DESC
  `);
  return rows;
};

exports.addObservation = async (data, userId) => {
  const { activity_id, observation_type, severity, description } = data;

  let taskId = null;
  if (observation_type === "unsafe_behavior") {
    const [task] = await pool.execute(
      `INSERT INTO tasks (task_type, priority, status)
       VALUES ('Behavioral Correction','medium','open')`
    );
    taskId = task.insertId;
  }

  await pool.execute(
    `INSERT INTO management_observations
     (activity_id, observation_type, severity, description, linked_task_id)
     VALUES (?,?,?,?,?)`,
    [activity_id, observation_type, severity, description, taskId]
  );
};

exports.getAnalytics = async () => {
  const [counts] = await pool.execute(`
    SELECT conducted_by, COUNT(*) activities
    FROM management_activities
    GROUP BY conducted_by
  `);

  const scores = counts.map(c => ({
    user_id: c.conducted_by,
    score: Math.min(100, c.activities * 10)
  }));

  for (const s of scores) {
    await pool.execute(
      `INSERT INTO management_engagement_scores (user_id, score)
       VALUES (?,?)`,
      [s.user_id, s.score]
    );
  }

  return scores;
};
