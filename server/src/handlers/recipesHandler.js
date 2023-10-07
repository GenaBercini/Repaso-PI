const {
  getRecipeByQueryApi,
  getRecipeByQueryDB,
  getAllRecipeApi,
  getAllRecipeDB,
  getRecipeByIdDB,
  getRecipeByIdApi,
  postRecipe,
} = require("../controllers/recipesController");

const recipeControllers = {
  getRecipes: async (req, res, next) => {
    const { name } = req.query;
    try {
      if (name) {
        const recipesAPI = await getRecipeByQueryApi(name);
        const recipesDB = await getRecipeByQueryDB(name);
        res.status(200).json([...recipesAPI, ...recipesDB]);
      } else {
        const recipesAPI = await getAllRecipeApi();
        const recipesDB = await getAllRecipeDB();
        res.status(200).json([...recipesAPI, ...recipesDB]);
      }
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },
  getOneRecipe: async (req, res, next) => {
    const { id } = req.params;
    try {
      if (id.length > 30) {
        const recipe = await getRecipeByIdDB(id);
        console.log(recipe);
        res.status(200).json(recipe);
      } else {
        const recipe = await getRecipeByIdApi(id);
        res.status(200).json(recipe);
      }
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },

  postRecipe: async (req, res, next) => {
    const {
      title,
      healthScore,
      pricePerServing,
      image,
      summary,
      servings,
      readyInMinutes,
      diets,
    } = req.body;
    try {
      if (
        (title,
        healthScore,
        pricePerServing,
        image,
        summary,
        servings,
        readyInMinutes,
        diets)
      ) {
        let newRecipe = await postRecipe(
          title,
          healthScore,
          pricePerServing,
          image,
          summary,
          servings,
          readyInMinutes,
          diets
        );
        res
          .status(200)
          .send({ msg: "Successfully created recipe", data: newRecipe });
      }
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },
};

module.exports = recipeControllers;
