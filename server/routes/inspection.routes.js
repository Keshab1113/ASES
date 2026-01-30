const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");
const ctrl = require("../controllers/inspection.controller");

// Templates
router.post("/templates", auth, role("super_admin"), ctrl.createTemplate);
router.post("/templates/items", auth, role("super_admin"), ctrl.addItem);
router.get("/templates", auth, ctrl.getTemplates);

// Inspections
router.post("/start", auth, role("team_admin"), ctrl.startInspection);
router.post("/:id/submit", auth, role("team_admin"), ctrl.submitInspection);

// Findings
router.get("/findings", auth, role("group_admin","super_admin"), ctrl.getFindings);

module.exports = router;
