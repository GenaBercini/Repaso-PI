const {
    getAllRecipes,
    getRecipeByQuery,
    getRecipeById,
    getAllRecipeApi
} = require('./helpers');
const axios = require('axios');
const fs = require('fs');
const { Recipe, Diets } = require('../db.js');

const recipeControllers = {
    getJson: async (req, res, next) => {
        try {
            const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch?apiKey=2fa551adab1c45b18b5733554dccf6ea&addRecipeInformation=true&number=100');
            const data = []
            for (let i = 0; i < response.data.results.length; i++) {
              let food = {
                id: response.data.results[i].id,
                title: response.data.results[i].title,
                healthScore: response.data.results[i].healthScore,
                pricePerServing: response.data.results[i].pricePerServing,
                readyInMinutes: response.data.results[i].readyInMinutes,
                servings: response.data.results[i].servings,
                image: response.data.results[i].image,
                summary:  response.data.results[i].summary,
                diets: response.data.results[i].diets,
              }
              data.push(food)
            }
            
            fs.writeFileSync('datos.json', JSON.stringify({recipes: data}, null, 2));
        
            res.send('Información obtenida y guardada en datos.json');
          } catch (error) {
            console.error('Error al obtener la información:', error);
            res.status(500).send('Hubo un error al obtener la información de la API.');
          }
    },
    getRecipes: async (req, res, next) => {
        const { name } = req.query;
        try {
           
        }
        catch (e) {
            res.status(404).json({ msg: "Error", error: e });
        }
    },
    getOneRecipe: async (req, res, next) => {
        const { id } = req.params;
        try {
         
        }
        catch (e) {
            res.status(404).json({ msg: "Error", error: e });
        }
    },
    postRecipe: async (req, res, next) => {
        const { title, healthScore, pricePerServing, image, summary, servings,readyInMinutes, diets } = req.body;
        try {
           
        }
        catch (e) {
            res.status(404).json({ msg: "Error", error: e });
        }
    },
}

module.exports = recipeControllers;