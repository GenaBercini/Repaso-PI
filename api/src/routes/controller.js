const { Router } = require('express');
const {getFoods} = require("./food");

const router = Router();

router.get('/', getFoods);
module.exports = router;