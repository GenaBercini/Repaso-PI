const axios = require("axios");
const { API_KEY } = process.env; // En caso de tener API KEY
const { Recipes, Diets } = require("../db.js");
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
      let responseAPI = await axios.get(
        `http://localhost:5000/recipes?name.forename=${query}`
      );
      return responseAPI.data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  getAllRecipeDB: async () => {
    try {
      const recipes = await await Recipes.findAll();
      return recipes.dataValues;
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
        return recipeIdDB;
      } else {
        throw new Error("Recipe Not Found");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  },
  getRecipeByQueryDB: async (name) => {
    try {
      let recipes = await Recipes.findAll({
        where: {
          title: { [Op.substring]: name },
        },
        include: {
          model: Diets,
          attributes: ["name"],
        },
      });
      return recipes;
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
        image: image.length > 0 ? image : null,
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
