const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");
const ctrl = require("../controllers/management.controller");

// Activities
router.post("/", auth, role("team_admin","group_admin","super_admin"), ctrl.createActivity);
router.get("/", auth, ctrl.getActivities);

// Observations
router.post("/observation", auth, role("team_admin","group_admin"), ctrl.addObservation);

// Analytics
router.get("/analytics", auth, ctrl.getEngagementAnalytics);

module.exports = router;
