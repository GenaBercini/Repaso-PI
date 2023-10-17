const axios = require("axios");
const { API_KEY } = process.env; // En caso de tener API KEY
const { Recipes, Diets } = require("../db.js");
const { Op } = require("sequelize");
const { getDietsDB } = require("./dietsController.js");
module.exports = {
  getAllRecipeApi: async () => {
    try {
      let responseAPI = await axios.get(`http://localhost:5000/recipes`);
      return responseAPI.data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getRecipeByIdApi: async (id) => {
    try {
      let responseAPI = await axios.get(`http://localhost:5000/recipes/${id}`);
      return responseAPI.data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getRecipeByQueryApi: async (query) => {
    try {
      let responseAPI = await axios.get(`http://localhost:5000/recipes`);
      const recipeFound = responseAPI.data.filter((element) =>
        element.title.toLowerCase().includes(query.toLowerCase())
      );
      return recipeFound;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getAllRecipeDB: async () => {
    try {
      const recipes = await await Recipes.findAll({
        include: {
          model: Diets,
          attributes: ["name"],
        },
      });
      if (recipes.length < 0) throw new Error("No existen recetas creadas");
      const recipesAux = recipes.map((recipe) => {
        let diets = recipe.Diets.map((diet) => diet.name);
        return {
          id: recipe.id,
          title: recipe.title,
          healthScore: recipe.healthScore,
          pricePerServing: recipe.pricePerServing,
          readyInMinutes: recipe.readyInMinutes,
          servings: recipe.servings,
          image: recipe.image,
          summary: recipe.summary,
          diets: diets,
        };
      });
      return recipesAux;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getRecipeByIdDB: async (id) => {
    try {
      let recipeIdDB = await Recipes.findByPk(id, {
        include: {
          model: Diets,
          attributes: ["name"],
        },
      });
      if (recipeIdDB) {
        let diets = recipeIdDB.Diets.map((diet) => diet.name);
        return {
          id: recipeIdDB.id,
          title: recipeIdDB.title,
          healthScore: recipeIdDB.healthScore,
          pricePerServing: recipeIdDB.pricePerServing,
          readyInMinutes: recipeIdDB.readyInMinutes,
          servings: recipeIdDB.servings,
          image: recipeIdDB.image,
          summary: recipeIdDB.summary,
          diets: diets,
        };
      } else {
        throw new Error("Receta no encontrada");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  },
  getRecipeByQueryDB: async (name) => {
    try {
      let recipes = await Recipes.findAll({
        where: {
          title: { [Op.iLike]: `%${name}%` },
        },
        include: {
          model: Diets,
          attributes: ["name"],
        },
      });
      if (recipes.length < 0)
        throw new Error("No existen recetas con ese nombre");
      const recipesAux = recipes.map((recipe) => {
        let diets = recipe.Diets.map((diet) => diet.name);
        return {
          id: recipe.id,
          title: recipe.title,
          healthScore: recipe.healthScore,
          pricePerServing: recipe.pricePerServing,
          readyInMinutes: recipe.readyInMinutes,
          servings: recipe.servings,
          image: recipe.image,
          summary: recipe.summary,
          diets: diets,
        };
      });
      return recipesAux;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  postRecipe: async (
    title,
    healthScore,
    pricePerServing,
    image,
    summary,
    servings,
    readyInMinutes,
    diets
  ) => {
    try {
      let newRecipe = await Recipes.create({
        title,
        healthScore,
        pricePerServing,
        image,
        summary,
        servings,
        readyInMinutes,
      });

      let dietsDB = await getDietsDB(diets);
      newRecipe.addDiets(dietsDB);
      return newRecipe;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
