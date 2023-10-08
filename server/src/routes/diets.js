const { Router } = require("express");
const router = Router();
const { getTypes } = require("../handlers/dietsHandler");

router.get("/", getTypes);

module.exports = router;
