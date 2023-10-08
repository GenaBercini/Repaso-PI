const { Router } = require("express");
const {
  getRecipes,
  getOneRecipe,
  postRecipe,
} = require("../handlers/recipesHandler");

const router = Router();

router.get("/", getRecipes);
router.get("/:id", getOneRecipe);
router.post("/", postRecipe);
module.exports = router;
