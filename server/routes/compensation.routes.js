const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");
const ctrl = require("../controllers/compensation.controller");

// Claims
router.post("/", auth, role("employee"), ctrl.createClaim);
router.get("/", auth, ctrl.getClaims);
router.post("/status", auth, role("group_admin"), ctrl.updateStatus);

// Costs
router.post("/cost", auth, role("group_admin"), ctrl.addCost);

// Recovery
router.post("/recovery", auth, role("group_admin"), ctrl.updateRecovery);

// Analytics
router.get("/analytics", auth, ctrl.getAnalytics);

module.exports = router;
