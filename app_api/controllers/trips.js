const Trip = require("../models/Trip");

exports.list = async (req, res, next) => {
  try {
    const rows = await Trip.find().sort({ createdAt: -1 }).lean();
    res.json(rows);
  } catch (e) { next(e); }
};

exports.byCode = async (req, res, next) => {
  try {
    const trip = await Trip.findOne({ code: req.params.code.toUpperCase() }).lean();
    if (!trip) return res.status(404).json({ error: "Not found" });
    res.json(trip);
  } catch (e) { next(e); }
};

exports.create = async (req, res, next) => {
  try {
    const body = req.body || {};
    body.code = String(body.code || "").toUpperCase();
    const trip = await Trip.create(body);
    res.status(201).json(trip);
  } catch (e) { next(e); }
};

exports.update = async (req, res, next) => {
  try {
    const code = req.params.code.toUpperCase();
    const patch = req.body || {};
    const trip = await Trip.findOneAndUpdate(
      { code }, patch, { new: true, runValidators: true }
    ).lean();
    if (!trip) return res.status(404).json({ error: "Not found" });
    res.json(trip);
  } catch (e) { next(e); }
};

exports.remove = async (req, res, next) => {
  try {
    const code = req.params.code.toUpperCase();
    const out = await Trip.findOneAndDelete({ code }).lean();
    if (!out) return res.status(404).json({ error: "Not found" });
    res.status(204).end();
  } catch (e) { next(e); }
};
