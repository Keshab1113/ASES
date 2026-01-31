const router = require("express").Router();
const {
  getUsers,
  getUserDetails,
  updateUserStatus,
  approveUser,
  rejectUser,
  getPendingApprovals,
  updateProfile,
  changePassword,
  getUserActivity,
  getUserMetrics,
} = require("../controllers/users.controller");
const authenticate = require("../middlewares/auth.middleware");
const checkRole = require("../middlewares/role.middleware");

router.get(
  "/",
  authenticate,
  checkRole(["super_admin", "group_admin", "team_admin"]),
  getUsers,
);
router.get(
  "/pending",
  authenticate,
  checkRole(["super_admin", "group_admin", "team_admin"]),
  getPendingApprovals,
);
router.get("/:id", authenticate, getUserDetails);
router.post(
  "/:id/approve",
  authenticate,
  checkRole(["super_admin", "group_admin", "team_admin"]),
  approveUser,
);
router.post(
  "/:id/reject",
  authenticate,
  checkRole(["super_admin", "group_admin", "team_admin"]),
  rejectUser,
);
router.patch(
  "/:id/status",
  authenticate,
  checkRole(["super_admin", "group_admin", "team_admin"]),
  updateUserStatus,
);

// Add these routes
router.put("/:id", authenticate, updateProfile);
router.post("/change-password", authenticate, changePassword);
router.get("/activity/data", authenticate, getUserActivity);
router.get("/:userId/metrics", authenticate, getUserMetrics);

module.exports = router;
