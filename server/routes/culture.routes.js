const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");
const ctrl = require("../controllers/culture.controller");

// Suggestions
router.post("/suggestion", auth, role("employee"), ctrl.submitSuggestion);
router.get("/suggestion", auth, role("team_admin","group_admin"), ctrl.getSuggestions);

// Near-miss quality
router.post("/nearmiss/score", auth, role("group_admin"), ctrl.scoreNearMiss);

// Committee participation
router.post("/committee", auth, role("group_admin"), ctrl.recordCommittee);

// Analytics
router.get("/analytics", auth, ctrl.getCultureAnalytics);

module.exports = router;
