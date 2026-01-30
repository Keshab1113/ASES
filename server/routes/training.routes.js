const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");
const ctrl = require("../controllers/training.controller");

// Training master
router.post("/", auth, role("super_admin"), ctrl.createTraining);
router.get("/", auth, ctrl.getTrainings);

// Assignment
router.post("/assign", auth, role("team_admin","group_admin"), ctrl.assignTraining);

// Employee view
router.get("/my", auth, role("employee"), ctrl.myTrainings);
router.post("/complete", auth, role("employee"), ctrl.completeTraining);

// Competency
router.post("/assess", auth, role("team_admin"), ctrl.assessCompetency);

module.exports = router;
