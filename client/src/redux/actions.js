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
