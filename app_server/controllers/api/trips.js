const Trip = require("../../models/Trip");

// GET /api/trips
exports.list = async (req, res, next) => {
  try {
    const trips = await Trip.find().sort({ createdAt: -1 }).lean();
    res.json(trips);
  } catch (e) { next(e); }
};

// GET /api/trips/:code
exports.byCode = async (req, res, next) => {
  try {
    const code = String(req.params.code || "").toUpperCase();
    const trip = await Trip.findOne({ code }).lean();
    if (!trip) return res.status(404).json({ message: "Not found" });
    res.json(trip);
  } catch (e) { next(e); }
};

// POST /api/trips
exports.create = async (req, res, next) => {
  try {
    const payload = {
      code: String(req.body.code).toUpperCase(),
      title: req.body.title,
      summary: req.body.summary,
      price: Number(req.body.price),
      nights: Number(req.body.nights),
      image: req.body.image
    };
    const trip = await Trip.create(payload);
    res.status(201).json(trip);
  } catch (e) { next(e); }
};

// PUT /api/trips/:code
exports.update = async (req, res, next) => {
  try {
    const code = String(req.params.code || "").toUpperCase();
    const patch = {};
    ["title","summary","price","nights","image"].forEach(k => {
      if (req.body[k] !== undefined) patch[k] = req.body[k];
    });
    if (patch.price !== undefined) patch.price = Number(patch.price);
    if (patch.nights !== undefined) patch.nights = Number(patch.nights);

    const trip = await Trip.findOneAndUpdate({ code }, patch, { new: true, runValidators: true }).lean();
    if (!trip) return res.status(404).json({ message: "Not found" });
    res.json(trip);
  } catch (e) { next(e); }
};

// DELETE /api/trips/:code
exports.remove = async (req, res, next) => {
  try {
    const code = String(req.params.code || "").toUpperCase();
    const out = await Trip.findOneAndDelete({ code }).lean();
    if (!out) return res.status(404).json({ message: "Not found" });
    res.status(204).send();
  } catch (e) { next(e); }
};
