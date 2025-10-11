const router = require("express").Router();
const trips = require("../controllers/api/trips");

router.get("/trips", trips.list);
router.get("/trips/:code", trips.byCode);
router.post("/trips", trips.create);
router.put("/trips/:code", trips.update);
router.delete("/trips/:code", trips.remove);

module.exports = router;
