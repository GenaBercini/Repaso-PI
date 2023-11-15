import axios from "axios";
import { constants } from "./constants";

export const getRecipes = () => {
  return async (dispatch) => {
    dispatch({
      type: constants.LOADING,
    });
    const data = await axios.get("http://localhost:3001/recipes");
    dispatch({
      type: constants.GET_RECIPES,
      payload: data.data,
    });
  };
};

export const getRecipeById = (id) => {
  return async (dispatch) => {
    dispatch({
      type: constants.LOADING,
    });
    const data = await axios.get(`http://localhost:3001/recipes/${id}`);
    dispatch({
      type: constants.GET_RECIPE_BY_ID,
      payload: data.data,
    });
  };
};

export const getRecipeByName = (name) => {
  return async (dispatch) => {
    dispatch({
      type: constants.LOADING,
    });
    const data = await axios.get(`http://localhost:3001/recipes?name=${name}`);
    dispatch({
      type: constants.GET_RECIPE_BY_NAME,
      payload: data.data,
    });
  };
};

export const getDiets = () => {
  return async (dispatch) => {
    dispatch({
      type: constants.LOADING,
    });
    const data = await axios.get("http://localhost:3001/diets");
    dispatch({
      type: constants.GET_DIETS,
      payload: data.data,
    });
  };
};

export const getRecipeFilterByDiet = (filterDiet) => {
  return (dispatch) => {
    dispatch({
      type: constants.LOADING,
    });
    dispatch({
      type: constants.FILTER_RECIPES_BY_DIET,
      payload: filterDiet,
    });
  };
};

export const getRecipeSortedByName = (nameOrder) => {
  return (dispatch) => {
    dispatch({
      type: constants.LOADING,
    });
    dispatch({
      type: constants.SORT_RECIPES_BY_NAME,
      payload: nameOrder,
    });
  };
};
