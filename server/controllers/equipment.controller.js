const service = require("../services/equipment.service");

exports.createEquipment = async (req, res) => {
  await service.createEquipment(req.body);
  res.json({ message: "Equipment added" });
};

exports.getEquipment = async (req, res) => {
  res.json(await service.getEquipment());
};

exports.createPlan = async (req, res) => {
  await service.createPlan(req.body, req.user.id);
  res.json({ message: "Maintenance plan created" });
};

exports.recordMaintenance = async (req, res) => {
  await service.recordMaintenance(req.body, req.user.id);
  res.json({ message: "Maintenance recorded" });
};

exports.getEquipmentAnalytics = async (req, res) => {
  res.json(await service.getAnalytics());
};
