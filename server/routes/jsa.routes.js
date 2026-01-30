const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");
const ctrl = require("../controllers/jsa.controller");

// JSA lifecycle
router.post("/create", auth, role("team_admin"), ctrl.createJSA);
router.get("/:id", auth, ctrl.getJSA);
router.post("/submit", auth, role("team_admin"), ctrl.submitJSA);

// Approval
router.post("/approve", auth, role("group_admin"), ctrl.approveJSA);

// Employee acknowledgement
router.post("/acknowledge", auth, role("employee"), ctrl.acknowledgeJSA);

module.exports = router;
