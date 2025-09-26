const Trip = require("../../models/Trip");

exports.list = async (req, res, next) => {
  try {
    const trips = await Trip.find().sort({ createdAt: -1 }).lean();
    res.json(trips);
  } catch (e) { next(e); }
};

exports.byCode = async (req, res, next) => {
  try {
    const trip = await Trip.findOne({ code: req.params.code.toUpperCase() }).lean();
    if (!trip) return res.status(404).json({ error: "Not found" });
    res.json(trip);
  } catch (e) { next(e); }
};
