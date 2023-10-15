import { constants } from "./constants";

const initialState = {
  loading: false,
  recipes: [],
  fullRecipes: [],
  oneRecipe: {},
  diets: [],
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        fullRecipes: action.payload,
        loading: false,
      };
    case constants.GET_RECIPE_BY_ID:
      return {
        ...state,
        oneRecipe: action.payload,
        loading: false,
      };
    case constants.GET_DIETS:
      return {
        ...state,
        diets: action.payload,
        loading: false,
      };
    case constants.LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
