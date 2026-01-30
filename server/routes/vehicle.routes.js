const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");
const ctrl = require("../controllers/vehicle.controller");

// Vehicles
router.post("/", auth, role("group_admin","super_admin"), ctrl.addVehicle);
router.get("/", auth, ctrl.getVehicles);

// Driver profile
router.post("/driver", auth, role("group_admin"), ctrl.createDriverProfile);

// Trips
router.post("/trip", auth, role("employee"), ctrl.logTrip);

// Incidents
router.post("/incident", auth, role("employee"), ctrl.reportIncident);

// Analytics
router.get("/analytics", auth, ctrl.getVehicleAnalytics);

module.exports = router;
