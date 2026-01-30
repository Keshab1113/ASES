const service = require("../services/inspection.service");

exports.createTemplate = async (req, res) => {
  await service.createTemplate(req.body, req.user.id);
  res.json({ message: "Inspection template created" });
};

exports.addItem = async (req, res) => {
  await service.addItem(req.body);
  res.json({ message: "Checklist item added" });
};

exports.getTemplates = async (req, res) => {
  const data = await service.getTemplates();
  res.json(data);
};

exports.startInspection = async (req, res) => {
  const id = await service.startInspection(req.body, req.user.id);
  res.json({ inspection_id: id });
};

exports.submitInspection = async (req, res) => {
  await service.submitInspection(req.params.id, req.body, req.user.id);
  res.json({ message: "Inspection submitted" });
};

exports.getFindings = async (req, res) => {
  const data = await service.getFindings();
  res.json(data);
};
