const router = require("express").Router();
const auth = require("../controllers/auth");

router.post("/auth/login", auth.login);

module.exports = router;
