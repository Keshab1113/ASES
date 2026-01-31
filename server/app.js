const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const uploadRoutes = require("./routes/upload.routes");
const inspectionRoutes = require("./routes/inspection.routes");
const trainingRoutes = require("./routes/training.routes");
const jsaRoutes = require("./routes/jsa.routes");
const groupsRoutes = require("./routes/groups.routes");
const teamsRoutes = require("./routes/teams.routes");
const usersRoutes = require("./routes/users.routes");

const app = express();

app.use(
  cors({
    origin: (origin, callback) => callback(null, true), // allow all origins
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/inspection", inspectionRoutes);
app.use("/api/training", trainingRoutes);
app.use("/api/jsa", jsaRoutes);
app.use("/api/groups", groupsRoutes);
app.use("/api/teams", teamsRoutes);
app.use("/api/users", usersRoutes);

app.get("/", (req, res) => {
  res.json({ status: "HSE backend running" });
});

module.exports = app;
