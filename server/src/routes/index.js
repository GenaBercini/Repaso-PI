const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipes = require("./recipes.js");
const diets = require("./diets.js");

const router = Router();

// Configurar los routers
router.use("/recipes", recipes);
router.use("/diets", diets);

module.exports = router;
