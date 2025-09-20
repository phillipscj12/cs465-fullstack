const router = require("express").Router();
const path = require("path");
const fs = require("fs");

router.get("/trips.json", (req, res, next) => {
  try {
    const p = path.join(__dirname, "..", "..", "data", "trips.json");
    const raw = fs.readFileSync(p, "utf8");
    res.type("application/json").send(raw);
  } catch (e) { next(e); }
});

module.exports = router;
