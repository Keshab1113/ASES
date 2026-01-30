const service = require("../services/compensation.service");

exports.createClaim = async (req, res) => {
  await service.createClaim(req.body, req.user.id);
  res.json({ message: "Claim reported" });
};

exports.getClaims = async (req, res) => {
  res.json(await service.getClaims(req.user));
};

exports.updateStatus = async (req, res) => {
  await service.updateStatus(req.body);
  res.json({ message: "Claim status updated" });
};

exports.addCost = async (req, res) => {
  await service.addCost(req.body);
  res.json({ message: "Cost recorded" });
};

exports.updateRecovery = async (req, res) => {
  await service.updateRecovery(req.body);
  res.json({ message: "Recovery updated" });
};

exports.getAnalytics = async (req, res) => {
  res.json(await service.getAnalytics());
};
