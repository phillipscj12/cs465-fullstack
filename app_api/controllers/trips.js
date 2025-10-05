const Trip = require("../models/Trip");

/** GET /api/trips */
exports.list = async (req, res, next) => {
  try {
    const trips = await Trip.find().sort({ createdAt: -1 }).lean();
    res.status(200).json(trips);
  } catch (e) { next(e); }
};

/** GET /api/trips/:code */
exports.byCode = async (req, res, next) => {
  try {
    const code = String(req.params.code || "").toUpperCase();
    const trip = await Trip.findOne({ code }).lean();
    if (!trip) return res.status(404).json({ error: "Not found" });
    res.status(200).json(trip);
  } catch (e) { next(e); }
};
