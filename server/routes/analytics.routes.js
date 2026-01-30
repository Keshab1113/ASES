const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const { getIndicatorTrends } = require("../controllers/analytics.controller");

router.get("/indicators", auth, getIndicatorTrends);

module.exports = router;
