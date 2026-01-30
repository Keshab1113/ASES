const service = require("../services/jsa.service");

exports.createJSA = async (req, res) => {
  const id = await service.createJSA(req.body, req.user.id);
  res.json({ jsa_id: id });
};

exports.getJSA = async (req, res) => {
  const data = await service.getJSA(req.params.id);
  res.json(data);
};

exports.submitJSA = async (req, res) => {
  await service.submitJSA(req.body.jsa_id);
  res.json({ message: "JSA submitted for approval" });
};

exports.approveJSA = async (req, res) => {
  await service.approveJSA(req.body, req.user.id);
  res.json({ message: "JSA decision recorded" });
};

exports.acknowledgeJSA = async (req, res) => {
  await service.acknowledgeJSA(req.body.jsa_id, req.user.id);
  res.json({ message: "JSA acknowledged" });
};
