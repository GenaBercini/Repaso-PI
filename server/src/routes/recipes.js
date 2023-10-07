const { Router } = require('express');
const {getJson, getRecipes, getOneRecipe, deleteRecipe, postRecipe, allToDb} = require('../controllers/recipes.controllers')

const router = Router();

router.get('/', getRecipes);
router.get('/json', getJson);
router.get('/:id', getOneRecipe);
router.post('/', postRecipe);
module.exports = router;