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
    } catch (e) {
      return e;
    }
  },
  getDietsDB: async (diets) => {
    try {
      let dietDB = await Diets.findAll({
        where: {
          name: diets,
        },
        attributes: ["id"],
      });
      console.log(dietDB);
      return dietDB;
    } catch (error) {
      throw new Error({ error: error.message });
    }
  },
};
