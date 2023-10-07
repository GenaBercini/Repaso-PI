const { Diets } = require('../db.js');
const axios = require('axios');
const getAllTypesApi = require('../controllers/helpers.js');

const typesController = {
    getTypes: async (req, res, next) => {
        try {
            const diets = await getAllTypesApi()
            diets.forEach((name) => {
                Diets.findOrCreate({
                    where: {name: name},
                    defaults: {
                        name: name,
                    }
                });
            });
    
            let allDiets = await Diets.findAll();
            res.json(allDiets);
    
        }
        catch(e) {
            res.status(404).json({ message: 'An error has occurred', error: e });
        }
    }
}

module.exports = typesController;