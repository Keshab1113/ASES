const router = require("express").Router();
const multer = require("multer");
const auth = require("../middlewares/auth.middleware");
const { uploadResource } = require("../controllers/upload.controller");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (_, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

router.post("/", auth, upload.single("file"), uploadResource);

module.exports = router;
