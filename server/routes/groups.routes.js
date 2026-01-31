const router = require("express").Router();
const {
  getGroups,
  createGroup,
  updateGroupStatus,
  getGroupDetails,
  getGroupTeams
} = require("../controllers/groups.controller");
const authenticate = require("../middlewares/auth.middleware");
const checkRole = require("../middlewares/role.middleware");

router.get("/", authenticate, checkRole(['super_admin']), getGroups);
router.post("/", authenticate, checkRole(['super_admin']), createGroup);
router.get("/:id", authenticate, checkRole(['super_admin', 'group_admin']), getGroupDetails);
router.patch("/:id/status", authenticate, checkRole(['super_admin']), updateGroupStatus);
router.get("/:id/teams", authenticate, checkRole(['super_admin', 'group_admin']), getGroupTeams);

module.exports = router;