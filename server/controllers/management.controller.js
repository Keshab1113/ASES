const service = require("../services/management.service");

exports.createActivity = async (req, res) => {
  await service.createActivity(req.body, req.user.id);
  res.json({ message: "Management activity recorded" });
};

exports.getActivities = async (req, res) => {
  res.json(await service.getActivities());
};

exports.addObservation = async (req, res) => {
  await service.addObservation(req.body, req.user.id);
  res.json({ message: "Observation added" });
};

exports.getEngagementAnalytics = async (req, res) => {
  res.json(await service.getAnalytics());
};
