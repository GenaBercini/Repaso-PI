const axios = require("axios");
const { Diets } = require("../db.js");
const { API_KEY } = process.env;
module.exports = {
  getAllTypesApi: async () => {
    try {
      const responseAPI = await axios.get(`http://localhost:5000/recipes`);
      const typesDiets = new Set();
      responseAPI.data.forEach((element) => {
        element.diets.forEach((diet) => typesDiets.add(diet));
      });
      return typesDiets;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  getDietsDB: async (diets) => {
    try {
      let dietsDB = await Diets.findAll({
        where: {
          name: diets,
        },
      });
      if (dietsDB.length < 0) throw new Error("No existen dietas creadas");
      let dietsIds = dietsDB.map((diet) => diet.id);
      return dietsIds;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
