const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const pool = require("../config/db");

router.get("/", auth, async (req, res) => {
  const [alerts] = await pool.execute(
    `SELECT * FROM predictive_alerts
     WHERE (group_id=? OR team_id=?)
     ORDER BY created_at DESC`,
    [req.user.group_id, req.user.team_id]
  );

  res.json(alerts);
});

router.post("/:id/ack", auth, async (req, res) => {
  await pool.execute(
    "UPDATE predictive_alerts SET acknowledged=true WHERE id=?",
    [req.params.id]
  );
  res.json({ message: "Alert acknowledged" });
});

module.exports = router;
