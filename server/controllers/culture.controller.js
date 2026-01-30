const service = require("../services/culture.service");

exports.submitSuggestion = async (req, res) => {
  await service.submitSuggestion(req.body, req.user.id);
  res.json({ message: "Suggestion submitted" });
};

exports.getSuggestions = async (req, res) => {
  res.json(await service.getSuggestions());
};

exports.scoreNearMiss = async (req, res) => {
  await service.scoreNearMiss(req.body);
  res.json({ message: "Near-miss scored" });
};

exports.recordCommittee = async (req, res) => {
  await service.recordCommittee(req.body);
  res.json({ message: "Committee participation recorded" });
};

exports.getCultureAnalytics = async (req, res) => {
  res.json(await service.getAnalytics());
};
