// add below existing list/byCode
const Trip = require("../../app_server/models/Trip");

exports.create = async (req, res, next) => {
  try {
    const t = await Trip.create({
      code: String(req.body.code).toUpperCase(),
      title: req.body.title,
      summary: req.body.summary,
      price: Number(req.body.price),
      nights: Number(req.body.nights),
      image: req.body.image
    });
    res.status(201).json(t);
  } catch (e) { next(e); }
};

exports.update = async (req, res, next) => {
  try {
    const code = String(req.params.code).toUpperCase();
    const t = await Trip.findOneAndUpdate(
      { code },
      {
        title: req.body.title,
        summary: req.body.summary,
        price: Number(req.body.price),
        nights: Number(req.body.nights),
        image: req.body.image
      },
      { new: true, runValidators: true }
    ).lean();
    if (!t) return res.status(404).json({ error: "Not found" });
    res.json(t);
  } catch (e) { next(e); }
};

exports.remove = async (req, res, next) => {
  try {
    const code = String(req.params.code).toUpperCase();
    const out = await Trip.findOneAndDelete({ code }).lean();
    if (!out) return res.status(404).json({ error: "Not found" });
    res.status(204).end();
  } catch (e) { next(e); }
};
