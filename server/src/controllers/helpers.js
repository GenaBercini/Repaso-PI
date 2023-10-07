const axios = require('axios');
const {
    API_KEY
} = process.env;
module.exports = {
    getAllTypesApi: async () => {
        try{
            const responseAPI = await axios.get(`http://localhost:5000/recipes`);
            const typesDiets = new Set();
            responseAPI.data.forEach(element => {
                element.diets.forEach(diet => typesDiets.add(diet))
            });
            return typesDiets
        }
        catch(e) {
            return e
        }
    },
    getAllRecipeApi: async () => {
        try{
            let responseAPI = await axios.get(`http://localhost:5000/recipes`);
            return responseAPI.data;
        }
        catch(e) {
            return e
        }
    },
    getRecipeById: async (id) => {
        try{
            let responseAPI = await axios.get(`http://localhost:5000/recipes/:${id}`);
            return responseAPI.data;
        }
        catch(e) {
            return e
        }
    },
    getRecipeByQuery: async (query) => {
        try{
            let responseAPI = await axios.get(`http://localhost:5000/recipes?name.forename=${query}`);
            return responseAPI.data;
        }
        catch(e) {
            return e
        }
    }
}