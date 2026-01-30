const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");
const ctrl = require("../controllers/equipment.controller");

// Equipment
router.post("/", auth, role("group_admin","super_admin"), ctrl.createEquipment);
router.get("/", auth, ctrl.getEquipment);

// Maintenance
router.post("/plan", auth, role("group_admin"), ctrl.createPlan);
router.post("/maintain", auth, role("team_admin"), ctrl.recordMaintenance);

// Analytics
router.get("/analytics", auth, ctrl.getEquipmentAnalytics);

module.exports = router;
