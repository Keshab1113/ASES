const service = require("../services/training.service");

exports.createTraining = async (req, res) => {
  await service.createTraining(req.body, req.user.id);
  res.json({ message: "Training created" });
};

exports.getTrainings = async (req, res) => {
  const data = await service.getTrainings();
  res.json(data);
};

exports.assignTraining = async (req, res) => {
  await service.assignTraining(req.body, req.user.id);
  res.json({ message: "Training assigned" });
};

exports.myTrainings = async (req, res) => {
  const data = await service.getUserTrainings(req.user.id);
  res.json(data);
};

exports.completeTraining = async (req, res) => {
  await service.completeTraining(req.body.assignment_id);
  res.json({ message: "Training completed" });
};

exports.assessCompetency = async (req, res) => {
  await service.assessCompetency(req.body, req.user.id);
  res.json({ message: "Competency assessed" });
};
