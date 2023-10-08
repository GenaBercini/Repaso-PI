const { Diets } = require("../db.js");
const axios = require("axios");
const { getAllTypesApi } = require("../controllers/dietsController.js");

const dietsHandler = {
  getTypes: async (req, res, next) => {
    try {
      const diets = await getAllTypesApi();
      diets.forEach((name) => {
        Diets.findOrCreate({
          where: { name: name },
          defaults: {
            name: name,
          },
        });
      });

      let allDiets = await Diets.findAll();
      res.json(allDiets);
    } catch (error) {
      res.status(404).json({ message: error.message, error: error });
    }
  },
};

module.exports = dietsHandler;
