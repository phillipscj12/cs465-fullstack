const router = require("express").Router();
const ctrl = require("../controllers/travelers");

router.get("/", ctrl.index);
router.get("/trips", ctrl.trips);
router.get("/trips/:code", ctrl.tripByCode);

module.exports = router;
