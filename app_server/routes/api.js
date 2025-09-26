const router = require("express").Router();
const trips = require("../controllers/api/trips");

router.get("/trips", trips.list);
router.get("/trips/:code", trips.byCode);

module.exports = router;
