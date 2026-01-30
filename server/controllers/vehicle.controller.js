const service = require("../services/vehicle.service");

exports.addVehicle = async (req, res) => {
  await service.addVehicle(req.body);
  res.json({ message: "Vehicle added" });
};

exports.getVehicles = async (req, res) => {
  res.json(await service.getVehicles());
};

exports.createDriverProfile = async (req, res) => {
  await service.createDriverProfile(req.body);
  res.json({ message: "Driver profile created" });
};

exports.logTrip = async (req, res) => {
  await service.logTrip(req.body, req.user.id);
  res.json({ message: "Trip logged" });
};

exports.reportIncident = async (req, res) => {
  await service.reportIncident(req.body, req.user.id);
  res.json({ message: "Vehicle incident reported" });
};

exports.getVehicleAnalytics = async (req, res) => {
  res.json(await service.getAnalytics());
};
