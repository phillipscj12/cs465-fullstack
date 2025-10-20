const router = require("express").Router();
const trips = require("../controllers/trips");
const { requireAuth } = require("../controllers/auth");

// READ
router.get("/trips", trips.list);
router.get("/trips/:code", trips.byCode);

// WRITE (protected)
router.post("/trips", requireAuth, trips.create);
router.put("/trips/:code", requireAuth, trips.update);
router.delete("/trips/:code", requireAuth, trips.remove);

module.exports = router;
