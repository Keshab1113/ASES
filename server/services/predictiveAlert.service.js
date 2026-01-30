const pool = require("../config/db");
const { analyzePrediction } = require("./ai.service");

exports.generateAlert = async (signals, context) => {
  const aiResult = await analyzePrediction(signals, context);

  if (aiResult.probability > 0.6) {
    await pool.execute(
      `INSERT INTO predictive_alerts
       (level, title, description, predicted_event, confidence, group_id, team_id)
       VALUES (?,?,?,?,?,?,?)`,
      [
        aiResult.alert_level,
        "Predicted HSE Risk",
        aiResult.preventive_action,
        aiResult.predicted_event,
        aiResult.probability,
        context.group_id,
        context.team_id
      ]
    );
  }
};
